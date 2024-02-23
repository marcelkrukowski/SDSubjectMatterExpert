using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Data
{
    public class RequestRepository : IRequestRepository
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public RequestRepository(DataContext context, UserManager<User> userManager, IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task CreateRequestAsync(Request request)
        {
            await _context.Requests.AddAsync(request);
        }

        public async Task<Request> GetRequestByIdAsync(int requestId)
        {
            return await _context.Requests
                .Include(aoe => aoe.AreasOfExpertise)
                .Include(l => l.Languages)
                .SingleOrDefaultAsync(x => x.Id == requestId);
        }

        public async Task<Request> GetUserRequestDetailsAsync(int id)
        {
            return await _context.Requests
                .Include(aoe => aoe.AreasOfExpertise)
                .Include(l => l.Languages)
                .SingleOrDefaultAsync(x => x.UserId == id);
        }

        public async Task<List<UserWithPendingRequestDto>> GetPendingRequestForUserAsync(List<User> users)
        {
            var userIds = users.Select(u => u.Id).ToList();

            var result = await _context.Users
                            .Include(user => user.Request)
                            .Include(user => user.AreasOfExpertise)
                            .Include(user => user.Languages)
                            .Where(user => userIds.Contains(user.Id) && user.Request != null)
                            .ToListAsync();

            return result.Select(user => new UserWithPendingRequestDto
            {
                RequestId = user.Request.Id,
                UserName = user.UserName,
                Email = user.Email,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Location = user.Location,
                Languages = _mapper.Map<List<LanguageDto>>(user.Languages),
                AreasOfExpertise = _mapper.Map<List<AreaOfExpertiseDto>>(user.AreasOfExpertise),
            }).ToList();
        }

        public async Task AcceptRequestAsync(int requestId)
        {
            var request = await _context.Requests.FindAsync(requestId);

            if (request != null)
            {
                var areasOfExpertise = await _context.AreasOfExpertise
                                                .Where(aoe => aoe.RequestId == requestId)
                                                .ToListAsync();

                var languages = await _context.Languages
                                                .Where(lang => lang.RequestId == requestId)
                                                .ToListAsync();

                foreach (var areaOfExpertise in areasOfExpertise)
                {
                    areaOfExpertise.RequestId = null; 
                }

                foreach (var language in languages)
                {
                    language.RequestId = null; 
                }

                var user = await _context.Users.FindAsync(request.UserId);
                await _userManager.AddToRoleAsync(user, "SME");

                _context.Requests.Remove(request);

                await _context.SaveChangesAsync();
            }
        }

        public async Task DeclineRequestAsync(int requestId)
        {
            var request = await _context.Requests.FindAsync(requestId);

            if (request != null)
            {
                var areasOfExpertise = await _context.AreasOfExpertise
                                                .Where(aoe => aoe.RequestId == requestId)
                                                .ToListAsync();

                var languages = await _context.Languages
                                                .Where(lang => lang.RequestId == requestId)
                                                .ToListAsync();

                foreach (var areaOfExpertise in areasOfExpertise)
                {
                    areaOfExpertise.RequestId = null;
                }

                foreach (var language in languages)
                {
                    language.RequestId = null;
                }

                var user = await _context.Users.FindAsync(request.UserId);
                _context.AreasOfExpertise.RemoveRange(user.AreasOfExpertise);
                _context.Languages.RemoveRange(user.Languages);
                user.Location = null;
                await _context.SaveChangesAsync();

                _context.Requests.Remove(request);

                await _context.SaveChangesAsync();
            }
        }










    }
}
