using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetSMEsAsync();
        Task<User> GetUserByIdAsync(int userId);
        Task<AgileCoach> GetAgileCoachOfUserAsync(int userId);
        Task<User> GetUserByUsernameAsync(string username);
        Task<User> GetUserAgileCoachOfUserAsync(int userId);
        Task<bool> SaveAllAsync();
    }
}
