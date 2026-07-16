using Microsoft.AspNetCore.Mvc;
using JStudioReservation.Domain.Entities;
using JStudioReservation.API.DTOs;
using JStudioReservation.Infrastructure.Repositories;

namespace JStudioReservation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly BookingRepository _bookingRepository;
        private readonly ArtistRepository _artistRepository;
        private readonly RoomRepository _roomRepository;
        private readonly ExtraServiceRepository _extraServiceRepository;

        public BookingController(
            BookingRepository bookingRepository,
            ArtistRepository artistRepository,
            RoomRepository roomRepository,
            ExtraServiceRepository extraServiceRepository)
        {
            _bookingRepository = bookingRepository;
            _artistRepository = artistRepository;
            _roomRepository = roomRepository;
            _extraServiceRepository = extraServiceRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetBookings()
        {
            var bookings = await _bookingRepository.GetAllBookingsWithDetailsAsync();
            var bookingDTOs = bookings.Select(b => new BookingDTO
            {
                Id = b.Id,
                ArtistId = b.ArtistId,
                ArtistName = b.Artist?.FullName,
                RoomId = b.RoomId,
                RoomName = b.Room?.Name,
                ExtraServiceId = b.ExtraServiceId,
                ExtraServiceName = b.ExtraService?.Name,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                Status = b.Status
            });
            return Ok(bookingDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDTO>> GetBooking(int id)
        {
            var booking = await _bookingRepository.GetBookingWithDetailsAsync(id);
            if (booking == null)
                return NotFound();

            var bookingDTO = new BookingDTO
            {
                Id = booking.Id,
                ArtistId = booking.ArtistId,
                ArtistName = booking.Artist?.FullName,
                RoomId = booking.RoomId,
                RoomName = booking.Room?.Name,
                ExtraServiceId = booking.ExtraServiceId,
                ExtraServiceName = booking.ExtraService?.Name,
                StartTime = booking.StartTime,
                EndTime = booking.EndTime,
                Status = booking.Status
            };
            return Ok(bookingDTO);
        }

        [HttpGet("artist/{artistId}")]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetBookingsByArtist(int artistId)
        {
            var bookings = await _bookingRepository.GetBookingsByArtistAsync(artistId);
            var bookingDTOs = bookings.Select(b => new BookingDTO
            {
                Id = b.Id,
                ArtistId = b.ArtistId,
                ArtistName = b.Artist?.FullName,
                RoomId = b.RoomId,
                RoomName = b.Room?.Name,
                ExtraServiceId = b.ExtraServiceId,
                ExtraServiceName = b.ExtraService?.Name,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                Status = b.Status
            });
            return Ok(bookingDTOs);
        }

        [HttpGet("room/{roomId}")]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetBookingsByRoom(int roomId)
        {
            var bookings = await _bookingRepository.GetBookingsByRoomAsync(roomId);
            var bookingDTOs = bookings.Select(b => new BookingDTO
            {
                Id = b.Id,
                ArtistId = b.ArtistId,
                ArtistName = b.Artist?.FullName,
                RoomId = b.RoomId,
                RoomName = b.Room?.Name,
                ExtraServiceId = b.ExtraServiceId,
                ExtraServiceName = b.ExtraService?.Name,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                Status = b.Status
            });
            return Ok(bookingDTOs);
        }

        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetBookingsByStatus(string status)
        {
            var bookings = await _bookingRepository.GetBookingsByStatusAsync(status);
            var bookingDTOs = bookings.Select(b => new BookingDTO
            {
                Id = b.Id,
                ArtistId = b.ArtistId,
                ArtistName = b.Artist?.FullName,
                RoomId = b.RoomId,
                RoomName = b.Room?.Name,
                ExtraServiceId = b.ExtraServiceId,
                ExtraServiceName = b.ExtraService?.Name,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                Status = b.Status
            });
            return Ok(bookingDTOs);
        }

        [HttpGet("date-range")]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetBookingsByDateRange(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            var bookings = await _bookingRepository.GetBookingsByDateRangeAsync(startDate, endDate);
            var bookingDTOs = bookings.Select(b => new BookingDTO
            {
                Id = b.Id,
                ArtistId = b.ArtistId,
                ArtistName = b.Artist?.FullName,
                RoomId = b.RoomId,
                RoomName = b.Room?.Name,
                ExtraServiceId = b.ExtraServiceId,
                ExtraServiceName = b.ExtraService?.Name,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                Status = b.Status
            });
            return Ok(bookingDTOs);
        }

        [HttpGet("upcoming")]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetUpcomingBookings([FromQuery] int days = 7)
        {
            var bookings = await _bookingRepository.GetUpcomingBookingsAsync(days);
            var bookingDTOs = bookings.Select(b => new BookingDTO
            {
                Id = b.Id,
                ArtistId = b.ArtistId,
                ArtistName = b.Artist?.FullName,
                RoomId = b.RoomId,
                RoomName = b.Room?.Name,
                ExtraServiceId = b.ExtraServiceId,
                ExtraServiceName = b.ExtraService?.Name,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                Status = b.Status
            });
            return Ok(bookingDTOs);
        }

        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetActiveBookings()
        {
            var bookings = await _bookingRepository.GetActiveBookingsAsync();
            var bookingDTOs = bookings.Select(b => new BookingDTO
            {
                Id = b.Id,
                ArtistId = b.ArtistId,
                ArtistName = b.Artist?.FullName,
                RoomId = b.RoomId,
                RoomName = b.Room?.Name,
                ExtraServiceId = b.ExtraServiceId,
                ExtraServiceName = b.ExtraService?.Name,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                Status = b.Status
            });
            return Ok(bookingDTOs);
        }

        [HttpGet("artist/{artistId}/total")]
        public async Task<ActionResult<int>> GetTotalBookingsByArtist(int artistId)
        {
            var total = await _bookingRepository.GetTotalBookingsByArtistAsync(artistId);
            return Ok(total);
        }

        [HttpGet("room/{roomId}/total")]
        public async Task<ActionResult<int>> GetTotalBookingsByRoom(int roomId)
        {
            var total = await _bookingRepository.GetTotalBookingsByRoomAsync(roomId);
            return Ok(total);
        }

        [HttpPost]
        public async Task<ActionResult<BookingDTO>> CreateBooking([FromBody] CreateBookingDTO createDTO)
        {
            var artist = await _artistRepository.GetByIdAsync(createDTO.ArtistId);
            if (artist == null)
                return BadRequest($"Artist with ID {createDTO.ArtistId} not found");

            var room = await _roomRepository.GetByIdAsync(createDTO.RoomId);
            if (room == null)
                return BadRequest($"Room with ID {createDTO.RoomId} not found");

            if (createDTO.ExtraServiceId.HasValue)
            {
                var extraService = await _extraServiceRepository.GetByIdAsync(createDTO.ExtraServiceId.Value);
                if (extraService == null)
                    return BadRequest($"ExtraService with ID {createDTO.ExtraServiceId} not found");
            }

            var hasConflict = await _bookingRepository.HasTimeConflictAsync(
                createDTO.RoomId,
                createDTO.StartTime,
                createDTO.EndTime);

            if (hasConflict)
                return BadRequest("Time conflict: Room is already booked for the selected time");

            var booking = new Booking
            {
                ArtistId = createDTO.ArtistId,
                RoomId = createDTO.RoomId,
                ExtraServiceId = createDTO.ExtraServiceId,
                StartTime = createDTO.StartTime,
                EndTime = createDTO.EndTime,
                Status = createDTO.Status ?? "Pending"
            };

            await _bookingRepository.AddAsync(booking);
            await _bookingRepository.SaveChangesAsync();

            var bookingDTO = new BookingDTO
            {
                Id = booking.Id,
                ArtistId = booking.ArtistId,
                ArtistName = artist.FullName,
                RoomId = booking.RoomId,
                RoomName = room.Name,
                ExtraServiceId = booking.ExtraServiceId,
                ExtraServiceName = booking.ExtraService?.Name,
                StartTime = booking.StartTime,
                EndTime = booking.EndTime,
                Status = booking.Status
            };

            return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, bookingDTO);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateBookingStatus(int id, [FromBody] string status)
        {
            var booking = await _bookingRepository.GetBookingWithDetailsAsync(id);
            if (booking == null)
                return NotFound();

            var validStatuses = new[] { "Pending", "Confirmed", "Cancelled", "Completed" };
            if (!validStatuses.Contains(status))
                return BadRequest($"Invalid status. Valid statuses: {string.Join(", ", validStatuses)}");

            booking.Status = status;
            _bookingRepository.Update(booking);
            await _bookingRepository.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(int id, [FromBody] CreateBookingDTO updateDTO)
        {
            var booking = await _bookingRepository.GetBookingWithDetailsAsync(id);
            if (booking == null)
                return NotFound();

            var artist = await _artistRepository.GetByIdAsync(updateDTO.ArtistId);
            if (artist == null)
                return BadRequest($"Artist with ID {updateDTO.ArtistId} not found");

            var room = await _roomRepository.GetByIdAsync(updateDTO.RoomId);
            if (room == null)
                return BadRequest($"Room with ID {updateDTO.RoomId} not found");

            if (updateDTO.ExtraServiceId.HasValue)
            {
                var extraService = await _extraServiceRepository.GetByIdAsync(updateDTO.ExtraServiceId.Value);
                if (extraService == null)
                    return BadRequest($"ExtraService with ID {updateDTO.ExtraServiceId} not found");
            }

            var hasConflict = await _bookingRepository.HasTimeConflictAsync(
                updateDTO.RoomId,
                updateDTO.StartTime,
                updateDTO.EndTime,
                id);

            if (hasConflict)
                return BadRequest("Time conflict: Room is already booked for the selected time");

            booking.ArtistId = updateDTO.ArtistId;
            booking.RoomId = updateDTO.RoomId;
            booking.ExtraServiceId = updateDTO.ExtraServiceId;
            booking.StartTime = updateDTO.StartTime;
            booking.EndTime = updateDTO.EndTime;
            booking.Status = updateDTO.Status ?? booking.Status;

            _bookingRepository.Update(booking);
            await _bookingRepository.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _bookingRepository.GetByIdAsync(id);
            if (booking == null)
                return NotFound();

            if (booking.Status == "Confirmed" || booking.Status == "Completed")
                return BadRequest($"Cannot delete booking with status '{booking.Status}'");

            _bookingRepository.Delete(booking);
            await _bookingRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
