!function(){"use strict";function t(t){var e=this;e.items=t.getItem(),e.msg="Everything is bought!",e.addToCart=function(i){t.addCart(i),e.empty=e.items.length<=0}}function e(t){this.items=t.getCart(),this.msg="Nothing bought yet."}angular.module("ShoppingListCheckOff",[]).controller("ToBuyController",t).controller("AlreadyBoughtController",e).service("ShoppingListCheckOffService",function(){var t=[{name:"Bread",quantity:2},{name:"Cookies",quantity:10},{name:"Boost",quantity:12}],e=[];this.addCart=function(i){var n=t.splice(i,1);e.push(n[0]),t.slice(i,1)},this.getItem=function(){return t},this.getCart=function(){return e}}),t.$inject=["ShoppingListCheckOffService"],e.$inject=["ShoppingListCheckOffService"]}();