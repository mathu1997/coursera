
var app = angular.module('ShoppingApp', []);
app.controller('ShoppingListController', ShoppingListController)
    .controller('AppController', AppController)
    .controller('WishList', WishList)
    .controller('listViewController',listViewController);
app.service('ShoppingService', ShoppingService);
app.component('cardView', {
    templateUrl: 'cardView.html',
    controller: cardViewController,
    bindings: {
        items: '<',
        onBuy: '&',
        onCart: '&'
    }
});
app.component('listItems', {
    templateUrl: 'ListItems.html',
    controller: listViewController,
    bindings: {
        title : '@',
        items: '<',
        onClick: '&',
        type : '@'
    }
});


function listViewController(){
    var $ctrl = this;
    $ctrl.remove = (id)=>onRemove({index:id});
    console.log($ctrl.title);
    $ctrl.count=1;
    if($ctrl.type==="order") $ctrl.btnName="Cancel Your Order";
    else $ctrl.btnName = "Buy Now!";
    $ctrl.onAction = function(index){
        if($ctrl.type !== "order") onClick({index:index,count:$ctrl.count});
        else onClick({index:index});
    }
}


function cardViewController() {
    var $ctrl = this;
}



function AppController() {
    var app = this;
    app.message = "Hello World!";
    app.home = () => {
        app.showMenu = false;
        app.showCart = false;
        app.showOrder = false;
    };
    app.order = () => {
        app.showMenu = true;
        app.showCart = false;
        app.showOrder = true;
    };
    app.cart = () => {
        app.showMenu = true;
        app.showCart = true;
        app.showOrder = false;
    };

}



ShoppingListController.$inject = ['ShoppingService'];
function ShoppingListController(service) {
    var list = this;
    list.items = [];
    service.fetchdata().then(
        (res) => {
            list.items = res.data.menu_items;
            console.log(list.items);
        },
        (res) => list.error = ("Something went wrong !!!" + res.message)
    );
    list.onCart = (index)=> service.addToCart(index);
    list.onBuy = (index)=> service.addToOrder(index);
}



WishList.$inject = ['ShoppingService'];
function WishList(service) {
    var list = this;
    list.cart = service.getCart();
    list.order = service.getOrder();
    list.cartTitle = "Your Cart";
}



ShoppingService.$inject = ['$http']
function ShoppingService($http) {
    var service = this;
    var items;
    var cart = [];
    var order = [];
    service.fetchdata = function () {
        var res = $http.get("https://davids-restaurant.herokuapp.com/menu_items.json", []);
        res.then((res) => items = res.data.menu_items, (res) => console.log("Something went wrong !!!"));
        return res;
    };
    service.addToCart = function (index) {
        cart.push(items[index]);
    }
    service.addToOrder = function (index) {
        order.push(items[index]);
        console.log(order);
    }
    service.getCart = () => {return cart};
    service.getOrder = () => {return order};
    service.getItems = () => {return items;};
}