'use strict';

var services = angular.module('wechatAdminApp');

services.factory('restAPI', function ($resource, $q) {
    // Service logic
    // ...

    // Public API here
   
    var restAPI = {};
    restAPI.auth = $resource('/auth/:OP');
    restAPI.user = $resource('/user/:OP');
    restAPI.rule = $resource('/rule/:OP');
    return restAPI; 
});
