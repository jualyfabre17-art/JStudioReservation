using Microsoft.EntityFrameworkCore;
using JStudioReservation.Domain.Entities;
using JStudioReservation.Infrastructure.Context;
using JStudioReservation.Infrastructure.Core;

namespace JStudioReservation.Infrastructure.Repositories
{
    public class ExtraServiceRepository : BaseRepository<ExtraService>
    {
        public ExtraServiceRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<ExtraService>> GetServicesByRoomAsync(int roomId)
        {
            return await _dbSet
                .Where(e => e.RoomId == roomId)
                .Include(e => e.Room)
                .Include(e => e.Bookings)
                .ToListAsync();
        }

        public async Task<IEnumerable<ExtraService>> GetServicesByPriceRangeAsync(decimal minPrice, decimal maxPrice)
        {
            return await _dbSet
                .Where(e => e.Price >= minPrice && e.Price <= maxPrice)
                .Include(e => e.Room)
                .ToListAsync();
        }

        public async Task<ExtraService?> GetServiceWithDetailsAsync(int id)
        {
            return await _dbSet
                .Include(e => e.Room)
                .Include(e => e.Bookings)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<ExtraService>> GetAllServicesWithDetailsAsync()
        {
            return await _dbSet
                .Include(e => e.Room)
                .Include(e => e.Bookings)
                .ToListAsync();
        }

        public async Task<IEnumerable<ExtraService>> SearchServicesByNameAsync(string searchTerm)
        {
            return await _dbSet
                .Where(e => e.Name.Contains(searchTerm))
                .Include(e => e.Room)
                .ToListAsync();
        }

        public async Task<IEnumerable<ExtraService>> GetServicesWithoutBookingsAsync()
        {
            return await _dbSet
                .Where(e => !e.Bookings.Any())
                .Include(e => e.Room)
                .ToListAsync();
        }

        public async Task<bool> IsServiceInActiveBookingAsync(int serviceId)
        {
            return await _context.Bookings
                .AnyAsync(b => b.ExtraServiceId == serviceId &&
                              b.Status != "Cancelled" &&
                              b.Status != "Completed");
        }
    }
}
