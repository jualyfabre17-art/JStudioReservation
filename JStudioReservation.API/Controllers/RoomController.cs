using JStudioReservation.API.Data;
using JStudioReservation.API.DTOs;
using JStudioReservation.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JStudioReservation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RoomController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomDTO>>> GetRooms()
        {
            var rooms = await _context.Rooms
                .Select(r => new RoomDTO
                {
                    Id = r.Id,
                    Name = r.Name,
                    Capacity = r.Capacity,
                    PricePerHour = r.PricePerHour,
                    ArtistId = r.ArtistId
                })
                .ToListAsync();

            return Ok(rooms);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoomDTO>> GetRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);

            if (room == null)
                return NotFound();

            var dto = new RoomDTO
            {
                Id = room.Id,
                Name = room.Name,
                Capacity = room.Capacity,
                PricePerHour = room.PricePerHour,
                ArtistId = room.ArtistId
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult> CreateRoom(CreateRoomDTO dto)
        {
            var artistExists = await _context.Artists
                .AnyAsync(a => a.Id == dto.ArtistId);

            if (!artistExists)
                return BadRequest("The selected artist does not exist.");

            Room room = new Room
            {
                Name = dto.Name,
                Capacity = dto.Capacity,
                PricePerHour = dto.PricePerHour,
                ArtistId = dto.ArtistId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Rooms.Add(room);

            await _context.SaveChangesAsync();

            return Ok(room);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRoom(int id, CreateRoomDTO dto)
        {
            var room = await _context.Rooms.FindAsync(id);

            if (room == null)
                return NotFound();

            var artistExists = await _context.Artists
                .AnyAsync(a => a.Id == dto.ArtistId);

            if (!artistExists)
                return BadRequest("The selected artist does not exist.");

            room.Name = dto.Name;
            room.Capacity = dto.Capacity;
            room.PricePerHour = dto.PricePerHour;
            room.ArtistId = dto.ArtistId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);

            if (room == null)
                return NotFound();

            _context.Rooms.Remove(room);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
