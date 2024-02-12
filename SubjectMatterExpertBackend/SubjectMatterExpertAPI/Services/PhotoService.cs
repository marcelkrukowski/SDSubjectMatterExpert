using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly BlobServiceClient _blobServiceClient;
        public PhotoService(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }

      
        public async Task<BlobClient> UploadPhotoAsync(IFormFile photoFile)
        {
            var containerInstance = _blobServiceClient.GetBlobContainerClient("avatars");
            var blobInstance = containerInstance.GetBlobClient(photoFile.FileName);

            await blobInstance.UploadAsync(photoFile.OpenReadStream());
            return blobInstance;
        }
        
    }
}
