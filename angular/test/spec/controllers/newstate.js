'use strict';

describe('Controller: NewstateCtrl', function () {

  // load the controller's module
  beforeEach(module('wechatAdminApp'));

  var NewstateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewstateCtrl = $controller('NewstateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
