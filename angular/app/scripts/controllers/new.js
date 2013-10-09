'use strict';

angular.module('wechatAdminApp')
  .controller('NewCtrl', function ($scope, $location, restAPI) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.edit = {};
    var Rule = restAPI.rule;

    $scope.save = function(){
        console.log('save')
        Rule.save({OP: 'create'}, $scope.edit, function(){
            $location.path('/rule') 
        }, function(err){
            $location.path('/signin')
        }) 
    }

  });
