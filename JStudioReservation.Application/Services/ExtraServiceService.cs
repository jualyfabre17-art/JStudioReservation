using JStudioReservation.Application.Core;
using JStudioReservation.Domain.Entities;
using JStudioReservation.Infrastructure.Repositories;

namespace JStudioReservation.Application.Services
{
    public class ExtraServiceService : BaseService<ExtraService>
    {
        private readonly ExtraServiceRepository _extraServiceRepository;
        private readonly RoomRepository _roomRepository;

        public ExtraServiceService(ExtraServiceRepository extraServiceRepository, RoomRepository roomRepository) : base(extraServiceRepository)
        {
            _extraServiceRepository = extraServiceRepository;
            _roomRepository = roomRepository;
        }

        public async Task<ServiceResult<IEnumerable<ExtraService>>> GetServicesByRoomAsync(int roomId)
        {
            var services = await _extraServiceRepository.GetServicesByRoomAsync(roomId);
            return ServiceResult<IEnumerable<ExtraService>>.Ok(services);
        }

        public async Task<ServiceResult<IEnumerable<ExtraService>>> SearchServicesByNameAsync(string searchTerm)
        {
            var services = await _extraServiceRepository.SearchServicesByNameAsync(searchTerm);
            return ServiceResult<IEnumerable<ExtraService>>.Ok(services);
        }

        public override async Task<ServiceResult<ExtraService>> AddAsync(ExtraService entity)
        {
            var validation = await ValidateExtraService(entity);
            if (!validation.Success)
                return ServiceResult<ExtraService>.Fail(validation.Message);

            var room = await _roomRepository.GetByIdAsync(entity.RoomId);
            if (room == null)
                return ServiceResult<ExtraService>.Fail($"Room with ID {entity.RoomId} not found.");

            return await base.AddAsync(entity);
        }

        public override async Task<ServiceResult<bool>> UpdateAsync(ExtraService entity)
        {
            var validation = await ValidateExtraService(entity);
            if (!validation.Success)
                return ServiceResult<bool>.Fail(validation.Message);

            var room = await _roomRepository.GetByIdAsync(entity.RoomId);
            if (room == null)
                return ServiceResult<bool>.Fail($"Room with ID {entity.RoomId} not found.");

            return await base.UpdateAsync(entity);
        }

        public override async Task<ServiceResult<bool>> DeleteAsync(int id)
        {
            var service = await _extraServiceRepository.GetServiceWithDetailsAsync(id);
            if (service == null)
                return ServiceResult<bool>.Fail($"ExtraService with ID {id} not found.");

            var isInActiveBooking = await _extraServiceRepository.IsServiceInActiveBookingAsync(id);
            if (isInActiveBooking)
                return ServiceResult<bool>.Fail("Cannot delete service that is being used in active bookings.");

            return await base.DeleteAsync(id);
        }

        private async Task<ServiceResult<bool>> ValidateExtraService(ExtraService service)
        {
            if (string.IsNullOrWhiteSpace(service.Name))
                return ServiceResult<bool>.Fail("Service name is required.");

            if (service.Name.Length > 100)
                return ServiceResult<bool>.Fail("Service name cannot exceed 100 characters.");

            if (service.Price < 0)
                return ServiceResult<bool>.Fail("Price cannot be negative.");

            if (service.RoomId <= 0)
                return ServiceResult<bool>.Fail("RoomId is required.");

            return ServiceResult<bool>.Ok(true);
        }
    }
}
