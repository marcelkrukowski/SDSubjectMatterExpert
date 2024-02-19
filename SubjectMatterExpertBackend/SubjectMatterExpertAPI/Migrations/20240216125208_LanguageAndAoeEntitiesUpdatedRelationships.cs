using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SubjectMatterExpertAPI.Migrations
{
    /// <inheritdoc />
    public partial class LanguageAndAoeEntitiesUpdatedRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AreasOfExpertise_Requests_RequestId",
                table: "AreasOfExpertise");

            migrationBuilder.DropForeignKey(
                name: "FK_Languages_Requests_RequestId",
                table: "Languages");

            migrationBuilder.AlterColumn<int>(
                name: "RequestId",
                table: "Languages",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RequestId",
                table: "AreasOfExpertise",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AreasOfExpertise_Requests_RequestId",
                table: "AreasOfExpertise",
                column: "RequestId",
                principalTable: "Requests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Languages_Requests_RequestId",
                table: "Languages",
                column: "RequestId",
                principalTable: "Requests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
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

            migrationBuilder.AlterColumn<int>(
                name: "RequestId",
                table: "Languages",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "RequestId",
                table: "AreasOfExpertise",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

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
    }
}
