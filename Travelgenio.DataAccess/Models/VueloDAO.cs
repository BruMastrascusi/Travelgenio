using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Services;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Travelgenio.DataAccess.SDK;
using Travelgenio.Sdk.DataOut;

namespace Travelgenio.DataAccess.Models
{
    public class VueloDAO : IDisposable
    {
        public void Dispose()
        {
            GC.Collect();
        }


        public List<VueloDataOut> ObtenerVuelos(Guid codioOrigen)
        {
            List<VueloDataOut> vuelos = new List<VueloDataOut>();
            try
            {
                string devolverVuelos = @"Select V.CodigoVuelo , A.NombreAeropuerto, FechaSalida, Aerolinea,  
                                        (select nombreaeropuerto from aeropuertos where codigoaeropuerto = v.AeropuertoDestino) as NombreAeropuertoDestino,
                                         FechaLlegada
                                         from Vuelos V  inner join Aeropuertos A on A.CodigoAeropuerto = V.AeropuertoOrigen
                                           Where V.AeropuertoOrigen =  @CodigoVueloIda";
                List<DataServiceParameter> lstParams = new List<DataServiceParameter>();
                lstParams.Add(DataServiceParameter.Create("@CodigoVueloIda", codioOrigen));
                DataTable data = Ejecutar.GetDatatable(devolverVuelos, lstParams);
               

                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        VueloDataOut vuelo = new VueloDataOut();
                        vuelo.CodigoVuelo = Guid.Parse(row["CodigoVuelo"].ToString());
                        vuelo.NombreAeropuerto = Convert.ToString(row["NombreAeropuerto"].ToString());
                        vuelo.NombreAeropuertoDestino = Convert.ToString(row["NombreAeropuertoDestino"].ToString());
                        vuelo.FechaSalida = Convert.ToDateTime(row["FechaSalida"]);
                        vuelo.FechaLlegada = Convert.ToDateTime(row["FechaLlegada"]);
                        vuelo.Aerolinea = Convert.ToString(row["Aerolinea"].ToString());
                        vuelo.DatosGenerales = vuelo.NombreAeropuerto + "  " + vuelo.FechaSalida + "  /  " + vuelo.NombreAeropuertoDestino + "   " + vuelo.FechaLlegada + "   " + vuelo.Aerolinea;

                        vuelos.Add(vuelo);
                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return vuelos;
        }

        public List<VueloDataOut> ObtenerVuelosCodigo(Guid codioOrigen)
        {
            List<VueloDataOut> vuelos = new List<VueloDataOut>();
            try
            {
                string devolverVuelos = @"Select V.CodigoVuelo , A.NombreAeropuerto, FechaSalida, Aerolinea,  
                                        (select nombreaeropuerto from aeropuertos where codigoaeropuerto = v.AeropuertoDestino) as NombreAeropuertoDestino,
                                         FechaLlegada
                                         from Vuelos V  inner join Aeropuertos A on A.CodigoAeropuerto = V.AeropuertoOrigen
                                           Where V.CodigoVuelo =  @CodigoVueloIda";
                List<DataServiceParameter> lstParams = new List<DataServiceParameter>();
                lstParams.Add(DataServiceParameter.Create("@CodigoVueloIda", codioOrigen));
                DataTable data = Ejecutar.GetDatatable(devolverVuelos, lstParams);


                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        VueloDataOut vuelo = new VueloDataOut();
                        vuelo.CodigoVuelo = Guid.Parse(row["CodigoVuelo"].ToString());
                        vuelo.NombreAeropuerto = Convert.ToString(row["NombreAeropuerto"].ToString());
                        vuelo.NombreAeropuertoDestino = Convert.ToString(row["NombreAeropuertoDestino"].ToString());
                        vuelo.FechaSalida = Convert.ToDateTime(row["FechaSalida"]);
                        vuelo.FechaLlegada = Convert.ToDateTime(row["FechaLlegada"]);
                        vuelo.Aerolinea = Convert.ToString(row["Aerolinea"].ToString());
                        vuelo.DatosGenerales = vuelo.NombreAeropuerto + "  " + vuelo.FechaSalida + "   " + vuelo.NombreAeropuertoDestino + "   " + vuelo.FechaLlegada + "   " + vuelo.Aerolinea;

                        vuelos.Add(vuelo);
                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return vuelos;
        }
    }
}
