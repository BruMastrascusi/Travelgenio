using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Travelgenio.DataAccess.Models;
using Travelgenio.Sdk.DataOut;

namespace Travelgenio.BusinessLogic
{
    public class Aeropuerto:IDisposable
    {
        public void Dispose()
        {
            GC.Collect();
        }
      

        public List<AeropuertoDataOut> ObtenerTodos()
        {
            try
            {
                using (AeropuertoDAO aeropuertoDAO = new AeropuertoDAO())
                {

                    return aeropuertoDAO.ObtenerTodos();
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public List<AeropuertoDataOut> ObtenerDestino(Guid codigoAeropuerto)
        {
            try
            {
                using (AeropuertoDAO aeropuertoDAO = new AeropuertoDAO())
                {

                    return aeropuertoDAO.ObtenerDestino(codigoAeropuerto);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}