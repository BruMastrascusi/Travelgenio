'use strict';
function ngEnter() {
    return {
        restrict: 'EA',
        require: 'ngModel',
        link: function (scope, element, attrs) {
            element.bind("keypress", function (event) {
                if (event.which === 13) {
                    //scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                    //});
                    event.preventDefault();
                }
            });
        }
    };
}






/**
 *
 * Pass all functions into module
 */
//angular
//    .module('Aplicacion')
//    .directive('ngEnter', ngEnter);

app.directive('ngEnter', ngEnter);