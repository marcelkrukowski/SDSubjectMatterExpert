namespace SubjectMatterExpertAPI.DTOs
{
    public class TimeSlotResponseDto
    {
        public int Id { get; set; }
        public DateOnly AvailableDate { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public bool? IsBooked { get; set; }
        public int? BookedUserId { get; set; }
        public int UserId { get; set; }

    }
}
