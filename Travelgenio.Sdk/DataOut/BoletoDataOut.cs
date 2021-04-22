using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travelgenio.Sdk.DataOut
{
    public enum TipoDeVuelo
    {
        Ida,
        Vuelta
    }
    public class BoletoDataOut  
    {
     
        public Guid CodigoBoleto { get; set; }
        public Guid CodigoVuelo { get; set; }
        public string NombrePasajero { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Pasaporte { get; set; }
        public string Email { get; set; }
        public int TipoDeVuelo { get; set; }
        public DateTime FechaSalida { get; set; }
        public DateTime FechaLlegada { get; set; }

        public string AeropuertoOrigen { get; set; }
        public string AeropuertoDestino { get; set; }

        public Guid CodigoAeropuertoOrigen { get; set; }
        public Guid CodigoAeropuertoDestino { get; set; }

        public List<VueloDataOut> Vuelos { get; set; }
        public VueloDataOut  Vuelo { get; set; }
    }
}
