(function(){
    angular.module('ShoppingApp')
    .config(RouterConfig)
    .controller('clickController',clickController);

    clickController.$inject = ['$stateParams','items'];
    function clickController($stateParams,items){
        var $ctrl = this;
        $ctrl.items = [];
        $ctrl.items.push(items[$stateParams.itemId]);
        $ctrl.title = "Clicked Item";
    }



    RouterConfig.$inject = ['$stateProvider','$urlRouterProvider'];
    function RouterConfig(sp,up){
        
        sp.state('insert',{
            templateUrl:"template/searchBar.template.html",
            controller:"ShoppingListController as list"
        })
        .state('list',{
            templateUrl:'template/listView.html',
            controller:'ShoppingListController as list',
            resolve:{
                items:['ShoppingListService',function(service){
                    return service.getItems();
                }]
            }

        })
        .state('list.items-detail',{
            // url:'/items-detail/{itemId}',
            template:`
            <shopping-list
                title = "$ctrl.title"
                items = "$ctrl.items"
            ></shopping-list>`,
            controller:'clickController as $ctrl',
            params : {itemId:null}
        })
        .state('home',{
            url:'/home',
            template:'Welcome to shopping Application'
        });

        up.otherwise('/home');
    }



})();