using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Models;
using System.Text.RegularExpressions;

namespace SubjectMatterExpertAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<User> Users { get; set; }
    

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Session>()
                .HasOne(s => s.User)
                .WithMany(u => u.Sessions)
                .HasForeignKey(s => s.Id)
                .OnDelete(DeleteBehavior.Restrict);
          


        }
    }
}
