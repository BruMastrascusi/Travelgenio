d3a4e653-99f1-476c-9170-e610bbd6b5fb


Select V.CodigoVuelo , A.NombreAeropuerto, FechaSalida, Aerolinea,  
                                        (select nombreaeropuerto from aeropuertos where codigoaeropuerto = v.AeropuertoDestino) as NombreAeropuertoDestino,
                                         FechaLlegada
                                         from Vuelos V  inner join Aeropuertos A on A.CodigoAeropuerto = V.AeropuertoOrigen
                                           Where V.AeropuertoOrigen =  'd3a4e653-99f1-476c-9170-e610bbd6b5fb'  
										   and v.AeropuertoDestino = 'C61C52A3-16B0-4DC1-A4B5-7538F3ACC56E'
										   and CONVERT(DATE,V.FechaSalida) = '20210817'


										   select * from Aeropuertos 
										   where CodigoAeropuerto ='d3a4e653-99f1-476c-9170-e610bbd6b5fb'  

										   select * from boletos

										   Select B.CodigoBoleto,B.CodigoVuelo , B.NombrePasajero,B.Pasaporte,B.FechaNacimiento,B.Email, V.FechaSalida,
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
									Order by CodigoBoleto, TipoDeVuelo

					Select V.CodigoVuelo , A.NombreAeropuerto, FechaSalida, Aerolinea,  
                                        (select nombreaeropuerto from aeropuertos where codigoaeropuerto = v.AeropuertoDestino) as NombreAeropuertoDestino,
                                         FechaLlegada
                                         from Vuelos V  inner join Aeropuertos A on A.CodigoAeropuerto = V.AeropuertoOrigen
                                          Where V.AeropuertoOrigen =  '51f42ec1-5c4c-4a04-9bf7-1f523f89e870' 
										  and CONVERT(DATE,V.FechaSalida) = '20210817' 
                                          And v.AeropuertoDestino = '9c0aebb5-b3f7-47ec-9f2e-497eaeaf9bed'


										  select * from vuelos where CodigoVuelo = '23D19CEB-D240-4B9C-9A53-07E831E7A644'