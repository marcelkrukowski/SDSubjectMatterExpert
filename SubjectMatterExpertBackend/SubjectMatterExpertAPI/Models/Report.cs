namespace SubjectMatterExpertAPI.Models
{
    public class Report
    {
        public int Id { get; set; }
        public string ContactedArea { get; set; }
        public User User { get; set; }
    }
}
