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
        public DbSet<SME> SMEs { get; set; }
    

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(u => u.SME)
                .WithOne(s => s.User)
                .HasForeignKey<SME>(s => s.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AgileCoach>()
                .HasOne(a => a.User)
                .WithOne()
                .HasForeignKey<AgileCoach>(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<User>()
                .HasOne(u => u.AgileCoach)
                .WithMany(ac => ac.ManagedUsers)
                .HasForeignKey(u => u.AgileCoachId)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<TimeSlot>()
                .HasOne(ts => ts.AgileCoach)
                .WithMany(ac => ac.TimeSlots)
                .HasForeignKey(ts => ts.AgileCoachId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TimeSlot>()
                 .HasOne(ts => ts.SME)
                 .WithMany(sme => sme.TimeSlots)
                 .HasForeignKey(ts => ts.SMEId)
                 .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Session>()
                .HasOne(ts => ts.AgileCoach)
                .WithMany(ac => ac.Sessions)
                .HasForeignKey(ts => ts.AgileCoachId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Session>()
                 .HasOne(ts => ts.SME)
                 .WithMany(sme => sme.Sessions)
                 .HasForeignKey(ts => ts.SMEId)
                 .OnDelete(DeleteBehavior.Restrict);

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
