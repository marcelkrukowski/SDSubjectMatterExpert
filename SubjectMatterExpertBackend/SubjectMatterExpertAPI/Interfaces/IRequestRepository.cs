using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Interfaces
{
    public interface IRequestRepository
    {
        Task<Request> GetRequestByIdAsync(int requestId);
        Task CreateRequestAsync(Request request);
        Task<Request> GetUserRequestDetailsAsync(int id);
        Task<List<UserWithPendingRequestDto>> GetPendingRequestForUserAsync(List<User> users);
        Task AcceptRequestAsync(int requestId);
        Task DeclineRequestAsync(int requestId);

      
    }
}
