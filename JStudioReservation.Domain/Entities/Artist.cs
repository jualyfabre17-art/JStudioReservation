using JStudioReservation.Domain.Core;

namespace JStudioReservation.Domain.Entities
{
    public class Artist : BaseEntity
    {
        public string FullName { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public ICollection<Room> Rooms { get; set; } = new List<Room>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
