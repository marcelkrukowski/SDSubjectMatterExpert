using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Interfaces
{
    public interface ITimeSlotRepository
    {
        Task<TimeSlot> GetTimeSlotAsync(int timeSlotId);

    }
}
