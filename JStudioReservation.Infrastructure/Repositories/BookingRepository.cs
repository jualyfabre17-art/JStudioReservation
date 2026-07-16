using Microsoft.EntityFrameworkCore;
using JStudioReservation.Domain.Entities;
using JStudioReservation.Infrastructure.Context;
using JStudioReservation.Infrastructure.Core;

namespace JStudioReservation.Infrastructure.Repositories
{
    public class BookingRepository : BaseRepository<Booking>
    {
        public BookingRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Booking>> GetBookingsByArtistAsync(int artistId)
        {
            return await _dbSet
                .Where(b => b.ArtistId == artistId)
                .Include(b => b.Artist)
                .Include(b => b.Room)
                .Include(b => b.ExtraService)
                .OrderBy(b => b.StartTime)
                .ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetBookingsByRoomAsync(int roomId)
        {
            return await _dbSet
                .Where(b => b.RoomId == roomId)
                .Include(b => b.Artist)
                .Include(b => b.Room)
                .Include(b => b.ExtraService)
                .OrderBy(b => b.StartTime)
                .ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetBookingsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _dbSet
                .Where(b => b.StartTime >= startDate && b.EndTime <= endDate)
                .Include(b => b.Artist)
                .Include(b => b.Room)
                .Include(b => b.ExtraService)
                .OrderBy(b => b.StartTime)
                .ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetBookingsByStatusAsync(string status)
        {
            return await _dbSet
                .Where(b => b.Status == status)
                .Include(b => b.Artist)
                .Include(b => b.Room)
                .Include(b => b.ExtraService)
                .OrderBy(b => b.StartTime)
                .ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetActiveBookingsAsync()
        {
            return await _dbSet
                .Where(b => b.Status == "Pending" || b.Status == "Confirmed")
                .Include(b => b.Artist)
                .Include(b => b.Room)
                .Include(b => b.ExtraService)
                .OrderBy(b => b.StartTime)
                .ToListAsync();
        }

        public async Task<Booking?> GetBookingWithDetailsAsync(int id)
        {
            return await _dbSet
                .Include(b => b.Artist)
                .Include(b => b.Room)
                .Include(b => b.ExtraService)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<Booking>> GetAllBookingsWithDetailsAsync()
        {
            return await _dbSet
                .Include(b => b.Artist)
                .Include(b => b.Room)
                .Include(b => b.ExtraService)
                .OrderBy(b => b.StartTime)
                .ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetBookingsByArtistAndDateRangeAsync(int artistId, DateTime startDate, DateTime endDate)
        {
            return await _dbSet
                .Where(b => b.ArtistId == artistId &&
                           b.StartTime >= startDate &&
                           b.EndTime <= endDate)
                .Include(b => b.Artist)
                .Include(b => b.Room)
                .Include(b => b.ExtraService)
                .OrderBy(b => b.StartTime)
                .ToListAsync();
        }

        public async Task<bool> HasTimeConflictAsync(int roomId, DateTime startTime, DateTime endTime, int? excludeBookingId = null)
        {
            var query = _dbSet
                .Where(b => b.RoomId == roomId &&
                           b.Status != "Cancelled" &&
                           b.Status != "Completed");

            if (excludeBookingId.HasValue)
            {
                query = query.Where(b => b.Id != excludeBookingId.Value);
            }

            return await query.AnyAsync(b =>
                (startTime >= b.StartTime && startTime < b.EndTime) ||
                (endTime > b.StartTime && endTime <= b.EndTime) ||
                (startTime <= b.StartTime && endTime >= b.EndTime));
        }

        public async Task<IEnumerable<Booking>> GetBookingsByExtraServiceAsync(int extraServiceId)
        {
            return await _dbSet
                .Where(b => b.ExtraServiceId == extraServiceId)
                .Include(b => b.Artist)
                .Include(b => b.Room)
                .Include(b => b.ExtraService)
                .OrderBy(b => b.StartTime)
                .ToListAsync();
        }

        public async Task<bool> UpdateBookingStatusAsync(int bookingId, string newStatus)
        {
            var booking = await GetByIdAsync(bookingId);
            if (booking == null)
                return false;

            booking.Status = newStatus;
            Update(booking);
            await SaveChangesAsync();
            return true;
        }

        public async Task<int> GetTotalBookingsByArtistAsync(int artistId)
        {
            return await _dbSet
                .Where(b => b.ArtistId == artistId)
                .CountAsync();
        }

        public async Task<int> GetTotalBookingsByRoomAsync(int roomId)
        {
            return await _dbSet
                .Where(b => b.RoomId == roomId)
                .CountAsync();
        }

        public async Task<IEnumerable<Booking>> GetUpcomingBookingsAsync(int days = 7)
        {
            var now = DateTime.UtcNow;
            var future = now.AddDays(days);

            return await _dbSet
                .Where(b => b.StartTime >= now && b.StartTime <= future &&
                           b.Status != "Cancelled" &&
                           b.Status != "Completed")
                .Include(b => b.Artist)
                .Include(b => b.Room)
                .Include(b => b.ExtraService)
                .OrderBy(b => b.StartTime)
                .ToListAsync();
        }
    }
}