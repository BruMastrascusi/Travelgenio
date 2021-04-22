angular.module('Aplicacion').controller('ClientesCTRL', ['$scope', '$state', 
    function ($scope, $state) {
        init();

        function init() {
            
        }
    }
]);

app.controller('PedidosCTRL', ['$scope', '$state', 'objReference',
    function ($scope, $state, objReference) {

        init();
        function init(){
            $scope.lstPedidos = [];
            $scope.modoPagina = {};

            if($state.current.name == 'hornex.adminpedidos'){
                $scope.modoPagina.NextPedidoNuevo = "hornex.adminpedidonuevo";
                $scope.modoPagina.NextPedidosLista = "hornex.adminpedidolista";
            }else if($state.current.name == 'hornex.vendpedidos'){
                $scope.modoPagina.NextPedidoNuevo = "hornex.vendpedidonuevo";
                $scope.modoPagina.NextPedidosLista = "hornex.vendpedidolista";
            }else if($state.current.name == 'hornex.distpedidos'){
                $scope.modoPagina.NextPedidoNuevo = "hornex.distpedidonuevo";
                $scope.modoPagina.NextPedidosLista = "hornex.distpedidolista";
            }
            else if($state.current.name == 'hornex.administracionpedidos'){
                $scope.modoPagina.NextPedidoNuevo = "hornex.administracionpedidonuevo";
                $scope.modoPagina.NextPedidosLista = "hornex.administracionpedidolista";
            }
        }

        $scope.nuevoPedido = function(){
            objReference.current = {Modo:"A"};
            //$state.go('hornex.adminpedidonuevo');
            $state.go($scope.modoPagina.NextPedidoNuevo);
        };
        $scope.verPedidos = function(){
            $state.go($scope.modoPagina.NextPedidosLista);
        };
    }
]);

