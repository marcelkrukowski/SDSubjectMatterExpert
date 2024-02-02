using AutoMapper;
using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<AgileCoach, AgileCoachDto>();
            CreateMap<Colleague, ColleagueDto>();
            CreateMap<Report, ReportDto>();
            CreateMap<Request, RequestDto>();
            CreateMap<Session, SessionDto>();
            CreateMap<TimeSlot, TimeSlotDto>();

        }
    }
}
