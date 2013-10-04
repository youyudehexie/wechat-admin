'use strict';

var app = angular.module('wechatAdminApp',['ngResource']);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'AuthCtrl'
      })
      .when('/wcrule', {
        templateUrl: 'views/wcRule.html'
      })      
      .otherwise({
        redirectTo: '/'
      });
});

app.run(function($rootScope, restAPI){
    var Auth = restAPI.auth;
    
    Auth.get({OP: 'status'}, {}, function(profile){
        $rootScope.global = profile; 
    });

})
