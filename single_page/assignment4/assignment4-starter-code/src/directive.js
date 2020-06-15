
angular.module('Restaurant')
    .component('menuTile', {
        templateUrl: 'template/menuTile.html',
        controller: menuTileController,
        bindings: {
            title: '@',
            src: '@',
            content: '@',
            sref : '@',
            btnval: '@'
        }
    });
    
