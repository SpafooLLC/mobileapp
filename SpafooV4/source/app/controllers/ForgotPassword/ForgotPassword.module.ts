((): void => {
    'use strict';

    angular
        .module('spafoo.module.ForgotPassword', ['spafoo.ctrl.ForgotPassword'])
        .config(configForgetPassword);

    configForgetPassword.$inject = ['$stateProvider'];

    function configForgetPassword($stateProvider: angular.ui.IStateProvider) {
        var ForgetPasswordState: angular.ui.IState = {
            name: 'ForgotPassword',
            url: '/ForgotPassword',
            templateUrl: 'app/templates/ForgotPassword.html',
            controller: 'ForgotPassword as frgtpass'
        };

        $stateProvider.state(ForgetPasswordState);
    }
})();
