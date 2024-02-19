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

       


        

}
}
