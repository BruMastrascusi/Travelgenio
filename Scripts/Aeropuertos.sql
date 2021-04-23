
USE [TravelgenioVuelos]
GO
INSERT [Aeropuertos] ([CodigoAeropuerto], [NombreAeropuerto]) VALUES (N'51f42ec1-5c4c-4a04-9bf7-1f523f89e870', N'Florianopolis, Brasil (FLN)')
INSERT [Aeropuertos] ([CodigoAeropuerto], [NombreAeropuerto]) VALUES (N'6279a39c-f849-419a-927f-3c8e49e5cfb4', N'Frankfurt, Alemania (FRA)')
INSERT [Aeropuertos] ([CodigoAeropuerto], [NombreAeropuerto]) VALUES (N'9c0aebb5-b3f7-47ec-9f2e-497eaeaf9bed', N'Lima, Peru (LIM)')
INSERT [Aeropuertos] ([CodigoAeropuerto], [NombreAeropuerto]) VALUES (N'c61c52a3-16b0-4dc1-a4b5-7538f3acc56e', N'Buenos Aires, Argentina (BUE)')
INSERT [Aeropuertos] ([CodigoAeropuerto], [NombreAeropuerto]) VALUES (N'd3a4e653-99f1-476c-9170-e610bbd6b5fb', N'Amsterdam, Schiphol (AMS), Países Bajos')

 
SET IDENTITY_INSERT  [Boletos] ON 

INSERT [Boletos] ([CodigoBoleto], [CodigoVuelo], [NombrePasajero], [FechaNacimiento], [Pasaporte], [Email], [TipoDeVuelo], [IdBoleto]) VALUES (N'3c4019af-788b-490b-98ce-7c834de865e1', N'42ee8c08-33e0-40f2-a791-1fbd9bb8e83b', N'Bruno Mastrascusi                                                                                   ', CAST(N'1984-03-04' AS Date), N'BNA578987                                                                                           ', N'brunomastrascusi@gmail.com                                                                          ', 0, 22)
INSERT [Boletos] ([CodigoBoleto], [CodigoVuelo], [NombrePasajero], [FechaNacimiento], [Pasaporte], [Email], [TipoDeVuelo], [IdBoleto]) VALUES (N'3c4019af-788b-490b-98ce-7c834de865e1', N'af1d33aa-6201-4036-800d-1234bb9d8f91', N'Bruno Mastrascusi                                                                                   ', CAST(N'1984-03-04' AS Date), N'BNA578987                                                                                           ', N'brunomastrascusi@gmail.com                                                                          ', 1, 23)
INSERT [Boletos] ([CodigoBoleto], [CodigoVuelo], [NombrePasajero], [FechaNacimiento], [Pasaporte], [Email], [TipoDeVuelo], [IdBoleto]) VALUES (N'c38abd3c-0517-48b7-a817-608e67a86e22', N'91285e57-fcfb-4cf5-bfa2-2e57975a46b8', N'Valentina Casteri                                                                                   ', CAST(N'2000-01-01' AS Date), N'FVC1234                                                                                             ', N'brunomastrascusi@gmail.com                                                                          ', 0, 24)
INSERT [Boletos] ([CodigoBoleto], [CodigoVuelo], [NombrePasajero], [FechaNacimiento], [Pasaporte], [Email], [TipoDeVuelo], [IdBoleto]) VALUES (N'dc109ca9-15cf-4656-b4f0-2bbce0ecde1b', N'91285e57-fcfb-4cf5-bfa2-2e57975a46b8', N'Yovana                                                                                              ', CAST(N'2000-04-04' AS Date), N'PPS2525                                                                                             ', N'brunomastrascusi@gmail.com                                                                          ', 0, 25)
INSERT [Boletos] ([CodigoBoleto], [CodigoVuelo], [NombrePasajero], [FechaNacimiento], [Pasaporte], [Email], [TipoDeVuelo], [IdBoleto]) VALUES (N'dc109ca9-15cf-4656-b4f0-2bbce0ecde1b', N'23d19ceb-d240-4b9c-9a53-07e831e7a644', N'Yovana                                                                                              ', CAST(N'2000-04-04' AS Date), N'PPS2525                                                                                             ', N'brunomastrascusi@gmail.com                                                                          ', 1, 26)
INSERT [Boletos] ([CodigoBoleto], [CodigoVuelo], [NombrePasajero], [FechaNacimiento], [Pasaporte], [Email], [TipoDeVuelo], [IdBoleto]) VALUES (N'9e7bb0c8-733c-4606-984a-c4836680b7f1', N'aba16283-a24d-4476-98b8-01354d48791a', N'Romina Diaz                                                                                         ', CAST(N'2020-05-04' AS Date), N'DSX15786                                                                                            ', N'brunomas8@hotmail.com                                                                               ', 0, 27)
INSERT [Boletos] ([CodigoBoleto], [CodigoVuelo], [NombrePasajero], [FechaNacimiento], [Pasaporte], [Email], [TipoDeVuelo], [IdBoleto]) VALUES (N'9e7bb0c8-733c-4606-984a-c4836680b7f1', N'227a1d2e-6ccf-414f-874e-d5762bfc5c3d', N'Romina Diaz                                                                                         ', CAST(N'2020-05-04' AS Date), N'DSX15786                                                                                            ', N'brunomas8@hotmail.com                                                                               ', 1, 28)
SET IDENTITY_INSERT  [Boletos] OFF





/* ********************************************************************************************
 FECHAS = LAS FECHAS DE IDA 17/06/2021 Y FECHAS VUELTAS 17/08/2021
************************************************************************************************/



