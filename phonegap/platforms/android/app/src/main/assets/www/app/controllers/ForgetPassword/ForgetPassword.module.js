(function () {
    'use strict';
    angular
        .module('spafoo.module.ForgetPassword', ['spafoo.ctrl.ForgetPassword'])
        .config(configForgetPassword);
    configForgetPassword.$inject = ['$stateProvider'];
    function configForgetPassword($stateProvider) {
        var ForgetPasswordState = {
            name: 'ForgotPassword',
            url: '/ForgotPassword',
            templateUrl: 'app/templates/ForgotPassword.html',
            controller: 'ForgotPassword as frgtpass'
        };
        $stateProvider.state(ForgetPasswordState);
    }
})();

//# sourceMappingURL=ForgetPassword.module.js.map
