using System;
using System.Threading.Tasks;
using Weather.Persistence.Models;
using Serilog;

namespace Weather.Persistence.Repositories
{
    /// <summary>
    /// Generic Repository
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    public class Repository<TEntity> : IRepository<TEntity>
        where TEntity : class
    {
        private readonly IDbContextFactory _dbContextFactory;
        protected ILogger Logger;

        public Repository(IDbContextFactory dbContextFactory, ILogger logger)
        {
            _dbContextFactory = dbContextFactory;
            Logger = logger;
        }

        protected WeatherDbContext DbContext => _dbContextFactory?.DbContext;
        /// <summary>
        /// Get Entity
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<TEntity> GetEntity(object id)
        {
            var entity = await DbContext.FindAsync<TEntity>(id);
            return entity;
        }
        /// <summary>
        /// Add Entity
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task<TEntity> AddEntity(TEntity entity)
        {
            try
            {
                var result = await DbContext.AddAsync<TEntity>(entity);
                await DbContext.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "Unhandled Exception");
                throw;
            }
        }
        /// <summary>
        /// Update Entity
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task<TEntity> UpdateEntity(TEntity entity)
        {
            DbContext.Update<TEntity>(entity);
            await DbContext.SaveChangesAsync();
            return entity;
        }
        /// <summary>
        /// Delete Entity
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> DeleteEntity(object id)
        {
            var entity = await DbContext.FindAsync<TEntity>(id);
            if (entity != null)
            {
                DbContext.Remove<TEntity>(entity);
                await DbContext.SaveChangesAsync();
            }
            return true;
        }
    }
}
