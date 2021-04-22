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
    public class AeropuertoDAO:IDisposable
    {
        public void Dispose()
        {
            GC.Collect();
        }

        public List<AeropuertoDataOut> ObtenerTodos()
        {
            string sentence = @"Select * From Aeropuertos order by CodigoAeropuerto";
            DataTable data = Ejecutar.GetDatatable(sentence, null);
            List<AeropuertoDataOut> aeropuertos = new List<AeropuertoDataOut>();

            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    AeropuertoDataOut aeropuerto = new AeropuertoDataOut();
                    aeropuerto.CodigoAeropuerto = Guid.Parse(row["CodigoAeropuerto"].ToString().Trim());
                    aeropuerto.NombreAeropuerto = Convert.ToString(row["NombreAeropuerto"]).Trim();
                    aeropuertos.Add(aeropuerto);
                }
            }
            return aeropuertos;
        }

        public List<AeropuertoDataOut> ObtenerDestino(Guid CodigoAeropuerto)
        {
            string sentence = @"Select * From Aeropuertos where CodigoAeropuerto <> @CodigoAeropuerto ";

            List<DataServiceParameter> lstParams = new List<DataServiceParameter>();
            lstParams.Add(DataServiceParameter.Create("@CodigoAeropuerto", CodigoAeropuerto));
            DataTable data = Ejecutar.GetDatatable(sentence, lstParams);

            List<AeropuertoDataOut> aeropuertos = new List<AeropuertoDataOut>();
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    AeropuertoDataOut aeropuerto = new AeropuertoDataOut();
                    aeropuerto.CodigoAeropuerto = Guid.Parse(row["CodigoAeropuerto"].ToString());
                    aeropuerto.NombreAeropuerto = Convert.ToString(row["NombreAeropuerto"]);
                    aeropuertos.Add(aeropuerto);
                }
            }
            return aeropuertos;
        }
    }
}
