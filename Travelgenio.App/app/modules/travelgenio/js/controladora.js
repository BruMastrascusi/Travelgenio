

angular.module('Aplicacion').controller('BoletoCTRL', ['$scope', '$state', 'objReference', 'TravelgenioServices', 'Mensaje',
    function ($scope, $state, objReference, TravelgenioServices, Mensaje) {

        init();
        function init() {
            CargarAeropuertoOrigen();
            CargarTipoViaje();
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

        $scope.setAeropuertoOrigen = function (objSel) {
            $scope.AeropuertoOrigen = objSel;
        };
        $scope.setAeropuertoDestino = function (objSel) {
            $scope.AeropuertoDestino = objSel;
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

        function CargarAeropuertoOrigen() {
            TravelgenioServices.GetAeropuetosOrigen()
                .then(function (response) {
                    $scope.lstAeropuertoOrigen = response.data;
                }
                );
        }

        $scope.buscarVuelos = function () {
            var valida = $('#frmBuscarVUelos').parsley().validate();
            if (!valida) {
                return
            }
            if (moment($scope.objBoleto.FechaDesde) > moment($scope.objBoleto.FechaHasta)) {
                Mensaje.warning("La Fecha Desde no puede ser mayor a la Fecha Hasta.", "Atención");
                return;
            }
            if (moment($scope.objBoleto.FechaDesde) < moment(new Date())) {
                Mensaje.warning("La Fecha Desde no puede ser menor a la Fecha Actual.", "Atención");
                return;
            }

            if ($scope.objAero.AeropuertoOrigen == $scope.objAero.AeropuertoDestino) {
                Mensaje.warning("El aeropuerto de origen no puede ser igual al del destino.", "Atención");
                return;
            }
            if ($scope.obj.TipoViaje == 1) {
                $scope.MostrarIdaVuelta = true;
                $scope.MostrarIda = false;
                TravelgenioServices.GetVuelos($scope.AeropuertoOrigen.CodigoAeropuerto)
                    .then(function (response) {
                        $scope.lstVueloIda = response.data;
                    }
                    );

                TravelgenioServices.GetVuelos($scope.AeropuertoDestino.CodigoAeropuerto)
                    .then(function (response) {
                        $scope.lstVueloVuelta = response.data;
                    }
                    );
            }
            if ($scope.obj.TipoViaje == 2) {
                $scope.MostrarIda = true;
                $scope.MostrarIdaVuelta = false;
                TravelgenioServices.GetVuelos($scope.AeropuertoOrigen.CodigoAeropuerto)
                    .then(function (response) {
                        $scope.lstVueloIda = response.data;
                    }
                    );
            }

        }
        $scope.guardarBoleto = function () {
            var valida = $('#frmBuscar').parsley().validate();
            if (!valida) {
                return
              
            }
            if (moment($scope.objBoleto.FechaNacimiento) > moment(new Date())) {
                Mensaje.warning("La Fecha Nacimiento no puede ser mayor a la Fecha Actual.", "Atención");
                return;
            }
            $scope.objBoleto.listVuelos = new Object();
            $scope.objBoleto.Vuelos = [];
            $scope.objBoleto.Vuelos.push({ CodigoVuelo: $scope.objBoleto.CodigoVueloIda });
            $scope.objBoleto.Vuelos.push({ CodigoVuelo: $scope.objBoleto.CodigoVueloVuelta })
            TravelgenioServices.GuardarBoleto($scope.objBoleto)
                .then(function (response) {
                    Mensaje.success("Boleto guardado con éxito.", "Ok");
                    $state.go('index.main');
                    $scope.objBoleto = {};

                }
                );
        }

    }
]);








