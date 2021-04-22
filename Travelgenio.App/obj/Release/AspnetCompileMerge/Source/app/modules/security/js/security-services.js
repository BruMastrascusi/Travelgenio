'use strict';
app.factory('SecurityServices', ['$http', 'APP_CONFIG', '$cookies', function ($http, APP_CONFIG, $cookies) {

    $http.defaults.headers.common['Content-Type'] = 'application/json';

    var urlBase = APP_CONFIG.ct_urlBase + APP_CONFIG.ct_urlService;
    var SecurityServices = {};


    $http.defaults.headers.common['Session'] = $cookies.get("Session");
    $http.defaults.headers.common['Dominio'] = $cookies.get("Dominio");

    SecurityServices.getRoles = function () {
        return $http.get(urlBase + '/roles');
    };
    SecurityServices.getCatEmpleados = function (usuarioid) {
        return $http.get(urlBase + '/empleos/catalogo/sinusuario/' + usuarioid);
    };
    SecurityServices.getUsuarios = function () {
        return $http.get(urlBase + '/usuarios');
    };
    SecurityServices.insertUsuario = function (usu) {
        return $http.post(urlBase + '/usuarios', usu);
    };
    SecurityServices.updateUsuario = function (usu) {
        return $http.put(urlBase + '/usuarios', usu);
    };
    SecurityServices.deleteUsuario = function (usuarioid) {
        return $http.delete(urlBase + '/usuarios/' + usuarioid);
    };

    SecurityServices.CambiarPassword = function (usuarioid) {
        return $http.post(urlBase + '/usuarios/password/' + usuarioid);
    };

    //CLIENTES-------------------------------------
    SecurityServices.GetDistribuidoresReducidos= function () {
        return $http.get(urlBase + '/clientes/distribudiresReducido');
    };


    return SecurityServices;
}]);


app.factory('objReference', function () {
    return {
        current:null
    };
});
