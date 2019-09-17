using Weather.Persistence.Config;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Weather.Persistence.Models;
using System;

namespace Weather.Persistence.Repositories
{
    public class DbContextFactory : IDbContextFactory, IDisposable
    {
        /// <summary>
        /// Create Db context with connection string
        /// </summary>
        /// <param name="settings"></param>
        public DbContextFactory(IOptions<DbContextSettings> settings) 
        {
            var options = new DbContextOptionsBuilder<WeatherDbContext>().UseSqlServer(settings.Value.DbConnectionString).Options;
            DbContext = new WeatherDbContext(options);
        }

        /// <summary>
        /// Call Dispose to release DbContext
        /// </summary>
        ~DbContextFactory()
        {
            Dispose();
        }

        public WeatherDbContext DbContext { get; private set; }
        /// <summary>
        /// Release DB context
        /// </summary>
        public void Dispose()
        {
            DbContext?.Dispose();
        }
    }
}
