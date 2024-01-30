using Microsoft.EntityFrameworkCore;
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
        public async Task<IEnumerable<User>> GetSMEsAsync()
        {

            return await _context.Users
                .Where(u => u.IsSME == true)
                .Include(ts => ts.TimeSlots)
                .Include(s => s.Sessions)
                .ToListAsync();
        }
    }
}
