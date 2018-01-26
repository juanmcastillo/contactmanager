using System.Linq;
using System.Threading.Tasks;
using ContactManager.Infrastructure.DAL.Entities;

namespace ContactManager.Infrastructure.DAL.Repository
{
    public interface IGenericRepository<TEntity> where TEntity : IEntity
    {
        IQueryable<TEntity> GetAll();

        Task<TEntity> GetById(long id);

        Task Save(TEntity entity);

        Task Update(long id, TEntity entity);

        Task Delete(long id);
    }
}
