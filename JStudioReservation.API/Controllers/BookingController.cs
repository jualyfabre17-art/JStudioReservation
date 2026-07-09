using JStudioReservation.API.Data;
using JStudioReservation.API.DTOs;
using JStudioReservation.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JStudioReservation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetBookings()
        {
            var bookings = await _context.Bookings
                .Select(b => new BookingDTO
                {
                    Id = b.Id,
                    ArtistId = b.ArtistId,
                    RoomId = b.RoomId,
                    ExtraServiceId = b.ExtraServiceId,
                    StartTime = b.StartTime,
                    EndTime = b.EndTime,
                    Status = b.Status
                })
                .ToListAsync();

            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDTO>> GetBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
                return NotFound();

            var dto = new BookingDTO
            {
                Id = booking.Id,
                ArtistId = booking.ArtistId,
                RoomId = booking.RoomId,
                ExtraServiceId = booking.ExtraServiceId,
                StartTime = booking.StartTime,
                EndTime = booking.EndTime,
                Status = booking.Status
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult> CreateBooking(CreateBookingDTO dto)
        {
            if (!await _context.Artists.AnyAsync(a => a.Id == dto.ArtistId))
                return BadRequest("The selected artist does not exist.");

            if (!await _context.Rooms.AnyAsync(r => r.Id == dto.RoomId))
                return BadRequest("The selected room does not exist.");

            if (dto.ExtraServiceId.HasValue)
            {
                if (!await _context.ExtraServices.AnyAsync(es => es.Id == dto.ExtraServiceId))
                    return BadRequest("The selected extra service does not exist.");
            }

            Booking booking = new Booking
            {
                ArtistId = dto.ArtistId,
                RoomId = dto.RoomId,
                ExtraServiceId = dto.ExtraServiceId,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Status = dto.Status
            };

            _context.Bookings.Add(booking);

            await _context.SaveChangesAsync();

            return Ok(booking);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBooking(int id, CreateBookingDTO dto)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
                return NotFound();

            if (!await _context.Artists.AnyAsync(a => a.Id == dto.ArtistId))
                return BadRequest("The selected artist does not exist.");

            if (!await _context.Rooms.AnyAsync(r => r.Id == dto.RoomId))
                return BadRequest("The selected room does not exist.");

            if (dto.ExtraServiceId.HasValue)
            {
                if (!await _context.ExtraServices.AnyAsync(es => es.Id == dto.ExtraServiceId))
                    return BadRequest("The selected extra service does not exist.");
            }

            booking.ArtistId = dto.ArtistId;
            booking.RoomId = dto.RoomId;
            booking.ExtraServiceId = dto.ExtraServiceId;
            booking.StartTime = dto.StartTime;
            booking.EndTime = dto.EndTime;
            booking.Status = dto.Status;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
                return NotFound();

            _context.Bookings.Remove(booking);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
