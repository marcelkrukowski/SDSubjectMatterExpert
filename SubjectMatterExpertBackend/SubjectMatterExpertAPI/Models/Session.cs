using System.ComponentModel.DataAnnotations.Schema;

namespace SubjectMatterExpertAPI.Models
{
    [Table("Sessions")]
    public class Session
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string SubTopic { get; set; }
        public User User { get; set; }
        public List<Colleague> Colleagues { get; set; } = new List<Colleague>();

    }
}