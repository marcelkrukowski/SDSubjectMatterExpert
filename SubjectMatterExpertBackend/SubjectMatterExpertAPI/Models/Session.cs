using System.ComponentModel.DataAnnotations.Schema;

namespace SubjectMatterExpertAPI.Models
{
    [Table("Sessions")]
    public class Session
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string SubTopic { get; set; }
        public int SMEId { get; set; }
        public SME SME { get; set; }
        public int AgileCoachId { get; set; }
        public AgileCoach AgileCoach { get; set; }
        public List<Colleague> Colleagues { get; set; } = new List<Colleague>();
        
    }
}