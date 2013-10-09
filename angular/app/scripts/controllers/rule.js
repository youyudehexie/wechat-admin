'use strict';

angular.module('wechatAdminApp')
  .controller('RuleCtrl', function ($scope, $rootScope, $location, $q,restAPI) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    
    var Rule = restAPI.rule;
    var rules = Rule.query({OP: "find"},function(rules){ 
        $scope.items = Object.keys(rules[0]);  
        $scope.rules = rules;
    },function(err){
        $location.path('/signin') 
    });

    
    $scope.name = 'Rule';

    $scope.addNewRule = function(){
        $location.path('/new/Rule'); 
    }

  });
