((): void => {
    'use strict';

    angular
        .module('spafoo.module.login', ['spafoo.ctrl.login'])
        .config(configLogin);

    configLogin.$inject = ['$stateProvider'];

    function configLogin($stateProvider: angular.ui.IStateProvider) {
        var loginState: angular.ui.IState = {
            name: 'login',
            url: '/login',
            templateUrl: 'app/templates/Login.html',
            controller: 'login as log'
        };

        $stateProvider.state(loginState);
    }
})();
