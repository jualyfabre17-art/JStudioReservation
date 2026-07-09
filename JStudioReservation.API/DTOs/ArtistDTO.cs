namespace JStudioReservation.API.DTOs

{
    public class ArtistDTO
    {
        public int Id { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Genre { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;
    }
}
