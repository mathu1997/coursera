angular.module('Spinner')
    .controller('LoadingSpinner',LoadingSpinner)
    .component('loadingSpinner',{
        template:`<img ng-if='$ctrl.load'  id="loader" src="img/ajax-loader.gif">`,
        controller:LoadingSpinner
    });
    LoadingSpinner.$inject = ['$scope'];
    function LoadingSpinner(root){
        var $ctrl = this;
        $ctrl.load = false;
        root.$on('status:processing',handler);
        function handler(event,args){
            $ctrl.load = args.load;
        };
    }