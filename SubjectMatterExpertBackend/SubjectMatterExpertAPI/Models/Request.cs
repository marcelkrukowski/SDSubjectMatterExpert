namespace SubjectMatterExpertAPI.Models
{
    public class Request
    {
        public int Id { get; set; }
        public List<AreaOfExpertise> AreasOfExpertise { get; set; } = new List<AreaOfExpertise>();
        public List<Language> Languages { get; set; } = new List<Language>();
        public string Location { get; set; } 
        public int UserId { get; set; }
        public User User { get; set; }
        public AgileCoach AgileCoach { get; set; }
    }
}