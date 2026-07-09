namespace JStudioReservation.API.DTOs
{
    public class CreateRoomDTO
    {
        public string Name { get; set; } = string.Empty;

        public decimal PricePerHour { get; set; }

        public int Capacity { get; set; }

        public int ArtistId { get; set; }
    }
}
