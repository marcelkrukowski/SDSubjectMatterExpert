using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
