using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Interfaces
{
    public interface ISessionRepository
    {
        Task AddSessionAsync(Session session);
        Task<Session> GetSessionByIdAsync(int sessionId);
        Task<List<Session>> GetUserAllSessionsDetailsAsync(int id);
        Task<List<MostContactedSMEDto>> GetMostContactedSMEsAsync();
        Task<List<MostContactedAreaDto>> GetMostContactedAreasAsync();
    }
}
