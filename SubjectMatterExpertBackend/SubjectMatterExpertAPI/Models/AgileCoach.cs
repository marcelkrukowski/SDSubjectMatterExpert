using System.ComponentModel.DataAnnotations.Schema;

namespace SubjectMatterExpertAPI.Models
{
    [Table("AgileCoaches")]
    public class AgileCoach
    {
        public int Id { get; set; }
        public string Languages { get; set; }
        public string Location { get; set; }

        public string AreaOfExpertise { get; set; }
        public List<TimeSlot> TimeSlots { get; set; } = new List<TimeSlot>();
      
        public List<Session> Sessions { get; set; } = new List<Session>();
        public List<User> ManagedUsers { get; set; } = new List<User>();
        public List<SME> ManagedSMEs { get; set; } = new List<SME>();
        public int UserId { get; set; }
        public User User { get; set; }



    }
}
