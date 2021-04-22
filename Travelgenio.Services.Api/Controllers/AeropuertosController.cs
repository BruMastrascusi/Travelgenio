using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Travelgenio.BusinessLogic;
using Travelgenio.Sdk.DataOut;

namespace Travelgenio.Services.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AeropuertosController : ApiController
    {


        [HttpGet]
        [Route("api/aeropuertos/obtenerTodos")]
        public List<AeropuertoDataOut> ObtenerTodos()
        {
            List<AeropuertoDataOut> aeropuertos = new List<AeropuertoDataOut>();
            try
            {
                using (Aeropuerto aeropuerto = new Aeropuerto())
                {
                    aeropuertos=  aeropuerto.ObtenerTodos();
                }

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
           
            return aeropuertos;
        }

        [HttpGet]
        [Route("api/aeropuertos/obtenerDestino/{codigoAeropuerto}")]
        public List<AeropuertoDataOut> ObtenerPorCodigo(Guid codigoAeropuerto)
        {
            List<AeropuertoDataOut> aeropuertos = new List<AeropuertoDataOut>();
            try
            {
                using (Aeropuerto aeropuerto = new Aeropuerto())
                {
                    aeropuerto.ObtenerDestino(codigoAeropuerto);
                }

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
           
            return aeropuertos;
        }

    }
}
