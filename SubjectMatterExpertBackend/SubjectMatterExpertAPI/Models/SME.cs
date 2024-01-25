using System.ComponentModel.DataAnnotations.Schema;

namespace SubjectMatterExpertAPI.Models
{
    [Table("SMEs")]
    public class SME
    {
        public int Id { get; set; }
        public string Languages { get; set; }
        public string Location { get; set; }
    
        public string AreaOfExpertise { get; set; }
        public List<TimeSlot> TimeSlots { get; set; } = new List<TimeSlot>();
        public List<Session> Sessions { get; set; } = new List<Session>();

        public int UserId { get; set; }
        public User User { get; set; }
        public int AgileCoachId { get; set; }
        public AgileCoach AgileCoach { get; set; }

    }
}
