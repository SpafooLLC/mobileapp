(function () {
    'use strict';
    angular
        .module('spafoo.module.login', ['spafoo.ctrl.login'])
        .config(configLogin);
    configLogin.$inject = ['$stateProvider'];
    function configLogin($stateProvider) {
        var loginState = {
            name: 'login',
            url: '/login',
            templateUrl: 'app/templates/Login.html',
            controller: 'login as log'
        };
        $stateProvider.state(loginState);
    }
})();

//# sourceMappingURL=login.module.js.map
