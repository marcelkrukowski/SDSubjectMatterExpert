using Microsoft.AspNetCore.Identity;

namespace SubjectMatterExpertAPI.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        public User User { get; set; }
        public AppRole Role { get; set; }
    }
}
