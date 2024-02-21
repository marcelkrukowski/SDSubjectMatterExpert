using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

     

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users
                .Include(ts => ts.TimeSlots)
                .Include(s => s.Sessions)
                .Include(p => p.Photo)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<IEnumerable<User>> GetSMEsAsync()
        {

            var smeRoleId = await _context.Roles
                                  .Where(r => r.Name == "SME") 
                                  .Select(r => r.Id)
                                  .FirstOrDefaultAsync();

            if (smeRoleId == null)
            {
               
                return Enumerable.Empty<User>();
            }

            return await _context.Users
                .Where(u => u.UserRoles.Any(ur => ur.RoleId == smeRoleId))
                .Include(ts => ts.TimeSlots)
                .Include(rt => rt.Request)
                .Include(s => s.Sessions)
                .Include(p => p.Photo)
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .ToListAsync();
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(ts => ts.TimeSlots)
                .Include(s => s.Sessions)
                .Include(p => p.Photo)
                .Include(u => u.UserRoles)  
                    .ThenInclude(ur => ur.Role)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<User> GetUserAgileCoachOfUserAsync(int userId)
        {
            var agileCoachId = await _context.Users
                .Where(u => u.Id == userId)
                .Select(u => u.AgileCoachId)
                .FirstOrDefaultAsync();

            if (agileCoachId == null)
            {
                return null;
            }

            var agileCoachUserId = await _context.AgileCoaches
                .Where(u => u.Id == agileCoachId)
                .Select(u => u.UserId)
                .FirstOrDefaultAsync();

            var agileCoachUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == agileCoachUserId);

            return agileCoachUser;
        }

        public async Task<AgileCoach> GetAgileCoachOfUserAsync(int userId)
        {
            var agileCoachId = await _context.Users
                .Where(u => u.Id == userId)
                .Select(u => u.AgileCoachId)
                .FirstOrDefaultAsync();

            var agileCoach = await _context.AgileCoaches
               .Where(u => u.Id == agileCoachId)
               .FirstOrDefaultAsync();

            return agileCoach;
        }

        

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }



    }
}
