'use strict';

angular.module('wechatAdminApp')
  .controller('NewStateCtrl', function ($scope, $location, restAPI) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.edit = {};
    var Rule = restAPI.rule;

    $scope.save = function(){
        Rule.save({OP: 'create'}, $scope.edit, function(){
            $location.path('/rule') 
        }, function(err){
            $location.path('/signin')
        }) 
    }

  });
