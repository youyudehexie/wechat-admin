'use strict';

angular.module('wechatAdminApp')
  .controller('EditCtrl', function ($scope, $route, $location, restAPI) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var ruleId = $route.current.params.id; 
    var Rule = restAPI.rule;
    var rules = Rule.get({OP: "find", id: ruleId}, function(rule){ 
        $scope.edit = rule;
    },function(err){
        $location.path('/signin') 
    });
   


    $scope.save = function(){
        Rule.save({OP: 'update', id: ruleId}, $scope.edit, function(){
            $location.path('/rule') 
        }, function(err){
            $location.path('/signin')
        }) 
    }
    
  });
