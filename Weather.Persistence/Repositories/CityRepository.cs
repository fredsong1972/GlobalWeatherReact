using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Weather.Persistence.Models;
using Serilog;

namespace Weather.Persistence.Repositories
{
    public class CityRepository : Repository<City>, ICityRepository
    {
        public CityRepository(IDbContextFactory dbContextFactory, ILogger logger) : base(dbContextFactory, logger)
        {
        }
        /// <summary>
        /// GetLastAccessedCityAsync
        /// </summary>
        /// <returns>City</returns>
        public async Task<City> GetLastAccessedCityAsync()
        {
            var city = await DbContext.Cities.OrderByDescending(x=>x.AccessedDate).FirstOrDefaultAsync();
            return city;
        }

        /// <summary>
        /// InsertOrUpdateCityAsync
        /// </summary>
        /// <param name="city"></param>
        /// <returns></returns>
        public async Task InsertOrUpdateCityAsync(City city)
        {
            var entity = await GetEntity(city.Id);
            if (entity != null)
            {
                entity.Name = city.Name;
                entity.CountryId = city.CountryId;
                entity.AccessedDate = city.AccessedDate;
                await UpdateEntity(entity);
            }
            else
            {
                await AddEntity(city);
            }
        }
    }
}
