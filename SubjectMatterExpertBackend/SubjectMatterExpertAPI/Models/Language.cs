﻿namespace SubjectMatterExpertAPI.Models
{
    public class Language
    {
        public int Id { get; set; }
        public string LanguageName { get; set; }
        public User User { get; set; }
        public int? RequestId { get; set; }
        public Request? Request { get; set; }


    }
}