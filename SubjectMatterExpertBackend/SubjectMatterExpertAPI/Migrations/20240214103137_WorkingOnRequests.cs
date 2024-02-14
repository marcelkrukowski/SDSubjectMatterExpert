using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SubjectMatterExpertAPI.Migrations
{
    /// <inheritdoc />
    public partial class WorkingOnRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_AgileCoaches_AgileCoachId",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_AgileCoachId",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "AgileCoachId",
                table: "Requests");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AgileCoachId",
                table: "Requests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_AgileCoachId",
                table: "Requests",
                column: "AgileCoachId");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_AgileCoaches_AgileCoachId",
                table: "Requests",
                column: "AgileCoachId",
                principalTable: "AgileCoaches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
