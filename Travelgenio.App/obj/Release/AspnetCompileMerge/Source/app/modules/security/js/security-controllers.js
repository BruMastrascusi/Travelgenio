'use strict';

angular.module('Aplicacion').controller('UsuariosCTRL', ['$scope', '$state', 'SecurityServices', 'Mensaje', 'objReference',
    function ($scope, $state, SecurityServices, Mensaje, objReference) {
        $scope.orderByField = 'Usuario';
        $scope.reverseSort = false;

        init();

        function init() {

            $scope.modo = "A";
            loadUsuarios();
        }
        function loadUsuarios() {
            SecurityServices.getUsuarios()
                .then(function (response) {
                    $scope.lstUsuarios = response.data;
                }
            );
        }

        $scope.EditarUsuario = function (obj) {
            objReference.current = {Usuario: obj};
            $state.go('security.usuariosedit');
        };
        $scope.AgregarUsuario = function(){
            objReference.current = null;
            $state.go('security.usuariosedit');
        };
        $scope.EliminarUsuario = function(obj){
            $scope.objEliminar = obj;
            $('#modalEliminarUsuario').modal('show');
        };
        $scope.ConfirmaEliminarUsuario = function(){
            SecurityServices.deleteUsuario($scope.objEliminar.UsuarioID)
                .then(function () {
                    $('#modalEliminarUsuario').modal('hide');
                    Mensaje.success("Se eliminó el usuario seleccionado.", "Atención");
                    loadUsuarios();
                }
            );
        };
   }
]);

