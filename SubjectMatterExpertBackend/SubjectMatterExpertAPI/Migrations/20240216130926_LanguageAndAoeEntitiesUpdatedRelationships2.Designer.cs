﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SubjectMatterExpertAPI.Data;

#nullable disable

namespace SubjectMatterExpertAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240216130926_LanguageAndAoeEntitiesUpdatedRelationships2")]
    partial class LanguageAndAoeEntitiesUpdatedRelationships2
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("AgileCoaches");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.AreaOfExpertise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ExpertiseArea")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("RequestId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RequestId");

                    b.HasIndex("UserId");

                    b.ToTable("AreasOfExpertise");
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

                    b.ToTable("Colleagues");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Language", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("LanguageName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("RequestId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RequestId");

                    b.HasIndex("UserId");

                    b.ToTable("Languages");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Filename")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Uri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Photos");
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

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Request", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Requests");
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

                    b.ToTable("Sessions");
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

                    b.HasIndex("UserId");

                    b.ToTable("TimeSlots");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AgileCoachId")
                        .HasColumnType("int");

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

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.AgileCoach", b =>
                {
                    b.HasOne("SubjectMatterExpertAPI.Models.User", "User")
                        .WithOne()
                        .HasForeignKey("SubjectMatterExpertAPI.Models.AgileCoach", "UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.AreaOfExpertise", b =>
                {
                    b.HasOne("SubjectMatterExpertAPI.Models.Request", "Request")
                        .WithMany("AreasOfExpertise")
                        .HasForeignKey("RequestId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("SubjectMatterExpertAPI.Models.User", "User")
                        .WithMany("AreasOfExpertise")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Request");

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

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Language", b =>
                {
                    b.HasOne("SubjectMatterExpertAPI.Models.Request", "Request")
                        .WithMany("Languages")
                        .HasForeignKey("RequestId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("SubjectMatterExpertAPI.Models.User", "User")
                        .WithMany("Languages")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Request");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Photo", b =>
                {
                    b.HasOne("SubjectMatterExpertAPI.Models.User", "User")
                        .WithOne("Photo")
                        .HasForeignKey("SubjectMatterExpertAPI.Models.Photo", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
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
                    b.HasOne("SubjectMatterExpertAPI.Models.User", "User")
                        .WithOne("Request")
                        .HasForeignKey("SubjectMatterExpertAPI.Models.Request", "UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

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
                    b.HasOne("SubjectMatterExpertAPI.Models.User", "User")
                        .WithMany("TimeSlots")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

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
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Request", b =>
                {
                    b.Navigation("AreasOfExpertise");

                    b.Navigation("Languages");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.Session", b =>
                {
                    b.Navigation("Colleagues");
                });

            modelBuilder.Entity("SubjectMatterExpertAPI.Models.User", b =>
                {
                    b.Navigation("AreasOfExpertise");

                    b.Navigation("Languages");

                    b.Navigation("Photo")
                        .IsRequired();

                    b.Navigation("Reports");

                    b.Navigation("Request");

                    b.Navigation("Sessions");

                    b.Navigation("TimeSlots");
                });
#pragma warning restore 612, 618
        }
    }
}
