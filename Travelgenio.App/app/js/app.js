'use strict';
var app = angular.module('Aplicacion', [
    'ui.router',                    // Routing
    'ui.bootstrap',                 // Ui Bootstrap
    'base64',
    'oc.lazyLoad',                  // ocLazyLoad
    'datePicker',                   // Angular-datepicker
    'ngSanitize',
    'angularFileUpload',
    'uiCropper',
    'ngCookies'
]);

//'ui.bootstrap',                 // Ui Bootstrap

var interceptor = function ($q, $rootScope, $log, Mensaje) {
    $('#loading-indicatornew').hide();
    return {
        'request': function (config) {
            $rootScope.ajaxCount++;
            $('#loading-indicatornew').show();
            return config;
        },
        'response': function (result) {
            $rootScope.ajaxCount--;
            //$('#loading-indicatornew').hide();
            if ($rootScope.ajaxCount <= 0 || isNaN($rootScope.ajaxCount)) {
                $('#loading-indicatornew').hide();
            }
            return result;
        },


        'responseError': function (rejection) {
            //$('#loading-indicatornew').hide();
            $rootScope.ajaxCount--;
            if ($rootScope.ajaxCount <= 0) {
                $('#loading-indicatornew').hide();
            }
            switch (rejection.status) {
                case 401:
                    Mensaje.warning(rejection.data, "Atención");
                    $rootScope.$state.go('home');
                    break;
                case 403:
                    break;
                case 409:
                    if (rejection.data != null)
                        Mensaje.warning(rejection.data, 'Atención' );
                    else
                        Mensaje.warning(rejection.statusText, 'Atención');
                    break;
                case 426:
                    Mensaje.warning(rejection.data, 'Atención' );
                    break;
                case 500:
                    Mensaje.error(rejection.data, 'Atención');
                    break;
                default:
                    Mensaje.error(rejection.statusText, rejection.status);
                    break;
            }

            return $q.reject(rejection);
        }
    };
};

app.config(function ($provide, $httpProvider) {
    $httpProvider.interceptors.push(interceptor);
});

app.run(['$rootScope','$state', 'APP_CONFIG',
    function ($rootScope, $state, APP_CONFIG ) {
 
    }]);

app.run(['$rootScope', '$state',  'appUtils',
    function($rootScope, $state, appUtils) {
        $rootScope.$state = $state;
        $rootScope.dateInputSupport= appUtils.checkDateInput();
    }]);