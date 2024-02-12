using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Interfaces
{
    public interface IPhotoService
    {
        Task<BlobClient> UploadPhotoAsync(IFormFile photoFile);
        Task<bool> DeletePhotoAsync(int photoId, string blobUri, string Filename);
    }
}