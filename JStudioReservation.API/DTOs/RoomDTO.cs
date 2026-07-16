namespace JStudioReservation.API.DTOs
{
    public class RoomDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal PricePerHour { get; set; }

        public int Capacity { get; set; }

        public int ArtistId { get; set; }

        public string? ArtistName { get; set; }
    }
}