(function(){
    'use strict';
    angular.module('LunchCheck',[]).
    controller('LunchCheckController',LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope){
        $scope.items='';
        $scope.msg='';
        $scope.countItem = function(){
            var itemsArr = $scope.items.split(',');
            itemsArr = itemsArr.filter(el=>{
                return el!=null && el!='';
            })
            console.log(itemsArr.length);
            console.log(itemsArr);
            var msg='';
            if(itemsArr[0]==null) msg = "Please enter data first";
            else if(itemsArr.length<=3) msg = "Enjoy!";
            else msg = "Too much!";
            $scope.msg = msg;
        }
    }
})()