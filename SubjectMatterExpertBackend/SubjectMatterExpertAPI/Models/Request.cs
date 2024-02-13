namespace SubjectMatterExpertAPI.Models
{
    public class Request
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public AgileCoach AgileCoach { get; set; }
    }
}