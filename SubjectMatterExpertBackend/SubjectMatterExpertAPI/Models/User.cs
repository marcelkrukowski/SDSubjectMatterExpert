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
        public string Languages { get; set; }
        public string Location { get; set; }
        public string Email { get; set; }
        public string AreaOfExpertise { get; set; }
        public List<TimeSlot> TimeSlots { get; set; } = new List<TimeSlot>();
        public List<Session> Sessions { get; set; } = new List<Session>();
        
        
    
    }
}
