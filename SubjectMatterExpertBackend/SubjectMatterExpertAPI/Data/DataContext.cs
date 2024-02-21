using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Extensions;
using SubjectMatterExpertAPI.Models;


namespace SubjectMatterExpertAPI.Data
{
    public class DataContext : IdentityDbContext<User, AppRole, int, 
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, 
        IdentityUserToken<int>>
    {

        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<AgileCoach> AgileCoaches { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Colleague> Colleagues { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<AreaOfExpertise> AreasOfExpertise { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableDetailedErrors(true);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            modelBuilder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

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

            modelBuilder.Entity<Request>()
                .HasMany(r => r.AreasOfExpertise)
                .WithOne(aoe => aoe.Request)
                .HasForeignKey(aoe => aoe.RequestId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Request>()
                .HasMany(r => r.Languages)
                .WithOne(aoe => aoe.Request)
                .HasForeignKey(aoe => aoe.RequestId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AreaOfExpertise>()
                .HasOne(aoe => aoe.Request)
                .WithMany(request => request.AreasOfExpertise)
                .HasForeignKey(aoe => aoe.RequestId)
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
