using System.ComponentModel.DataAnnotations.Schema;

namespace SubjectMatterExpertAPI.Models
{

    public class TimeSlot
    {
        public int Id { get; set; }
        public DateOnly AvailableDate { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public bool? IsBooked { get; set; }
        public string? BookedBy { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

    }
}