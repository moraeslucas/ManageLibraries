using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactCrudLibrary.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactCrudLibrary.Controllers
{
    public class LibraryController : Controller
    {
        LibraryDataAccess objLibrary = new LibraryDataAccess();

        [HttpGet]
        [Route("api/Library/Index")]
        public IEnumerable<Libraries> Index()
        {
            return objLibrary.GetAllLibraries();
        }

        [HttpPost]
        [Route("api/Library/Create")]
        public int Create(Libraries library)
        {
            return objLibrary.AddLibrary(library);
        }

        [HttpGet]
        [Route("api/Library/Details/{id}")]
        public Libraries Details(int id)
        {
            return objLibrary.GetLibraryData(id);
        }

        [HttpPut]
        [Route("api/Library/Edit")]
        public int Edit(Libraries library)
        {
            return objLibrary.UpdateLibrary(library);
        }

        [HttpDelete]
        [Route("api/Library/Delete/{id}")]
        public int Delete(int id)
        {
            return objLibrary.DeleteLibrary(id);
        }

        [HttpGet]
        [Route("api/Library/GetCityList")]
        public IEnumerable<Cities> Details()
        {
            return objLibrary.GetCities();
        }
    }
}
