namespace SubjectMatterExpertAPI.DTOs
{
    public class SessionInputDto
    {
        public string Topic { get; set; }
        public string SubTopic { get; set; }
        public string Description { get; set; }
        public List<ColleagueDto>? Colleagues { get; set; }
    }
}
