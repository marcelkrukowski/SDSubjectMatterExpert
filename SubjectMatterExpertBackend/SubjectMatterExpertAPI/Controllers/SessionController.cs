using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SubjectMatterExpertAPI.Data;
using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Extensions;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Controllers
{
    [Authorize]
    public class SessionController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly ISessionRepository _sessionRepository;
        private readonly IMapper _mapper;

        public SessionController(UserManager<User> userManager, IUserRepository userRepository, ISessionRepository sessionRepository, IMapper mapper)
        {
            _userManager = userManager;
            _userRepository = userRepository;
            _sessionRepository = sessionRepository;
            _mapper = mapper;
            _mapper = mapper;
        }
        [HttpPost("create-session")]
        public async Task<ActionResult<SessionDto>> CreateSession([FromBody] SessionInputDto sessionInputDto)
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
            var isUserInSmeRole = await _userManager.IsInRoleAsync(user, "SME");
            if (!isUserInSmeRole)
            {
                return BadRequest("Only SME can create session.");
            }

            var sessionEntity = new Session
            {
                Topic = sessionInputDto.Topic.ToUpper(),
                SubTopic = sessionInputDto.SubTopic,
                Description = sessionInputDto.Description,
                UserId = user.Id,  
                Colleagues = sessionInputDto.Colleagues.Select(colleagueDto => new Colleague
                {
                    FirstName = colleagueDto.FirstName,
                    LastName = colleagueDto.LastName
                }).ToList()
            };

            await _sessionRepository.AddSessionAsync(sessionEntity);

            var sessionEntityToReturn = _mapper.Map<SessionDto>(sessionEntity); 

            if (await _userRepository.SaveAllAsync())
            {
                

                return Ok(new {message="success"});
            }

            return BadRequest("Problem creating session");

        }

        [HttpPut("update-session")]
        public async Task<ActionResult<SessionDto>> EditSession(int sessionId, [FromBody] SessionInputDto updatedSessionDto)
        {
            var session = await _sessionRepository.GetSessionByIdAsync(sessionId);

            if (session == null)
            {
                return NotFound();
            }
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            var isUserInSmeRole = await _userManager.IsInRoleAsync(user, "SME");
            if (!isUserInSmeRole)
            {
                return BadRequest("AHAHAHAHHAHAHA TEST");
            }

            if  (user.Sessions.All(s => s.Id != session.Id))
            {
                return BadRequest("Test 2");
            }

            session.Topic = updatedSessionDto.Topic;
            session.SubTopic = updatedSessionDto.SubTopic;
            session.Description = updatedSessionDto.Description;

            foreach (var colleagueDto in updatedSessionDto.Colleagues)
            {
                var existingColleague = session.Colleagues.FirstOrDefault(c => c.SessionId == session.Id);

                if (existingColleague != null)
                {
                    existingColleague.FirstName = colleagueDto.FirstName;
                    existingColleague.LastName = colleagueDto.LastName;
                }
                else
                { 
                    var newColleague = new Colleague
                    {
                        FirstName = colleagueDto.FirstName,
                        LastName = colleagueDto.LastName
                    };

                    session.Colleagues.Add(newColleague);
                }
            }

            if (await _userRepository.SaveAllAsync())
            {
                return Ok(new { message = "success" });
            }

            return BadRequest("Problem editing session");
        }


        [HttpGet("user-sessions-details")]
        public async Task<IActionResult> GetUserAllSessionsDetails()
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            if (user == null)
            {
                return NotFound();
            }

            var sessions = await _sessionRepository.GetUserAllSessionsDetailsAsync(user.Id);

            if (sessions == null)
            {
                return NotFound();
            }

            var sessionsToReturn = _mapper.Map<List<SessionDto>>(sessions);
            return Ok(sessionsToReturn);
        }

        [HttpGet("most-contacted-smes")]
        public async Task<ActionResult<List<MostContactedSMEDto>>> GetMostContactedSMEs()
        {

            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            var isUserInLDTeam = await _userManager.IsInRoleAsync(user, "L&D");
            if (!isUserInLDTeam)
            {
                return BadRequest();
            }
            var topUsers = await _sessionRepository.GetMostContactedSMEsAsync();

            if (topUsers == null || !topUsers.Any())
            {
                return NotFound("No users found.");
            }

            return Ok(topUsers);
        }

        [HttpGet("most-contacted-areas")]
        public async Task<ActionResult<List<MostContactedAreaDto>>> GetMostContactedAreas()
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            var isUserInLDTeam = await _userManager.IsInRoleAsync(user, "L&D");
            if (!isUserInLDTeam)
            {
                return BadRequest();
            }
            var mostContactedAreas = await _sessionRepository.GetMostContactedAreasAsync();

            if (!mostContactedAreas.Any())
            {
                return NotFound("No most contacted areas found.");
            }

            return Ok(mostContactedAreas);
        }
    }

    
}
