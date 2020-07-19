(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService)
;

MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var userData = [
    // {add: "7/130 Main road",
    //               email: "mathu1997.mm@gmail.com",
    //               favitems:[
    //                 {id: 7, short_name: "V", name: "Veal", special_instructions: "", url: "https://mathirang-restauarante.herokuapp.com/categories/V.json"},
    //                 {id: 8, short_name: "DK", name: "Duck", special_instructions: "", url: "https://mathirang-restauarante.herokuapp.com/categories/DK.json"}
    //               ],
    //               fname: "Mathu",
    //               lname: "Mithran",
    //               pno: "08526398892"
    //             }
              ];
  service.getCategories = function () {
    console.log(ApiPath);
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.setUser = function(user){
    userData.push(user);
  }
  service.getUser = function(){
    return userData;
  }
}



})();
