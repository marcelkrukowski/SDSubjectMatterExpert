using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Extensions;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Controllers
{
    public class RequestController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IRequestRepository _requestRepository;
        private readonly IMapper _mapper;

        public RequestController(IUserRepository userRepository, IRequestRepository requestRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _requestRepository = requestRepository;
            _mapper = mapper;
        }


        [HttpPost("create-request")]
        public async Task<ActionResult<RequestDto>> CreateRequest([FromBody] RequestDto requestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            if (user == null)
            {
                return NotFound();
            }

            if (user.Request != null)
            {
                return BadRequest("User already send a request to become an SME");
            }

            var requestEntity = _mapper.Map<Request>(requestDto);
            requestEntity.AgileCoach = user.AgileCoach;

            user.Request = requestEntity;
            if (await _userRepository.SaveAllAsync()) return _mapper.Map<RequestDto>(requestDto);
            return BadRequest("Problem creating request");
        }
       
    }
}
