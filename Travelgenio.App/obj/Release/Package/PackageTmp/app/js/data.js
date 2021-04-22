'use strict';
app.factory('ServiciosGlobales',['$http','APP_CONFIG', function ($http,APP_CONFIG) {

    $http.defaults.headers.common['Content-Type'] = 'application/json';

    var urlBase = APP_CONFIG.ct_urlBase+APP_CONFIG.ct_urlService;
    var ServiciosGlobales = {};

    ServiciosGlobales.login = function () {
        return $http.post(urlBase + '/login');
    };
    ServiciosGlobales.logout = function () {
        return $http.delete(urlBase + '/login');
    };
    ServiciosGlobales.getUsuario = function (usuarioid) {
        return $http.get(urlBase + '/usuarios/'+ usuarioid);
    };
    ServiciosGlobales.getUsuarioLogueado = function () {
        return $http.get(urlBase + '/usuarios/logueado');
    };
    ServiciosGlobales.getDominio = function (dominioid) {
        return $http.get(urlBase + '/dominios/'+ dominioid);
    };
    ServiciosGlobales.registro = function (objregistro) {
        return $http.post(urlBase + '/registro',  objregistro);
    };
    ServiciosGlobales.solicitarRecuperar = function (email) {
        return $http.post(urlBase + '/recuperar/solicitar/', '"' + email + '"');
    };
    ServiciosGlobales.recuperar = function () {
        return $http.post(urlBase + '/recuperar');
    };
    ServiciosGlobales.getCatalogueItems = function (codigo) {
        return $http.get(urlBase + '/catalogos/items/' + codigo);
    };


    return ServiciosGlobales;
}]);
