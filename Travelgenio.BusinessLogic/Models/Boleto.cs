using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using Travelgenio.BusinessLogic;
using Travelgenio.DataAccess.Models;
using Travelgenio.Sdk.DataIn;
using Travelgenio.Sdk.DataOut;

namespace Travelgenio.Sdk
{
    public enum TipoDeVuelo
    {
        Ida,
        Vuelta
    }
    public class Boleto : IDisposable
    {
        public void Dispose()
        {
            GC.Collect();
        }

        public void GuardarBoleto(BoletoDataIn boleto)
        {
            try
            {
                bool resultadoGuardar = false;
                using (BoletoDAO boletoDao = new BoletoDAO())
                {
                    resultadoGuardar = boletoDao.Guardar(boleto);
                }
                if (resultadoGuardar)
                {
                    EnviarMail(boleto);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public void EnviarMail(BoletoDataIn boleto) {

            string templatePdf = ConfigurationManager.AppSettings["templateBoleto"].ToString();
            string templateHtml = ConfigurationManager.AppSettings["avisoBoletoEnviado"].ToString();
            string UrlBase = ConfigurationManager.AppSettings["UrlBase"].ToString();

            //Crear HTML
            StreamReader srHtml = new StreamReader(AppDomain.CurrentDomain.BaseDirectory + templateHtml);
            string fileHtml = string.Empty;
            fileHtml = srHtml.ReadToEnd();
            fileHtml = fileHtml.Replace("{CodigoDeBoleto}", boleto.CodigoBoleto.ToString());
            fileHtml = fileHtml.Replace("{NombrePasajero}", boleto.NombrePasajero);
            fileHtml = fileHtml.Replace("{Pasaporte}", boleto.Pasaporte);
            fileHtml = fileHtml.Replace("{urlBase}", UrlBase);
            srHtml.Close();

            // Crear PDF
            StreamReader srPdf = new StreamReader(AppDomain.CurrentDomain.BaseDirectory + templatePdf);
            string filePdf = string.Empty;
            filePdf = srPdf.ReadToEnd();
            srPdf.Close();
            StringBuilder str = new StringBuilder();
            filePdf = filePdf.Replace("{NombrePasajero}", boleto.NombrePasajero);
            filePdf = filePdf.Replace("{Pasaporte}", boleto.Pasaporte);
            filePdf = filePdf.Replace("{CodigoBoleto}", boleto.CodigoBoleto.ToString());

            foreach (VueloDataIn v in boleto.Vuelos)
            {
                Vuelo vuelo = new Vuelo();
                List<VueloDataOut> vuelos = new List<VueloDataOut>();
                vuelos = vuelo.ObtenerVuelosCodigo(v.CodigoVuelo);
                str.Append("<tr>");
                str.Append("<td style='text-align:right'>"); str.Append(vuelos[0].NombreAeropuerto.ToString()); str.Append("</td>");
                str.Append("<td style='text-align:right'>"); str.Append(vuelos[0].FechaSalida.ToString()); str.Append("</td>");
                str.Append("<td style='text-align:right'>"); str.Append(vuelos[0].FechaLlegada.ToString()); str.Append("</td>");
                str.Append("<td style='text-align:right'>"); str.Append(vuelos[0].NombreAeropuertoDestino.ToString()); str.Append("</td>");
                str.Append("<td style='text-align:right'>"); str.Append(vuelos[0].FechaSalida.ToString()); str.Append("</td>");
                str.Append("<td style='text-align:right'>"); str.Append(vuelos[0].FechaLlegada.ToString()); str.Append("</td>");
                str.Append("</tr>");
              
            }
            filePdf = filePdf.Replace("{Contenido}", str.ToString());
            string pathString = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, boleto.CodigoBoleto + ".pdf");

            if (System.IO.File.Exists(pathString)) System.IO.File.Delete(pathString);
            var htmlToPdf = new NReco.PdfGenerator.HtmlToPdfConverter();
            var pdfBytes = htmlToPdf.GeneratePdf(filePdf);

            using (System.IO.FileStream fs = System.IO.File.Create(pathString))
            {
                foreach (byte i in pdfBytes)
                {
                    fs.WriteByte(i);
                }
                fs.Flush();
                fs.Dispose();
                fs.Close();
            }

 
          
            NotificacionPorMail(fileHtml, boleto.Email, "Notificacion boleto Web", pathString); 

        }

        public static void NotificacionPorMail(string mensaje, string destinatarios, string titulo, string pathFile)
        {
            try
            {

                string mailFrom = ConfigurationManager.AppSettings["Email"].ToString();
                string pass = ConfigurationManager.AppSettings["Password"].ToString();
                string server = ConfigurationManager.AppSettings["Smtp"].ToString();
                bool ssl = Convert.ToBoolean(ConfigurationManager.AppSettings["ssl"]);
                bool htmlBody = Convert.ToBoolean(ConfigurationManager.AppSettings["htmlBody"]);
                int puerto = Convert.ToInt32(ConfigurationManager.AppSettings["Puerto"]);

                try
                {
                    var smtp = new SmtpClient
                    {
                        Host = server,
                        Port = puerto,
                        EnableSsl = ssl,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential(mailFrom, pass)
                    };
                    string[] dsts = destinatarios.Split(';');
                    string mainMail = "";
                    if (dsts.Count() > 0)
                    {
                        mainMail = dsts[0].Trim();
                    }
                    var message = new MailMessage(mailFrom, mainMail);
                    foreach (var dst in dsts)
                    {
                        if (dst.Trim() != string.Empty && mainMail != dst)
                            message.To.Add(dst);
                    }

                    if (message.To.Count > 0)
                    {
                        if (pathFile.Trim() != "")
                        {
                            Attachment at = new Attachment(pathFile);
                            message.Attachments.Add(at);
                        }
                        message.From = new MailAddress(mailFrom, "Travelgenio");
                        message.Subject = titulo;
                        message.Body = mensaje;
                        message.IsBodyHtml = true;
                        smtp.Send(message);
                    }

                }
                catch (Exception ex)
                {

                }
            }
            catch (Exception ex)
            {

            }
        }

        public void BorrarBoleto(Guid codigoBoleto)
        {
            try
            {
                using (BoletoDAO boletoDao = new BoletoDAO())
                {

                    boletoDao.Borrar(codigoBoleto);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public void ModificarBoleto(BoletoDataIn boleto)
        {
            try
            {
                using (BoletoDAO boletoDao = new BoletoDAO())
                {

                    boletoDao.Modificar(boleto);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public List<BoletoDataOut> ObtenerTodos()
        {
            try
            {
                using (BoletoDAO boletoDao = new BoletoDAO())
                {

                    return boletoDao.ObtenerTodos();
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public BoletoDataOut ObtenerPorCodigo(Guid codigoBoleto)
        {
            try
            {
                using (BoletoDAO boletoDao = new BoletoDAO())
                {

                    return boletoDao.ObtenerPorCodigo(codigoBoleto);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<BoletoDataOut> ObtenerViajesPasajero(string nombreMail)
        {
            try
            {
                using (BoletoDAO boletoDao = new BoletoDAO())
                {

                    return boletoDao.ObtenerViajesPasajero(nombreMail);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public List<BoletoDataOut> ObtenerItinerarios(string nombreMail)
        {
            try
            {
                using (BoletoDAO boletoDao = new BoletoDAO())
                {

                    return boletoDao.ObtenerViajesPasajero(nombreMail);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}