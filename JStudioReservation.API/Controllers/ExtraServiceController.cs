using Microsoft.AspNetCore.Mvc;
using JStudioReservation.Domain.Entities;
using JStudioReservation.API.DTOs;
using JStudioReservation.Infrastructure.Repositories;

namespace JStudioReservation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExtraServiceController : ControllerBase
    {
        private readonly ExtraServiceRepository _extraServiceRepository;
        private readonly RoomRepository _roomRepository;

        public ExtraServiceController(ExtraServiceRepository extraServiceRepository, RoomRepository roomRepository)
        {
            _extraServiceRepository = extraServiceRepository;
            _roomRepository = roomRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExtraServiceDTO>>> GetExtraServices()
        {
            var services = await _extraServiceRepository.GetAllServicesWithDetailsAsync();
            var serviceDTOs = services.Select(s => new ExtraServiceDTO
            {
                Id = s.Id,
                Name = s.Name,
                Price = s.Price,
                RoomId = s.RoomId,
                RoomName = s.Room?.Name
            });
            return Ok(serviceDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExtraServiceDTO>> GetExtraService(int id)
        {
            var service = await _extraServiceRepository.GetServiceWithDetailsAsync(id);
            if (service == null)
                return NotFound();

            var serviceDTO = new ExtraServiceDTO
            {
                Id = service.Id,
                Name = service.Name,
                Price = service.Price,
                RoomId = service.RoomId,
                RoomName = service.Room?.Name
            };
            return Ok(serviceDTO);
        }

        [HttpGet("room/{roomId}")]
        public async Task<ActionResult<IEnumerable<ExtraServiceDTO>>> GetServicesByRoom(int roomId)
        {
            var services = await _extraServiceRepository.GetServicesByRoomAsync(roomId);
            var serviceDTOs = services.Select(s => new ExtraServiceDTO
            {
                Id = s.Id,
                Name = s.Name,
                Price = s.Price,
                RoomId = s.RoomId,
                RoomName = s.Room?.Name
            });
            return Ok(serviceDTOs);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ExtraServiceDTO>>> SearchServices([FromQuery] string term)
        {
            var services = await _extraServiceRepository.SearchServicesByNameAsync(term);
            var serviceDTOs = services.Select(s => new ExtraServiceDTO
            {
                Id = s.Id,
                Name = s.Name,
                Price = s.Price,
                RoomId = s.RoomId,
                RoomName = s.Room?.Name
            });
            return Ok(serviceDTOs);
        }

        [HttpGet("price-range")]
        public async Task<ActionResult<IEnumerable<ExtraServiceDTO>>> GetServicesByPriceRange(
            [FromQuery] decimal minPrice,
            [FromQuery] decimal maxPrice)
        {
            var services = await _extraServiceRepository.GetServicesByPriceRangeAsync(minPrice, maxPrice);
            var serviceDTOs = services.Select(s => new ExtraServiceDTO
            {
                Id = s.Id,
                Name = s.Name,
                Price = s.Price,
                RoomId = s.RoomId,
                RoomName = s.Room?.Name
            });
            return Ok(serviceDTOs);
        }

        [HttpPost]
        public async Task<ActionResult<ExtraServiceDTO>> CreateExtraService([FromBody] CreateExtraServiceDTO createDTO)
        {
            var room = await _roomRepository.GetByIdAsync(createDTO.RoomId);
            if (room == null)
                return BadRequest($"Room with ID {createDTO.RoomId} not found");

            var service = new ExtraService
            {
                Name = createDTO.Name,
                Price = createDTO.Price,
                RoomId = createDTO.RoomId
            };

            await _extraServiceRepository.AddAsync(service);
            await _extraServiceRepository.SaveChangesAsync();

            var serviceDTO = new ExtraServiceDTO
            {
                Id = service.Id,
                Name = service.Name,
                Price = service.Price,
                RoomId = service.RoomId,
                RoomName = room.Name
            };

            return CreatedAtAction(nameof(GetExtraService), new { id = service.Id }, serviceDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExtraService(int id, [FromBody] CreateExtraServiceDTO updateDTO)
        {
            var service = await _extraServiceRepository.GetServiceWithDetailsAsync(id);
            if (service == null)
                return NotFound();

            var room = await _roomRepository.GetByIdAsync(updateDTO.RoomId);
            if (room == null)
                return BadRequest($"Room with ID {updateDTO.RoomId} not found");

            service.Name = updateDTO.Name;
            service.Price = updateDTO.Price;
            service.RoomId = updateDTO.RoomId;

            _extraServiceRepository.Update(service);
            await _extraServiceRepository.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExtraService(int id)
        {
            var service = await _extraServiceRepository.GetServiceWithDetailsAsync(id);
            if (service == null)
                return NotFound();

            var isInActiveBooking = await _extraServiceRepository.IsServiceInActiveBookingAsync(id);
            if (isInActiveBooking)
                return BadRequest("Cannot delete service that is being used in active bookings");

            _extraServiceRepository.Delete(service);
            await _extraServiceRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}