app.controller('PedidoNuevoCTRL', ['$scope', '$rootScope', '$state', 'Mensaje', 'HornexServices', '$filter', 'objReference',
    function ($scope, $rootScope, $state, Mensaje, HornexServices, $filter, objReference) {

        $scope.filtros = {};
        $scope.filtros.EmployDescription = "";
        $scope.orderByField = 'Nombre';
        $scope.reverseSort = false;
        init();

        function init() {
            $scope.modoPagina = {};
            if($state.current.name == 'hornex.adminpedidonuevo'){
                $scope.modoPagina.Previous = "hornex.adminpedidolista";
                $scope.modoPagina.Default = "hornex.adminpedidos";
                $scope.modoPagina.ModoRol ="Admin";
            }else if($state.current.name == 'hornex.vendpedidonuevo'){
                $scope.modoPagina.Previous = "hornex.vendpedidolista";
                $scope.modoPagina.Default = "hornex.vendpedidos";
                $scope.modoPagina.ModoRol ="Vend";
            }else if($state.current.name == 'hornex.distpedidonuevo'){
                $scope.modoPagina.Previous = "hornex.distpedidolista";
                $scope.modoPagina.Default = "hornex.distpedidos";
                $scope.modoPagina.ModoRol ="Dist";
            }else if($state.current.name == 'hornex.administracionpedidonuevo'){
                $scope.modoPagina.Previous = "hornex.administracionpedidolista";
                $scope.modoPagina.Default = "hornex.administracionpedidos";
                $scope.modoPagina.ModoRol ="Administracion";
            }

            if(objReference.current ==null){
                //F5
                //$state.go('hornex.adminpedidos');
                $state.go($scope.modoPagina.Default);
                return;
            }

            if(objReference.current.Modo =="M"){
                $scope.modoPedido = "M";

                //Cargo el objPedido a partir del id que me da el current
                CargarPedido(objReference.current.PedidoId);
                CargarEstados();
            }else if(objReference.current.Modo =="A"){

                if($rootScope.objPedido == null || $rootScope.objPedido.Cliente ==null){
                    //QUiere decir que nunca se selecciono siquiera el cliente.
                    $rootScope.objPedido = {TOTAL:0, Articulos:[]};
                    $scope.objCliente = {};
                }else{
                    $scope.Camino = [];
                    $scope.objCliente = {};
                    $scope.objCliente.Codigo = $rootScope.objPedido.Cliente.Codigo;
                    $scope.objCliente.Nombre = $rootScope.objPedido.Cliente.NombreComercial;
                    $scope.objCliente.Descripcion = $scope.objCliente.Codigo + ' - '  + $scope.objCliente.Nombre;
                    $scope.objClienteData= {Vendedor:{Deposito:$rootScope.objPedido.Deposito}};
                    $scope.Camino.push({Descripcion: $rootScope.objPedido.Cliente.NombreComercial, Paso:1});

                }

                $scope.modoPedido = "A";
                CargarClientes();
                CargarDepartamentos();

            }
            CargarDepositos();
            $scope.objAux = {DepartamentoId:null, SeccionId: null, FamiliaId: null};
            $scope.lstDepartamentos = [];
            $scope.lstSecciones = [];
            $scope.lstFamilias = [];
            $scope.lstArticulos = [];
            $scope.objSeleccion = {Paso:1};
            $scope.elimino = false;

        }
        function CargarPedido(pedidoid){
            HornexServices.GetPedido(pedidoid)
                .then(function (response) {
                    //$scope.objPedido = response.data;
                    $rootScope.objPedido = {};
                    var obj = response.data;

                    var lstArticulosAux = [];
                    angular.forEach(obj.Articulos, function(linea){
                        var objArticulo = {};
                        objArticulo = linea.Articulo;
                        objArticulo.CANTIDAD = linea.CANTIDAD;
                        objArticulo.DESCUENTOESPECIAL = linea.DESCUENTOESPECIAL;
                        objArticulo.PrecioVentaNuevo = linea.PrecioVentaNuevo;
                        objArticulo.Total = linea.Total;
                        //objArticulo.Total = objArticulo.PrecioVenta * parseInt(objArticulo.CANTIDAD) * objArticulo.EMPAQUE;
                        if(objArticulo.DESCUENTOESPECIAL > 0){
                            objArticulo.DtoPesosValor = objArticulo.PrecioVentaNuevo ;
                            objArticulo.DtoPorcentaje = true;
                        }
                        lstArticulosAux.push(objArticulo);
                    });

                    $rootScope.objPedido = obj;
                    $rootScope.objPedido.Articulos = [];
                    $rootScope.objPedido.Articulos = lstArticulosAux;
                    $scope.Camino = [];
                    $scope.objCliente = {Codigo:$rootScope.objPedido.Cliente.Codigo, NombreComercial: $rootScope.objPedido.Cliente.NombreComercial};
                    $scope.objClienteData= {Vendedor:{Deposito:$rootScope.objPedido.Deposito}};
                    $scope.Camino.push({Descripcion: $rootScope.objPedido.Cliente.NombreComercial, Paso:1});
                    CargarDepartamentos();

                }
            );
        }
        function CargarClientes(){
            HornexServices.GetDistribuidoresReducidos()
                .then(function (response) {
                    $scope.lstClientes = response.data;
                    if($scope.lstClientes.length ==1){
                        var cliente = $scope.lstClientes[0];

                        $scope.objCliente.Codigo = cliente.Codigo;
                        $scope.objCliente.Nombre = cliente.NombreComercial;
                        $scope.objCliente.Descripcion = cliente.Codigo + ' - '  + cliente.NombreComercial;
                        $rootScope.objPedido.Cliente = cliente;
                        $scope.Camino = [];
                        $scope.Camino.push({Descripcion: $rootScope.objPedido.Cliente.NombreComercial, Paso:1});
                        HornexServices.GetCliente($rootScope.objPedido.Cliente.Codigo)
                            .then(function (response) {
                                $scope.objClienteData = response.data;
                                $rootScope.objPedido.Deposito = $scope.objClienteData.Vendedor.Deposito;
                            }
                        );
                    }
                }
            );
        }
        function CargarDepartamentos(){
            HornexServices.GetDepartamentos()
                .then(function (response) {
                    $scope.lstDepartamentos = response.data;
                    if($scope.modoPedido =='M' || $rootScope.objPedido !=null){
                        angular.forEach($scope.lstDepartamentos, function(depto){
                            var val = $.grep($rootScope.objPedido.Articulos, function (art) {
                                return depto.IDDEPTO == art.GRAFDEPARTAMENTO
                            });
                            depto.SEL = (val.length > 0);
                        });
                    }
                }
            );
        }
        function CargarEstados(){
            HornexServices.GetPedidoEstados()
                .then(function (response) {
                    $scope.lstEstados = response.data;
                }
            );
        }
        function CargarDepositos(){
            HornexServices.GetDepositos()
                .then(function (response) {
                    $scope.lstDepositos = response.data;
                }
            );
        }

        function ActualizoArticuloListadoGeneral(articulo){
            if(articulo.DtoPorcentaje){

                var preciodto =  articulo.PrecioVentaConDescuento * (1-(articulo.DESCUENTOESPECIAL/100));
                preciodto = evenRound(preciodto, 2);
                var preciodtoimpuesto =  preciodto * (1+(articulo.ImpuestoPorcentaje/100));
                var precionuevo = preciodtoimpuesto * articulo.CANTIDAD * articulo.EMPAQUE;
                articulo.PrecioVentaNuevo = evenRound(preciodtoimpuesto, 2);
                articulo.DtoPesosValor = evenRound(preciodtoimpuesto, 2);
                articulo.Total = evenRound(precionuevo, 2);

            }else if(articulo.DtoPesos){

                articulo.PrecioVentaNuevo = articulo.DtoPesosValor;
                var porc = articulo.PrecioVentaNuevo/articulo.PrecioVenta;
                porc = porc*100 - 100;
                porc = evenRound(porc, 1);
                articulo.DESCUENTOESPECIAL = porc*(-1);

                var preciodto =  articulo.PrecioVentaConDescuento * (1-(articulo.DESCUENTOESPECIAL/100));
                preciodto = evenRound(preciodto, 2);
                var preciodtoimpuesto =  preciodto * (1+(articulo.ImpuestoPorcentaje/100));
                var precionuevo = preciodtoimpuesto * articulo.CANTIDAD * articulo.EMPAQUE;
                articulo.PrecioVentaNuevo = evenRound(preciodtoimpuesto, 2);
                articulo.DtoPesosValor = evenRound(preciodtoimpuesto, 2);
                articulo.Total = evenRound(precionuevo, 2);

                articulo.DtoPesos = false;
                articulo.DtoPorcentaje = true;
            }else{

                var preciodtoimpuesto =  articulo.PrecioVentaConDescuento * (1+(articulo.ImpuestoPorcentaje/100));
                var precionuevo = preciodtoimpuesto * articulo.CANTIDAD * articulo.EMPAQUE;
                articulo.Total = evenRound(precionuevo, 2);
            }

            var val = $.grep($rootScope.objPedido.Articulos, function (art) { return art.CODARTICULO == articulo.CODARTICULO});
            if(val.length ==0){
                //Hago click por primera vez en el articulo
                $rootScope.objPedido.Articulos.push(articulo);
            }else{
                //Ya existe, debo sumar la cantidad.
                if(articulo.CANTIDAD > 0){
                    val[0].CANTIDAD = articulo.CANTIDAD;
                    val[0].TotalCantidad = articulo.TotalCantidad;
                    val[0].Total = articulo.Total;
                    val[0].PrecioVentaNuevo = articulo.PrecioVentaNuevo;
                    if(articulo.FaltaDesde !=null){
                        val[0].FaltaDesde = articulo.FaltaDesde;
                        val[0].FaltaHasta = articulo.FaltaHasta;
                    }
                    if(articulo.PrecioVentaNuevo !=null && articulo.PrecioVentaNuevo >= 0){
                        val[0].DtoPorcentaje = articulo.DtoPorcentaje;
                        val[0].DtoPesos = articulo.DtoPesos;
                        val[0].DESCUENTOESPECIAL = articulo.DESCUENTOESPECIAL ;
                        val[0].DtoPesosValor = articulo.DtoPesosValor;
                    }
                }else{
                    //Quedo en 0, lo elimino del listado
                    var lstAux = [];
                    angular.forEach($rootScope.objPedido.Articulos, function(art){
                        if(art.CODARTICULO != articulo.CODARTICULO) lstAux.push(art);
                    });
                    $rootScope.objPedido.Articulos = lstAux;
                }

            }
        }

        $scope.changeDepartamento = function(depto){
            if(!$scope.elimino){
                if($rootScope.objPedido.Cliente !=null){
                    $scope.objAux.DepartamentoId = depto.IDDEPTO;
                    $scope.objSeleccion = {Paso:2};
                    $scope.Camino.push({Descripcion: depto.NOMDEPTO, Paso:2});
                    $scope.lstSecciones = [];
                    $scope.lstFamilias = [];
                    $scope.lstArticulos= [];
                    HornexServices.GetSecciones($scope.objAux.DepartamentoId)
                        .then(function (response) {
                            $scope.lstSecciones = response.data;
                            angular.forEach($scope.lstSecciones, function(seccion){
                                var val = $.grep($rootScope.objPedido.Articulos, function (art) {
                                    return art.GRAFSECCION == seccion.IDSECCION && seccion.IDDEPTO == art.GRAFDEPARTAMENTO
                                });
                                seccion.SEL = (val.length > 0);
                            });
                        }
                    );
                }else{
                    Mensaje.warning("Debe seleccionar Cliente", "Atención");
                }
            }
            $scope.elimino = false;
        };
        $scope.changeSeccion = function(sec){
            $scope.objAux.SeccionId = sec.IDSECCION;
            $scope.lstFamilias = [];
            $scope.lstArticulos= [];

            $scope.objSeleccion = {Paso:3};
            $scope.Camino.push({Descripcion: sec.NOMSECCION, Paso:3});

            HornexServices.GetFamilias($scope.objAux.DepartamentoId, $scope.objAux.SeccionId)
                .then(function (response) {
                    $scope.lstFamilias = response.data;
                    angular.forEach($scope.lstFamilias, function(familia){
                        var val = $.grep($rootScope.objPedido.Articulos, function (fam) {
                            return fam.GRAFFAMILIA == familia.IDFAMILIA && familia.IDDEPTO == fam.GRAFDEPARTAMENTO && familia.IDSECCION == fam.GRAFSECCION
                        });
                        familia.SEL = (val.length > 0);
                    });
                }
            );

        };
        $scope.changeFamilia = function(fam){
            $scope.objAux.FamiliaId = fam.IDFAMILIA;
            $scope.lstArticulos= [];

            $scope.objSeleccion = {Paso:4};
            $scope.Camino.push({Descripcion: fam.NOMFAMILIA, Paso:4});

            HornexServices.GetArticulosConPrecio($scope.objAux.DepartamentoId, $scope.objAux.SeccionId, $scope.objAux.FamiliaId, $rootScope.objPedido.Cliente.Codigo)
                .then(function (response) {
                    var lstArticulos = response.data;
                    angular.forEach(lstArticulos, function(articulo){

                        var val = $.grep($rootScope.objPedido.Articulos, function (art) { return art.CODARTICULO == articulo.CODARTICULO});
                        if(val.length > 0){

                            articulo.CANTIDAD = val[0].CANTIDAD;
                            articulo.Total = val[0].Total;
                            articulo.TotalCantidad = val[0].TotalCantidad;
                            articulo.PrecioVentaNuevo = val[0].PrecioVentaNuevo;
                            if(articulo.PrecioVentaNuevo !=null && articulo.PrecioVentaNuevo > 0){
                                articulo.DtoPorcentaje = val[0].DtoPorcentaje;
                                articulo.DtoPesos = val[0].DtoPesos;
                                articulo.DESCUENTOESPECIAL = val[0].DESCUENTOESPECIAL;
                                articulo.DtoPesosValor = val[0].DtoPesosValor;
                            }

                        }
                    });
                    $scope.lstArticulos = lstArticulos;
                }
            );

        };
        $scope.getClientes = function (value) {
            var lstReturn = [];
            if(value !=null && value !='' && value.length >=3){
                angular.forEach($scope.lstClientes, function(item){
                    if (item.NombreComercial.toUpperCase().indexOf(value.toUpperCase()) >= 0 ||
                        item.Codigo.toString().toUpperCase().indexOf(value.toUpperCase()) >= 0)
                        lstReturn.push(item);
                });
            }


            return lstReturn;
        };
        $scope.setCliente = function (objSel) {
            $scope.objCliente.Codigo = objSel.Codigo;
            $scope.objCliente.Nombre = objSel.NombreComercial;
            $scope.objCliente.Descripcion = objSel.Codigo + ' - '  + objSel.NombreComercial;
            $rootScope.objPedido.Cliente = objSel;
            $scope.Camino = [];
            $scope.Camino.push({Descripcion: $rootScope.objPedido.Cliente.NombreComercial, Paso:1});
            HornexServices.GetCliente($rootScope.objPedido.Cliente.Codigo)
                .then(function (response) {
                    $scope.objClienteData = response.data;
                    $rootScope.objPedido.Deposito = $scope.objClienteData.Vendedor.Deposito;
                }
            );
        };
        $scope.verCamino = function(cam){
            if(cam.Paso!=4){
                $scope.objSeleccion.Paso = cam.Paso;
                var lst = [];
                if(cam.Paso ==1) {
                    //Departamentos
                    angular.forEach($scope.lstDepartamentos, function(depto){
                        var val = $.grep($rootScope.objPedido.Articulos, function (art) { return art.GRAFDEPARTAMENTO == depto.IDDEPTO});
                        depto.SEL = (val.length > 0);
                    });

                    lst.push($scope.Camino[0]);
                }else if(cam.Paso ==2){
                    //Secciones
                    angular.forEach($scope.lstSecciones, function(seccion){
                        var val = $.grep($rootScope.objPedido.Articulos, function (art) {


                            return art.GRAFSECCION == seccion.IDSECCION && seccion.IDDEPTO == art.GRAFDEPARTAMENTO
                        });
                        seccion.SEL = (val.length > 0);
                    });
                    lst.push($scope.Camino[0]);
                    lst.push($scope.Camino[1]);
                }else if(cam.Paso ==3){
                    //Familias
                    angular.forEach($scope.lstFamilias, function(familia){
                        var val = $.grep($rootScope.objPedido.Articulos, function (fam) {
                            return fam.GRAFFAMILIA == familia.IDFAMILIA && familia.IDDEPTO == fam.GRAFDEPARTAMENTO && familia.IDSECCION == fam.GRAFSECCION
                        });
                        familia.SEL = (val.length > 0);
                    });
                    lst.push($scope.Camino[0]);
                    lst.push($scope.Camino[1]);
                    lst.push($scope.Camino[2]);
                }
                $scope.Camino = lst;
            }
        };
        $scope.validarDeposito = function(){
            if($scope.modoPagina.ModoRol =="Vend"){
                $scope.depCambiado = $rootScope.objPedido.Deposito;
                $rootScope.objPedido.Deposito = $scope.objClienteData.Vendedor.Deposito;
                $('#modalDeposito').modal('show');
            }
        };
        $scope.confirmaValidarDeposito = function(){
            $rootScope.objPedido.Deposito = $scope.depCambiado;
            $('#modalDeposito').modal('hide');
        };
        $scope.verImagen = function(obj, tipo){
            if(tipo=='depto')$scope.objVer = {Codigo: obj.IDDEPTO, Nombre: obj.NOMDEPTO, Imagen: obj.IMG};
            if(tipo=='sec')$scope.objVer = {Codigo: obj.IDSECCION, Nombre: obj.NOMSECCION, Imagen: obj.IMG};
            if(tipo=='fam')$scope.objVer = {Codigo: obj.IDFAMILIA, Nombre: obj.NOMFAMILIA, Imagen: obj.IMG};
            if(tipo=='art')$scope.objVer = {Codigo: obj.CODARTICULO, Nombre: obj.DESCRIPCION, Imagen: obj.IMG};

            $('#modalImagen').modal('show');
        };
        $scope.ordenDefecto = function(){
            $scope.orderByField = 'Nombre';
            $scope.reverseSort = false;

        };
        $scope.masSabor = function(articulo){

            if(articulo.CANTIDAD ==null)articulo.CANTIDAD =0;
            articulo.CANTIDAD++;

            ActualizoArticuloListadoGeneral(articulo);
        };
        $scope.menosSabor = function(articulo){
            if(articulo.CANTIDAD ==null)articuloCANTIDAD =0;
            if(articulo.CANTIDAD >0){
                articulo.CANTIDAD--;
                ActualizoArticuloListadoGeneral(articulo);

                if(articulo.CANTIDAD ==0){
                    articulo.PrecioVentaNuevo = null;
                    articulo.DtoPorcentaje = null;
                    articulo.DtoPesos = null;
                    articulo.DESCUENTOESPECIAL = null;
                    articulo.DtoPesosValor = null;
                }

            }else if(articulo.CANTIDAD ==0){
                //Quiere decir que elimino el articulo.
                articulo.PrecioVentaNuevo = null;
                articulo.DtoPorcentaje = null;
                articulo.DtoPesos = null;
                articulo.DESCUENTOESPECIAL = null;
                articulo.DtoPesosValor = null;

                var lstAux = [];
                angular.forEach($rootScope.objPedido.Articulos, function(art){
                    if(art.CODARTICULO != articulo.CODARTICULO) lstAux.push(art)
                });
                $rootScope.objPedido.Articulos = lstAux;
            }
        };
        $scope.CambiaCantidad = function(articulo){
            //articulo.CANTIDAD = TryParseInt(articulo.CANTIDAD, 0);
            if(articulo.CANTIDAD ==0){

                var lstAux = [];

                angular.forEach($rootScope.objPedido.Articulos, function(art){
                    if(art.CODARTICULO != articulo.CODARTICULO) lstAux.push(art);
                });
                $rootScope.objPedido.Articulos = lstAux;
                articulo.CANTIDAD = "";
                articulo.Total = 0;
            }else{
                if(articulo.CANTIDAD ==null)articulo.CANTIDAD =0;
                ActualizoArticuloListadoGeneral(articulo);
            }
        };
        $scope.EliminarProductos = function(depto){
            $scope.elimino = true;
            $scope.objEliminar = depto;
            $('#modalEliminar').modal('show');
        };
        $scope.ConfirmaEliminarProductos = function(){
            var depto = $scope.objEliminar;
            depto.SEL = false;
            var lstAux = [];
            angular.forEach($rootScope.objPedido.Articulos, function(articulo){
                if(articulo.GRAFDEPARTAMENTO != depto.IDDEPTO) lstAux.push(articulo);
            });
            $rootScope.objPedido.Articulos = lstAux;
            $('#modalEliminar').modal('hide');
        };
        $scope.verPedido = function(){
            var totalpedido = 0;

            angular.forEach($rootScope.objPedido.Articulos, function(articulo){
                totalpedido += articulo.Total;
            });
            $rootScope.objPedido.TOTAL = totalpedido;
            $('#detallePedido').modal('show');
        };
        $scope.EliminarProducto = function(obj, i){
            $rootScope.objPedido.Articulos.splice(i, 1);
            $rootScope.objPedido.TOTAL-= obj.Total;
        };
        $scope.verCliente = function(){
            if($rootScope.objPedido.Cliente !=null){
                $('#modalCliente').modal('show');
            }
        };
        $scope.verSugeridos = function(){
            if($rootScope.objPedido.Cliente !=null){
                HornexServices.GetClienteSugeridos($rootScope.objPedido.Cliente.Codigo)
                    .then(function (response) {
                        var lstSugeridos = response.data;
                        var lstAux = [];
                        angular.forEach(lstSugeridos, function(item){
                            angular.forEach(item.Sugeridos, function(sugerido){
                                var val = $.grep($rootScope.objPedido.Articulos, function (art) {return sugerido.CODARTICULO == art.CODARTICULO});
                                if(val.length==0) lstAux.push(sugerido);
                            });
                        });

                        $scope.lstSugeridos = lstAux;
                        $('#modalSugeridos').modal('show');
                    }
                );
            }
        };
        $scope.dtoPorcentaje = function(articulo){
            articulo.DtoPorcentaje = true;
            articulo.DtoPesos = false;
        };
        $scope.dtoPesos = function(articulo){
            articulo.DtoPorcentaje = false;
            articulo.DtoPesos = true;
        };
        $scope.aplicaDtos = function(articulo){
            //if(articulo.DtoPorcentaje){
            //
            //    var dto = articulo.DESCUENTOESPECIAL*articulo.PrecioVentaSinRedondeo;
            //    dto = dto/100;
            //
            //    var precionuevo = articulo.PrecioVentaSinRedondeo -dto;
            //    //precionuevo = $filter('number')(precionuevo, '2');
            //    //precionuevo = parseFloat(precionuevo);
            //    articulo.PrecioVentaNuevoSinRedondeo = precionuevo;
            //    articulo.PrecioVentaNuevo = evenRound(precionuevo, 2);
            //    articulo.DtoPesosValor = evenRound(precionuevo, 2);
            //    console.log(articulo);
            //}else if(articulo.DtoPesos){
            //    articulo.PrecioVentaNuevo = articulo.DtoPesosValor;
            //    var porc = articulo.PrecioVentaNuevo/articulo.PrecioVenta;
            //    porc = porc*100 - 100;
            //
            //    var valorPorc = porc*(-1);
            //    valorPorc = $filter('number')(valorPorc, '2');
            //    valorPorc = parseFloat(valorPorc);
            //    articulo.DESCUENTOESPECIAL = valorPorc;
            //    articulo.DtoPesos = false;
            //    articulo.DtoPorcentaje = true;
            //}

            //articulo.Total = articulo.PrecioVentaNuevoSinRedondeo * parseInt(articulo.CANTIDAD) * articulo.EMPAQUE;
            ActualizoArticuloListadoGeneral(articulo);
        };
        $scope.eliminarDtos = function(articulo){
            if(articulo.CANTIDAD ==null)articulo.CANTIDAD =0;

            articulo.PrecioVentaNuevo =null;

            //articulo.Total = articulo.PrecioVenta * parseInt(articulo.CANTIDAD) * articulo.EMPAQUE;
            articulo.DtoPesosValor = null;
            articulo.DESCUENTOESPECIAL = null;
            articulo.DtoPesos = false;
            articulo.DtoPorcentaje = false;
            ActualizoArticuloListadoGeneral(articulo);
        };
        $scope.guardarPedido = function(){
            if($rootScope.objPedido.Articulos.length > 0){
                var totalpedido = 0;

                angular.forEach($rootScope.objPedido.Articulos, function(articulo){
                    totalpedido += articulo.Total;
                });
                $rootScope.objPedido.TOTAL = totalpedido;
                $('#modalObservaciones').modal('show');
            }else{
                Mensaje.warning("No hay artículos seleccionados en el pedido.", "Atención");
            }
        };
        $scope.confirmaGuardarPedido = function(){
            //console.log($scope.objPedido);
            if($scope.modoPedido=='A'){
                HornexServices.GuardarPedido($rootScope.objPedido)
                    .then(function (response) {
                        //$('#modalObservaciones').modal('hide');
                        $rootScope.objPedido = null;
                        Mensaje.success("Pedido guardado.", "Ok");
                        $state.go($scope.modoPagina.Default);
                    }
                );
            }else{
                HornexServices.ActualizarPedido($rootScope.objPedido)
                    .then(function (response) {
                        $rootScope.objPedido = null;
                        Mensaje.success("Se guardó el nuevo pedido", "Ok");
                        $state.go($scope.modoPagina.Default);
                    }
                );
            }
        };
        $scope.volver = function(){
            //$state.go('hornex.adminpedidolista');
            $state.go($scope.modoPagina.Previous);
        }
        $scope.recargarPedido = function(){
            $('#modalRecargar').modal('show');
        };
        $scope.confirmaRecargarPedido = function(){
            $rootScope.objPedido = {TOTAL:0, Articulos:[]};
            $scope.objCliente = {};
            $scope.Camino = [];
            angular.forEach($scope.lstDepartamentos, function(depto){
                depto.SEL = false;
            });
            $('#modalRecargar').modal('hide');
        };

        $scope.selectLabel = function(art){
            //ocument.getElementById("myText").select();
        };
    }
]);

