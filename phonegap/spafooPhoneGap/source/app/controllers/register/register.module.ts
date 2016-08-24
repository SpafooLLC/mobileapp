((): void => {
    'use strict';

    angular
        .module('spafoo.module.register', ['spafoo.ctrl.register'])
        .config(configRegister);

    configRegister.$inject = ['$stateProvider'];

    function configRegister($stateProvider: angular.ui.IStateProvider) {
        var registerState: angular.ui.IState = {
            name: 'register',
            url: '/register',
            templateUrl: 'app/templates/RegisterUser.html',
            controller: 'register as Reg'
        };

        $stateProvider.state(registerState);
    }
})();
