namespace JStudioReservation.API.Entities
{
    public class Room
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal PricePerHour { get; set; }

        public int Capacity { get; set; }
        public int ArtistId { get; set; }
        public Artist Artist { get; set; } = null!;
        public ICollection<ExtraService> ExtraServices { get; set; } = new List<ExtraService>();

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
