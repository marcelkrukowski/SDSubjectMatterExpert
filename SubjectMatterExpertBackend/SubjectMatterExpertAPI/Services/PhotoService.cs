using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Data;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly DataContext _context;

        public PhotoService(BlobServiceClient blobServiceClient, DataContext context)
        {
            _blobServiceClient = blobServiceClient;
            _context = context;
        }

      
        public async Task<BlobClient> UploadPhotoAsync(IFormFile photoFile)
        {
            var containerInstance = _blobServiceClient.GetBlobContainerClient("avatars");
            var blobInstance = containerInstance.GetBlobClient(photoFile.FileName);

            await blobInstance.UploadAsync(photoFile.OpenReadStream());
            return blobInstance;
        }

        public async Task<bool> DeletePhotoAsync(int photoId, string blobUri, string Filename)
        {
           
            var containerInstance = _blobServiceClient.GetBlobContainerClient("avatars");
            var blobName = Filename;
            var blobInstance = containerInstance.GetBlobClient(blobName);
           

            var photo = await _context.Photos.FindAsync(photoId);

            if (photo != null && await blobInstance.ExistsAsync())
            {
                await blobInstance.DeleteIfExistsAsync();
                _context.Photos.Remove(photo);
                return true;
            }
            return false;
        }


    }
}
