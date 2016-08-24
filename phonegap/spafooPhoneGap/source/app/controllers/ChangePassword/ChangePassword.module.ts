((): void => {
    'use strict';

    angular
        .module('spafoo.module.ChangePassword', ['spafoo.ctrl.ChangePassword'])
        .config(configChangePassword);

    configChangePassword.$inject = ['$stateProvider'];

    function configChangePassword($stateProvider: angular.ui.IStateProvider) {
        var ChangePasswordState: angular.ui.IState = {
            name: 'ChangePassword',
            url: '/ChangePassword',
            templateUrl: 'app/templates/ChangePassword.html',
            controller: 'ChangePassword as chgpass'
        };

        $stateProvider.state(ChangePasswordState);
    }
})();
