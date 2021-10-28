using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudLibrary.Models
{
    public class LibraryDataAccess
    {
        masterContext db = new masterContext();

        public IEnumerable<Libraries> GetAllLibraries()
        {
            try
            {
                return db.Libraries.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To Add new library record   
        public int AddLibrary(Libraries library)
        {
            try
            {
                //Resizes the "columns" to avoid values greater than allowed
                if (library.LibraryName.Length > 40)
                    library.LibraryName = library.LibraryName.Substring(0, 40);
                //This one accepts null
                if ((library.Symbol != null) && (library.Symbol.Length > 6))
                    library.Symbol = library.Symbol.Substring(0, 6);

                db.Libraries.Add(library);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar library  
        public int UpdateLibrary(Libraries library)
        {
            try
            {
                db.Entry(library).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular library  
        public Libraries GetLibraryData(int id)
        {
            try
            {
                Libraries library = db.Libraries.Find(id);
                return library;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular library  
        public int DeleteLibrary(int id)
        {
            try
            {
                Libraries lib = db.Libraries.Find(id);
                db.Libraries.Remove(lib);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Get the list of Cities  
        public List<Cities> GetCities()
        {
            List<Cities> lstCity = new List<Cities>();
            lstCity = (from CityList in db.Cities select CityList).ToList();

            return lstCity;
        }

    }
}
