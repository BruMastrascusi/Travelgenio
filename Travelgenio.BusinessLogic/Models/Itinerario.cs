using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travelgenio.DataAccess.Models;
using Travelgenio.Sdk.DataOut;

namespace Travelgenio.BusinessLogic.Models
{
    public class Itinerario:IDisposable
    {
        public void Dispose()
        {
            GC.Collect();
        }

        public List<ItinerarioDataOut> ObtenerItinerarios()
        {
            try
            {
                using (ItinearioDAO itinearioDAO = new ItinearioDAO())
                {

                    return itinearioDAO.ObtenerItinerarios();
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

    }
}
