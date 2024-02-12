namespace SubjectMatterExpertAPI.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Uri { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
