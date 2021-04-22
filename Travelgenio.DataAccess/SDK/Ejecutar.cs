using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace Travelgenio.DataAccess.SDK
{
    class TransactionConn
    {
        public SqlConnection conexion { get; set; }
        public SqlTransaction trx { get; set; }
    }
    public static class Ejecutar
    {
        private static Dictionary<string, TransactionConn> ConnectionsList = new Dictionary<string, TransactionConn>();
        public static DataTable GetDatatable(string sentence, List<DataServiceParameter> parameters)
        {
            SqlConnection conn=null;
            try
            {
                conn = new SqlConnection(ConfigurationManager.AppSettings["BaseDeDatos"].ToString());
                DataTable result = new DataTable();
                SqlCommand cmd = new SqlCommand(sentence, conn);
                if (parameters != null) {
                    foreach (DataServiceParameter param in parameters)
                    {
                        cmd.Parameters.AddWithValue(param.Name, param.Value);
                    }
                }
            
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(result);
               
                return result;
            }
            catch (Exception)
            {
                conn.Close();
                conn.Dispose();
                throw;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }
        public static int ExecuteNonQuery( string sentence, List<DataServiceParameter> parameters)
        {
            SqlConnection conn = null;
            try
            {
                conn = new SqlConnection(ConfigurationManager.AppSettings["BaseDeDatos"].ToString());
                SqlCommand cmd = new SqlCommand(sentence, conn);
                if (parameters != null)
                {
                    foreach (DataServiceParameter param in parameters)
                    {
                        cmd.Parameters.AddWithValue(param.Name, param.Value);
                    }
                }
                cmd.Connection.Open();
                int result = cmd.ExecuteNonQuery();
                cmd.Connection.Close();
                return result;
            }
            catch (Exception)
            {
                conn.Close();
                conn.Dispose();
                throw;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }
        public static string BeginTransaction()
        {
            SqlConnection conn = null;
            string token = Guid.NewGuid().ToString();
            try
            {
              
                TransactionConn tc = new TransactionConn();
                conn = new SqlConnection(ConfigurationManager.AppSettings["BaseDeDatos"].ToString());
                conn.Open();
                tc.conexion = conn;
                tc.trx = conn.BeginTransaction();
                ConnectionsList.Add(token, tc);
                return token;
            }
            catch (Exception ex)
            {
                conn.Close();
                conn.Dispose();
                throw ex;
            }
        }

        public static void CommitTransaction(string token)
        {
            SqlCommand command = null;
            TransactionConn connection = null;
            try
            {
                connection = ConnectionsList[token];
                if (connection == null) throw new SqlTypeException("No se encontró la conexión solicitada");
                command = connection.conexion.CreateCommand();
                command.Transaction = connection.trx;
                command.Transaction.Commit();
                ConnectionsList.Remove(token);
                connection.conexion.Close();
                connection.conexion.Dispose();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void RollbackTransaction(string token)
        {
            SqlCommand command = null;
            TransactionConn connection = null;
            try
            {
                connection = ConnectionsList[token];
                if (connection == null) throw new SqlTypeException("No se encontró la conexión solicitada");
                command = connection.conexion.CreateCommand();
                command.Transaction = connection.trx;
                command.Transaction.Rollback();
                ConnectionsList.Remove(token);
                connection.conexion.Close();
                connection.conexion.Dispose();
            }
            catch (Exception ex)
            {
                if (connection == null) throw ex;
                command.Transaction.Rollback();
                connection.conexion.Close();
                connection.conexion.Dispose();
                ConnectionsList.Remove(token);
                throw ex;
            }
        }
    }
}
