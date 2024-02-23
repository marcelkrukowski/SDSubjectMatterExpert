using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SubjectMatterExpertAPI.Migrations
{
    /// <inheritdoc />
    public partial class TimeSlotEntityUpdatedUserRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BookedUserId",
                table: "TimeSlots",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TimeSlots_BookedUserId",
                table: "TimeSlots",
                column: "BookedUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeSlots_Users_BookedUserId",
                table: "TimeSlots",
                column: "BookedUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeSlots_Users_BookedUserId",
                table: "TimeSlots");

            migrationBuilder.DropIndex(
                name: "IX_TimeSlots_BookedUserId",
                table: "TimeSlots");

            migrationBuilder.DropColumn(
                name: "BookedUserId",
                table: "TimeSlots");
        }
    }
}
