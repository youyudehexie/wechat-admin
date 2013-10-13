'use strict';

angular.module('wechatAdminApp')
  .controller('NewRuleCtrl', function ($scope, $location, restAPI) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.edit = {};
    var Rule = restAPI.rule;

    $scope.save = function(){
        console.log('fuck')
        Rule.save({OP: 'create'}, $scope.edit, function(){
            $location.path('/rule') 
        }, function(err){
            $location.path('/signin')
        }) 
    }

  });
