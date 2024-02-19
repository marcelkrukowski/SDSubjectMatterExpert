using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SubjectMatterExpertAPI.Migrations
{
    /// <inheritdoc />
    public partial class EntitiesUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeSlots_Users_BookedUserId",
                table: "TimeSlots");

            migrationBuilder.DropIndex(
                name: "IX_TimeSlots_BookedUserId",
                table: "TimeSlots");

            migrationBuilder.DropIndex(
                name: "IX_AgileCoaches_UserId",
                table: "AgileCoaches");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "AgileCoaches",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AgileCoaches_UserId",
                table: "AgileCoaches",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AgileCoaches_UserId",
                table: "AgileCoaches");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "AgileCoaches",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_TimeSlots_BookedUserId",
                table: "TimeSlots",
                column: "BookedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AgileCoaches_UserId",
                table: "AgileCoaches",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeSlots_Users_BookedUserId",
                table: "TimeSlots",
                column: "BookedUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
