using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.DTOs
{
    public class SessionDto
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string SubTopic { get; set; }
        public int UserId { get; set; }
        public List<ColleagueDto> Colleagues { get; set; }
    }
}