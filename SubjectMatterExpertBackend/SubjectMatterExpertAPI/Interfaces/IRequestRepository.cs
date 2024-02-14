using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Interfaces
{
    public interface IRequestRepository
    {
        Task CreateRequestAsync(Request request);
    }
}
