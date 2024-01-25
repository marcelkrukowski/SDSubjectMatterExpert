using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace SubjectMatterExpertAPI.Models
{

    public class Colleague
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int SessionId { get; set; }
        public Session Session { get; set; }
    }
}