angular.module('Restaurant')
.filter('srcFilter',srcFilter)
.filter('urlFilter',urlFilter)
.filter('srcItemFilter',srcItemFilter);


function srcFilter(){
    return function (sname){
        return `../images/menu/${sname}/${sname}.jpg`;
    }
}


// items({sname:{{item.short_name}}})
function urlFilter(){
    return function(ui,name,sname){
        return `${ui}({sname:"${sname}",pname:"${name}"})`;
    }
}

function srcItemFilter(){
    return function (sname,cat){
        return `../images/menu/${cat}/${sname}.jpg`;
    }
}
