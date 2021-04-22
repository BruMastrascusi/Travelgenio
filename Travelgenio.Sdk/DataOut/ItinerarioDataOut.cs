using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travelgenio.Sdk.DataOut
{
    public class ItinerarioDataOut
    {
       
        public string NombrePasajero { get; set; }
        public string Pasaporte { get; set; }
        public string Email { get; set; }
        public List<BoletoDataOut> Boletos { get; set; }
     
    }
}
