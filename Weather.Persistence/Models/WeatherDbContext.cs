using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Weather.Persistence.Models
{
    //dotnet ef --startup-project GlobalWeatherReact --project Weather.Persistence dbcontext scaffold "Server=.\sqlexpress;Database=Weather;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -o Models -c "WeatherDbContext" -f 
    public partial class WeatherDbContext : DbContext
    {
        public WeatherDbContext()
        {
        }

        public WeatherDbContext(DbContextOptions<WeatherDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<City> Cities { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\sqlexpress;Database=Weather;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<City>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .ValueGeneratedNever();

                entity.Property(e => e.CountryId)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);
            });
        }
    }
}
