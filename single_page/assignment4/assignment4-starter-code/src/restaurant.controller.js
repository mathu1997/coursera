

angular.module('Restaurant')
    .controller('navBarController', navBarController)
    .controller('menuTileController', menuTileController)
    .controller('CategoryController',CategoryController)
    .controller('ItemController',ItemController)
    .controller('spinnerController',spinnerController)
    .controller('detailController',detailController);

    
// nav Bar Controller
navBarController.$inject = ['RestaurantService','$rootScope'];
function navBarController(service,root) {
    var nav = this;
    nav.title = "mithrang restaurant";
    
}



// menu tile controller
function menuTileController() {
    var $ctrl = this;
}


CategoryController.$inject=['category'];
function CategoryController(category){
    var $ctrl = this;
    $ctrl.category = category;
}


ItemController.$inject=['items','$stateParams'];
function ItemController(items,sp){
    var $ctrl = this;
    console.log($ctrl.rand);
    $ctrl.items = items.menu_items;
    for(item in $ctrl.items){
        console.log($ctrl.items[item]);
        $ctrl.items[item].rand=Math.floor(Math.random() * 5);
    }
    console.log($ctrl.items);
    $ctrl.category = items.category;
    $ctrl.range = [0,1,2,3,4];
    console.log("name",$ctrl.category);
}

detailController.$inject = ['item'];
function detailController(item){
    var $ctrl = this;
    $ctrl.item = item;
    console.log(item);
}


spinnerController.$inject = ['$rootScope'];
function spinnerController(root){
    var spin = this;
    spin.loading = false;
    root.$on('loading',function(event,params){
        spin.loading = params.on;
    });
}