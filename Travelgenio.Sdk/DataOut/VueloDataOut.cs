using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travelgenio.Sdk.DataOut
{
    public class VueloDataOut
    {
        public Guid CodigoVuelo { get; set; }
        public string NombreAeropuerto { get; set; }
        public string NombreAeropuertoDestino { get; set; }
        public string Aerolinea { get; set; }
        public DateTime FechaSalida { get; set; }
        public DateTime FechaLlegada { get; set; }
        public string DatosGenerales { get; set; }
    }
}
