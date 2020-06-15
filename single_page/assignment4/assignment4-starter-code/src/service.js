angular.module('Restaurant')
.service('RestaurantService',RestaurantService);


RestaurantService.$inject = ['$rootScope','$http']
function RestaurantService(root,$http){
    var service = this;
    var AllItems = [];
    var items = [];
    var categories = [];
    var short_name = '';
    service.fetchData = async function(url){
        return await $http.get(url);
    }

    service.getSpecificItem = async function(index){
        console.log(items[short_name],index);
        return items[short_name];
    }

    service.getCategory = async function(){
        if(categories.length==0){
            console.log("Category loaded");
            root.$broadcast('loading',{on:true});
            var promis =  service.fetchData('https://davids-restaurant.herokuapp.com/categories.json');
            await promis.then((res)=>{categories=res.data},(err)=>{categories=err;});
            root.$broadcast('loading',{on:false});
        }
        return categories;
    }


    service.getItems = async function(sname){
        short_name = sname;
        var url = 'https://davids-restaurant.herokuapp.com/menu_items.json?category='+sname;
        if(items[sname]==undefined){
            console.log(sname," Items loaded");
            root.$broadcast('loading',{on:true});
            var promis = service.fetchData(url);
            await promis.then((res)=>{items[sname]=res.data},(err)=>{console.log(err);});
            root.$broadcast('loading',{on:false});
        }
        
        return items[sname];
    }
}
