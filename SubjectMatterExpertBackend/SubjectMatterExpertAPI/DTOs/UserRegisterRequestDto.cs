﻿using System.ComponentModel.DataAnnotations;

namespace SubjectMatterExpertAPI.DTOs
{
    public class UserRegisterRequestDto
    {
         
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Lastname { get; set; }



    }
}

