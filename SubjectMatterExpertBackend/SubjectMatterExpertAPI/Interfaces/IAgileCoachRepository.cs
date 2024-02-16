using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Interfaces
{
    public interface IAgileCoachRepository
    {
        Task<AgileCoach> GetAgileCoachByUserIdAsync(int id);
        Task<List<User>> GetManagedUsersByAgileCoachIdAsync(int id);
    }
}
