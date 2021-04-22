using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Services;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travelgenio.DataAccess.SDK;
using Travelgenio.Sdk;
using Travelgenio.Sdk.DataIn;
using Travelgenio.Sdk.DataOut;

namespace Travelgenio.DataAccess.Models
{
    public class BoletoDAO : IDisposable
    {
        public void Dispose()
        {
            GC.Collect();
        }

        public bool Guardar(BoletoDataIn boleto)
        {
            string token = Ejecutar.BeginTransaction();
            try
            {
                List<DataServiceParameter> lstParams = new List<DataServiceParameter>();
                Guid codigoBoleto = Guid.NewGuid();
                int tipoBoleto = 0;
                bool result = false;
                foreach (VueloDataIn vuelo in boleto.Vuelos)
                {

                    lstParams = new List<DataServiceParameter>();
                    string sentence = @"Insert Into Boletos (CodigoBoleto,CodigoVuelo,NombrePasajero,FechaNacimiento,Pasaporte,Email,TipoDeVuelo) 
                                                    Values(@CodigoBoleto, @CodigoVuelo, @NombrePasajero,@FechaNacimiento,@Pasaporte, @Email,  @TipoDeVuelo)";

                    lstParams.Add(DataServiceParameter.Create("@CodigoBoleto", codigoBoleto));
                    lstParams.Add(DataServiceParameter.Create("@NombrePasajero", boleto.NombrePasajero));
                    lstParams.Add(DataServiceParameter.Create("@FechaNacimiento", boleto.FechaNacimiento));
                    lstParams.Add(DataServiceParameter.Create("@Pasaporte", boleto.Pasaporte));
                    lstParams.Add(DataServiceParameter.Create("@Email", boleto.Email));
                    lstParams.Add(DataServiceParameter.Create("@TipoDeVuelo", tipoBoleto));
                    lstParams.Add(DataServiceParameter.Create("@CodigoVuelo", vuelo.CodigoVuelo));
                    Ejecutar.ExecuteNonQuery(sentence, lstParams);
                    tipoBoleto++;
                    result = true;
                }
                Ejecutar.CommitTransaction(token);
               return result;
            }
            catch (Exception ex)
            {
                Ejecutar.RollbackTransaction(token);
                throw ex;
            }

        }

