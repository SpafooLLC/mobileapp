((): void => {
    'use strict';

    angular
        .module('spafoo.module.FindProvider', ['spafoo.ctrl.FindProvider'])
        .config(configFindProvider);

    configFindProvider.$inject = ['$stateProvider'];

    function configFindProvider($stateProvider: angular.ui.IStateProvider) {
        var FindProviderState: angular.ui.IState = {
            name: 'FindProvider',
            url: '/FindProvider', 
            templateUrl: 'app/templates/FindProvider.html',
            controller: 'FindProvider as findpro'
        };

        $stateProvider.state(FindProviderState);
    }
})();
