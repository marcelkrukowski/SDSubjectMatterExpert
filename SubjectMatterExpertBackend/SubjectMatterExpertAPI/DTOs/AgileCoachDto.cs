using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.DTOs
{
    public class AgileCoachDto
    {
        public int Id { get; set; }
        public List<UserDto> ManagedUsers { get; set; }

        public List<RequestDto> Requests { get; set; }
    }
}