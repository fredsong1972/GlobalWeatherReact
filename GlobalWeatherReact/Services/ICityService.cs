using System.Threading.Tasks;
using Weather.Persistence.Models;

namespace GlobalWeatherReact.Services
{
    public interface ICityService
    {
        Task<City> GetLastAccessedCityAsync();
        Task UpdateLastAccessedCityAsync(City city);
    }
}
