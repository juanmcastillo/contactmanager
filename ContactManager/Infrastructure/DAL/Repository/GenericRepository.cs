using System.Linq;
using System.Threading.Tasks;
using ContactManager.Infrastructure.DAL.Contexts;
using ContactManager.Infrastructure.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContactManager.Infrastructure.DAL.Repository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class, IEntity
    {
        private readonly ContactManagerDbContext _dbContext;

        public GenericRepository(ContactManagerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>()
                             .AsNoTracking();
        }

        public async Task<TEntity> GetById(long id)
        {
            return await _dbContext.Set<TEntity>()
                                   .AsNoTracking()
                                   .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task Save(TEntity entity)
        {
            await _dbContext.Set<TEntity>().AddAsync(entity);

            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(long id, TEntity entity)
        {
            _dbContext.Set<TEntity>().Update(entity);

            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(long id)
        {
            var entity = await GetById(id);

            _dbContext.Set<TEntity>().Remove(entity);

            await _dbContext.SaveChangesAsync();
        }
    }
}