using JStudioReservation.Domain.Core;

namespace JStudioReservation.Domain.Entities
{
    public class ExtraService : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; } = null!;
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}