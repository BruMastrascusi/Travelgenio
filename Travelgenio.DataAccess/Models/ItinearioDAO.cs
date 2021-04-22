using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travelgenio.DataAccess.SDK;
using Travelgenio.Sdk.DataOut;

namespace Travelgenio.DataAccess.Models
{
    public class ItinearioDAO:IDisposable
    {
        public void Dispose()
        {
            GC.Collect();
        }

        public List<ItinerarioDataOut> ObtenerItinerarios()
        {
            string sentence = @"Select * From Boletos order by CodigoBoleto, TipoDeVuelo";
            DataTable data = Ejecutar.GetDatatable(sentence, null);
            List<ItinerarioDataOut> itinerarios = new List<ItinerarioDataOut>();

            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {

                 
                    
                    ItinerarioDataOut itinerario = new ItinerarioDataOut();
                    itinerario.Boletos = new List<BoletoDataOut>();
                    itinerario.NombrePasajero = Convert.ToString(row["NombrePasajero"]);
                    itinerario.Pasaporte = Convert.ToString(row["Pasaporte"]);
                    itinerario.Email = Convert.ToString(row["Email"]);


                    BoletoDataOut boleto = new BoletoDataOut();

                    boleto.CodigoBoleto = Guid.Parse(row["CodigoBoleto"].ToString());
                    boleto.CodigoVuelo  = Guid.Parse(row["CodigoVuelo"].ToString());
                    boleto.TipoDeVuelo = Convert.ToInt32(row["TipoDeVuelo"]);
                   

                    itinerario.Boletos.Add(boleto);  
                    itinerarios.Add(itinerario);
                }
            }
            return itinerarios;
        }
    }
}
