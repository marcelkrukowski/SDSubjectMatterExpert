using System.ComponentModel.DataAnnotations.Schema;

namespace SubjectMatterExpertAPI.Models
{

    public class TimeSlot
    {
        public int Id { get; set; }
        public DateOnly AvailableDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

    }
}