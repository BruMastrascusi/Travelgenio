/**
 * Created by usuario on 25/10/2017.
 */
'use strict';

angular.module('Aplicacion').controller('CatalogosCTRL', ['$scope', '$state', 'ConfiguracionServices', 'Mensaje',
    function ($scope, $state, ConfiguracionServices, Mensaje) {
        $scope.orderByField = 'Codigo';
        $scope.reverseSort = false;
        init();

        function init(){
            $scope.modo ="";
            $scope.objGrupo = {};
            loadCatalogueGroups();
        }
        function loadCatalogueGroups(){
            ConfiguracionServices.getGrupos()
                .then(function (response) {
                    $scope.lstGrupos = response.data;
                }
            );
        }

        $scope.AgregarGrupo = function(){
            $scope.modo = "A";
            $scope.objEditar = {};
            $('#modalGrupo').modal('show');
        };
        $scope.EditarGrupo = function(obj){
            $scope.modo = "E";
            $scope.objEditar = angular.copy(obj);
            $('#modalGrupo').modal('show');
        };
        $scope.EliminarGrupo = function(obj){
            $scope.objEliminar = obj;
            $('#modalEliminarGrupo').modal('show');
        };
        $scope.ConfirmaEliminarGrupo = function(){
            ConfiguracionServices.deleteGrupo($scope.objEliminar.CatalogueGroupID)
                .then(function () {
                    Mensaje.success("El catálogo seleccionado se eliminó.", "Ok");
                    loadCatalogueGroups();
                    $('#modalEliminarGrupo').modal('hide');
                }
            );
        };
        $scope.GuardarGrupo = function(){
            var valida = $('#frmGrupo').parsley().validate();
            if (valida) {
                if($scope.modo =="A"){
                    ConfiguracionServices.insertGrupo($scope.objEditar)
                        .then(function () {
                            Mensaje.success("Se creó el nuevo catálogo.", "Ok");
                            loadCatalogueGroups();
                            $('#modalGrupo').modal('hide');
                        }
                    );
                }else if($scope.modo =="E"){
                    ConfiguracionServices.updateGrupo($scope.objEditar)
                        .then(function () {
                            Mensaje.success("El catálogo seleccionado se modoficó.", "Ok");
                            loadCatalogueGroups();
                            $('#modalGrupo').modal('hide');
                        }
                    );
                }
            }
        };
        $scope.VerItems = function(obj){
            $state.go("configuracion.items", {objcat:obj});
        };
    }
]);

app.controller('CatalogoItemsCTRL', ['$scope', '$state', 'ConfiguracionServices', 'Mensaje', '$stateParams',
    function ($scope, $state, ConfiguracionServices, Mensaje, $stateParams) {
        $scope.orderByField = 'Codigo';
        $scope.reverseSort = false;
        init();

        function init(){
            $scope.modo ="";
            $scope.CatalogueGroupID = $stateParams.objcat.CatalogueGroupID;
            $scope.Codigo = $stateParams.objcat.Codigo;
            ;

            loadCatalogueItems();
        }
        function loadCatalogueItems(){
            ConfiguracionServices.getCatalogueItems($scope.Codigo)
                .then(function (response) {
                    $scope.lstItems = response.data;
                }
            );
        }

        $scope.AgregarItem = function(){
            $scope.modo = "A";
            $scope.objEditar = {};
            $('#modalItem').modal('show');
            $('#codigogrupo').focus();

        };
        $scope.EditarItem = function(obj){
            $scope.modo = "E";
            $scope.objEditar = angular.copy(obj);
            $('#modalItem').modal('show');
        };
        $scope.EliminarItem = function(obj){
            $scope.objEliminar = obj;
            $('#modalEliminarItem').modal('show');
        };
        $scope.ConfirmaEliminarItem = function(){
            ConfiguracionServices.deleteItem($scope.objEliminar.CatalogueItemID)
                .then(function () {
                    Mensaje.success("El item seleccionado se eliminó.", "Ok");
                    loadCatalogueItems();
                    $('#modalEliminarItem').modal('hide');
                }
            );
        };
        $scope.GuardarItem = function(){
            var valida = $('#frmItem').parsley().validate();
            if (valida) {
                if($scope.modo =="A"){
                    $scope.objEditar.CatalogueGroupID = $scope.CatalogueGroupID;
                    ConfiguracionServices.insertItem($scope.objEditar)
                        .then(function () {
                            Mensaje.success("Se creó el nuevo item.", "Ok");
                            loadCatalogueItems();
                            $('#modalItem').modal('hide');
                        }
                    );
                }else if($scope.modo =="E"){
                    ConfiguracionServices.updateItem($scope.objEditar)
                        .then(function () {
                            Mensaje.success("El item seleccionado se modificó.", "Ok");
                            loadCatalogueItems();
                            $('#modalItem').modal('hide');
                        }
                    );
                }
            }
        };
    }
]);


