using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Data;
using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
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


    }

    
}
