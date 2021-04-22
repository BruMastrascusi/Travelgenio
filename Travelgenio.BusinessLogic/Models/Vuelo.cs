using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Travelgenio.DataAccess.Models;
using Travelgenio.Sdk.DataOut;

namespace Travelgenio.BusinessLogic
{
    public class Vuelo:IDisposable
    {
        public void Dispose()
        {
            GC.Collect();
        }

        public List<VueloDataOut> ObtenerVuelos(Guid codioOrigen)
        {
            try
            {
                using (VueloDAO vuelosDAO = new VueloDAO())
                {

                   return vuelosDAO.ObtenerVuelos(codioOrigen);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public List<VueloDataOut> ObtenerVuelosCodigo(Guid codioOrigen)
        {
            try
            {
                using (VueloDAO vuelosDAO = new VueloDAO())
                {

                    return vuelosDAO.ObtenerVuelosCodigo(codioOrigen);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        

    }

 
   
 

}
