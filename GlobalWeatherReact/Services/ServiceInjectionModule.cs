using Microsoft.Extensions.DependencyInjection;

namespace GlobalWeatherReact.Services
{
    public static class ServiceInjectionModule
    {
        /// <summary>
        /// Dependency inject services
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection InjectServices(this IServiceCollection services)
        {
            services.AddTransient<ICityService, CityService>();
            return services;
        }
    }
}
