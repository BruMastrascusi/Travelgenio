 
'use strict';
app.factory('TravelgenioServices', ['$http', 'APP_CONFIG', '$cookies', function ($http, APP_CONFIG, $cookies) {

    $http.defaults.headers.common['Content-Type'] = 'application/json';
    var TravelgenioServices = {};

    var urlBase = APP_CONFIG.ct_urlBase + APP_CONFIG.ct_urlService;
  
    //Aeropuertos
    TravelgenioServices.GetAeropuetosOrigen = function () {
        return $http.get(urlBase + 'aeropuertos/obtenerTodos');
    };
  
   //Boletos
    TravelgenioServices.GuardarBoleto = function (obj) {
        return $http.post(urlBase + 'boletos/guardar/',obj);
    };
   

    //BOLETOS
    TravelgenioServices.GetBoletos = function () {
        return $http.get(urlBase + 'boletos/obtenerTodos');
    };
    TravelgenioServices.EliminarBoleto = function (codigoBoleto) {
        return $http.delete(urlBase + 'boletos/borrar/' + codigoBoleto);
    };

    TravelgenioServices.GetAeropuetosOrigen = function () {
        return $http.get(urlBase + 'aeropuertos/obtenerTodos');
    };
    TravelgenioServices.GetVuelos = function (codigoVuelo) {
        return $http.get(urlBase + 'vuelos/obtenerVuelo/' + codigoVuelo);
    };
    TravelgenioServices.EditarBoleto = function (obj) {
        return $http.put(urlBase + 'boletos/modificar/', obj);
    };
  
    return TravelgenioServices;
}]);

app.factory('objReference', function () {
    return {
        current:null
    };
});
