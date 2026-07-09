using JStudioReservation.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace JStudioReservation.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Artist> Artists { get; set; }

        public DbSet<Room> Rooms { get; set; }

        public DbSet<ExtraService> ExtraServices { get; set; }

        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Room>()
                .HasOne(r => r.Artist)
                .WithMany(a => a.Rooms)
                .HasForeignKey(r => r.ArtistId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ExtraService>()
                .HasOne(es => es.Room)
                .WithMany(r => r.ExtraServices)
                .HasForeignKey(es => es.RoomId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Artist)
                .WithMany(a => a.Bookings)
                .HasForeignKey(b => b.ArtistId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Room)
                .WithMany(r => r.Bookings)
                .HasForeignKey(b => b.RoomId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.ExtraService)
                .WithMany(es => es.Bookings)
                .HasForeignKey(b => b.ExtraServiceId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
