using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoViewer.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddHeightAndWidth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Height",
                table: "Photos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Width",
                table: "Photos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Height",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "Width",
                table: "Photos");
        }
    }
}
