using JStudioReservation.Domain.Core;
using JStudioReservation.Infrastructure.Core;

namespace JStudioReservation.Application.Core
{
    public abstract class BaseService<T> : IBaseService<T> where T : BaseEntity
    {
        protected readonly BaseRepository<T> _repository;

        protected BaseService(BaseRepository<T> repository)
        {
            _repository = repository;
        }

        public virtual async Task<ServiceResult<IEnumerable<T>>> GetAllAsync()
        {
            var data = await _repository.GetAllAsync();
            return ServiceResult<IEnumerable<T>>.Ok(data);
        }

        public virtual async Task<ServiceResult<T>> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
                return ServiceResult<T>.Fail($"Entity with ID {id} not found");
            return ServiceResult<T>.Ok(entity);
        }

        public virtual async Task<ServiceResult<T>> AddAsync(T entity)
        {
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
            return ServiceResult<T>.Ok(entity, "Entity created successfully");
        }

        public virtual async Task<ServiceResult<bool>> UpdateAsync(T entity)
        {
            var existing = await _repository.GetByIdAsync(entity.Id);
            if (existing == null)
                return ServiceResult<bool>.Fail($"Entity with ID {entity.Id} not found");

            _repository.Update(entity);
            await _repository.SaveChangesAsync();
            return ServiceResult<bool>.Ok(true, "Entity updated successfully");
        }

        public virtual async Task<ServiceResult<bool>> DeleteAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
                return ServiceResult<bool>.Fail($"Entity with ID {id} not found");

            _repository.Delete(entity);
            await _repository.SaveChangesAsync();
            return ServiceResult<bool>.Ok(true, "Entity deleted successfully");
        }
    }
}