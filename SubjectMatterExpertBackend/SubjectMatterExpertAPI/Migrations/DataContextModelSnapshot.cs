﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SubjectMatterExpertAPI.Data;

#nullable disable

namespace SubjectMatterExpertAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.AgileCoach", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.ToTable("AgileCoaches", (string)null);
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Colleague", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SessionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SessionId");

                    b.ToTable("Colleagues", (string)null);
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Report", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ContactedArea")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Reports", (string)null);
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Request", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AgileCoachId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AgileCoachId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Request", (string)null);
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Session", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("SubTopic")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Topic")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Sessions", (string)null);
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.TimeSlot", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("AvailableDate")
                        .HasColumnType("date");

                    b.Property<int?>("BookedUserId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("time");

                    b.Property<bool?>("IsBooked")
                        .HasColumnType("bit");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("time");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BookedUserId");

                    b.HasIndex("UserId");

                    b.ToTable("TimeSlots", (string)null);
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AgileCoachId")
                        .HasColumnType("int");

                    b.Property<string>("AreaOfExpertise")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Firstname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("InLD")
                        .HasColumnType("bit");

                    b.Property<bool>("IsSME")
                        .HasColumnType("bit");

                    b.Property<string>("Languages")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Lastname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AgileCoachId");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.AgileCoach", b =>
                {
                    b.HasOne("SubjectMatterExpertAPI.Models.User", "User")
                        .WithOne()
                        .HasForeignKey("SubjectMatterExpertAPI.Models.AgileCoach", "UserId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("User");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Colleague", b =>
                {
                    b.HasOne("SubjectMatterExpertAPI.Models.Session", "Session")
                        .WithMany("Colleagues")
                        .HasForeignKey("SessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Session");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Report", b =>
                {
                    b.HasOne("SubjectMatterExpertAPI.Models.User", "User")
                        .WithMany("Reports")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Request", b =>
                {
                    b.HasOne("SubjectMatterExpertAPI.Models.AgileCoach", "AgileCoach")
                        .WithMany("Requests")
                        .HasForeignKey("AgileCoachId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SubjectMatterExpertAPI.Models.User", "User")
                        .WithOne("Request")
                        .HasForeignKey("SubjectMatterExpertAPI.Models.Request", "UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("AgileCoach");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Session", b =>
                {
                    b.HasOne("SubjectMatterExpertAPI.Models.User", "User")
                        .WithMany("Sessions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.TimeSlot", b =>
                {
                    b.HasOne("SubjectMatterExpertAPI.Models.User", "BookedUser")
                        .WithMany()
                        .HasForeignKey("BookedUserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("SubjectMatterExpertAPI.Models.User", "User")
                        .WithMany("TimeSlots")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BookedUser");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.User", b =>
                {
                    b.HasOne("SubjectMatterExpertAPI.Models.AgileCoach", "AgileCoach")
                        .WithMany("ManagedUsers")
                        .HasForeignKey("AgileCoachId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("AgileCoach");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.AgileCoach", b =>
                {
                    b.Navigation("ManagedUsers");

                    b.Navigation("Requests");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Session", b =>
                {
                    b.Navigation("Colleagues");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.User", b =>
                {
                    b.Navigation("Reports");

                    b.Navigation("Request");

                    b.Navigation("Sessions");

                    b.Navigation("TimeSlots");
                });
#pragma warning restore 612, 618
        }
    }
}
