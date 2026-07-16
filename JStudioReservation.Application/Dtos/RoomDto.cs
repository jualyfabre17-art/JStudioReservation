namespace JStudioReservation.Application.Dtos
{
    public class RoomDto : DtoBase
    {
        public string Name { get; set; } = string.Empty;
        public decimal PricePerHour { get; set; }
        public int Capacity { get; set; }
        public int ArtistId { get; set; }
        public string? ArtistName { get; set; }
    }
}
