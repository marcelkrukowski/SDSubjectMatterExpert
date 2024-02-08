using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Interfaces
{
    public interface ITimeSlotRepository
    {
        Task<IEnumerable<TimeSlot>> GetAllTimeSlotsByUserIdAsync(int userId);
        Task<TimeSlot> GetTimeSlotByIdAsync(int id);
        Task AddTimeSlotAsync(TimeSlot timeSlot);
        Task UpdateTimeSlotAsync(TimeSlot timeSlot);
        Task DeleteTimeSlotAsync(int id);
        Task BookTimeSlotAsync(int userId, int timeSlotId);
        Task<IEnumerable<TimeSlotResponseDto>> GetBookedTimeSlotsAsync(int userId);
        Task UnbookTimeSlotAsync(int userId, int timeSlotId);

    }
}
