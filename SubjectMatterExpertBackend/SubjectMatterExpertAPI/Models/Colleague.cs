using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace SubjectMatterExpertAPI.Models
{
    [Table("Colleagues")]
    public class Colleague
    {
        public string Id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public int SessionId { get; set; }
        public Session Session { get; set; }
    }
}