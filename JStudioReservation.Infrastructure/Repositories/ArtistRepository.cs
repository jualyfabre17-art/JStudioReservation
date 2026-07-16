using Microsoft.EntityFrameworkCore;
using JStudioReservation.Domain.Entities;
using JStudioReservation.Infrastructure.Context;
using JStudioReservation.Infrastructure.Core;

namespace JStudioReservation.Infrastructure.Repositories
{
    public class ArtistRepository : BaseRepository<Artist>
    {
        public ArtistRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Artist>> GetByGenreAsync(string genre)
        {
            return await _dbSet
                .Where(a => a.Genre == genre)
                .ToListAsync();
        }

        public async Task<Artist?> GetArtistWithDetailsAsync(int id)
        {
            return await _dbSet
                .Include(a => a.Rooms)
                .Include(a => a.Bookings)
                .FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}