app.controller('PedidoListaCTRL', ['$scope', '$state', 'Mensaje', 'HornexServices', 'objReference',
    function ($scope, $state, Mensaje, HornexServices, objReference) {

        init();

        function init() {

            $scope.modoPagina = {};

            if($state.current.name == 'hornex.adminpedidolista'){
                $scope.modoPagina.Next = "hornex.adminpedidonuevo";
                $scope.modoPagina.Modo = "Admin";
                CargarVendedores();
                CargarClientes();
            }else if($state.current.name == 'hornex.vendpedidolista'){
                $scope.modoPagina.Next = "hornex.vendpedidonuevo";
                $scope.modoPagina.Modo = "Vend";
                CargarClientes();
            }else if($state.current.name == 'hornex.distpedidolista'){
                $scope.modoPagina.Next = "hornex.distpedidonuevo";
                $scope.modoPagina.Modo = "Dist";
            }else if($state.current.name == 'hornex.administracionpedidolista'){
                $scope.modoPagina.Next = "hornex.administracionpedidonuevo";
                $scope.modoPagina.Modo = "Administracion";
                CargarVendedores();
                CargarClientes();
            }

            $scope.objCliente = {};
            CargarEstados();
            CargarUsuarios();
            $scope.objFiltro = {FechaDesde:moment().toDate(), FechaHasta:moment().toDate(), vendusuarioespec:false, EstadoID:-1};
        }
        function CargarUsuarios(){
            HornexServices.GetUsuariosCat()
                .then(function (response) {
                    $scope.lstUsuarios = response.data;
                }
            );
        }
        function CargarEstados(){
            HornexServices.GetPedidoEstados()
                .then(function (response) {
                    $scope.lstEstados = response.data;
                }
            );
        }
        function CargarClientes(){
            HornexServices.GetDistribuidoresReducidos()
                .then(function (response) {
                    $scope.lstClientesOriginal = response.data;
                    $scope.lstClientes = response.data;
                }
            );
        }
        function CargarVendedores(){
            HornexServices.GetVendedores()
                .then(function (response) {
                    $scope.lstVendedores = response.data;
                }
            );
        }

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
            $scope.objFiltro.ClienteID = objSel.Codigo;


        };
        $scope.borrarFiltros = function(){
            $scope.objFiltro = {FechaDesde:moment().toDate(), FechaHasta:moment().toDate()};
            $scope.objCliente = {};
        };

        $scope.buscarPedidos = function(){
            $scope.lstPedidos = [];
            if($scope.objFiltro.FechaDesde !=null && $scope.objFiltro.FechaHasta !=null){
                if(moment($scope.objFiltro.FechaDesde) <= moment($scope.objFiltro.FechaHasta)){

                    var param = {};
                    param.FechaDesde = moment($scope.objFiltro.FechaDesde).format('YYYY-MM-DD');
                    param.FechaHasta = moment($scope.objFiltro.FechaHasta).format('YYYY-MM-DD');
                    param.EstadoID = $scope.objFiltro.EstadoID;
                    param.VendedorID = 0;
                    param.ClienteID = 0;
                    param.UsuarioID = "0";
                    param.vendusuarioespec = 0;
                    param.idPedido = 0;
                    if($scope.objFiltro.vendusuarioespec)param.vendusuarioespec = 1;
                    if($scope.objFiltro.VendedorID !=null) param.VendedorID = $scope.objFiltro.VendedorID;
                    if($scope.objFiltro.ClienteID !=null) param.ClienteID = $scope.objFiltro.ClienteID;
                    if($scope.objFiltro.UsuarioID !=null) param.UsuarioID =  $scope.objFiltro.UsuarioID;
                    if ($scope.objFiltro.PedidoId != null) param.idPedido = $scope.objFiltro.PedidoId;

                    HornexServices.GetPedidoPorFecha(param)
                        .then(function (response) {
                            $scope.lstPedidos = response.data;
                        }
                    );
                }else{
                    Mensaje.warning("La Fecha Desde no puede ser mayor a la Fecha Hasta.", "Atención");
                }

            }else{
                Mensaje.warning("Los campos de fecha son obligatorios", "Atención");
            }
        };
        $scope.verPedido = function(p){
            objReference.current = {Modo:"M", PedidoId: p.Id};
            //$state.go('hornex.adminpedidonuevo');
            $state.go($scope.modoPagina.Next);
        };
        $scope.verDetalle = function(p){
            HornexServices.GetPedido(p.Id)
                .then(function (response) {
                    //$scope.objPedido = response.data;
                    $scope.objPedido = {};
                    var obj = response.data;

                    var lstArticulosAux = [];
                    angular.forEach(obj.Articulos, function(linea){
                        var objArticulo = {};
                        objArticulo = linea.Articulo;
                        objArticulo.CANTIDAD = linea.CANTIDAD;
                        objArticulo.DESCUENTOESPECIAL = linea.DESCUENTOESPECIAL;
                        objArticulo.PrecioVentaNuevo = linea.PrecioVentaNuevo;
                        objArticulo.Total = linea.Total;
                        //objArticulo.Total = objArticulo.PrecioVenta * parseInt(objArticulo.CANTIDAD) * objArticulo.EMPAQUE;
                        if(objArticulo.DESCUENTOESPECIAL > 0){
                            objArticulo.DtoPesosValor = objArticulo.PrecioVentaNuevo ;
                            objArticulo.DtoPorcentaje = true;
                        }
                        lstArticulosAux.push(objArticulo);
                    });

                    $scope.objPedido = obj;
                    $scope.objPedido.Articulos = [];
                    $scope.objPedido.Articulos = lstArticulosAux;


                    $('#detallePedido').modal('show')
                }
            );
        };


        $scope.cancelarPedido = function(obj){
            $scope.objCancelar = obj;
            $('#modalCancelar').modal('show');
        };
        $scope.confirmaCancelarPedido = function(){
            HornexServices.CancelarPedido($scope.objCancelar.Id)
                .then(function (response) {
                    $('#modalCancelar').modal('hide');
                    $scope.buscarPedidos();
                }
            );
        };

        $scope.enviarPedido = function(obj){
            $scope.objEnviar = obj;
            $scope.urgente = 0;
            $('#modalEnviar').modal('show');
        };
        $scope.enviarPedidoUrgente = function(obj){
            $scope.objEnviar = obj;
            $scope.urgente = 1;
            $('#modalEnviar').modal('show');
        };
        $scope.confirmaEnviarPedido = function(){
            HornexServices.EnviarPedido($scope.objEnviar.Id, $scope.urgente)
                .then(function (response) {
                    $('#modalEnviar').modal('hide');
                    $scope.buscarPedidos();
                }
            );
        };

    }
]);

