using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;

namespace SubjectMatterExpertAPI.Controllers
{
    [Authorize]
    public class TimeSlotController : BaseApiController
    {
        private readonly ITimeSlotRepository _timeSlotRepository;
        private readonly IMapper _mapper;

        public TimeSlotController(ITimeSlotRepository timeSlotRepository, IMapper mapper)
        {
            _timeSlotRepository = timeSlotRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<TimeSlotDto> GetTimeSlot(int id)
        {
            var timeslot = await _timeSlotRepository.GetTimeSlotAsync(id);
            var timeSlotToReturn = _mapper.Map<TimeSlotDto>(timeslot);
            return timeSlotToReturn;
        }

    }
}
