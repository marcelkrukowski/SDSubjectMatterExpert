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
        private readonly IAgileCoachRepository _agileCoachRepository;
        private readonly IMapper _mapper;

        public RequestController(IUserRepository userRepository, IRequestRepository requestRepository, IAgileCoachRepository agileCoachRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _requestRepository = requestRepository;
            _agileCoachRepository = agileCoachRepository;
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
            else if (user.IsSME == true)
            {
                return BadRequest("User is already an SME.");
            }

            else if (user.Request != null)
            {
                return BadRequest("User already send a request to become an SME");
            }
            else if (user.AgileCoachId == null)
            {
                return BadRequest("User can't send the request without AgileCoach");
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
            user.Location = requestInput.Location;
            if (await _userRepository.SaveAllAsync()) return Ok("Succes");
            return BadRequest("Problem creating request");
        }

        [HttpGet("user-request-details")]
        public async Task<IActionResult> GetUserRequestDetails()
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            if (user == null)
            {
                return NotFound();
            }

            var request = await _requestRepository.GetUserRequestDetailsAsync(user.Id);

            if (request == null)
            {
                return NotFound();
            }

            var requestToReturn = _mapper.Map<RequestDto>(request);
            return Ok(requestToReturn);
        }

        [HttpGet("pending-requests-for-sme")]
        public async Task<IActionResult> GetAllPendingRequestForSME()
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            var agileCoach = await _agileCoachRepository.GetAgileCoachByUserIdAsync(user.Id);

            if (agileCoach == null)
            {
                return NotFound("User is not an Agile Coach");
            }

            var managedUsers = await _agileCoachRepository.GetManagedUsersByAgileCoachIdAsync(agileCoach.Id);
            if (managedUsers == null)
            {
                return NotFound();
            }

            //var pendingRequests = await _agileCoachRepository.GetPendingRequestForUserAsync(managedUsers);
            //var managedUsersToReturn = _mapper.Map<List<UserDto>>(managedUsers);
            //var pendingRequestsToReturn = _mapper.Map<List<RequestDto>>(pendingRequests);
            //return Ok(pendingRequestsToReturn);
            var usersWithPendingRequests = await _requestRepository.GetPendingRequestForUserAsync(managedUsers);

            return Ok(usersWithPendingRequests);

        }

        [HttpPost("accept-request/{requestId}")]
        public async Task<IActionResult> AcceptRequest(int requestId)
        {

            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            if (user == null)
            {
                return NotFound();
            }

            var request = await _requestRepository.GetRequestByIdAsync(requestId);

            var agileCoachOfUser = _userRepository.GetAgileCoachOfUserAsync(request.UserId);
            var agileCoach = _agileCoachRepository.GetAgileCoachByUserIdAsync(user.Id);

            if (agileCoachOfUser.Id != agileCoach.Id)
            {
                return BadRequest("User is not managed by this Agile Coach.");
            }


            await _requestRepository.AcceptRequestAsync(requestId);

            return Ok("Request accepted successfully");
        }

        [HttpPost("decline-request/{requestId}")]
        public async Task<IActionResult> DeclineRequest(int requestId)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            if (user == null)
            {
                return NotFound();
            }

            var request = await _requestRepository.GetRequestByIdAsync(requestId);

            var agileCoachOfUser = _userRepository.GetAgileCoachOfUserAsync(request.UserId);
            var agileCoach = _agileCoachRepository.GetAgileCoachByUserIdAsync(user.Id);

            if (agileCoachOfUser.Id != agileCoach.Id)
            {
                return BadRequest("User is not managed by this Agile Coach.");
            }



            await _requestRepository.DeclineRequestAsync(requestId);

            return Ok("Request declined successfully");
        }





    }
}
