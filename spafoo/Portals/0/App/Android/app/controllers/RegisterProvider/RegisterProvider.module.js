(function () {
    'use strict';
    angular
        .module('spafoo.module.RegisterProvider', ['spafoo.ctrl.RegisterProvider'])
        .config(configRegisterProvider);
    configRegisterProvider.$inject = ['$stateProvider'];
    function configRegisterProvider($stateProvider) {
        var RegisterProviderState = {
            name: 'RegisterProvider',
            url: '/RegisterProvider',
            templateUrl: 'app/templates/RegisterProvider.html',
            controller: 'RegisterProvider'
        };
        $stateProvider.state(RegisterProviderState);
    }
})();

//# sourceMappingURL=RegisterProvider.module.js.map
