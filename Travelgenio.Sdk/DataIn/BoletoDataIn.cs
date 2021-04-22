using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Travelgenio.Sdk.DataIn;

namespace Travelgenio.Sdk
{
    public enum TipoDeVuelo
    {
        Ida,
        Vuelta
    }
    public class BoletoDataIn
    {
        public Guid CodigoBoleto { get; set; }
        public Guid CodigoVueloIda { get; set; }
        public Guid CodigoVueloVuelta { get; set; }
        public string NombrePasajero { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Pasaporte { get; set; }
        public string Email { get; set; }
        public int TipoDeVuelo { get; set; }
        public List<VueloDataIn> Vuelos { get; set; }

 

    }
}