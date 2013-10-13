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
      .when('/rule', {
        templateUrl: 'views/form.html',
        controller: 'RuleCtrl'
      })      
      .when('/edit/Rule/:id', {
        templateUrl: 'views/edit.html', 
        controller: 'EditRuleCtrl'
      })
      .when('/new/Rule', {
        templateUrl: 'views/edit.html',
        controller: 'NewRuleCtrl'
      })
      .when('/new/State', {
        templateUrl: 'views/edit.html',
        controller: 'NewStateCtrl'
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
