using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public List<LanguageDto>? Languages { get; set; }
        public string? Location { get; set; }
        public List<AreaOfExpertiseDto>? AreaOfExpertise { get; set; }
        public List<TimeSlotRequestDto>? TimeSlots { get; set; }
        public List<SessionDto>? Sessions { get; set; }
        public List<ReportDto>? Reports { get; set; }
        public RequestDto Request { get; set; }
        public PhotoDto Photo { get; set; } 
        public int? AgileCoachId { get; set; }
        public ICollection<UserRoleDto> UserRoles { get; set; }

    }
}
