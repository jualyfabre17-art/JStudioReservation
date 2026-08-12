using JStudioReservation.API.Data;
using JStudioReservation.API.DTOs;
using JStudioReservation.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JStudioReservation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ArtistController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArtistDTO>>> GetArtists()
        {
            var artists = await _context.Artists
                .Select(a => new ArtistDTO
                {
                    Id = a.Id,
                    FullName = a.FullName,
                    Genre = a.Genre,
                    PhoneNumber = a.PhoneNumber
                })
                .ToListAsync();

            return Ok(artists);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArtistDTO>> GetArtist(int id)
        {
            var artist = await _context.Artists.FindAsync(id);

            if (artist == null)
                return NotFound();

            var dto = new ArtistDTO
            {
                Id = artist.Id,
                FullName = artist.FullName,
                Genre = artist.Genre,
                PhoneNumber = artist.PhoneNumber
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult> CreateArtist(CreateArtistDTO dto)
        {
            try
            {
                Artist artist = new Artist
                {
                    FullName = dto.FullName,
                    Genre = dto.Genre,
                    PhoneNumber = dto.PhoneNumber,
                    CreatedAt = DateTime.UtcNow

                };

                _context.Artists.Add(artist);
                await _context.SaveChangesAsync();

                return Ok(artist);
            }
            catch (DbUpdateException ex)
            {
                // Esto te imprimirá en la consola de Visual Studio el mensaje exacto de la base de datos
                Console.WriteLine(ex.InnerException?.Message);
                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateArtist(int id, CreateArtistDTO dto)
        {
            var artist = await _context.Artists.FindAsync(id);

            if (artist == null)
                return NotFound();

            artist.FullName = dto.FullName;
            artist.Genre = dto.Genre;
            artist.PhoneNumber = dto.PhoneNumber;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteArtist(int id)
        {
            var artist = await _context.Artists.FindAsync(id);

            if (artist == null)
                return NotFound();

            _context.Artists.Remove(artist);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}