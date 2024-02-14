using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Data
{
    public class RequestRepository : IRequestRepository
    {
        private readonly DataContext _context;

        public RequestRepository(DataContext context)
        {
            _context = context;
        }

        //public async Task<Request> GetUserByIdAsync(int id)
        //{
        //    return await _context.Users
        //        .Include(ts => ts.TimeSlots)
        //        .Include(s => s.Sessions)
        //        .Include(p => p.Photo)
        //        .FirstOrDefaultAsync(u => u.Id == id);
        //}

        //public async Task<IEnumerable<User>> GetSMEsAsync()
        //{

        //    return await _context.Users
        //        .Where(u => u.IsSME == true)
        //        .Include(ts => ts.TimeSlots)
        //        .Include(s => s.Sessions)
        //        .Include(p => p.Photo)
        //        .ToListAsync();
        //}

        public async Task CreateRequestAsync(Request request)
        {
            await _context.Requests.AddAsync(request);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(ts => ts.TimeSlots)
                .Include(s => s.Sessions)
                .Include(p => p.Photo)
                .SingleOrDefaultAsync(x => x.Username == username);
        }

        public async Task<User> GetAgileCoachOfUserAsync(int userId)
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



        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}
