namespace JStudioReservation.Application.Dtos
{
    public class BookingDto : DtoBase
    {
        public int ArtistId { get; set; }
        public string? ArtistName { get; set; }
        public int RoomId { get; set; }
        public string? RoomName { get; set; }
        public int? ExtraServiceId { get; set; }
        public string? ExtraServiceName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
