'use strict';
app.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("index/main");
    $ocLazyLoadProvider.config({
        debug: true
    });
    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        
                    ]);
                }
            }
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/common/home.html",
            controller:'HomeCtrl',
            data: { pageTitle: 'Inicio', ShowBackButton:false }
        })
        .state('login', {
            url: "/login",
            templateUrl: "views/common/login.html",
            controller:'LoginCtrl',
            data: { pageTitle: 'Login' }
        })
        .state('registro', {
            url: "/registro",
            templateUrl: "views/common/registro.html",
            controller:'RegistroCtrl',
            data: { pageTitle: 'Registro' }
        })
        .state('recuperar', {
            url: "/recuperar/:token?",
            templateUrl: "views/common/recuperar.html",
            controller:'RecuperarCtrl',
            data: { pageTitle: 'Recuperar Contraseña' }
        })

        /*------------------------------------------------------------------------------------------------------------------------*/
        .state('security', {
            abstract: true,
            url: "/seguridad",
            templateUrl: "modules/security/views/content.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['modules/security/js/security-controllers.js', 'modules/security/js/security-services.js']
                        }
                    ]);
                }
            }
        })
        .state('security.usuarios', {
            url: "/usuarios",
            templateUrl: "modules/security/views/usuarios.html",
            controller: 'UsuariosCTRL',
            data: { pageTitle: 'Usuarios'}
        })
        .state('security.usuariosedit', {
            url: "/usuarios/editar",
            templateUrl: "modules/security/views/usuariosEdit.html",
            controller: 'UsuariosEditCTRL',
            data: { pageTitle: 'Usuarios'}
        })
        .state('security.password', {
            url: "/contraseña",
            templateUrl: "modules/security/views/password.html",
            controller: 'PasswordCTRL',
            data: { pageTitle: 'Cambiar contraseña'}
        })
        /*------------------------------------------------------------------------------------------------------------------------*/
        


        .state('hornex', {
            abstract: true,
            url: "/hornex",
            templateUrl: "modules/hornex/views/content.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['modules/hornex/js/controladora.js',
                                'modules/hornex/js/hornex-services.js']
                        }
                    ]);
                }
            }
        })
        .state('hornex.clientes', {
            url: "/clientes",
            templateUrl: "modules/hornex/views/clientes.html",
            controller: 'ClientesCTRL',
            data: { pageTitle: 'Clientes'}
        })

        .state('hornex.adminpedidos', {
            url: "/admin/pedidos",
            templateUrl: "modules/hornex/views/pedidos.html",
            controller: 'PedidosCTRL',
            data: { pageTitle: 'Pedidos'}
        })
        .state('hornex.adminpedidonuevo', {
            url: "/admin/pedidos/nuevo",
            templateUrl: "modules/hornex/views/pedidonuevo.html",
            controller: 'PedidoNuevoCTRL',
            data: { pageTitle: 'Nuevo Pedido'}
        })
        .state('hornex.adminpedidolista', {
            url: "/admin/pedidos/lista",
            templateUrl: "modules/hornex/views/pedidolista.html",
            controller: 'PedidoListaCTRL',
            data: { pageTitle: 'Nuevo Actuales'}
        })

        .state('hornex.vendpedidos', {
            url: "/vendedor/pedidos",
            templateUrl: "modules/hornex/views/pedidos.html",
            controller: 'PedidosCTRL',
            data: { pageTitle: 'Pedidos'}
        })
        .state('hornex.vendpedidonuevo', {
            url: "/vendedor/pedidos/nuevo",
            templateUrl: "modules/hornex/views/pedidonuevo.html",
            controller: 'PedidoNuevoCTRL',
            data: { pageTitle: 'Nuevo Pedido'}
        })
        .state('hornex.vendpedidolista', {
            url: "/vendedor/pedidos/lista",
            templateUrl: "modules/hornex/views/pedidolista.html",
            controller: 'PedidoListaCTRL',
            data: { pageTitle: 'Nuevo Actuales'}
        })

        .state('hornex.distpedidos', {
            url: "/distribuidor/pedidos",
            templateUrl: "modules/hornex/views/pedidos.html",
            controller: 'PedidosCTRL',
            data: { pageTitle: 'Pedidos'}
        })
        .state('hornex.distpedidonuevo', {
            url: "/distribuidor/pedidos/nuevo",
            templateUrl: "modules/hornex/views/pedidonuevo.html",
            controller: 'PedidoNuevoCTRL',
            data: { pageTitle: 'Nuevo Pedido'}
        })
        .state('hornex.distpedidolista', {
            url: "/distribuidor/pedidos/lista",
            templateUrl: "modules/hornex/views/pedidolista.html",
            controller: 'PedidoListaCTRL',
            data: { pageTitle: 'Nuevo Actuales'}
        })

        .state('hornex.administracionpedidos', {
            url: "/administracion/pedidos",
            templateUrl: "modules/hornex/views/pedidos.html",
            controller: 'PedidosCTRL',
            data: { pageTitle: 'Pedidos'}
        })
        .state('hornex.administracionpedidonuevo', {
            url: "/administracion/pedidos/nuevo",
            templateUrl: "modules/hornex/views/pedidonuevo.html",
            controller: 'PedidoNuevoCTRL',
            data: { pageTitle: 'Nuevo Pedido'}
        })
        .state('hornex.administracionpedidolista', {
            url: "/administracion/pedidos/lista",
            templateUrl: "modules/hornex/views/pedidolista.html",
            controller: 'PedidoListaCTRL',
            data: { pageTitle: 'Nuevo Actuales'}
        })


        .state('hornex.prodfaltantes', {
            url: "/productos/faltantes",
            templateUrl: "modules/hornex/views/prodfaltantes.html",
            controller: 'ProdFaltanteCTRL',
            data: { pageTitle: 'Productos Faltantes'}
        })
        .state('hornex.dummyprodfaltantes', {
            url: "/vendproductos/faltantes",
            templateUrl: "modules/hornex/views/prodfaltantes.html",
            controller: 'ProdFaltanteCTRL',
            data: { pageTitle: 'Productos Faltantes'}
        })

        .state('hornex.prodfaltantesedit', {
            url: "/productosedit/faltantes",
            templateUrl: "modules/hornex/views/prodfaltantesEdit.html",
            controller: 'ProdFaltanteEditCTRL',
            data: { pageTitle: 'Agregar Productos Faltantes'}
        })

        /*-----------------------------------------------------------------------------------------------------*/

        

    ;
});
