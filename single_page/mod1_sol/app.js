(function () {
    'use strict';
    angular.module('MyApp',[]).controller("MyController",function($scope){
        $scope.name = "";
        $scope.total = 0;
        $scope.greet = function(){
            return 'name';
        }
        $scope.calculate = function(){
            var name = $scope.name;
            var total = 0;
            for(var ch in name)
                total+=name.charCodeAt(ch);
            $scope.total=total;
        }
    })
})()