namespace SubjectMatterExpertAPI.Models
{
    public class AreaOfExpertise
    {
        public int Id { get; set; }
        public string ExpertiseArea { get; set; }
        public User User { get; set; }
        public int? RequestId { get; set; }
        public Request? Request { get; set; }

    }
}