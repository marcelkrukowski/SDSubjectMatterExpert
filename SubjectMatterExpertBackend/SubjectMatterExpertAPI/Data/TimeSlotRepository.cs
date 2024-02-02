using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Data
{
    public class TimeSlotRepository : ITimeSlotRepository
        
    {
        private readonly DataContext _context;

        public TimeSlotRepository(DataContext context)
        {
            _context = context;
        }

   

        public async Task<TimeSlot> GetTimeSlotAsync(int timeSlotId)
        {
            return await _context.TimeSlots
                        .FirstOrDefaultAsync(ts => ts.Id == timeSlotId);
        }
    }
}
