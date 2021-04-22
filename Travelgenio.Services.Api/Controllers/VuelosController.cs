using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting.Messaging;
using System.Web.Http;
using System.Web.Http.Cors;
using Travelgenio.BusinessLogic;
using Travelgenio.Sdk.DataOut;

namespace Travelgenio.Services.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class VuelosController : ApiController
    {
        [HttpPut]
        [Route("api/vuelos/modificar")]
        public HttpResponseMessage Modificar()
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            try
            {


               // string borrarVuelo = @"Delete from Vuelos where CodigoVuelo =   " + CodigoVuelo;


            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
            return response;
           }

        [HttpGet]
        [Route("api/vuelos/obtenerVuelo/{codigoVuelo}")]
        public List<VueloDataOut> GetVuelos(Guid codigoVuelo)
        {
            List<VueloDataOut> vuelos = new List<VueloDataOut>();
            try
            {
                using (Vuelo vuelo = new Vuelo())
                {
                    vuelos = vuelo.ObtenerVuelos(codigoVuelo);
                }

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }

            return vuelos;

        }
      
        [HttpPost]
        [Route("api/vuelos/crear")]
        public HttpResponseMessage CrearVuelo(Vuelo obj)
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            try
            {
                Guid codigoVuelo = Guid.NewGuid();
               
                string insertarVuelo = @"Insert into Vuelo(CodigoVuelo,AeropuertoOrigen,AeropuertoDestino,
                                                           FechaSalida,FechaLlegada,Aerolinea)
                                                      values(@CodigoVuelo,@AeropuertoOrigen,@AeropuertoDestino,
                                                             @FechaSalida,@FechaLlegada,@Aerolinea) ";
               // List<DataServiceParameter> lstParamsPersona = new List<DataServiceParameter>();



            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
            return response;
        }

        [HttpDelete]
        [Route("api/vuelos/{id}")]
        public HttpResponseMessage BorrarVuelo(Guid CodigoVuelo)
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            try
            {
        

                string borrarVuelo = @"Delete from Vuelos where CodigoVuelo =   " + CodigoVuelo;
             

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
            return response;
        }
    }
}
