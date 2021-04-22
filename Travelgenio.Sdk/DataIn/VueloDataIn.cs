using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travelgenio.Sdk.DataIn
{
    public class VueloDataIn
    {
        public Guid CodigoVuelo { get; set; }
        public Guid AeropuertoOrigen { get; set; }
        public Guid AeropuertoDestino { get; set; }
        public DateTime FechaSalida { get; set; }
        public DateTime FechaLlegada { get; set; }
        public string Aerolinea { get; set; }
    }
}
