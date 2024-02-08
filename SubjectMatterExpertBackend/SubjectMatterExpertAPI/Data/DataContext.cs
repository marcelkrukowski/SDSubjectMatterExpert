﻿using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Extensions;
using SubjectMatterExpertAPI.Models;


namespace SubjectMatterExpertAPI.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<AgileCoach> AgileCoaches { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Colleague> Colleagues { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }
        public DbSet<Report> Reports { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableDetailedErrors(true);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

            modelBuilder.Entity<Request>()
                .HasOne(r => r.User)
                .WithOne(u => u.Request)
                .HasForeignKey<Request>(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(u => u.TimeSlots)
                .WithOne(ts => ts.User)
                .HasForeignKey(ts => ts.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TimeSlot>()
                .HasOne(ts => ts.User)
                .WithMany(u => u.TimeSlots)
                .HasForeignKey(ts => ts.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TimeSlot>()
                .HasOne(ts => ts.BookedUser)
                .WithMany()
                .HasForeignKey(ts => ts.BookedUserId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder)
        {

            base.ConfigureConventions(builder);
            builder.Properties<DateOnly>()
                   .HaveConversion<Extensions.DateOnlyConverter, DateOnlyComparer>()
                   .HaveColumnType("date");

            builder.Properties<TimeOnly>()
                    .HaveConversion<TimeOnlyConverter, TimeOnlyComparer>();

        }
    }
}
