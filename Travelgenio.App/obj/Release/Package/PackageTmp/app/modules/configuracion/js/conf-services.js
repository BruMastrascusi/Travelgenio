/**
 * Created by usuario on 25/10/2017.
 */
'use strict';
app.factory('ConfiguracionServices', ['$http', 'APP_CONFIG', function ($http, APP_CONFIG) {

    $http.defaults.headers.common['Content-Type'] = 'application/json';

    var urlBase = APP_CONFIG.ct_urlBase + APP_CONFIG.ct_urlService;
    var ConfiguracionServices = {};

    ConfiguracionServices.getGrupos = function () {
        return $http.get(urlBase + '/catalogos/grupos');
    };
    ConfiguracionServices.insertGrupo = function (grupo) {
        return $http.post(urlBase + '/catalogos/grupos', grupo);
    };
    ConfiguracionServices.updateGrupo = function (grupo) {
        return $http.put(urlBase + '/catalogos/grupos', grupo);
    };
    ConfiguracionServices.deleteGrupo = function (id) {
        return $http.delete(urlBase + '/catalogos/grupos/' + id);
    };

    ConfiguracionServices.getCatalogueItems = function (codigo) {
        return $http.get(urlBase + '/catalogos/items/' + codigo);
    };
    ConfiguracionServices.insertItem = function (item) {
        return $http.post(urlBase + '/catalogos/items', item);
    };
    ConfiguracionServices.updateItem = function (item) {
        return $http.put(urlBase + '/catalogos/items', item);
    };
    ConfiguracionServices.deleteItem = function (id) {
        return $http.delete(urlBase + '/catalogos/items/' + id);
    };

    return ConfiguracionServices;
}]);
