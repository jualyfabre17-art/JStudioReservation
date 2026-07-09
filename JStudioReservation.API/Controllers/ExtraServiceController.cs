using JStudioReservation.API.Data;
using JStudioReservation.API.DTOs;
using JStudioReservation.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JStudioReservation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExtraServiceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExtraServiceController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExtraServiceDTO>>> GetExtraServices()
        {
            var extraServices = await _context.ExtraServices
                .Select(es => new ExtraServiceDTO
                {
                    Id = es.Id,
                    Name = es.Name,
                    Price = es.Price,
                    RoomId = es.RoomId
                })
                .ToListAsync();

            return Ok(extraServices);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExtraServiceDTO>> GetExtraService(int id)
        {
            var extraService = await _context.ExtraServices.FindAsync(id);

            if (extraService == null)
                return NotFound();

            var dto = new ExtraServiceDTO
            {
                Id = extraService.Id,
                Name = extraService.Name,
                Price = extraService.Price,
                RoomId = extraService.RoomId
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult> CreateExtraService(CreateExtraServiceDTO dto)
        {
            var roomExists = await _context.Rooms
                .AnyAsync(r => r.Id == dto.RoomId);

            if (!roomExists)
                return BadRequest("The selected room does not exist.");

            ExtraService extraService = new ExtraService
            {
                Name = dto.Name,
                Price = dto.Price,
                RoomId = dto.RoomId
            };

            _context.ExtraServices.Add(extraService);

            await _context.SaveChangesAsync();

            return Ok(extraService);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateExtraService(int id, CreateExtraServiceDTO dto)
        {
            var extraService = await _context.ExtraServices.FindAsync(id);

            if (extraService == null)
                return NotFound();

            var roomExists = await _context.Rooms
                .AnyAsync(r => r.Id == dto.RoomId);

            if (!roomExists)
                return BadRequest("The selected room does not exist.");

            extraService.Name = dto.Name;
            extraService.Price = dto.Price;
            extraService.RoomId = dto.RoomId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteExtraService(int id)
        {
            var extraService = await _context.ExtraServices.FindAsync(id);

            if (extraService == null)
                return NotFound();

            _context.ExtraServices.Remove(extraService);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}