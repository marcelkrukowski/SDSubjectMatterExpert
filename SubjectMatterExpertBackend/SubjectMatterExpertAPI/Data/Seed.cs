using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Models;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace SubjectMatterExpertAPI.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<User> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/SeedData.json");


            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var data = JsonSerializer.Deserialize<Dictionary<string, List<User>>>(userData, options);
            var users = data["users"];

            var roles = new List<AppRole>()
            {
                new AppRole {Name = "User" },
                new AppRole {Name = "SME" },
                new AppRole {Name = "AgileCoach" },
                new AppRole {Name = "L&D" }
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
           

            foreach (var user in users)
            {
      
                user.UserName = user.UserName.ToLower();


                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "User");
            }

            var agileCoach = new User
            {
                UserName = "AgileCoach", 
                Email = "agilecoach@sdworx.com",
                Firstname = "Agile",
                Lastname = "Coach"
            };

            await userManager.CreateAsync(agileCoach, "Pa$$w0rd");
            await userManager.AddToRolesAsync(agileCoach, new[] { "AgileCoach", "SME", "L&D" });
        
            
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
