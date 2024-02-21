using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Data;
using SubjectMatterExpertAPI.DTOs;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Models;
using System.Security.Cryptography;
using System.Text;

namespace SubjectMatterExpertAPI.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<User> userManager, ITokenService tokenService, IMapper mapper)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        [HttpPost("register")] // POST: api/account/register
        public async Task<ActionResult<UserRegisterResponseDto>> Register(UserRegisterRequestDto registerDto)
        {
            if (await UserExists(registerDto.UserName)) return BadRequest("Username is taken");

            var user = _mapper.Map<User>(registerDto);

            user.AgileCoachId = 1;

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "User");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserRegisterResponseDto
            {
           
                Token = await _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")] // POST: api/account/login
        public async Task<ActionResult<UserLoginResponseDto>> Login(UserLoginRequestDto loginDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized("Invalid email!");

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) return Unauthorized("Invalid password!");

            return new UserLoginResponseDto
            {
                
                Token = await _tokenService.CreateToken(user),
               
            };
        }
      

        //To retrieve user details and update database when needed
        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateUser(int id, UserUpdateDto userUpdateDto)
        //{
        //    var user = await _userManager.Users.FirstAsync(x => x.Id == id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    user.Email = userUpdateDto.Email;
        //    user.Firstname = userUpdateDto.Firstname;
        //    user.Lastname = userUpdateDto.Lastname;
           

        //    _userManager .Entry(user).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!UserExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return Ok(user);
        //}

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }




    }


}