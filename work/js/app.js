

(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService)
    .service('validateList',validateList)
    .directive('shoppingList',ShoppingListDerictive)
    .directive('cartList',CartList);

    function ShoppingListDerictive(){
        var ddo = {
            templateUrl:'shoppingList.html',
            scope:{
                items:'<',
                title:'<',
                onLink:'&',
                onBuy:'&',
                onRemove:'&',
                listType:'<',
            },
            Link:ShoppingListDerictiveLink,
            controller:ShoppingList,
            controllerAs:'list',
            bindToController:true
        };
        return ddo;
    }
    function ShoppingListDerictiveLink(scope,element,attrs,controller){
        scope.$watch('list.checkCookies()',function(newValue,oldValue){
            var warningElem = element.find('div.error');
            console.log(warningElem);
            if(newValue===true){
                warningElem.css("display",'block');
            }
            else{
                warningElem.css("display",'none');
            }
        });
    }
    function ShoppingList(){
        var list = this;
        list.checkCookies = function (){
            console.log(list);
            for(var i=0;i<list.items.length;i++){
                if(list.items[i].name.toLowerCase().indexOf('cookie') !==-1)
                return true;
            }
            return false;
        }
    }
    function CartList(){
        var ddo = {
            template:`<li ng-repeat='item in cart.items'>Bought {{item.quantity}} {{item.name}}</li>`,
            restrict:'E'
        };
        return ddo;
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService','validateList'];
    function ToBuyController(service,valid){
        var list = this;
        list.title = 'Shopping List Category :';
        list.error='';
        list.btn=false;
        list.items = service.getItems();
        list.msg = service.getErrorMsg();
        list.menu = function(){
            service.getMenu().then(function(res){
                list.title = 'Shopping List Category :';
                service.setItem(res.data);
                list.items = service.getItems();
                list.btn=false;
            },function(error){
                console.log("something went wrong! ",error);
            });
        }
        list.menu();
        list.viewItem = function(sname,id){
            service.viewCat(sname,id).then(function(res){
                list.title = 'Shopping List menu :';
                list.items = res.data.menu_items;
                console.log(res.data.menu_items);
                service.setItem(list.items);
                 list.items = service.getItems();
                list.btn = true;
            }).catch(function(error){
                console.log("something went wrong! ",error);
            });
        };
        list.addToCart = function(itemsIndex){
            service.addCart(itemsIndex);
            list.items = service.getItems();
            if(list.items<=0) {
                list.menu();
            }
        };
        list.remove = function(index){
            service.removeItem(index);
        }
        list.addItem = function(){
            var name = list.prod;
            var qty = list.qty;
            valid.checkQty(qty).then(
                function(res){
                    service.addItem(name,qty);
                    list.error = res.message;
                },
                function(res){
                    list.error = res.message;
                }
            );
        };
    }
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(service){
        var cart = this;
        cart.title = "Detail view of Cart Item :";
        cart.items = service.getCart();
        cart.msg = 'Nothing bought yet.';
        cart.btn=false;
        cart.viewItem = function(sname,id){
            service.viewCat(sname,id).then(function(res){
                cart.items = res.data.menu_items;
                service.setItem(cart.items);
                cart.btn = true;
            }).catch(function(error){
                console.log("something went wrong! ",error);
            });
        };
    }
    ShoppingListCheckOffService.$inject=['$http'];
    function ShoppingListCheckOffService($http){
        var service = this;
        service.addItem = function(name,sname){
            var item = {
                name:name,
                short_name:sname
            };
            items.push(item);
        }
        var items = [];
        var cart = [];
        service.removeItem = function (index){
            var item = items.splice(index,1);
            return item[0];
        }
        service.addCart = function (itemIndex){
            cart.push(service.removeItem(itemIndex));
        }
        service.viewCat = function(sname){
            return $http({
                method:'GET',
                url:'http://davids-restaurant.herokuapp.com/menu_items.json',
                params : {category:sname}
            });
        }
        service.getMenu = function (){
            return $http({
                method:'GET',
                url:'http://davids-restaurant.herokuapp.com/categories.json',
            });
        }
        service.getErrorMsg=function(){
            if(items.length<=0) {
                return 'Wov, You Bought Every Things';
            }
            return '';
        }
        service.setItem = function(categories){
            function checkItem(item) {
                var flage=0;
                cart.forEach(function(cart){
                    console.log(cart.short_name,' == ',item.short_name ,' ',cart.short_name==item.short_name);
                    if(cart.short_name==item.short_name)
                        flage++;
                });
                // console.log(`!cart.includes(item); `+cart.includes(item));
                console.log(flage);
                if(flage==0) return true;
                return false;
              }
              
              items = categories.filter(checkItem);
        }
        service.getItems = function (){
            return items;
        }
        service.getCart = function (){
            return cart;
        }
        
    }
    validateList.$inject=['$q','$timeout'];
    function validateList($q,$timeout){
        var service = this;
        service.checkQty = function (sname){
            var deferer = $q.defer();
            var result = {
                message:''
            };
            $timeout(function(){
                if(sname.length<=3) deferer.resolve(result);
                else{
                    result.message="length of short name should not exceed 3";
                    deferer.reject(result);
                } 
            });
            return deferer.promise;
        }
    }
})();