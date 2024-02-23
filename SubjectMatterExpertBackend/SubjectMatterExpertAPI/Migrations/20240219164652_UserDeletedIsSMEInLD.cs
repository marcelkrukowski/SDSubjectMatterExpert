using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SubjectMatterExpertAPI.Migrations
{
    /// <inheritdoc />
    public partial class UserDeletedIsSMEInLD : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InLD",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IsSME",
                table: "AspNetUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "InLD",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSME",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
