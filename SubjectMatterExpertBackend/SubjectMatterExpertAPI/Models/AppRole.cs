using Microsoft.AspNetCore.Identity;

namespace SubjectMatterExpertAPI.Models
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
