using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<User> Users { get; set; }
    }
}
