using System;
using System.Threading.Tasks;
using Weather.Persistence.Repositories;
using Weather.Persistence.Models;
using Serilog;

namespace GlobalWeatherReact.Services
{
    public class CityService : ICityService
    {
        private readonly ICityRepository _repository;
        private readonly ILogger _logger;
        public CityService(ICityRepository repository, ILogger logger)
        {
            _repository = repository;
            _logger = logger;
        }
        /// <summary>
        /// GetLastAccessedCityAsync
        /// </summary>
        /// <returns>City</returns>

        public async Task<City> GetLastAccessedCityAsync()
        {
            var city = await _repository.GetLastAccessedCityAsync();
            return city;
        }

        /// <summary>
        /// UpdateLastAccessedCityAsync
        /// </summary>
        /// <param name="city"></param>
        /// <returns></returns>
        public async Task UpdateLastAccessedCityAsync(City city)
        {
            city.AccessedDate = DateTimeOffset.UtcNow;
            await _repository.InsertOrUpdateCityAsync(city);
        }
    }
}
