using Azure.Storage.Blobs;
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
                options => options.UseSqlServer(config.GetConnectionString("DBConnection")));
            services.AddScoped(_ =>
            {
                return new BlobServiceClient(config.GetConnectionString("AzureBlobStorage"));
            });
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITimeSlotRepository, TimeSlotRepository>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IRequestRepository, RequestRepository>();
            services.AddScoped<IAgileCoachRepository, AgileCoachRepository>();
            services.AddScoped<ISessionRepository, SessionRepository>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            return services;
        }
    }
}
