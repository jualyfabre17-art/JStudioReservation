namespace JStudioReservation.Application.Dtos
{
    public class ArtistDto : DtoBase
    {
        public string FullName { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }
}