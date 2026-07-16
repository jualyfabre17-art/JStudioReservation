using JStudioReservation.Application.Core;
using JStudioReservation.Domain.Entities;
using JStudioReservation.Infrastructure.Repositories;

namespace JStudioReservation.Application.Services
{
    public class RoomService : BaseService<Room>
    {
        private readonly RoomRepository _roomRepository;
        private readonly ArtistRepository _artistRepository;

        public RoomService(RoomRepository roomRepository, ArtistRepository artistRepository) : base(roomRepository)
        {
            _roomRepository = roomRepository;
            _artistRepository = artistRepository;
        }

        public async Task<ServiceResult<IEnumerable<Room>>> GetRoomsByArtistAsync(int artistId)
        {
            var rooms = await _roomRepository.GetRoomsByArtistAsync(artistId);
            return ServiceResult<IEnumerable<Room>>.Ok(rooms);
        }

        public async Task<ServiceResult<IEnumerable<Room>>> GetAvailableRoomsAsync(DateTime startTime, DateTime endTime)
        {
            var rooms = await _roomRepository.GetAvailableRoomsAsync(startTime, endTime);
            return ServiceResult<IEnumerable<Room>>.Ok(rooms);
        }

        public async Task<ServiceResult<bool>> IsRoomAvailableAsync(int roomId, DateTime startTime, DateTime endTime)
        {
            var isAvailable = await _roomRepository.IsRoomAvailableAsync(roomId, startTime, endTime);
            return ServiceResult<bool>.Ok(isAvailable);
        }

        public override async Task<ServiceResult<Room>> AddAsync(Room entity)
        {
            var validation = await ValidateRoom(entity);
            if (!validation.Success)
                return ServiceResult<Room>.Fail(validation.Message);

            var artist = await _artistRepository.GetByIdAsync(entity.ArtistId);
            if (artist == null)
                return ServiceResult<Room>.Fail($"Artist with ID {entity.ArtistId} not found.");

            return await base.AddAsync(entity);
        }

        public override async Task<ServiceResult<bool>> UpdateAsync(Room entity)
        {
            var validation = await ValidateRoom(entity);
            if (!validation.Success)
                return ServiceResult<bool>.Fail(validation.Message);

            var artist = await _artistRepository.GetByIdAsync(entity.ArtistId);
            if (artist == null)
                return ServiceResult<bool>.Fail($"Artist with ID {entity.ArtistId} not found.");

            return await base.UpdateAsync(entity);
        }

        public override async Task<ServiceResult<bool>> DeleteAsync(int id)
        {
            var room = await _roomRepository.GetRoomWithDetailsAsync(id);
            if (room == null)
                return ServiceResult<bool>.Fail($"Room with ID {id} not found.");

            var hasActiveBookings = room.Bookings.Any(b => b.Status != "Cancelled" && b.Status != "Completed");
            if (hasActiveBookings)
                return ServiceResult<bool>.Fail("Cannot delete room with active bookings.");

            return await base.DeleteAsync(id);
        }

        private async Task<ServiceResult<bool>> ValidateRoom(Room room)
        {
            if (string.IsNullOrWhiteSpace(room.Name))
                return ServiceResult<bool>.Fail("Room name is required.");

            if (room.Name.Length > 100)
                return ServiceResult<bool>.Fail("Room name cannot exceed 100 characters.");

            if (room.PricePerHour <= 0)
                return ServiceResult<bool>.Fail("Price per hour must be greater than 0.");

            if (room.Capacity <= 0)
                return ServiceResult<bool>.Fail("Capacity must be greater than 0.");

            if (room.ArtistId <= 0)
                return ServiceResult<bool>.Fail("ArtistId is required.");

            return ServiceResult<bool>.Ok(true);
        }
    }
}