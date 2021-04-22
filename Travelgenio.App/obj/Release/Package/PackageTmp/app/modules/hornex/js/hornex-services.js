/**
 * Created by usuario on 26/10/2017.
 */
/**
 * Created by usuario on 25/10/2017.
 */
'use strict';
app.factory('HornexServices', ['$http', 'APP_CONFIG', '$cookies', function ($http, APP_CONFIG, $cookies) {

    $http.defaults.headers.common['Content-Type'] = 'application/json';

    $http.defaults.headers.common['Session'] = $cookies.get("Session");
    $http.defaults.headers.common['Dominio'] = $cookies.get("Dominio");


    var urlBase = APP_CONFIG.ct_urlBase + APP_CONFIG.ct_urlService;
    var HornexService = {};

    HornexService.GetDepartamentos= function () {
        return $http.get(urlBase + '/productos/departamentos');
    };
    HornexService.GetSecciones= function (departamentoid) {
        return $http.get(urlBase + '/productos/secciones/' + departamentoid);
    };
    HornexService.GetFamilias= function (departamentoid, seccionid) {
        return $http.get(urlBase + '/productos/familias/' + departamentoid + '/' + seccionid);
    };
    HornexService.GetArticulosDesdeSeccion= function (departamentoid, seccionid) {
        return $http.get(urlBase + '/productos/articulos/desdeseccion/' + departamentoid + '/' + seccionid);
    };
    HornexService.GetArticulos= function (departamentoid, seccionid, familiaid) {
        return $http.get(urlBase + '/productos/articulos/' + departamentoid + '/' + seccionid + '/' + familiaid);
    };
    HornexService.GetArticulosConPrecio= function (departamentoid, seccionid, familiaid, clienteid) {
        return $http.get(urlBase + '/productos/articulosConPrecio/' + departamentoid + '/' + seccionid + '/' + familiaid + '/' + clienteid);
    };
    HornexService.GetFaltantes = function (todos, diasMas) {
        return $http.get(urlBase + '/productos/faltantesTodos' + '/' + todos + '/' + diasMas);
    };
    HornexService.GuardarProductoFaltante = function (obj) {
        return $http.post(urlBase + '/productos', obj);
    };
    HornexService.DeleteProductoFaltante = function (id) {
        return $http.delete(urlBase + '/productos/' + id);
    };
    HornexService.ResolverProductoFaltante = function (obj) {
        return $http.put(urlBase + '/productos',obj);
    };
    HornexService.GetVendedores = function () {
        return $http.get(urlBase + '/negocio/vendedoressistema');
    };
    HornexService.GuardarPedido = function (pedido) {
        return $http.post(urlBase + '/negocio/pedido', pedido);
    };
    HornexService.ActualizarPedido = function (pedido) {
        return $http.put(urlBase + '/negocio/pedido', pedido);
    };
    HornexService.GetPedido = function (pedidoid) {
        return $http.get(urlBase + '/negocio/pedido/' + pedidoid);
    };
    HornexService.GetPedidoEstados = function () {
        return $http.get(urlBase + '/negocio/EstadosPedido');
    };
    HornexService.GetPedidoPorFecha = function (param) {

        return $http.get(urlBase + '/negocio/pedidosPorFecha/' + param.VendedorID + "/" + param.FechaDesde + "/" + param.FechaHasta + "/" + param.EstadoID + "/" + param.ClienteID + "/" + param.UsuarioID + "/" + param.vendusuarioespec + "/" + param.idPedido);
    };

    HornexService.CancelarPedido = function (pedidoid) {
        return $http.get(urlBase + '/negocio/CancelarPedido/' + pedidoid);
    };
    HornexService.EnviarPedido = function (pedidoid, urgente) {
        return $http.get(urlBase + '/negocio/EnviarPedido/' + pedidoid + '/' + urgente);
    };
    HornexService.GetClienteSugeridos = function (clienteid) {
        return $http.get(urlBase + '/negocio/Sugeridos/' + clienteid + '/' + 2);
    };
    HornexService.GetDepositos = function () {
        return $http.get(urlBase + '/negocio/depositos');
    };
    HornexService.GetUsuariosCat = function () {
        return $http.get(urlBase + '/negocio/usuarioscat');
    };

    //Clientes
    HornexService.GetDistribuidoresReducidos= function () {
        return $http.get(urlBase + '/clientes/distribudiresReducido');
    };
    HornexService.GetCliente= function (clienteid) {
        return $http.get(urlBase + '/clientes/obtenerCliente/' + clienteid);
    };



    return HornexService;
}]);

app.factory('objReference', function () {
    return {
        current:null
    };
});
