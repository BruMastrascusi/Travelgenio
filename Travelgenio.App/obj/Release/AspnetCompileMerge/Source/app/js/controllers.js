'use strict';

app.controller('HomeCtrl', ['$rootScope', '$state','$scope', 'appSession', 'appDominio',
    function ($rootScope, $state, $scope, appSession, appDominio) {
        //$scope.usuariologueado = appSession.currentUser;

        window.onbeforeunload = function() { return "Your work will be lost."; };
        /*window.onbeforeunload = function() { return "Your work will be lost."; };
         $scope.$on('$destroy', function() {
         delete window.onbeforeunload;
         });*/

    }]);

app.controller('LoginCtrl', ['$rootScope', '$state','$scope', '$http', '$base64', 'ServiciosGlobales', 'Mensaje', 'Autenticacion', 'appRoles', '$cookies',
    function ($rootScope, $state, $scope, $http, $base64, Srv, Mensaje, Autenticacion, appRoles, $cookies) {

        //$scope.usu = { User: "hornex", Pass:"12"};
        //$scope.usu = { User: "lolo@gmail.com", Pass:"12", Dominio:"Entrust"}

        $scope.Login = function(){
            //$http.defaults.headers.common['Authorization'] =$base64.encode($scope.usu.User+":"+ $scope.usu.Pass + ":" + $scope.usu.Dominio);
            $http.defaults.headers.common['Authorization'] = $base64.encode(unescape(encodeURIComponent($scope.usu.User+":"+ $scope.usu.Pass + ":" + "Hornex")));

            Srv.login()
                .then(function (response) {
                    delete $http.defaults.headers.common['Authorization'];
                    var result = response.data;
                    var usuarioid = result.split(":")[0];
                    var dominioid = result.split(":")[1];

                    Srv.getDominio(dominioid).then(function (res) {
                            var objDominio = res.data;
                            Autenticacion.setDominio(objDominio);

                            Srv.getUsuario(usuarioid).then(function (res) {
                                    var objUser = res.data;
                                    Autenticacion.login(objUser);
                                    appRoles.setRoles(objUser.Roles);
                                    $state.go('index.main');
                                }
                            );

                        }
                    );
                }
            );

        };
        //$scope.Login();
    }]);

app.controller('NavBarCtrl', ['$scope', '$state', 'ServiciosGlobales', 'appSession', 'appRoles',
    function ($scope, $state, ServiciosGlobales, appSession, appRoles) {
        $scope.notificaciones = 0;
        $scope.cantRecibos = 0;
        $scope.cantSolicitudes = 0;
        init();

        function init(){

        };

        $scope.Volver = function(){
            $state.go($state.current.data.StateBack);
        };
        $scope.CambiarPass = function(){
            $state.go('security.password');
        };

    }]);

app.controller('RegistroCtrl', ['$scope', '$state', 'Mensaje', 'ServiciosGlobales', 'Autenticacion', 'appRoles', '$http',
    function ($scope, $state, Mensaje, Srv, Autenticacion, appRoles, $http) {
        $scope.objEditar = {};

        $scope.registro = function(){
            var valida = ($scope.objEditar.Password === $scope.objEditar.Password2);
            if (valida) {
                Srv.registro($scope.objEditar)
                    .then(function (response) {
                        var result = response.data;
                        var usuarioid = result.split(":")[0];
                        var sessionToken = result.split(":")[1];
                        $http.defaults.headers.common['Session'] = sessionToken;//Base64.encode(sessionToken);

                        Srv.getUsuario(usuarioid).then(function (res) {
                                var objUser = res.data;
                                Autenticacion.login(objUser);
                                appRoles.setRoles(objUser.Roles);
                                Mensaje.success("Se ha registrado con éxito.", "Bienvenido");
                                $state.go('index.main');
                            }
                        );
                    },function (errorResponse) {
                        if (errorResponse.status==401) {
                            Mensaje.warning(errorResponse.data, "Atención")
                        }else{
                            Mensaje.warning("Error al intentar loguearse. Vuelva a intentarlo.", "Atención")
                        }
                    }
                );
            }else{
                Mensaje.error("Las contraseñas ingresadas no coniciden. Vuelva a ingresar.", "Atención");
            }
        };
    }]);

app.controller('RecuperarCtrl', ['$scope', '$stateParams', 'ServiciosGlobales', 'Mensaje', '$state', '$base64', '$http',
    function ($scope, $stateParams, Srv, Mensaje, $state, $base64, $http) {
        init();

        function init(){
            $scope.objEditar = {};
            $scope.token = $stateParams.token;
        }

        $scope.Solicitar = function(){
            Srv.solicitarRecuperar($scope.objEditar.Email)
                .then(function(){
                    Mensaje.success("Revise su casilla de correo y siga las indicaciones.", "Enhorabuena");
                    $state.go('login');
                },function (errorResponse) {
                    Mensaje.error(errorResponse.data, "Atención");
                }
            )
        };
        $scope.Recuperar = function(){
            var valida = ($scope.objEditar.Pass === $scope.objEditar.Pass2);
            if (valida) {
                $http.defaults.headers.common['Authorization'] = $base64.encode(unescape(encodeURIComponent($scope.token + ":" + $scope.objEditar.Pass)));
                //$base64.encode($scope.token + ":" + $scope.objEditar.Pass);
                Srv.recuperar($scope.email)
                    .then(function(){
                        delete $http.defaults.headers.common['Authorization'];
                        Mensaje.success("Ha actualizaco su contraseña.", "Enhorabuena");
                        $state.go('login');
                    },function (errorResponse) {
                        Mensaje.error(errorResponse.data, "Atención");
                        $state.transitionTo($state.current, null, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });

                    }
                )
            }else{
                Mensaje.error("Las contraseñas ingresadas no coniciden. Vuelva a ingresar.", "Atención");
            }

        };
    }]);