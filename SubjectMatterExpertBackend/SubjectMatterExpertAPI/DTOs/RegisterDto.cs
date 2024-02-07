using System.ComponentModel.DataAnnotations;

namespace SubjectMatterExpertAPI.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }   
        [Required]
        public string AreaOfExpertise { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Languages { get; set; }
        [Required]
        public string Lastname { get; set; }
        [Required]
        public string Location { get; set; }
        public string Role { get; set; }


    }
}
 