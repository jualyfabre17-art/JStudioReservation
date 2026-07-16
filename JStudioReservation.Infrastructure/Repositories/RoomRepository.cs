using Microsoft.EntityFrameworkCore;
using JStudioReservation.Domain.Entities;
using JStudioReservation.Infrastructure.Context;
using JStudioReservation.Infrastructure.Core;

namespace JStudioReservation.Infrastructure.Repositories
{
    public class RoomRepository : BaseRepository<Room>
    {
        public RoomRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Room>> GetRoomsByArtistAsync(int artistId)
        {
            return await _dbSet
                .Where(r => r.ArtistId == artistId)
                .Include(r => r.Artist)
                .ToListAsync();
        }

        public async Task<IEnumerable<Room>> GetRoomsByMinCapacityAsync(int minCapacity)
        {
            return await _dbSet
                .Where(r => r.Capacity >= minCapacity)
                .Include(r => r.Artist)
                .ToListAsync();
        }

        public async Task<Room?> GetRoomWithDetailsAsync(int id)
        {
            return await _dbSet
                .Include(r => r.Artist)
                .Include(r => r.ExtraServices)
                .Include(r => r.Bookings)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<IEnumerable<Room>> GetAllRoomsWithDetailsAsync()
        {
            return await _dbSet
                .Include(r => r.Artist)
                .Include(r => r.ExtraServices)
                .Include(r => r.Bookings)
                .ToListAsync();
        }

        public async Task<bool> IsRoomAvailableAsync(int roomId, DateTime startTime, DateTime endTime)
        {
            var hasConflict = await _context.Bookings
                .AnyAsync(b => b.RoomId == roomId &&
                              b.Status != "Cancelled" &&
                              b.Status != "Completed" &&
                              ((startTime >= b.StartTime && startTime < b.EndTime) ||
                               (endTime > b.StartTime && endTime <= b.EndTime) ||
                               (startTime <= b.StartTime && endTime >= b.EndTime)));

            return !hasConflict;
        }

        public async Task<IEnumerable<Room>> GetAvailableRoomsAsync(DateTime startTime, DateTime endTime)
        {
            var allRooms = await _dbSet.ToListAsync();
            var availableRooms = new List<Room>();

            foreach (var room in allRooms)
            {
                var isAvailable = await IsRoomAvailableAsync(room.Id, startTime, endTime);
                if (isAvailable)
                {
                    availableRooms.Add(room);
                }
            }

            return availableRooms;
        }

        public async Task<IEnumerable<Room>> GetRoomsByPriceRangeAsync(decimal minPrice, decimal maxPrice)
        {
            return await _dbSet
                .Where(r => r.PricePerHour >= minPrice && r.PricePerHour <= maxPrice)
                .Include(r => r.Artist)
                .ToListAsync();
        }
    }
}
