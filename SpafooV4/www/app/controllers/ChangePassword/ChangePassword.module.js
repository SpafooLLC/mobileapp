(function () {
    'use strict';
    angular
        .module('spafoo.module.ChangePassword', ['spafoo.ctrl.ChangePassword'])
        .config(configChangePassword);
    configChangePassword.$inject = ['$stateProvider'];
    function configChangePassword($stateProvider) {
        var ChangePasswordState = {
            name: 'ChangePassword',
            url: '/ChangePassword',
            templateUrl: 'app/templates/ChangePassword.html',
            controller: 'ChangePassword as chgpass'
        };
        $stateProvider.state(ChangePasswordState);
    }
})();

//# sourceMappingURL=ChangePassword.module.js.map
