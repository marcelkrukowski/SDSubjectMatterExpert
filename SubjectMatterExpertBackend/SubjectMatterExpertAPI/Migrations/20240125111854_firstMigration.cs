using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SubjectMatterExpertAPI.Migrations
{
    /// <inheritdoc />
    public partial class firstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AgileCoaches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Languages = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AreaOfExpertise = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgileCoaches", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Firstname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lastname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SMEId = table.Column<int>(type: "int", nullable: false),
                    AgileCoachId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_AgileCoaches_AgileCoachId",
                        column: x => x.AgileCoachId,
                        principalTable: "AgileCoaches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SMEs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Languages = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AreaOfExpertise = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    AgileCoachId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SMEs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SMEs_AgileCoaches_AgileCoachId",
                        column: x => x.AgileCoachId,
                        principalTable: "AgileCoaches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SMEs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Topic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubTopic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SMEId = table.Column<int>(type: "int", nullable: false),
                    AgileCoachId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sessions_AgileCoaches_AgileCoachId",
                        column: x => x.AgileCoachId,
                        principalTable: "AgileCoaches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sessions_SMEs_SMEId",
                        column: x => x.SMEId,
                        principalTable: "SMEs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TimeSlots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AvailableDate = table.Column<DateTime>(type: "date", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SMEId = table.Column<int>(type: "int", nullable: false),
                    AgileCoachId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeSlots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeSlots_AgileCoaches_AgileCoachId",
                        column: x => x.AgileCoachId,
                        principalTable: "AgileCoaches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TimeSlots_SMEs_SMEId",
                        column: x => x.SMEId,
                        principalTable: "SMEs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Colleagues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    first_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    last_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SessionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colleagues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Colleagues_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AgileCoaches_UserId",
                table: "AgileCoaches",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Colleagues_SessionId",
                table: "Colleagues",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_AgileCoachId",
                table: "Sessions",
                column: "AgileCoachId");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_SMEId",
                table: "Sessions",
                column: "SMEId");

            migrationBuilder.CreateIndex(
                name: "IX_SMEs_AgileCoachId",
                table: "SMEs",
                column: "AgileCoachId");

            migrationBuilder.CreateIndex(
                name: "IX_SMEs_UserId",
                table: "SMEs",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TimeSlots_AgileCoachId",
                table: "TimeSlots",
                column: "AgileCoachId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeSlots_SMEId",
                table: "TimeSlots",
                column: "SMEId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AgileCoachId",
                table: "Users",
                column: "AgileCoachId");

            migrationBuilder.AddForeignKey(
                name: "FK_AgileCoaches_Users_UserId",
                table: "AgileCoaches",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgileCoaches_Users_UserId",
                table: "AgileCoaches");

            migrationBuilder.DropTable(
                name: "Colleagues");

            migrationBuilder.DropTable(
                name: "TimeSlots");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "SMEs");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "AgileCoaches");
        }
    }
}
