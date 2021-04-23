using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using Travelgenio.Sdk;
using Travelgenio.Sdk.DataOut;

namespace Travelgenio.Services.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BoletosController : ApiController
    {

        [HttpPost]
        [Route("api/boletos/guardar")]
        public HttpResponseMessage Guardar(BoletoDataIn obj)
        {
            try
            {
                using (Boleto boleto = new Boleto())
                {
                    boleto.GuardarBoleto(obj);
                }

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            return response;
        }

        [HttpDelete]
        [Route("api/boletos/borrar/{codigoBoleto}")]
        public HttpResponseMessage Borrar(Guid codigoBoleto)
        {
            try
            {
                using (Boleto boleto = new Boleto())
                {
                    boleto.BorrarBoleto(codigoBoleto);
                }

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            return response;
        }

        [HttpPut]
        [Route("api/boletos/modificar")]
        public HttpResponseMessage Modificar(BoletoDataIn obj)
        {
            try
            {
                using (Boleto boleto = new Boleto())
                {
                    boleto.ModificarBoleto(obj);
                }

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            return response;
        }
        [HttpGet]
        [Route("api/boletos/obtenerTodos")]
        public List<BoletoDataOut> ObtenerTodos()
        {
            List<BoletoDataOut> boletos = new List<BoletoDataOut>();
            try
            {
                using (Boleto boleto = new Boleto())
                {
                    boletos = boleto.ObtenerTodos();
                }

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
           
            return boletos;
        }

        [HttpGet]
        [Route("api/boletos/obtenerBoleto/{codigoBoleto}")]
        public BoletoDataOut ObtenerPorCodigo(Guid codigoBoleto)
        {
            BoletoDataOut boletoDataOut = new BoletoDataOut();
            try
            {
                using (Boleto boleto = new Boleto())
                {
                    boletoDataOut = boleto.ObtenerPorCodigo(codigoBoleto);
                }
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }

            return boletoDataOut;
        }

        [HttpGet]
        [Route("api/boletos/buscar/{nombreMail}")]
        public List<BoletoDataOut> ObtenerViajesPasajero(string nombreMail)
        {
            List<BoletoDataOut> pasajeros = new List<BoletoDataOut>();
            try
            {
                using (Boleto boleto = new Boleto())
                {
                    pasajeros = boleto.ObtenerViajesPasajero(nombreMail);
                }
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }

            return pasajeros;
        }

    
    }
}