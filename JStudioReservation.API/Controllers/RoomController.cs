using Microsoft.AspNetCore.Mvc;
using JStudioReservation.Domain.Entities;
using JStudioReservation.API.DTOs;
using JStudioReservation.Infrastructure.Repositories;

namespace JStudioReservation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly RoomRepository _roomRepository;
        private readonly ArtistRepository _artistRepository;

        public RoomController(RoomRepository roomRepository, ArtistRepository artistRepository)
        {
            _roomRepository = roomRepository;
            _artistRepository = artistRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomDTO>>> GetRooms()
        {
            var rooms = await _roomRepository.GetAllRoomsWithDetailsAsync();
            var roomDTOs = rooms.Select(r => new RoomDTO
            {
                Id = r.Id,
                Name = r.Name,
                PricePerHour = r.PricePerHour,
                Capacity = r.Capacity,
                ArtistId = r.ArtistId,
                ArtistName = r.Artist?.FullName
            });
            return Ok(roomDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoomDTO>> GetRoom(int id)
        {
            var room = await _roomRepository.GetRoomWithDetailsAsync(id);
            if (room == null)
                return NotFound();

            var roomDTO = new RoomDTO
            {
                Id = room.Id,
                Name = room.Name,
                PricePerHour = room.PricePerHour,
                Capacity = room.Capacity,
                ArtistId = room.ArtistId,
                ArtistName = room.Artist?.FullName
            };
            return Ok(roomDTO);
        }

        [HttpGet("artist/{artistId}")]
        public async Task<ActionResult<IEnumerable<RoomDTO>>> GetRoomsByArtist(int artistId)
        {
            var rooms = await _roomRepository.GetRoomsByArtistAsync(artistId);
            var roomDTOs = rooms.Select(r => new RoomDTO
            {
                Id = r.Id,
                Name = r.Name,
                PricePerHour = r.PricePerHour,
                Capacity = r.Capacity,
                ArtistId = r.ArtistId,
                ArtistName = r.Artist?.FullName
            });
            return Ok(roomDTOs);
        }

        [HttpGet("available")]
        public async Task<ActionResult<IEnumerable<RoomDTO>>> GetAvailableRooms(
            [FromQuery] DateTime startTime,
            [FromQuery] DateTime endTime)
        {
            var rooms = await _roomRepository.GetAvailableRoomsAsync(startTime, endTime);
            var roomDTOs = rooms.Select(r => new RoomDTO
            {
                Id = r.Id,
                Name = r.Name,
                PricePerHour = r.PricePerHour,
                Capacity = r.Capacity,
                ArtistId = r.ArtistId
            });
            return Ok(roomDTOs);
        }

        [HttpGet("price-range")]
        public async Task<ActionResult<IEnumerable<RoomDTO>>> GetRoomsByPriceRange(
            [FromQuery] decimal minPrice,
            [FromQuery] decimal maxPrice)
        {
            var rooms = await _roomRepository.GetRoomsByPriceRangeAsync(minPrice, maxPrice);
            var roomDTOs = rooms.Select(r => new RoomDTO
            {
                Id = r.Id,
                Name = r.Name,
                PricePerHour = r.PricePerHour,
                Capacity = r.Capacity,
                ArtistId = r.ArtistId,
                ArtistName = r.Artist?.FullName
            });
            return Ok(roomDTOs);
        }

        [HttpGet("check-availability")]
        public async Task<ActionResult<bool>> CheckRoomAvailability(
            [FromQuery] int roomId,
            [FromQuery] DateTime startTime,
            [FromQuery] DateTime endTime)
        {
            var isAvailable = await _roomRepository.IsRoomAvailableAsync(roomId, startTime, endTime);
            return Ok(isAvailable);
        }

        [HttpPost]
        public async Task<ActionResult<RoomDTO>> CreateRoom([FromBody] CreateRoomDTO createRoomDTO)
        {
            var artist = await _artistRepository.GetByIdAsync(createRoomDTO.ArtistId);
            if (artist == null)
                return BadRequest($"Artist with ID {createRoomDTO.ArtistId} not found");

            var room = new Room
            {
                Name = createRoomDTO.Name,
                PricePerHour = createRoomDTO.PricePerHour,
                Capacity = createRoomDTO.Capacity,
                ArtistId = createRoomDTO.ArtistId
            };

            await _roomRepository.AddAsync(room);
            await _roomRepository.SaveChangesAsync();

            var roomDTO = new RoomDTO
            {
                Id = room.Id,
                Name = room.Name,
                PricePerHour = room.PricePerHour,
                Capacity = room.Capacity,
                ArtistId = room.ArtistId,
                ArtistName = artist.FullName
            };

            return CreatedAtAction(nameof(GetRoom), new { id = room.Id }, roomDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] CreateRoomDTO updateRoomDTO)
        {
            var room = await _roomRepository.GetByIdAsync(id);
            if (room == null)
                return NotFound();

            var artist = await _artistRepository.GetByIdAsync(updateRoomDTO.ArtistId);
            if (artist == null)
                return BadRequest($"Artist with ID {updateRoomDTO.ArtistId} not found");

            room.Name = updateRoomDTO.Name;
            room.PricePerHour = updateRoomDTO.PricePerHour;
            room.Capacity = updateRoomDTO.Capacity;
            room.ArtistId = updateRoomDTO.ArtistId;

            _roomRepository.Update(room);
            await _roomRepository.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _roomRepository.GetRoomWithDetailsAsync(id);
            if (room == null)
                return NotFound();

            var hasActiveBookings = room.Bookings.Any(b => b.Status != "Cancelled" && b.Status != "Completed");
            if (hasActiveBookings)
                return BadRequest("Cannot delete room with active bookings");

            _roomRepository.Delete(room);
            await _roomRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
