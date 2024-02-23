using Microsoft.AspNetCore.Identity;

namespace SubjectMatterExpertAPI.Models
{

    public class User : IdentityUser<int>

    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public List<Language>? Languages { get; set; } = new List<Language>();
        public string? Location { get; set; }
        public List<AreaOfExpertise>? AreasOfExpertise { get; set; } = new List<AreaOfExpertise>();
        public List<TimeSlot>? TimeSlots { get; set; } = new List<TimeSlot>();
        public List<Session>? Sessions { get; set; } = new List<Session>();
        public Request? Request { get; set; }
        public int? AgileCoachId { get; set; }
        public AgileCoach? AgileCoach { get; set; }
        public Photo Photo { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
