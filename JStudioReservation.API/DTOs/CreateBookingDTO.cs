namespace JStudioReservation.API.DTOs
{
    public class CreateBookingDTO
    {
        public int ArtistId { get; set; }

        public int RoomId { get; set; }

        public int? ExtraServiceId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Status { get; set; } = "Pending";
    }
}
