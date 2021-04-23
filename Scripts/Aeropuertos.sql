
---AEROPUERTOS
INSERT INTO Aeropuertos values (NEWID(), 'Buenos Aires, Argentina (BUE)')
INSERT INTO Aeropuertos values (NEWID(), 'Florianopolis, Brasil (FLN)')
INSERT INTO Aeropuertos values (NEWID(), 'Frankfurt, Alemania (FRA)')
INSERT INTO Aeropuertos values (NEWID(), 'Lima, Peru (LIM)')

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
 insert into vuelos values (NEWID(),'2021-08-17 11:34:09.000','2021-08-17 11:34:09.000',
 'Pluna','C61C52A3-16B0-4DC1-A4B5-7538F3ACC56E','93C2CFCE-4514-4CC0-941B-329D7DB7E0BC')

 --******************************************************************************************************