//app.controller('PedidoListaAdminCTRL', ['$scope', '$state', 'Mensaje', 'objReference',
//    function ($scope, $state, Mensaje, objReference) {
//
//        init();
//
//        function init() {
//            $scope.modo = "Admin";
//            $scope.lstPedidos = [{Cliente: "ROSIMAR", Importe: 23587, Fecha: '2020-04-06'},
//                {Cliente: "HARAS LOS VAGONES", Importe: 18560, Fecha: '2020-04-06'},
//                {Cliente: "SUPER EL FARO ", Importe: 9650.5, Fecha: '2020-04-06'},
//                {Cliente: "CARNICERIA MILTON 2", Importe: 1600, Fecha: '2020-04-06'},
//                {Cliente: "SUPER ABRIL", Importe: 7405, Fecha: '2020-04-06'}];
//        }
//
//        $scope.lstItemsPedido = [{Codigo: 44334433, Nombre: "Chantilly x 100 grs Chocolate", Cantidad: 3, Unidad: 50.5, Total:151.5},
//            {Codigo: 44334433, Nombre: "Chantilly x 100 grs Vainilla", Cantidad: 15, Unidad: 68.5, Total:243.5},
//            {Codigo: 44334433, Nombre: "Cacao x 100 grs ", Cantidad: 12, Unidad: 44.5, Total:160.5},
//            {Codigo: 44334433, Nombre: "Coco x 200 grs ", Cantidad: 45, Unidad: 240.5, Total:658},
//            {Codigo: 44334433, Nombre: "Gelatina x 500 grs", Cantidad: 58, Unidad: 500.5, Total:1024}];
//
//
//        $scope.verPedido = function(){
//            objReference.current = {Modo:"M"};
//            $state.go('hornex.pedidonuevo');
//        };
//
//    }
//]);

