namespace JStudioReservation.API.DTOs
{
    public class CreateExtraServiceDTO
    {
        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int RoomId { get; set; }
    }
}