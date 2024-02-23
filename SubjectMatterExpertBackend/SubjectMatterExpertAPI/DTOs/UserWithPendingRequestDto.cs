namespace SubjectMatterExpertAPI.DTOs
{
    public class UserWithPendingRequestDto
    {
        public int RequestId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }  
        public string Location { get; set; }
        public List<LanguageDto> Languages { get; set; }
        public List<AreaOfExpertiseDto> AreasOfExpertise { get; set; }
    }
}