app.controller('ProdFaltanteCTRL', ['$scope', '$state', 'Mensaje', 'HornexServices',
    function ($scope, $state, Mensaje, HornexServices) {
        $scope.orderByField = 'FechaDesde';
        $scope.reverseSort = false;

        init();

        function init() {
            $scope.diasMas = 3;
            $scope.verTodos = false;
            CargarProductosFaltantes();
            $scope.today = moment().toDate();

            $scope.modoDummy = ($state.current.name == 'hornex.dummyprodfaltantes');
        }

        function CargarProductosFaltantes(){
            $scope.lstProductos = [];

            HornexServices.GetFaltantes($scope.verTodos, $scope.diasMas)
                .then(function (response) {
                    $scope.lstProductos = response.data;

                }
            );
        }

        $scope.CambiarProductos = function(){
            $scope.verTodos = !$scope.verTodos;
            CargarProductosFaltantes()
        };
        $scope.AgregarProducto = function(){
            $state.go('hornex.prodfaltantesedit');
        };
        $scope.EliminarProducto = function(obj){
            $scope.objEliminar = obj;
            $('#modalEliminarProducto').modal('show');
        };
        $scope.ConfirmaEliminarProducto = function(){
            HornexServices.DeleteProductoFaltante($scope.objEliminar.Id)
                .then(function () {
                    $('#modalEliminarProducto').modal('hide');
                    Mensaje.success("Se eliminó el producto seleccionado.", "Atención");
                    CargarProductosFaltantes();
                }
            );
        };
        $scope.ResolverProducto = function(obj){
            if ($scope.modoDummy) return;
            $scope.objResolver = obj;
            $('#modalResolver').modal('show');
        };
        $scope.ConfirmaResolverProducto = function(){
            HornexServices.ResolverProductoFaltante($scope.objResolver)
                .then(function () {
                    $('#modalResolver').modal('hide');
                    Mensaje.success("Se cambió el estado al producto seleccionado.", "Atención");
                    CargarProductosFaltantes();
                }
            );
        };


    }
]);

