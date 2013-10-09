'use strict';

describe('Controller: RuleCtrl', function () {

  // load the controller's module
  beforeEach(module('wechatAdminApp'));

  var RuleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RuleCtrl = $controller('RuleCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
