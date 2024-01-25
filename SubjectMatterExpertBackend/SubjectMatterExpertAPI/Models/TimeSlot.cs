using System.ComponentModel.DataAnnotations.Schema;

namespace SubjectMatterExpertAPI.Models
{
    [Table("TimeSlots")]
    public class TimeSlot
    {
        public int Id { get; set; }
        public DateOnly AvailableDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int SMEId { get; set; }
        public SME SME { get; set; }
        public int AgileCoachId { get; set;  }
        public AgileCoach AgileCoach { get; set; }
    }
}