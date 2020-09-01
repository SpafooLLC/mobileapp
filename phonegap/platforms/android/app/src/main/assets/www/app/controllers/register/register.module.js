(function () {
    'use strict';
    angular
        .module('spafoo.module.register', ['spafoo.ctrl.register'])
        .config(configRegister);
    configRegister.$inject = ['$stateProvider'];
    function configRegister($stateProvider) {
        var registerState = {
            name: 'register',
            url: '/register',
            templateUrl: 'app/templates/RegisterUser.html',
            controller: 'register as Reg'
        };
        $stateProvider.state(registerState);
    }
})();

//# sourceMappingURL=register.module.js.map
