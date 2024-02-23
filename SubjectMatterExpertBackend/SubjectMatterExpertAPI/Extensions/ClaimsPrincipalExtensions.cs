using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SubjectMatterExpertAPI.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {


            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        }
    }
}
