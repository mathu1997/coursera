angular.module('ShoppingApp')
    .controller('ListViewController',ListViewController)
    .component('shoppingList',{
        templateUrl:"template/shoppingList.template.html",
        controller:ListViewController,
        bindings:{
            title:'<',
            items:'<',
            deleteItem:'&'
        }
    });
    ListViewController.$inject = ['$rootScope','$q'];
    function ListViewController(root,$q){
        var $ctrl = this;
        var itemlength;
        $ctrl.warning = false;


        $ctrl.remove = (index)=>{
            $ctrl.deleteItem({index:index});}


        $ctrl.checkCookies = function(item){
            var deferred = $q.defer();
            setTimeout(function(){
                if(item.name.toLowerCase().indexOf("cookie") === -1){
                    deferred.resolve(false);}
                else deferred.reject(true);
            },1000);
            return deferred.promise;
        };



        $ctrl.$onInit = function(){
            itemlength = 0;
        };



        $ctrl.$doCheck= function(){
            if($ctrl.items.length!==itemlength){
                itemlength = $ctrl.items.length;
                var promise = [];
                $ctrl.items.forEach(item => {
                    promise.push($ctrl.checkCookies(item));
                });
                console.log(promise);
                root.$broadcast('status:processing',{load:true});
                $q.all(promise).then(
                    (res)=>$ctrl.warning = res.data,
                    (res)=>$ctrl.warning = res
                ).finally(function(){root.$broadcast('status:processing',{load:false});});
                // root.$broadcast('status:processing',{load:true});
            }  
        };



    }