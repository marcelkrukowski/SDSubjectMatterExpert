using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;
using System.Collections;

namespace SubjectMatterExpertAPI.Data
{
    public class AgileCoachRepository : IAgileCoachRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AgileCoachRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<AgileCoach> GetAgileCoachByUserIdAsync(int id)
        {
            return await _context.AgileCoaches
                .Include(ac => ac.ManagedUsers)
                .FirstOrDefaultAsync(ag => ag.UserId == id);
        }

        public async Task<List<User>> GetManagedUsersByAgileCoachIdAsync(int id)
        {
            return await _context.AgileCoaches
                .Where(ac => ac.Id == id)
                .SelectMany(ac => ac.ManagedUsers)
                .ToListAsync();
        }


        //public async Task<List<Request>> GetPendingRequestForAgileCoachById(int id)
        //{
        //    return await _context.
        //}

        //public async Task<List<Request>> GetPendingRequestForUserAsync(List<User> users)
        //{
        //    var userIds = users.Select(u => u.Id).ToList();

        //    return await _context.Requests
        //        .Include(rt => rt.Languages)
        //        .Include(rt => rt.AreasOfExpertise)
        //        .Where(rt => userIds.Contains(rt.UserId))
        //        .ToListAsync();
        //}

        public async Task<List<UserWithPendingRequestDto>> GetPendingRequestForUserAsync(List<User> users)
        {
            var userIds = users.Select(u => u.Id).ToList();

            var result = await _context.Users
                            .Include(user => user.Request)
                            .Include(user => user.AreasOfExpertise)
                            .Include(user => user.Languages)
                            .Where(user => userIds.Contains(user.Id))
                            .ToListAsync();

            return result.Select(user => new UserWithPendingRequestDto
            {
                RequestId = user.Request.Id,
                Username = user.Username,
                Email = user.Email,
                Fristname = user.Firstname,
                Lastname = user.Lastname,
                Location = user.Location,
                Languages = _mapper.Map<List<LanguageDto>>(user.Languages),
                AreasOfExpertise = _mapper.Map<List<AreaOfExpertiseDto>>(user.AreasOfExpertise),
            }).ToList();
        }


        

}
}
