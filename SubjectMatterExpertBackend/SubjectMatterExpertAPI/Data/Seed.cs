using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SubjectMatterExpertAPI.Models;
using System.Runtime.Intrinsics.X86;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace SubjectMatterExpertAPI.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<User> userManager, RoleManager<AppRole> roleManager, DataContext context)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/SeedData.json");


            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var data = JsonSerializer.Deserialize<Dictionary<string, List<User>>>(userData, options);
            var users = data["users"];
            var smes = data["smes"];
            var lds = data["ldteam"];

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

            var agileCoach = new User
            {
                UserName = "AgileCoach",
                Email = "agilecoach@sdworx.com",
                Firstname = "Agile",
                Lastname = "Coach",
                Location = "Poland",
                Photo = new Photo
                {
                    Filename = "man7.png",
                    Uri = "https://smeavatarsstorage.blob.core.windows.net/avatars/man7.png"
                }
            };

            await userManager.CreateAsync(agileCoach, "Pa$$w0rd");
            await userManager.AddToRolesAsync(agileCoach, new[] { "User", "SME", "AgileCoach" });

            var agileCoachEntity = new AgileCoach
            {
                 User = agileCoach
            };

            context.AgileCoaches.Add(agileCoachEntity);
            await context.SaveChangesAsync();




            foreach (var user in users)
            {
      
                user.UserName = user.UserName.ToLower();
                user.AgileCoachId = agileCoachEntity.Id;


                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "User");
            }

            foreach (var sme in smes)
            {

                sme.UserName = sme.UserName.ToLower();
                sme.AgileCoachId = agileCoachEntity.Id;


                await userManager.CreateAsync(sme, "Pa$$w0rd");
                await userManager.AddToRolesAsync(sme, new[] { "User",  "SME" });
            }

            foreach (var ld in lds)
            {
                ld.UserName = ld.UserName.ToLower();
                ld.AgileCoachId = agileCoachEntity.Id;
                await userManager.CreateAsync(ld, "Pa$$w0rd");
                await userManager.AddToRolesAsync(ld, new[] { "User", "l&D" });

            }






        }
    }
}
