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
            controller: 'HomeCtrl',
            data: { pageTitle: 'Inicio', ShowBackButton: false }
        })



        /*------------------------------------------------------------------------------------------------------------------------*/
        .state('reportes', {
            abstract: true,
            url: "/reportes",
            templateUrl: "modules/reportes/views/content.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['modules/reportes/js/reportes-controllers.js',
                                'modules/travelgenio/js/travelgenio-services.js']
                        }
                    ]);
                }
            }
        })
        .state('reportes.boletos', {
            url: "/reportes",
            templateUrl: "modules/reportes/views/rptBoletos.html",
            controller: 'BoletosReportCTRL',
            data: { pageTitle: 'Reportes' }
        })
        .state('reportes.boletosedit', {
            url: "/reportes/editar",
            templateUrl: "modules/reportes/views/rptBoletosEdit.html",
            controller: 'BoletosEditCTRL',
            data: { pageTitle: 'Reportes' }
        })

        /*------------------------------------------------------------------------------------------------------------------------*/



        .state('boleto', {
            abstract: true,
            url: "/boleto",
            templateUrl: "modules/travelgenio/views/content.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['modules/travelgenio/js/controladora.js',
                                'modules/travelgenio/js/travelgenio-services.js']
                        }
                    ]);
                }
            }
        })


        .state('boleto.adminboletos', {
            url: "/admin/boletos",
            templateUrl: "modules/travelgenio/views/boletos.html",
            controller: 'BoletoCTRL',
            data: { pageTitle: 'Boleto' }
        })


        /*-----------------------------------------------------------------------------------------------------*/



        ;
});
