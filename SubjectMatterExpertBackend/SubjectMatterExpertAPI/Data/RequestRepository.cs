using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Data
{
    public class RequestRepository : IRequestRepository
    {
        private readonly DataContext _context;

        public RequestRepository(DataContext context)
        {
            _context = context;
        }

        public async Task CreateRequestAsync(Request request)
        {
            await _context.Requests.AddAsync(request);
        }

        public async Task<Request> GetUserRequestDetailsAsync(int id)
        {
            return await _context.Requests
                .Include(aoe => aoe.AreasOfExpertise)
                .Include(l => l.Languages)
                .SingleOrDefaultAsync(x => x.UserId == id);
        }



      

      




    }
}
