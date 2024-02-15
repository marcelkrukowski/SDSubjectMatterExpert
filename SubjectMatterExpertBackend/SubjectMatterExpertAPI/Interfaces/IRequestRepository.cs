using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Interfaces
{
    public interface IRequestRepository
    {
        Task CreateRequestAsync(Request request);
        Task<Request> GetUserRequestDetailsAsync(int id);
    }
}
