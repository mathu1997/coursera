

(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(service){
        var list = this;
        list.items = service.getItem();
        list.msg = 'Everything is bought!';
        list.addToCart = function(itemsIndex){
            service.addCart(itemsIndex);
        }
    }
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(service){
        var cart = this;
        cart.items = service.getCart();
        cart.msg = 'Nothing bought yet.';
    }
    
    function ShoppingListCheckOffService(){
        var service = this;
        var items = [
            {'name':'Bread','quantity':2},
            {'name':'Cookies','quantity':10},
            {'name':'Boost','quantity':12}
        ];
        var cart = [];
        service.addCart = function (itemIndex){
            var item = items.splice(itemIndex,1);
            cart.push(item[0]);
            items.slice(itemIndex,1);
        }
        
        service.getItem = function (){
            return items;
        }
        service.getCart = function (){
            return cart;
        }
    }
})();