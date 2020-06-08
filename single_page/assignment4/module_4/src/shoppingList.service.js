angular.module('ShoppingApp')
    .service('ShoppingListService',ShoppingListService);

    function ShoppingListService(){
        var service = this;
        var items = [{name:"Chocolate",qty:4},{name:"Cookies",qty:10}];
        service.addItems = function(name,qty){
            var item = {
                name : name,
                qty : qty
            };
            items.push(item);
        }
        service.remove = function(index){
            var item = items.splice(index,1);
            console.log(item);
        }
        service.getItems = () => items;
    }