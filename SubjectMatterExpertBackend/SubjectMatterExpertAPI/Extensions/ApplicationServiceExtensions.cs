using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Data;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Services;

namespace SubjectMatterExpertAPI.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) 
        {
            services.AddDbContext<DataContext>(
                options => options.UseSqlServer(config.GetConnectionString("DevConnection")));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }
    }
}
