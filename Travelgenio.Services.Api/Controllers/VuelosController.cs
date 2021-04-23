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
      

        [HttpGet]
        [Route("api/vuelos/obtenerVuelo/{codigoVuelo}/{codigoVueloDestino}/{fechaSalida}")]
        public List<VueloDataOut> GetVuelos(Guid codigoVuelo, Guid codigoVueloDestino, DateTime fechaSalida)
        {
            List<VueloDataOut> vuelos = new List<VueloDataOut>();
            try
            {
                using (Vuelo vuelo = new Vuelo())
                {
                    vuelos = vuelo.ObtenerVuelos(codigoVuelo, codigoVueloDestino,  fechaSalida);
                }

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }

            return vuelos;

        }
      
         
    }
}
