using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public bool IsSME { get; set; }
        public bool InLD { get; set; }
        public string? Languages { get; set; }
        public string? Location { get; set; }
        public string? AreaOfExpertise { get; set; }
        public List<TimeSlotDto> TimeSlots { get; set; }
        public List<SessionDto> Sessions { get; set; }
        public List<ReportDto>? Reports { get; set; }
        public RequestDto Request { get; set; }
        public int? AgileCoachId { get; set; }
    }
}
