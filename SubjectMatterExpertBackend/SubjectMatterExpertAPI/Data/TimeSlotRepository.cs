using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.DTOs;
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

        public async Task<IEnumerable<TimeSlot>> GetAllTimeSlotsByUserIdAsync(int userId)
        {
            return await _context.TimeSlots
                .Where(ts => ts.UserId == userId)
                .ToListAsync();
        }

        public async Task<TimeSlot> GetTimeSlotByIdAsync(int id)
        {
            var timeSlot = await _context.TimeSlots
                .FindAsync(id);

            if (timeSlot == null)
                return null;

            return timeSlot;
        }

        public async Task AddTimeSlotAsync(TimeSlot timeSlot)
        {

           await _context.TimeSlots.AddAsync(timeSlot);
           await _context.SaveChangesAsync();
        }

        public async Task UpdateTimeSlotAsync(TimeSlot timeSlot)
        {
            _context.Entry(timeSlot).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTimeSlotAsync(int id)
        {
            var timeSlot = await _context.TimeSlots.FindAsync(id);
            if (timeSlot != null)
            {
                _context.TimeSlots.Remove(timeSlot);
                await _context.SaveChangesAsync();
            }
        }

        public async Task BookTimeSlotAsync(int userId, int timeSlotId)
        {
            var timeSlot = await _context.TimeSlots.FindAsync(timeSlotId);

            if (timeSlot != null && timeSlot.IsBooked != true)
            {
                timeSlot.IsBooked = true;
                timeSlot.BookedUserId = userId;

                await _context.SaveChangesAsync();
            }
        }

      public async Task<IEnumerable<TimeSlotResponseDto>> GetBookedTimeSlotsAsync(int userId)
{
    return await _context.TimeSlots
        .Where(ts => ts.BookedUserId == userId)
        .Select(ts => new TimeSlotResponseDto
        {
            Id = ts.Id,
            AvailableDate = ts.AvailableDate,
            StartTime = ts.StartTime,
            EndTime = ts.EndTime,
            IsBooked = ts.IsBooked,
            BookedUserId = ts.BookedUserId
        })
        .ToListAsync();
}

        public async Task UnbookTimeSlotAsync(int userId, int timeSlotId)
        {
            var timeSlot = await _context.TimeSlots.FindAsync(timeSlotId);

            if (timeSlot != null && timeSlot.IsBooked == true && timeSlot.BookedUserId == userId)
            {
                timeSlot.IsBooked = false;
                timeSlot.BookedUserId = null;

                await _context.SaveChangesAsync();
            }
        }




    }
}
