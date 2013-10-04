'use strict';

angular.module('wechatAdminApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, restAPI) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.test = 'fuck';
  
    $scope.signOut = function(){

      var Auth = restAPI.auth;
      Auth.get({OP: 'signout'}, {}, function(){
       var user = {
        name: ''
       }

       $rootScope.gobal.isLogin = false;
       $rootScope.gobal.user = user
     
      });
    }
  });

