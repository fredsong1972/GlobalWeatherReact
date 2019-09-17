using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GlobalWeatherReact.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Weather.Persistence.Models;

namespace GlobalWeatherReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _service;
        private readonly ILogger _logger;

        public CitiesController(ICityService service, ILogger logger)
        {
            _service = service;
            _logger = logger;

        }

        // GET api/cities
        [HttpGet]
        public async Task<ActionResult<City>> Get()
        {
            var city = await _service.GetLastAccessedCityAsync();
            return city;
        }

        // POST api/cities
        [HttpPost]
        public async Task Post([FromBody] City city)
        {
            await _service.UpdateLastAccessedCityAsync(city);
        }
    }
}