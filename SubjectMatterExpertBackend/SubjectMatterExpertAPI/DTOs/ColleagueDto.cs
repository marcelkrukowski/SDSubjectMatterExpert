using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.DTOs
{
    public class ColleagueDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int SessionId { get; set; }
    }
}