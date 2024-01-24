using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Extensions;
using SubjectMatterExpertAPI.Models;
using System.ComponentModel;
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
          


        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder)
        {

            base.ConfigureConventions(builder);
            builder.Properties<DateOnly>()
                   .HaveConversion<Extensions.DateOnlyConverter, DateOnlyComparer>()
                   .HaveColumnType("date");
        }
    }
}
