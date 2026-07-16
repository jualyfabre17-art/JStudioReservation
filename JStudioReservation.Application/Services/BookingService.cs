using JStudioReservation.Application.Core;
using JStudioReservation.Domain.Entities;
using JStudioReservation.Infrastructure.Repositories;

namespace JStudioReservation.Application.Services
{
    public class BookingService : BaseService<Booking>
    {
        private readonly BookingRepository _bookingRepository;
        private readonly ArtistRepository _artistRepository;
        private readonly RoomRepository _roomRepository;
        private readonly ExtraServiceRepository _extraServiceRepository;

        public BookingService(
            BookingRepository bookingRepository,
            ArtistRepository artistRepository,
            RoomRepository roomRepository,
            ExtraServiceRepository extraServiceRepository) : base(bookingRepository)
        {
            _bookingRepository = bookingRepository;
            _artistRepository = artistRepository;
            _roomRepository = roomRepository;
            _extraServiceRepository = extraServiceRepository;
        }

        public async Task<ServiceResult<IEnumerable<Booking>>> GetBookingsByArtistAsync(int artistId)
        {
            var bookings = await _bookingRepository.GetBookingsByArtistAsync(artistId);
            return ServiceResult<IEnumerable<Booking>>.Ok(bookings);
        }

        public async Task<ServiceResult<IEnumerable<Booking>>> GetBookingsByRoomAsync(int roomId)
        {
            var bookings = await _bookingRepository.GetBookingsByRoomAsync(roomId);
            return ServiceResult<IEnumerable<Booking>>.Ok(bookings);
        }

        public async Task<ServiceResult<IEnumerable<Booking>>> GetBookingsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            var bookings = await _bookingRepository.GetBookingsByDateRangeAsync(startDate, endDate);
            return ServiceResult<IEnumerable<Booking>>.Ok(bookings);
        }

        public async Task<ServiceResult<IEnumerable<Booking>>> GetBookingsByStatusAsync(string status)
        {
            var bookings = await _bookingRepository.GetBookingsByStatusAsync(status);
            return ServiceResult<IEnumerable<Booking>>.Ok(bookings);
        }

        public async Task<ServiceResult<IEnumerable<Booking>>> GetActiveBookingsAsync()
        {
            var bookings = await _bookingRepository.GetActiveBookingsAsync();
            return ServiceResult<IEnumerable<Booking>>.Ok(bookings);
        }

        public async Task<ServiceResult<IEnumerable<Booking>>> GetUpcomingBookingsAsync(int days = 7)
        {
            var bookings = await _bookingRepository.GetUpcomingBookingsAsync(days);
            return ServiceResult<IEnumerable<Booking>>.Ok(bookings);
        }

        public async Task<ServiceResult<Booking>> GetBookingWithDetailsAsync(int id)
        {
            var booking = await _bookingRepository.GetBookingWithDetailsAsync(id);
            if (booking == null)
                return ServiceResult<Booking>.Fail($"Booking with ID {id} not found.");
            return ServiceResult<Booking>.Ok(booking);
        }

        public async Task<ServiceResult<bool>> UpdateBookingStatusAsync(int bookingId, string newStatus)
        {
            var validStatuses = new[] { "Pending", "Confirmed", "Cancelled", "Completed" };
            if (!validStatuses.Contains(newStatus))
                return ServiceResult<bool>.Fail($"Invalid status. Valid statuses: {string.Join(", ", validStatuses)}");

            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null)
                return ServiceResult<bool>.Fail($"Booking with ID {bookingId} not found.");

            booking.Status = newStatus;
            _bookingRepository.Update(booking);
            await _bookingRepository.SaveChangesAsync();

            return ServiceResult<bool>.Ok(true, "Booking status updated successfully.");
        }

        public override async Task<ServiceResult<Booking>> AddAsync(Booking entity)
        {
            var validation = await ValidateBooking(entity);
            if (!validation.Success)
                return ServiceResult<Booking>.Fail(validation.Message);

            var hasConflict = await _bookingRepository.HasTimeConflictAsync(entity.RoomId, entity.StartTime, entity.EndTime);
            if (hasConflict)
                return ServiceResult<Booking>.Fail("Time conflict: Room is already booked for the selected time.");

            return await base.AddAsync(entity);
        }

        public override async Task<ServiceResult<bool>> UpdateAsync(Booking entity)
        {
            var validation = await ValidateBooking(entity);
            if (!validation.Success)
                return ServiceResult<bool>.Fail(validation.Message);

            var existingBooking = await _bookingRepository.GetByIdAsync(entity.Id);
            if (existingBooking == null)
                return ServiceResult<bool>.Fail($"Booking with ID {entity.Id} not found.");

            var hasConflict = await _bookingRepository.HasTimeConflictAsync(entity.RoomId, entity.StartTime, entity.EndTime, entity.Id);
            if (hasConflict)
                return ServiceResult<bool>.Fail("Time conflict: Room is already booked for the selected time.");

            return await base.UpdateAsync(entity);
        }

        public override async Task<ServiceResult<bool>> DeleteAsync(int id)
        {
            var booking = await _bookingRepository.GetByIdAsync(id);
            if (booking == null)
                return ServiceResult<bool>.Fail($"Booking with ID {id} not found.");

            if (booking.Status == "Confirmed" || booking.Status == "Completed")
                return ServiceResult<bool>.Fail($"Cannot delete booking with status '{booking.Status}'.");

            return await base.DeleteAsync(id);
        }

        private async Task<ServiceResult<bool>> ValidateBooking(Booking booking)
        {
            var artist = await _artistRepository.GetByIdAsync(booking.ArtistId);
            if (artist == null)
                return ServiceResult<bool>.Fail($"Artist with ID {booking.ArtistId} not found.");

            var room = await _roomRepository.GetByIdAsync(booking.RoomId);
            if (room == null)
                return ServiceResult<bool>.Fail($"Room with ID {booking.RoomId} not found.");

            if (booking.ExtraServiceId.HasValue)
            {
                var extraService = await _extraServiceRepository.GetByIdAsync(booking.ExtraServiceId.Value);
                if (extraService == null)
                    return ServiceResult<bool>.Fail($"ExtraService with ID {booking.ExtraServiceId} not found.");
            }

            if (booking.StartTime >= booking.EndTime)
                return ServiceResult<bool>.Fail("Start time must be before end time.");

            if (booking.StartTime < DateTime.UtcNow)
                return ServiceResult<bool>.Fail("Start time cannot be in the past.");

           
            if (!string.IsNullOrEmpty(booking.Status))
            {
                var validStatuses = new[] { "Pending", "Confirmed", "Cancelled", "Completed" };
                if (!validStatuses.Contains(booking.Status))
                    return ServiceResult<bool>.Fail($"Invalid status. Valid statuses: {string.Join(", ", validStatuses)}");
            }

            return ServiceResult<bool>.Ok(true);
        }
    }
}
