using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SubjectMatterExpertAPI.Migrations
{
    /// <inheritdoc />
    public partial class RequestEntityUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "RequestId",
                table: "Languages",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RequestId",
                table: "AreasOfExpertise",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Languages_RequestId",
                table: "Languages",
                column: "RequestId");

            migrationBuilder.CreateIndex(
                name: "IX_AreasOfExpertise_RequestId",
                table: "AreasOfExpertise",
                column: "RequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_AreasOfExpertise_Requests_RequestId",
                table: "AreasOfExpertise",
                column: "RequestId",
                principalTable: "Requests",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Languages_Requests_RequestId",
                table: "Languages",
                column: "RequestId",
                principalTable: "Requests",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AreasOfExpertise_Requests_RequestId",
                table: "AreasOfExpertise");

            migrationBuilder.DropForeignKey(
                name: "FK_Languages_Requests_RequestId",
                table: "Languages");

            migrationBuilder.DropIndex(
                name: "IX_Languages_RequestId",
                table: "Languages");

            migrationBuilder.DropIndex(
                name: "IX_AreasOfExpertise_RequestId",
                table: "AreasOfExpertise");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "RequestId",
                table: "Languages");

            migrationBuilder.DropColumn(
                name: "RequestId",
                table: "AreasOfExpertise");
        }
    }
}
