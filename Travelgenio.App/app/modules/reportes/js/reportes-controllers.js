'use strict';

angular.module('Aplicacion').controller('BoletosReportCTRL', ['$scope', '$state', 'TravelgenioServices', 'Mensaje', 'objReference',
    function ($scope, $state, TravelgenioServices, Mensaje, objReference) {


        init();

        function init() {
            loadBoletos();
        }
        // Cargo Boletos
        function loadBoletos() {
            TravelgenioServices.GetBoletos()
                .then(function (response) {
                    $scope.lstBoletos = response.data;
                }
                );

        }
        $scope.EliminarBoleto = function (obj) {
            $scope.objEliminar = obj;
            $('#modalEliminarBoleto').modal('show');
        };
        $scope.ConfirmaEliminarBoleto = function () {
            TravelgenioServices.EliminarBoleto($scope.objEliminar.CodigoBoleto)
                .then(function () {
                    $('#modalEliminarBoleto').modal('hide');
                    Mensaje.success("Se eliminó el boleto seleccionado.", "Atención");
                    loadBoletos();
                }
                );
        };
        $scope.EditarBoleto = function (obj) {
            objReference.current = { Boleto: obj };
            $state.go('reportes.boletosedit');
        };



    }

]);

app.controller('BoletosEditCTRL', ['$scope', '$state', 'TravelgenioServices', 'objReference', 'Mensaje',
    function ($scope, $state, TravelgenioServices, objReference, Mensaje) {

        init();
        function init() {

            CargarTipoViaje();
            CargarAeropuertoOrigen();

            if (objReference.current != null) {

                $scope.objEditar = objReference.current.Boleto;
                $scope.objEditar.FechaDesde = new Date($scope.objEditar.FechaLlegada);
                $scope.objEditar.FechaHasta = new Date($scope.objEditar.FechaSalida);
                $scope.objEditar.FechaNacimiento = new Date($scope.objEditar.FechaNacimiento);
            }
        }

        $scope.setAeropuertoOrigen = function (objSel) {
            $scope.AeropuertoOrigen = objSel.CodigoAeropuerto;
        };
        $scope.setAeropuertoDestino = function (objSel) {
            $scope.AeropuertoDestino = objSel.CodigoAeropuerto;
        };

        $scope.getAeropuertosOrigen = function (value) {
            var lstReturn = [];
            if (value != null && value != '' && value.length >= 3) {
                angular.forEach($scope.lstAeropuertoOrigen, function (item) {
                    if (item.NombreAeropuerto.toUpperCase().indexOf(value.toUpperCase()) >= 0 ||
                        item.NombreAeropuerto.toString().toUpperCase().indexOf(value.toUpperCase()) >= 0)
                        lstReturn.push(item);
                });
            }
            return lstReturn;
        };

        $scope.getAeropuertosDestino = function (value) {
            var lstReturn = [];
            if (value != null && value != '' && value.length >= 3) {
                angular.forEach($scope.lstAeropuertoOrigen, function (item) {
                    if (item.NombreAeropuerto.toUpperCase().indexOf(value.toUpperCase()) >= 0 ||
                        item.NombreAeropuerto.toString().toUpperCase().indexOf(value.toUpperCase()) >= 0)
                        lstReturn.push(item);
                });
            }
            return lstReturn;
        };

        $scope.buscarVuelos = function () {
            var valida = $('#frmBuscarVUelos').parsley().validate();
            if (!valida) {
                return
            }
            if (moment($scope.objEditar.FechaDesde) > moment($scope.objEditar.FechaHasta)) {
                Mensaje.warning("La Fecha Desde no puede ser mayor a la Fecha Hasta.", "Atención");
                return;
            }
            if (moment($scope.objEditar.FechaDesde) < moment(new Date())) {
                Mensaje.warning("La Fecha Desde no puede ser menor a la Fecha Actual.", "Atención");
                return;
            }
            if (moment($scope.objEditar.FechaNacimiento) > moment(new Date())) {
                Mensaje.warning("La Fecha Nacimiento no puede ser mayor a la Fecha Actual.", "Atención");
                return;
            }
            if ($scope.AeropuertoOrigen == null) {
                $scope.AeropuertoOrigen = $scope.objEditar.CodigoAeropuertoOrigen
            }
            if ($scope.AeropuertoDestino == null) {
                $scope.AeropuertoDestino = $scope.objEditar.CodigoAeropuertoDestino
            }
            if ($scope.AeropuertoOrigen == $scope.AeropuertoDestino) {
                Mensaje.warning("El aeropuerto de origen no puede ser igual al del destino.", "Atención");
                return;
            }
            if ($scope.objEditar.TipoViaje == 1) {
              
                TravelgenioServices.GetVuelos($scope.AeropuertoOrigen, $scope.AeropuertoDestino, moment(new Date($scope.objEditar.FechaDesde)).format("YYYY-MM-DD"))
                    .then(function (response) {
                       
                        if (response.data.length == 0) {
                            Mensaje.warning("No existen vuelos para el origen seleccionado en la fecha: " + moment(new Date($scope.objEditar.FechaDesde)).format("YYYY-MM-DD"), "Atención");
                            return;
                        } else {
                            $scope.MostrarIdaVuelta = true;
                            $scope.MostrarIda = false;
                            $scope.lstVueloIda = [];
                            $scope.lstVueloIda = response.data;
                        }
                        $scope.lstVueloIda = response.data;
                    }
                    );

                TravelgenioServices.GetVuelos($scope.AeropuertoDestino, $scope.AeropuertoOrigen, moment(new Date($scope.objEditar.FechaHasta)).format("YYYY-MM-DD"))
                    .then(function (response) {
              
                        if (response.data.length == 0) {
                            Mensaje.warning("No existen vuelos para el destino seleccionado en la fecha: " + moment(new Date($scope.objEditar.FechaHasta)).format("YYYY-MM-DD"), "Atención");
                            return;
                        } else {
                            $scope.lstVueloVuelta = [];
                            $scope.lstVueloIda = response.data;
                        }
                        $scope.lstVueloVuelta = response.data;
                    }
                    );
            }
            if ($scope.objEditar.TipoViaje == 2) {
                
                TravelgenioServices.GetVuelos($scope.AeropuertoOrigen, $scope.AeropuertoDestino, moment(new Date($scope.objEditar.FechaDesde)).format("YYYY-MM-DD"))
                    .then(function (response) {
                        if (response.data.length == 0) {
                            Mensaje.warning("No existen vuelos para el origen seleccionado en la fecha: " + moment(new Date($scope.objEditar.FechaDesde)).format("YYYY-MM-DD"), "Atención");
                            return;
                        } else {
                            $scope.MostrarIda = true;
                            $scope.MostrarIdaVuelta = false;
                            $scope.lstVueloIda = response.data;
                        }
                      
                    }
                    );
            }
      }
        $scope.editarBoleto = function () {
        var valida = $('#frmBuscar').parsley().validate();
        if (!valida) {
            return
        }

            if (moment($scope.objEditar.FechaNacimiento) > moment(new Date())) {
            Mensaje.warning("La Fecha Nacimiento no puede ser mayor a la Fecha Actual.", "Atención");
            return;
        }
        $scope.objEditar.listVuelos = new Object();
        $scope.objEditar.Vuelos = [];
        $scope.objEditar.Vuelos.push({ CodigoVuelo: $scope.objEditar.CodigoVueloIda });
        $scope.objEditar.Vuelos.push({ CodigoVuelo: $scope.objEditar.CodigoVueloVuelta })
        console.log($scope.objEditar)
        TravelgenioServices.EditarBoleto($scope.objEditar)
            .then(function (response) {
                Mensaje.success("Boleto editado con éxito.", "Ok");
                $state.go('reportes.boletos');
                $scope.objBoleto = {};
            }
            );
    }

        function CargarTipoViaje() {
        $scope.lstTipoViaje = [
            {
                id: 1,
                nombre: "Ida y Vuelta"
            },
            {
                id: 2,
                nombre: "Ida"
            },

        ];
    }
        function CargarAeropuertoOrigen() {
        TravelgenioServices.GetAeropuetosOrigen()
            .then(function (response) {
                $scope.lstAeropuertoOrigen = response.data;
            }
            );
    }



    }
]);




