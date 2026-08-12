namespace JStudioReservation.API.Entities
{
    public class Artist
    {
        public int Id { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Genre { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } 
        public DateTime? UpdatedAt { get; set; }

        public ICollection<Room> Rooms { get; set; } = new List<Room>();

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
