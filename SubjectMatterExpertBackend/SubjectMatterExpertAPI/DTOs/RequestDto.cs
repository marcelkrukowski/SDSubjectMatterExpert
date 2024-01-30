using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.DTOs
{
    public class RequestDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int AgileCoachId { get; set; }
   
    }
}