using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.DTOs
{
    public class TimeSlotDto
    {
        public int Id { get; set; }
        public DateOnly AvailableDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsBooked { get; set; }
        public string BookedBy { get; set; }
        public int UserId { get; set; }

    }
}