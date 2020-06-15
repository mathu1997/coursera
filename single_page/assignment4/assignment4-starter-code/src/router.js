
angular.module('Restaurant')
.config(RoutesConfig);


RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider']
function RoutesConfig(sp,up){
    up.otherwise('/home');
    sp.state('category',{
        url:'/category',
        templateUrl:'template/category.html',
        controller:'CategoryController as $ctrl',
        resolve:{
            category : ['RestaurantService',function (service){
                return service.getCategory().then(function (result){
                    if(result!==undefined)
                        return result;
                    else return "Try again";
                });
            }]
        }
    })
    .state('items',{
        url:'/items/{sname}',
        templateUrl:'template/detail.html',
        controller:'ItemController as $ctrl',
        params:{
            sname:'A',
            pname:'Special'
        },
        resolve:{
            items :['RestaurantService','$stateParams',function (service,$stateParams){
                return service.getItems($stateParams.sname).then(function (result){
                    if(result!==undefined)
                        return result;
                    else return "Try again";
                });
            }]
        }
    })
    .state('detail',{
        url:'/detail',
        templateUrl:'template/detail.html',
        controller:'detailController as $ctrl',
        params:{
            index:0
        },
        resolve:{
            item :['RestaurantService','$stateParams',function (service,$stateParams){
                return service.getSpecificItem($stateParams.index).then(function (result){
                    if(result!==undefined)
                        return result;
                    else return "Try again";
                });
            }]
        }
    })
    .state('home',{
        url:'/home',
        templateUrl:'template/homePage.html'
    });

}