app.controller('UsuariosEditCTRL', ['$scope', '$state', 'SecurityServices', 'objReference', 'Mensaje',
    function ($scope, $state, SecurityServices, objReference, Mensaje) {

        init();
        function init(){
            loadRoles();
            loadClientes();
            $scope.lstClientesOriginal = [];
            $scope.lstClientes = [];
            $scope.objCliente = {};

            if(objReference.current !=null){
                $scope.objEditar = objReference.current.Usuario;
                $scope.objEditar.ROLSEL = $scope.objEditar.Roles[0].RolID


                $scope.modo = "E";
                loadEmpleadosCat($scope.objEditar.UsuarioID);
                if($scope.objEditar.Empleo !=null && $scope.objEditar.Empleo.ClienteID >0 && $scope.objEditar.Roles[0].Valor==3000){
                    //DISTRIBUIDOR INTERIOR
                    $scope.objEditar.ClienteID = $scope.objEditar.Empleo.ClienteID;
                    $scope.objCliente.Codigo = $scope.objEditar.Empleo.ClienteID;
                    $scope.objCliente.Nombre = $scope.objEditar.Empleo.ClienteNombre;
                    $scope.objCliente.Descripcion = $scope.objCliente.Codigo + ' - '  + $scope.objCliente.Nombre;
                    $scope.verComboEmpleados = false;
                    $scope.verComboClientes = true;
                }else if($scope.objEditar.Roles[0].Valor==4000){
                    //AUXILIAR DE DEPOSITO
                    $scope.verComboEmpleados = false;
                    $scope.verComboClientes = false;
                }else if($scope.objEditar.Roles[0].Valor==2000 || $scope.objEditar.Roles[0].Valor==1000){
                    //VENDEDOR -- ADMINISTRADOR
                    $scope.verComboEmpleados = true;
                    $scope.verComboClientes = false;
                }
            }else{
                $scope.modo = "A";
                $scope.objEditar = {};
                $scope.objEditar.Empleo = {};
                $scope.verComboEmpleados = false;
                $scope.verComboClientes = false;
                $scope.objEditar.Activo = true;
                loadEmpleadosCat(getEmptyGuid());
            }

        }
        function loadRoles(){
            SecurityServices.getRoles()
                .then(function (response) {
                    $scope.lstRoles = response.data;
                }
            );
        }
        function loadEmpleadosCat(usuarioid){
            SecurityServices.getCatEmpleados(usuarioid)
                .then(function (response) {
                    $scope.lstEmpleadosCat = response.data;
                }
            );
        }
        function loadClientes(){
            SecurityServices.GetDistribuidoresReducidos()
                .then(function (response) {
                    $scope.lstClientesOriginal = response.data;
                    $scope.lstClientes = response.data;
                }
            );
        }


        $scope.Guardar = function () {
            var valida = $('#frmUsuarios').parsley().validate();
            if (valida) {
                if ($scope.modo == "A") {
                    SecurityServices.insertUsuario($scope.objEditar)
                        .then(function () {
                            Mensaje.success("Se guardó el nuevo usuario.", "Atención");
                            $state.go('security.usuarios');
                        }
                    );
                } else if($scope.modo =="E"){
                    SecurityServices.updateUsuario($scope.objEditar)
                        .then(function () {
                            Mensaje.success("Se actualizó el usuario seleccionado.", "Atención");
                            $state.go('security.usuarios');
                        }
                    );
                }
            }
        };
        $scope.SelRol = function(rol){
            if(rol.Valor == 3000){
                if(!rol.Selected){
                    $scope.verComboEmpleados = false;
                    $scope.objEditar.Empleo = null;
                }else{
                    $scope.verComboEmpleados = true;
                }
            }
        };
        $scope.SelRolCombo = function(){
            if($scope.objEditar.ROLSEL !=null){
                var val = $.grep($scope.lstRoles, function (obj) { return obj.RolID == $scope.objEditar.ROLSEL;});
                if(val.length > 0){
                    var rol = val[0];
                    $scope.objEditar.Roles = [];
                    $scope.objEditar.Roles.push(rol);

                    if(rol.Valor == 3000){
                        //Muestro Combo Clientes
                        $scope.objEditar.UsuarioInterno = false;
                        $scope.objEditar.Empleo = null;
                        $scope.verComboEmpleados = false;
                        $scope.verComboClientes = true;

                    }else if(rol.Valor == 2000 ||rol.Valor == 1000){
                        //Roles Admin  y Vendedor Muestro combo de personas
                        $scope.objEditar.UsuarioInterno = true;
                        $scope.verComboClientes = false;
                        $scope.verComboEmpleados = true;
                        $scope.objEditar.ClienteID = null;
                    }else{
                        //Auxiliar de Deposito
                        $scope.objEditar.UsuarioInterno = true;
                        $scope.objEditar.Empleo = null;
                        $scope.objEditar.ClienteID = null;
                        $scope.verComboEmpleados = false;
                        $scope.verComboClientes = false;
                    }
                }
            }else{
                $scope.objEditar.Roles = [];
            }
        };
        $scope.ChangeEmpleado = function(){
            if($scope.objEditar.Empleo.EmpleoID !=null){
                var val = $.grep($scope.lstEmpleadosCat, function (obj) { return obj.EmpleoID == $scope.objEditar.Empleo.EmpleoID;});
                if(val.length > 0){
                    var empleado = val[0];
                    $scope.objEditar.User = empleado.Email;
                    $scope.objEditar.PrimerNombre = empleado.Persona.PrimerNombre;
                    //$scope.objEditar.SegundoNombre = empleado.Persona.SegundoNombre;
                    //$scope.objEditar.PrimerApellido = empleado.Persona.PrimerApellido;
                    //$scope.objEditar.SegundoApellido = empleado.Persona.SegundoApellido;

                }
            }else{
                $scope.objEditar.User = null;
                $scope.objEditar.PrimerNombre = null;
                $scope.objEditar.SegundoNombre = null;
                $scope.objEditar.PrimerApellido = null;
                $scope.objEditar.SegundoApellido = null;
            }

        };
        $scope.SoloCasasCentrales = function(){
            if($scope.objEditar.CasasCentrales){
                var val = $.grep($scope.lstClientesOriginal, function (cliente) { return cliente.EsCasaCentral;});
                $scope.lstClientes = val;
            }else{
                $scope.lstClientes = $scope.lstClientesOriginal;
            }
            console.log($scope.lstClientes.length);
        };
        $scope.getClientes = function (value) {
            var lstReturn = [];
            angular.forEach($scope.lstClientes, function(item){
                if (item.NombreComercial.toUpperCase().indexOf(value.toUpperCase()) >= 0 ||
                    item.Codigo.toString().toUpperCase().indexOf(value.toUpperCase()) >= 0)
                    lstReturn.push(item);
            });
            return lstReturn;
        };
        $scope.setCliente = function (objSel) {
            $scope.objCliente.Codigo = objSel.Codigo;
            $scope.objCliente.Nombre = objSel.NombreComercial;
            $scope.objCliente.Descripcion = objSel.Codigo + ' - '  + objSel.NombreComercial;
            $scope.objEditar.ClienteID = objSel.Codigo;


        };
        $scope.volver = function(){
            $state.go('security.usuarios');
        };

    }
]);

app.controller('PasswordCTRL', ['$scope', '$state', 'SecurityServices', '$http', '$base64', 'Mensaje', 'appSession',
    function ($scope, $state, SecurityServices,$http, $base64, Mensaje, appSession) {

        $scope.objPass = "";

        $scope.CambiarPassword = function(){
            $http.defaults.headers.common['Authorization'] = $base64.encode(unescape(encodeURIComponent($scope.objPass.PassActual+":"+ $scope.objPass.Pass + ":" + $scope.objPass.Pass2)));
                //Base64.encode($scope.objPass.PassActual+":"+ $scope.objPass.Pass + ":" + $scope.objPass.Pass2);

            SecurityServices.CambiarPassword(appSession.currentUser.UsuarioID)
                .then(function (response) {
                    delete $http.defaults.headers.common['Authorization'];
                    Mensaje.success("Contraseña modificada.", "OK");
                    $state.go('index.main');
                },function (errorResponse) {
                    if (errorResponse.status==401) {
                        delete $http.defaults.headers.common['Authorization'];
                        Mensaje.warning(errorResponse.data, "Atención")
                    }else{
                        Mensaje.warning("Error al intentar loguearse. Vuelva a intentarlo.", "Atención")
                    }
                }
            );
        };


    }
]);


