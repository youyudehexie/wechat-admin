'use strict';

var app = angular.module('wechatAdminApp');
  
app.controller('UserCtrl', function ($scope, $q, restAPI) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*
    signin.save({name: 'lizhengfu12',passwd: '123456'
    },function(ret){
        delay.resolve(ret);
 
    }, function(){
        delay.reject('Uable to fetch user');
    })*/

    /*signin.save({name: 'lizhengfu12', passwd: '123456'}, function(ret){*/
        //delay.resolve(ret);
        //console.log(ret.user.name);
    /*})*/

    //console.log(delay.promise);
//    $scope.test = restAPI;

    $scope.addUser = function(){
       $scope.message = 'this is message ' + $scope.user.email; 
    }

    $scope.signIn = function() {
      var signin = restAPI.signin; 
      signin.save({name: $scope.user.name, passwd: $scope.user.passwd}, function(ret){
        if(ret.isLogin){
            return console.log('ok');
        } else {
        
            return console.log('fail');
        }
      
      })
    }
});
