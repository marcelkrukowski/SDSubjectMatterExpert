using Microsoft.AspNetCore.Mvc;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Controllers
{
    public class PhotoController : BaseApiController
    {
        private readonly IPhotoService _photoService;

        public PhotoController(IPhotoService photoService)
        {
            _photoService = photoService; 
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadPhoto(IFormFile photo)
        {
            await _photoService.UploadPhotoAsync(photo);
            return Ok("success");
        }
 
    }
}
