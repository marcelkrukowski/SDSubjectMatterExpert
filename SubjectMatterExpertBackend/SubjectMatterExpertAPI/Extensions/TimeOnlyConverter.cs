using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Drawing;

namespace SubjectMatterExpertAPI.Extensions
{
    public class TimeOnlyConverter : ValueConverter<TimeOnly, TimeSpan>
    {
        public TimeOnlyConverter() : base(
            timeOnly => timeOnly.ToTimeSpan(),
            timeSpan => TimeOnly.FromTimeSpan(timeSpan))
        { }
    }
}
