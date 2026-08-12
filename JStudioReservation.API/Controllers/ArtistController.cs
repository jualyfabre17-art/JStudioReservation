using Microsoft.AspNetCore.Mvc;
using JStudioReservation.Domain.Entities;
using JStudioReservation.API.DTOs;
using JStudioReservation.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace JStudioReservation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly ArtistRepository _artistRepository;

        public ArtistController(ArtistRepository artistRepository)
        {
            _artistRepository = artistRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArtistDTO>>> GetArtists()
        {
            var artists = await _artistRepository.GetAllAsync();
            var artistDTOs = artists.Select(a => new ArtistDTO
            {
                Id = a.Id,
                FullName = a.FullName,
                Genre = a.Genre,
                PhoneNumber = a.PhoneNumber
            });
            return Ok(artistDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArtistDTO>> GetArtist(int id)
        {
            var artist = await _artistRepository.GetByIdAsync(id);
            if (artist == null)
                return NotFound();

            var artistDTO = new ArtistDTO
            {
                Id = artist.Id,
                FullName = artist.FullName,
                Genre = artist.Genre,
                PhoneNumber = artist.PhoneNumber
            };
            return Ok(artistDTO);
        }

        [HttpGet("genre/{genre}")]
        public async Task<ActionResult<IEnumerable<ArtistDTO>>> GetArtistsByGenre(string genre)
        {
            var artists = await _artistRepository.GetByGenreAsync(genre);
            var artistDTOs = artists.Select(a => new ArtistDTO
            {
                Id = a.Id,
                FullName = a.FullName,
                Genre = a.Genre,
                PhoneNumber = a.PhoneNumber
            });
            return Ok(artistDTOs);
        }

        [HttpGet("{id}/details")]
        public async Task<ActionResult<ArtistDTO>> GetArtistWithDetails(int id)
        {
            var artist = await _artistRepository.GetArtistWithDetailsAsync(id);
            if (artist == null)
                return NotFound();

            var artistDTO = new ArtistDTO
            {
                Id = artist.Id,
                FullName = artist.FullName,
                Genre = artist.Genre,
                PhoneNumber = artist.PhoneNumber
            };
            return Ok(artistDTO);
        }

        [HttpPost]
        public async Task<ActionResult<ArtistDTO>> CreateArtist([FromBody] CreateArtistDTO createArtistDTO)
        {
            try
            {
                Artist artist = new Artist
                {
                    FullName = createArtistDTO.FullName,
                    Genre = createArtistDTO.Genre,
                    PhoneNumber = createArtistDTO.PhoneNumber,
                    CreatedAt = DateTime.UtcNow
                };

                
                await _artistRepository.AddAsync(artist);
                await _artistRepository.SaveChangesAsync();

                var artistDTO = new ArtistDTO
                {
                    Id = artist.Id,
                    FullName = artist.FullName,
                    Genre = artist.Genre,
                    PhoneNumber = artist.PhoneNumber
                };

                return CreatedAtAction(nameof(GetArtist), new { id = artist.Id }, artistDTO);
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine(ex.InnerException?.Message);
                throw;
            }
        
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArtist(int id, [FromBody] CreateArtistDTO updateArtistDTO)
        {
            var artist = await _artistRepository.GetByIdAsync(id);
            if (artist == null)
                return NotFound();

            artist.FullName = updateArtistDTO.FullName;
            artist.Genre = updateArtistDTO.Genre;
            artist.PhoneNumber = updateArtistDTO.PhoneNumber;

            _artistRepository.Update(artist);
            await _artistRepository.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtist(int id)
        {
            var artist = await _artistRepository.GetByIdAsync(id);
            if (artist == null)
                return NotFound();

            _artistRepository.Delete(artist);
            await _artistRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}