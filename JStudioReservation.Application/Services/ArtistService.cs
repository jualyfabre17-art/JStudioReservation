using JStudioReservation.Application.Core;
using JStudioReservation.Domain.Entities;
using JStudioReservation.Infrastructure.Repositories;

namespace JStudioReservation.Application.Services
{
    public class ArtistService : BaseService<Artist>
    {
        private readonly ArtistRepository _artistRepository;

        public ArtistService(ArtistRepository artistRepository) : base(artistRepository)
        {
            _artistRepository = artistRepository;
        }

        public override async Task<ServiceResult<Artist>> AddAsync(Artist entity)
        {
            var validation = ValidateArtist(entity);
            if (!validation.Success)
                return ServiceResult<Artist>.Fail(validation.Message);

            return await base.AddAsync(entity);
        }

        public override async Task<ServiceResult<bool>> UpdateAsync(Artist entity)
        {
            var validation = ValidateArtist(entity);
            if (!validation.Success)
                return ServiceResult<bool>.Fail(validation.Message);

            return await base.UpdateAsync(entity);
        }

        private ServiceResult<bool> ValidateArtist(Artist artist)
        {
            if (string.IsNullOrWhiteSpace(artist.FullName))
                return ServiceResult<bool>.Fail("FullName is required.");

            if (artist.FullName.Length > 100)
                return ServiceResult<bool>.Fail("FullName cannot exceed 100 characters.");

            if (string.IsNullOrWhiteSpace(artist.Genre))
                return ServiceResult<bool>.Fail("Genre is required.");

            if (artist.Genre.Length > 50)
                return ServiceResult<bool>.Fail("Genre cannot exceed 50 characters.");

            if (!string.IsNullOrEmpty(artist.PhoneNumber) && artist.PhoneNumber.Length > 20)
                return ServiceResult<bool>.Fail("PhoneNumber cannot exceed 20 characters.");

            return ServiceResult<bool>.Ok(true);
        }
    }
}