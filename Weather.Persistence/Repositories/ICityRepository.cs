using System.Threading.Tasks;
using Weather.Persistence.Models;

namespace Weather.Persistence.Repositories
{
    public interface ICityRepository : IRepository<City>
    {
        Task<City> GetLastAccessedCityAsync();
        Task InsertOrUpdateCityAsync(City city);
    }
}
