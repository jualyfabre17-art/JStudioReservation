namespace JStudioReservation.API.Entities

{
    public class ExtraService
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; } = null!;
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}