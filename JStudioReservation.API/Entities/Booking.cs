namespace JStudioReservation.API.Entities

{
    public class Booking
    {
        public int Id { get; set; }
        public int ArtistId { get; set; }

        public int RoomId { get; set; }

        public int? ExtraServiceId { get; set; }
        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Status { get; set; } = "Pending";
        public Artist Artist { get; set; } = null!;

        public Room Room { get; set; } = null!;

        public ExtraService? ExtraService { get; set; }
    }
}
