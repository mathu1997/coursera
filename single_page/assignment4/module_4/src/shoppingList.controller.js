angular.module('ShoppingApp')
    .controller('ShoppingListController',ShoppingListController);

    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(service){
        var list = this;
        list.items = service.getItems();
        list.title = "Shopping List :("+list.items.length+")";   
        list.addItem = () =>{
            service.addItems(list.name,list.qty);
            list.title = "Shopping List :("+list.items.length+")";            
        }
        list.remove = (index) =>{
            service.remove(index);
            list.title = "Shopping List :("+list.items.length+")";            
        }
        
        
    }