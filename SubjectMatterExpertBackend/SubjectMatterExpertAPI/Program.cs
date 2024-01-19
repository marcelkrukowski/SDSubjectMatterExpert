using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SubjectMatterExpertAPI.Data;
using SubjectMatterExpertAPI.Extensions;
using SubjectMatterExpertAPI.Interfaces;
using SubjectMatterExpertAPI.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddSwaggerServices(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
