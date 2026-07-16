namespace JStudioReservation.API.DTOs
{
    public class ExtraServiceDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int RoomId { get; set; }

        public string? RoomName { get; set; }
    }
}