app.controller('ProdFaltanteEditCTRL', ['$scope', '$state', 'Mensaje', 'HornexServices',
    function ($scope, $state, Mensaje, HornexServices) {
        $scope.orderByField = 'FechaDesde';
        $scope.reverseSort = false;

        init();

        function init() {
            $scope.today = moment().toDate();
            $scope.modo = "A";
            $scope.objEditar = {FechaDesde:$scope.today};
            $scope.todos = false;
            CargarDepartamentos();
        }
        function CargarDepartamentos(){
            HornexServices.GetDepartamentos()
                .then(function (response) {
                    $scope.lstDepartamentos = response.data;
                }
            );
        }

        $scope.changeDepartamento = function(){
            $scope.lstSecciones = [];
            $scope.lstFamilias = [];
            $scope.lstArticulos= [];
            if($scope.objEditar.IDDEPTO !=null){
                HornexServices.GetSecciones($scope.objEditar.IDDEPTO)
                    .then(function (response) {
                        $scope.lstSecciones = response.data;
                    }
                );
            }
        };
        $scope.changeSeccion = function(){
            $scope.lstFamilias = [];
            $scope.lstArticulos= [];
            if($scope.objEditar.IDSECCION !=null){
                HornexServices.GetFamilias($scope.objEditar.IDDEPTO, $scope.objEditar.IDSECCION)
                    .then(function (response) {
                        $scope.lstFamilias = response.data;
                    }
                );
                HornexServices.GetArticulosDesdeSeccion($scope.objEditar.IDDEPTO, $scope.objEditar.IDSECCION)
                    .then(function (response) {
                        $scope.lstArticulos = response.data;
                        //$scope.lstArticulosOriginal = response.data;
                    }
                );
            }
        };
        $scope.changeFamilia = function(idfamilia){
            $scope.lstArticulos = [];
            //if(idfamilia !=null){
            //    var lst = [];
            //    angular.forEach($scope.lstArticulosOriginal, function(item){
            //        if(item.GRAFFAMILIA == idfamilia) lst.push(item);
            //    });
            //
            //    $scope.lstArticulos = lst;
            //}else{
            //    $scope.lstArticulos = $scope.lstArticulosOriginal;
            //}
            if($scope.objEditar.IDFAMILIA !=null){
                HornexServices.GetArticulos($scope.objEditar.IDDEPTO, $scope.objEditar.IDSECCION, $scope.objEditar.IDFAMILIA)
                    .then(function (response) {
                        $scope.lstArticulos = response.data;
                    }
                );
            }
        };

        $scope.changeTodos = function(){
            //$scope.todos = !$scope.todos;
            angular.forEach($scope.lstArticulos, function(item){
                item.SEL =$scope.todos;
            });
        };

        $scope.GuardarProducto = function(){
            var valida = $('#frmProductosFaltantes').parsley().validate();
            if(valida){
                if(moment($scope.objEditar.FechaDesde) > moment($scope.objEditar.FechaHasta)){
                    Mensaje.warning("La Fecha Desde no puede ser mayor a la Fecha Hasta.", "Atención");
                    return;
                }
                var lstInt = [];
                angular.forEach($scope.lstArticulos, function(item){
                    if(item.SEL) lstInt.push(item.CODARTICULO);
                });
                if(lstInt.length == 0){
                    Mensaje.warning("No hay artículos seleccionados.", "Atención");
                    return;
                }
                $scope.objEditar.Listado = lstInt;
                HornexServices.GuardarProductoFaltante($scope.objEditar)
                    .then(function () {
                        Mensaje.success("Se ingresaron los productos faltantes.", "Atención");
                        $state.go('hornex.prodfaltantes');
                    }
                );
            }
        };

        $scope.volver = function(){
            $state.go('hornex.prodfaltantes');
        };

    }
]);




