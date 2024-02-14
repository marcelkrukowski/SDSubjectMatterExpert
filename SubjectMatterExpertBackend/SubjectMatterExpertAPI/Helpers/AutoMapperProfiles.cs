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
            CreateMap<TimeSlot, TimeSlotRequestDto>().ReverseMap();
            CreateMap<TimeSlot, TimeSlotResponseDto>().ReverseMap();
            CreateMap<Photo, PhotoDto>();
            CreateMap<AreaOfExpertise, AreaOfExpertiseDto>().ReverseMap();
            CreateMap<Language, LanguageDto>().ReverseMap();
            CreateMap<RequestDto, Request>()
                .ForMember(dest => dest.Languages, opt => opt.MapFrom(src => src.Languages))
                .ForMember(dest => dest.AreasOfExpertise, opt => opt.MapFrom(src => src.AreasOfExpertise));


        }
    }
}
