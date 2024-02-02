using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetSMEsAsync();
        Task<User> GetUserByIdAsync(int userId);
        Task<User> GetAgileCoachOfUserAsync(int userId);
    }
}
