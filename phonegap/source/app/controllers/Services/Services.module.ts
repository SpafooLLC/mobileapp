((): void => {
    'use strict';

    angular
        .module('spafoo.module.Services', ['spafoo.ctrl.Services'])
        .config(configServices);

    configServices.$inject = ['$stateProvider'];

    function configServices($stateProvider: angular.ui.IStateProvider) {
        var ServicesState: angular.ui.IState = {
            name: 'Services',
            url: '/Services',
            templateUrl: 'app/templates/Services.html',
            controller: 'Services as s'
        };

        $stateProvider.state(ServicesState);
    }
})();