--VUELOS
--******************************************************************************************************
 --Vuelo Argentina - Holanda
 insert into vuelos values (NEWID(),'2021-06-17 10:34:09.000','2021-07-17 10:34:09.000',
 'Aerolineas Argentinas','C61C52A3-16B0-4DC1-A4B5-7538F3ACC56E','D3A4E653-99F1-476C-9170-E610BBD6B5FB')
 --Vuelo Holanda - Argentina
  insert into vuelos values (NEWID(),'2021-08-17 10:34:09.000','2021-08-17 10:34:09.000',
 'Holanda Airlines','D3A4E653-99F1-476C-9170-E610BBD6B5FB','C61C52A3-16B0-4DC1-A4B5-7538F3ACC56E')

  --Vuelo Argentina - Holanda
 insert into vuelos values (NEWID(),'2021-06-17 11:34:09.000','2021-07-17 11:34:09.000',
 'Aerolineas Argentinas','C61C52A3-16B0-4DC1-A4B5-7538F3ACC56E','D3A4E653-99F1-476C-9170-E610BBD6B5FB')
 --Vuelo Holanda - Argentina
  insert into vuelos values (NEWID(),'2021-08-17 11:34:09.000','2021-08-17 11:34:09.000',
 'Holanda Airlines','D3A4E653-99F1-476C-9170-E610BBD6B5FB','C61C52A3-16B0-4DC1-A4B5-7538F3ACC56E')
 --******************************************************************************************************
 
 --Vuelo Brasil - Perú 
   insert into vuelos values (NEWID(),'2021-06-17 10:34:09.000','2021-07-17 10:34:09.000',
 'TAM','51F42EC1-5C4C-4A04-9BF7-1F523F89E870','9C0AEBB5-B3F7-47EC-9F2E-497EAEAF9BED')
 --Vuelo Perú - Brasil
  insert into vuelos values (NEWID(),'2021-08-17 10:34:09.000','2021-08-17 10:34:09.000',
 'Perú AirLine','9C0AEBB5-B3F7-47EC-9F2E-497EAEAF9BED','51F42EC1-5C4C-4A04-9BF7-1F523F89E870')
  --Vuelo Brasil - Perú 
   insert into vuelos values (NEWID(),'2021-06-17 11:34:09.000','2021-07-17 11:34:09.000',
 'TAM','51F42EC1-5C4C-4A04-9BF7-1F523F89E870','9C0AEBB5-B3F7-47EC-9F2E-497EAEAF9BED')
 --Vuelo Perú - Brasil
  insert into vuelos values (NEWID(),'2021-08-17 11:34:09.000','2021-08-17 11:34:09.000',
 'Perú AirLine','9C0AEBB5-B3F7-47EC-9F2E-497EAEAF9BED','51F42EC1-5C4C-4A04-9BF7-1F523F89E870')

 --******************************************************************************************************
 
 -- Vuelo Alemania -- PaisesBajos
  insert into vuelos values (NEWID(),'2021-06-17 10:34:09.000','2021-07-17 10:34:09.000',
 'Alemania AirLine','6279A39C-F849-419A-927F-3C8E49E5CFB4','D3A4E653-99F1-476C-9170-E610BBD6B5FB')
  -- Vuelo PaisesBajos -- Alemania
  insert into vuelos values (NEWID(),'2021-08-17 10:34:09.000','2021-08-17 10:34:09.000',
 'Alemania AirLine','D3A4E653-99F1-476C-9170-E610BBD6B5FB','6279A39C-F849-419A-927F-3C8E49E5CFB4')

  -- Vuelo Alemania -- PaisesBajos
  insert into vuelos values (NEWID(),'2021-06-17 11:34:09.000','2021-07-17 11:34:09.000',
 'Alemania AirLine','6279A39C-F849-419A-927F-3C8E49E5CFB4','D3A4E653-99F1-476C-9170-E610BBD6B5FB')
  -- Vuelo PaisesBajos -- Alemania
  insert into vuelos values (NEWID(),'2021-08-17 11:34:09.000','2021-08-17 11:34:09.000',
 'Alemania AirLine','D3A4E653-99F1-476C-9170-E610BBD6B5FB','6279A39C-F849-419A-927F-3C8E49E5CFB4')
 --******************************************************************************************************


 -- Vuelo Montevideo - Buenos Aires
   insert into vuelos values (NEWID(),'2021-06-17 10:34:09.000','2021-07-17 10:34:09.000',
 'Pluna','93C2CFCE-4514-4CC0-941B-329D7DB7E0BC','C61C52A3-16B0-4DC1-A4B5-7538F3ACC56E')
 -- Vuelo Buenos Aires - Montevideo
 insert into vuelos values (NEWID(),'2021-08-17 10:34:09.000','2021-08-17 10:34:09.000',
 'Pluna','C61C52A3-16B0-4DC1-A4B5-7538F3ACC56E','93C2CFCE-4514-4CC0-941B-329D7DB7E0BC')

  -- Vuelo Montevideo - Buenos Aires
   insert into vuelos values (NEWID(),'2021-06-17 11:34:09.000','2021-07-17 11:34:09.000',
 'Pluna','93C2CFCE-4514-4CC0-941B-329D7DB7E0BC','C61C52A3-16B0-4DC1-A4B5-7538F3ACC56E')
 -- Vuelo Buenos Aires - Montevideo
 insert into vuelos values (NEWID(),'2021-08-18 11:34:09.000','2021-08-18 11:34:09.000',
 'Pluna','C61C52A3-16B0-4DC1-A4B5-7538F3ACC56E','93C2CFCE-4514-4CC0-941B-329D7DB7E0BC')

 --******************************************************************************************************


 select * from vuelos where AeropuertoOrigen= '93C2CFCE-4514-4CC0-941B-329D7DB7E0BC'