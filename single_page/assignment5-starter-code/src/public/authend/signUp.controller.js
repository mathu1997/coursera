(function () {
    "use strict";
    angular.module('public')
    .controller('signupController', signupController)
    .controller('infoController',infoController);
    
    
    
    signupController.$inject =  ['MenuService','menuCategories','$rootScope'];
    
    function signupController(MenuService,menuCategories,root) {
      var reg = this;
      reg.items = menuCategories;
      for(var i = 0; i < reg.items.length; i++){
        reg.items[i].selected = false;
      }
      reg.user = {};
      reg.user["favitems"] = [];
      reg.submit = ()=>{
        for(var i = 0; i < reg.items.length; i++){
          if(reg.items[i].selected)
            reg.user.favitems.push(reg.items[i]);
        }
        MenuService.setUser(reg.user);
      }

    //   $ctrl.menuCategories = menuCategories;
    }

    infoController.$inject = ["userData"];
    function infoController(userData){
        var info = this;
        info.userData = userData;
        console.log(info.userData);
        // console.log(info);
        // info.msg = "Hello";
        // info.data = [];
        //   console.log("$on:");
        //   info.$onInit = ()=>{
            
        //     info.signup = scope.$on("reg:signup",info.signupData);
        //     scope.$on("reg:userDetail",info.userData);
        //     console.log(info);
        //   };

          
        //   info.signupData = (event,data)=>{
        //     console.log("data: ",data.on);
        //   }
        //   info.userData = (event,data)=>{
        //     info.data.push(data.user);
        //     console.log(data,event);
        //   }
    }
    
    angular.module('public').
    controller('formController',formController)
    .component('formFeild',{
      controller:'formController',
      controllerAs:'$ctrl',
      bindings:{
        head:'@',
        type:'@',
        id:'@',
        model:'='
      },
      templateUrl: 'src/public/authend/formfield.html',
      transclude: true,
    });
    
    function formController(){
      var $ctrl = this;
    }
   
    
    
    })();