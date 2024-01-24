using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace SubjectMatterExpertAPI.Models
{
    [Table("Colleagues")]

    public class Colleague
    {
        public int Id { get; set; }
        public Session Session { get; set; }
        public User User { get; set; }
    }
}