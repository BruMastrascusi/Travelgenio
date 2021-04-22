//'use strict';

app.controller('HomeCtrl', ['$rootScope', '$state','$scope', 
    function ($rootScope, $state, $scope) {
      
         window.onbeforeunload = function() { return "Your work will be lost."; };
      

    }]);



app.controller('NavBarCtrl', ['$scope', '$state',  
    function ($scope, $state ) {
        $scope.notificaciones = 0;
        $scope.cantRecibos = 0;
    

    }]);
