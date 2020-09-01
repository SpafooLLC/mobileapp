(function () {
    'use strict';
    angular
        .module('spafoo.module.RegisterUser', ['spafoo.ctrl.RegisterUser'])
        .config(configRegisterUser);
    configRegisterUser.$inject = ['$stateProvider'];
    function configRegisterUser($stateProvider) {
        var RegisterUserState = {
            name: 'RegisterUser',
            url: '/RegisterUser',
            templateUrl: 'app/templates/RegisterUser.html',
            controller: 'RegisterUser'
        };
        $stateProvider.state(RegisterUserState);
    }
})();

//# sourceMappingURL=RegisterUser.module.js.map
