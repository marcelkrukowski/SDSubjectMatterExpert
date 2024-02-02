using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Models;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace SubjectMatterExpertAPI.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/SeedData.json");


            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var data = JsonSerializer.Deserialize<Dictionary<string, List<User>>>(userData, options);
            var users = data["users"];
           

            foreach (var user in users)
            {
           
                using var hmac = new HMACSHA512();
                user.Username = user.Username.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }
        
            await context.SaveChangesAsync();
        }

        public static async Task SeedAgileCoaches(DataContext context)
        {
            if (await context.AgileCoaches.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/SeedData.json");


            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var data = JsonSerializer.Deserialize<Dictionary<string, List<AgileCoach>>>(userData, options);
            var users = data["agileCoaches"];

            foreach (var user in users)
            {
                context.AgileCoaches.Add(user);
            }

            await context.SaveChangesAsync();
        }


    }
}
