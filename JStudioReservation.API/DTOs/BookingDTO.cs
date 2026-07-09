namespace JStudioReservation.API.DTOs
{
    public class BookingDTO
    {
        public int Id { get; set; }

        public int ArtistId { get; set; }

        public int RoomId { get; set; }

        public int? ExtraServiceId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Status { get; set; } = string.Empty;
    }
}
