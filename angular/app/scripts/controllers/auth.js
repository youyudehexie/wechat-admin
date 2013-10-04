'use strict';

angular.module('wechatAdminApp')
  .controller('AuthCtrl', function ($scope, $rootScope, $location, restAPI) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.test = 'fuck this'

    $scope.addUser = function(){
       $scope.message = 'this is message ' + $scope.user.email; 
    }

    $scope.signIn = function() {
      var Auth = restAPI.auth; 

      Auth.save({OP: 'signin'}, {name: $scope.user.name, passwd: $scope.user.passwd}, function(user){
       $rootScope = {user: {name: user.name}, isLogin: true}  
       window.location.href = 'index.html';
      })
    }

    $scope.signUp = function(){
      var Auth = restAPI.auth;
    
      var newUser = { 
        name: $scope.user.name, 
        passwd: $scope.user.passwd,
        email: $scope.user.email
      }

      Auth.save({OP: 'signup'}, newUser ,function(ret){
        if(!ret.isExist){
         $rootScope = {user: {name: ret.user.name}, isLogin: true}          
         window.location.href = 'index.html';
        }
      })
    }

  });
