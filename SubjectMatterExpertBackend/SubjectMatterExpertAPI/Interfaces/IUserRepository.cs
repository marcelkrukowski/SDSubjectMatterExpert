using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetSMEsAsync();
    }
}
