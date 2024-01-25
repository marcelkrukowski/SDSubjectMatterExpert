namespace SubjectMatterExpertAPI.Models
{

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public int SMEId { get; set; }
        public SME SME { get; set; }
        public int AgileCoachId { get; set; }
        public AgileCoach AgileCoach { get; set; }
        

        
        
    
    }
}
