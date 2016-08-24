((): void => {
    'use strict';

    angular
        .module('spafoo.module.RegisterProvider', ['spafoo.ctrl.RegisterProvider'])
        .config(configRegisterProvider);

    configRegisterProvider.$inject = ['$stateProvider'];

    function configRegisterProvider($stateProvider: angular.ui.IStateProvider) {
        var RegisterProviderState: angular.ui.IState = {
            name: 'RegisterProvider',
            url: '/RegisterProvider',
            templateUrl: 'app/templates/RegisterProvider.html',
            controller: 'RegisterProvider'
        };

        $stateProvider.state(RegisterProviderState);
    }
})();
