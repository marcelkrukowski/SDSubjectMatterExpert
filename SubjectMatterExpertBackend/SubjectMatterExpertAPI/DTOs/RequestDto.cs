using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.DTOs
{
    public class RequestDto
    {
        public List<LanguageDto> Languages { get; set; }
        public string Location { get; set; }
        public List<AreaOfExpertiseDto> AreasOfExpertise { get; set; }

    }
}