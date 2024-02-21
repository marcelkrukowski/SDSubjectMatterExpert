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

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAllTimeSlotsByUserId(int userId)
        {
            var timeSlots = await _timeSlotRepository.GetAllTimeSlotsByUserIdAsync(userId);
            var timeSlotDtos = _mapper.Map<IEnumerable<TimeSlotResponseDto>>(timeSlots);
            return Ok(timeSlotDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTimeSlotById(int id)
        {
            var timeSlot = await _timeSlotRepository.GetTimeSlotByIdAsync(id);
            if (timeSlot == null)
                return NotFound();

            var timeSlotDto = _mapper.Map<TimeSlotRequestDto>(timeSlot);
            return Ok(timeSlotDto);
        }

        [HttpPost("add-timeslot")]
        public async Task<IActionResult> AddTimeSlot([FromBody] TimeSlotRequestDto timeSlotDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var timeSlot = _mapper.Map<TimeSlot>(timeSlotDto);


            await _timeSlotRepository.AddTimeSlotAsync(timeSlot);

   

            return CreatedAtAction(nameof(GetTimeSlotById), new { id = timeSlot.Id }, timeSlot);
        }

        [HttpPut("update-timeslot")]
        public async Task<IActionResult> UpdateTimeSlot(int timeSlotId, [FromBody] TimeSlotRequestDto timeSlotDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingTimeSlot = await _timeSlotRepository.GetTimeSlotByIdAsync(timeSlotId);
            if (existingTimeSlot == null)
                return NotFound();

            _mapper.Map(timeSlotDto, existingTimeSlot);

            await _timeSlotRepository.UpdateTimeSlotAsync(existingTimeSlot);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimeSlot(int id)
        {
            var timeSlot = await _timeSlotRepository.GetTimeSlotByIdAsync(id);
            if (timeSlot == null)
                return NotFound();

            await _timeSlotRepository.DeleteTimeSlotAsync(id);

            return NoContent();
        }

        [HttpPost("book")]
        public async Task<IActionResult> BookTimeSlot(int userId, int timeSlotId)
        {
            await _timeSlotRepository.BookTimeSlotAsync(userId, timeSlotId);
            return Ok(new { Message = "Time slot booked successfully." });
        }

        [HttpGet("booked/{userId}")]
        public async Task<IActionResult> GetBookedTimeSlots(int userId)
        {
            var bookedTimeSlots = await _timeSlotRepository.GetBookedTimeSlotsAsync(userId);
            var responseDtos = _mapper.Map<IEnumerable<TimeSlotResponseDto>>(bookedTimeSlots);
            return Ok(responseDtos);
        }

        [HttpPost("unbook")]
        public async Task<IActionResult> UnbookTimeSlot(int userId, int timeSlotId)
        {
            await _timeSlotRepository.UnbookTimeSlotAsync(userId, timeSlotId);
            return Ok(new { Message = "Time slot unbooked successfully." });
        }
    }
}