using System.ComponentModel.DataAnnotations.Schema;

namespace SubjectMatterExpertAPI.Models
{
  
    public class AgileCoach
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public List<User>? ManagedUsers { get; set; } = new List<User>();

        public List<Request>? Requests { get; set; } = new List<Request>();
  




    }
}
