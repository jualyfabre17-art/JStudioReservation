namespace JStudioReservation.Application.Dtos
{
    public class ExtraServiceDto : DtoBase
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int RoomId { get; set; }
        public string? RoomName { get; set; }
    }
}
