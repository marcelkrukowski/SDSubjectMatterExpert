using AutoMapper;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Data;
using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Extensions;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UsersController(IUserRepository userRepository, IPhotoService photoService, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet("smes")]
        public async Task<IEnumerable<UserDto>> GetSMEs() 
        {
            var smes = await _userRepository.GetSMEsAsync();

            var smesToReturn = _mapper.Map<IEnumerable<UserDto>>(smes);

            return smesToReturn;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            var userToReturn = _mapper.Map<UserDto>(user);
            return userToReturn;
        }

      
        [HttpGet("{id}/agileCoach")]
        public async Task<ActionResult<UserDto>> GetAgileCoachOfUser(int id)
        {
            var agileCoach = await _userRepository.GetAgileCoachOfUserAsync(id);

            if (agileCoach == null)
            {
                return NotFound();
            }


            var agileCoachToReturn = _mapper.Map<UserDto>(agileCoach);
           
            return Ok(agileCoachToReturn);

        }


        [HttpPost("upload-photo")]
        public async Task<ActionResult<PhotoDto>> UploadPhoto(IFormFile photo)
        {
            
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            if (user == null)
            {
                return NotFound();
            }

            var result = await _photoService.UploadPhotoAsync(photo);

            var photoEntity = new Photo
            {
                Uri = result.Uri.ToString()
            };

            user.Photo = photoEntity;
            if (await _userRepository.SaveAllAsync()) return _mapper.Map<PhotoDto>(photoEntity);
            return BadRequest("Problem adding photo");
        }


    }

    
}
