
using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Data
{
    public class SessionRepository : ISessionRepository
    {
        private readonly DataContext _context;

        public SessionRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddSessionAsync(Session session)
        {
            await _context.Sessions.AddAsync(session);
        }

        public async Task<Session> GetSessionByIdAsync(int sessionId)
        {
            return await _context.Sessions.FindAsync(sessionId);
        }

        public async Task<List<Session>> GetUserAllSessionsDetailsAsync(int id)
        {

            return await _context.Sessions
                .Where(s => s.UserId == id)
                .Include(c => c.Colleagues)
                .ToListAsync();
       
        }

        public async Task<List<MostContactedSMEDto>> GetMostContactedSMEsAsync()
        {
            return await _context.Users
                .Include(u => u.Sessions)
                .Where(u => u.Sessions.Count > 0)
                .OrderByDescending(u => u.Sessions.Count)
                .Take(5)
                .Select(u => new MostContactedSMEDto
                {
                    UserName = u.UserName,
                    Count = u.Sessions.Count
                })
                .ToListAsync();
        }

        public async Task<List<MostContactedAreaDto>> GetMostContactedAreasAsync()
        {
            return await _context.Sessions
                .GroupBy(s => s.Topic.ToLower())
                .Select(g => new MostContactedAreaDto
                {
                    Topic = g.Key,
                    Count = g.Count()
                })
                .OrderByDescending(dto => dto.Count)
                .ToListAsync();
        }


    }
}