        public void Borrar(Guid codigoBoleto)
        {
            try
            {
                string sentence = @"Delete from Boletos where CodigoBoleto = @CodigoBoleto";
                List<DataServiceParameter> lstParams = new List<DataServiceParameter>();
                lstParams.Add(DataServiceParameter.Create("@CodigoBoleto", codigoBoleto));
                Ejecutar.ExecuteNonQuery(sentence, lstParams);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void Modificar(BoletoDataIn boleto)
        {
            try
            {
                int tipoBoleto = 0;
                List<DataServiceParameter> lstParams = new List<DataServiceParameter>();
                string sentence = @" Update Boletos set NombrePasajero = @NombrePasajero,FechaNacimiento= @FechaNacimiento,
                                    Pasaporte= @Pasaporte, Email = @Email, CodigoVuelo= @CodigoVuelo , TipoDeVuelo = @TipoDeVuelo 
                                    Where CodigoBoleto = @CodigoBoleto And TipoDeVuelo = @TipoDeVuelo";

                foreach (VueloDataIn vuelo in boleto.Vuelos)
                {
                 
                    lstParams.Add(DataServiceParameter.Create("@NombrePasajero", boleto.NombrePasajero));
                    lstParams.Add(DataServiceParameter.Create("@FechaNacimiento", boleto.FechaNacimiento));
                    lstParams.Add(DataServiceParameter.Create("@Pasaporte", boleto.Pasaporte));
                    lstParams.Add(DataServiceParameter.Create("@Email", boleto.Email));
                    lstParams.Add(DataServiceParameter.Create("@CodigoVuelo", vuelo.CodigoVuelo));
                    lstParams.Add(DataServiceParameter.Create("@CodigoBoleto", boleto.CodigoBoleto));
                    lstParams.Add(DataServiceParameter.Create("@TipoDeVuelo", tipoBoleto));
                    Ejecutar.ExecuteNonQuery(sentence, lstParams);
                    tipoBoleto++;
                    lstParams = new List<DataServiceParameter>();
                }
                   
               


            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public List<BoletoDataOut> ObtenerTodos()
        {
    
            string sentence = @"Select B.CodigoBoleto,B.CodigoVuelo , B.NombrePasajero,B.Pasaporte,B.FechaNacimiento,B.Email, V.FechaSalida,
										 V.FechaLlegada, 
                                        (select A.CodigoAeropuerto from Aeropuertos A
							             Inner Join Vuelos V on V.AeropuertoOrigen= A.CodigoAeropuerto 
										 Where V.CodigoVuelo = B.CodigoVuelo) As CodigoAeropuertoOrigen,
                                        (select A.CodigoAeropuerto from Aeropuertos A
							              Inner Join Vuelos V on V.AeropuertoDestino= A.CodigoAeropuerto 
										  Where V.CodigoVuelo = B.CodigoVuelo)As CodigoAeropuertoDestino,
							             (select A.NombreAeropuerto from Aeropuertos A
							                Inner Join Vuelos V on V.AeropuertoOrigen= A.CodigoAeropuerto 
										 	Where V.CodigoVuelo = B.CodigoVuelo) As AeropuertoOrigen,
										 (select A.NombreAeropuerto from Aeropuertos A
							                 Inner Join Vuelos V on V.AeropuertoDestino= A.CodigoAeropuerto 
										     Where V.CodigoVuelo = B.CodigoVuelo) As AeropuertoDestino,
											TipoDeVuelo
									From Boletos B 
									Inner Join Vuelos v on V.CodigoVuelo = b.CodigoVuelo
									Order by CodigoBoleto, TipoDeVuelo";

            DataTable data = Ejecutar.GetDatatable(sentence, null);
            List<BoletoDataOut> boletos = new List<BoletoDataOut>();

            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    BoletoDataOut boleto = new BoletoDataOut();
                    boleto.CodigoBoleto = Guid.Parse(row["CodigoBoleto"].ToString());
                    boleto.CodigoVuelo = Guid.Parse(row["CodigoVuelo"].ToString());
                    boleto.NombrePasajero = Convert.ToString(row["NombrePasajero"]);
                    boleto.FechaNacimiento = Convert.ToDateTime(row["FechaNacimiento"]);
                    boleto.Pasaporte = Convert.ToString(row["Pasaporte"]).Trim();
                    boleto.NombrePasajero = Convert.ToString(row["NombrePasajero"]).Trim();
                    boleto.Email = Convert.ToString(row["Email"]).Trim();
                    boleto.TipoDeVuelo = Convert.ToInt32(row["TipoDeVuelo"]);
                    boleto.FechaSalida = Convert.ToDateTime(row["FechaSalida"]);
                    boleto.FechaLlegada = Convert.ToDateTime(row["FechaLlegada"]);
                    boleto.AeropuertoOrigen = Convert.ToString(row["AeropuertoOrigen"]).Trim();
                    boleto.AeropuertoDestino = Convert.ToString(row["AeropuertoDestino"]).Trim();
                    boleto.CodigoAeropuertoOrigen = Guid.Parse(row["CodigoAeropuertoOrigen"].ToString());
                    boleto.CodigoAeropuertoDestino = Guid.Parse(row["CodigoAeropuertoDestino"].ToString());
                    boletos.Add(boleto);
                }
            }
            return boletos;
        }

        public BoletoDataOut ObtenerPorCodigo(Guid codigoBoleto)
        {
            string sentence = @"Select * From Boletos where CodigoBoleto = @CodigoBoleto";

            List<DataServiceParameter> lstParams = new List<DataServiceParameter>();
            lstParams.Add(DataServiceParameter.Create("@CodigoBoleto", codigoBoleto));
            DataTable data = Ejecutar.GetDatatable(sentence, lstParams);
            List<BoletoDataOut> boletos = new List<BoletoDataOut>();
            BoletoDataOut boleto = new BoletoDataOut();

            if (data.Rows.Count > 0)
            {
                DataRow row = data.Rows[0];
                boleto.NombrePasajero = row["NombrePasajero"].ToString().Trim();
                boleto.FechaNacimiento = row["FechaNacimiento"] != DBNull.Value ? Convert.ToDateTime(row["FechaNacimiento"]) : DateTime.MaxValue;
                boleto.Pasaporte = row["Pasaporte"].ToString().Trim();
                boleto.Email = row["Email"].ToString().Trim();
                boleto.TipoDeVuelo = row["TipoDeVuelo"] != DBNull.Value ? Convert.ToInt32(row["TipoDeVuelo"]) : 0;
                boleto.CodigoVuelo = Guid.Parse(row["CodigoVuelo"].ToString());


            }
            return boleto;
        }
        public List<BoletoDataOut> ObtenerViajesPasajero(string nombreMail)
        {

            string sentence = @" Select B.CodigoBoleto,B.CodigoVuelo , B.NombrePasajero,B.Pasaporte,B.FechaNacimiento,B.Email, V.FechaSalida, V.FechaLlegada, 
							                        (select A.NombreAeropuerto from Aeropuertos A
							                        Inner Join Vuelos V on V.AeropuertoOrigen= A.CodigoAeropuerto 
													Where V.CodigoVuelo = B.CodigoVuelo) As AeropuertoOrigen,
													(select A.NombreAeropuerto from Aeropuertos A
							                        Inner Join Vuelos V on V.AeropuertoDestino= A.CodigoAeropuerto 
													Where V.CodigoVuelo = B.CodigoVuelo) As AeropuertoDestino,
													TipoDeVuelo
													From Boletos B 
													inner Join Vuelos v on V.CodigoVuelo = b.CodigoVuelo
                                                    Where (Pasaporte like @Texto or  Email like @Texto)
													Order by CodigoBoleto, TipoDeVuelo";

            List<DataServiceParameter> lstParams = new List<DataServiceParameter>();
            lstParams.Add(DataServiceParameter.Create("@Texto", "%" + nombreMail + "%"));
            DataTable data = Ejecutar.GetDatatable(sentence, lstParams);
            List<BoletoDataOut> boletos = new List<BoletoDataOut>();

            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    BoletoDataOut boleto = new BoletoDataOut();
                    boleto.CodigoBoleto = Guid.Parse(row["CodigoBoleto"].ToString());
                    boleto.CodigoVuelo = Guid.Parse(row["CodigoVuelo"].ToString());
                    boleto.NombrePasajero = Convert.ToString(row["NombrePasajero"]);
                    boleto.FechaNacimiento = Convert.ToDateTime(row["FechaNacimiento"]);
                    boleto.Pasaporte = Convert.ToString(row["Pasaporte"]).Trim();
                    boleto.NombrePasajero = Convert.ToString(row["NombrePasajero"]).Trim();
                    boleto.Email = Convert.ToString(row["Email"]).Trim();
                    boleto.TipoDeVuelo = Convert.ToInt32(row["TipoDeVuelo"]);
                    boleto.FechaSalida = Convert.ToDateTime(row["FechaSalida"]);
                    boleto.FechaLlegada = Convert.ToDateTime(row["FechaLlegada"]);
                    boleto.AeropuertoOrigen = Convert.ToString(row["AeropuertoOrigen"]).Trim();
                    boleto.AeropuertoDestino = Convert.ToString(row["AeropuertoDestino"]).Trim();
                    boletos.Add(boleto);
                }
            }
            return boletos;
        }
    }
}
