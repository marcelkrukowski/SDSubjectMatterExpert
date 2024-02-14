using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Extensions;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Controllers
{
    [Authorize]
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
        public async Task<ActionResult<RequestDto>> CreateRequest([FromBody] RequestInputDto requestInput)
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

            var areaOfExpertiseEntities = new List<AreaOfExpertise>();

            foreach (string areaOfExpertise in requestInput.AreasOfExpertise)
            {
                var areaOfExpertiseEntity = new AreaOfExpertise
                {
                    ExpertiseArea = areaOfExpertise,
                    User = user
                };
                areaOfExpertiseEntities.Add(areaOfExpertiseEntity);
            }

            var languageEntities = new List<Language>();

            foreach (string language in requestInput.Languages)
            {
                var languageEntity = new Language
                {
                    LanguageName = language,
                    User = user
                };
                languageEntities.Add(languageEntity);
            }








            var requestEntity = new Request
            {
                Languages = languageEntities,
                Location = requestInput.Location,
                AreasOfExpertise = areaOfExpertiseEntities,
                User = user
            };
          

            user.Request = requestEntity;
            if (await _userRepository.SaveAllAsync()) return Ok("Succes");
            return BadRequest("Problem creating request");
        }
       
    }
}
