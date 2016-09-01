((): void => {
    'use strict';

    angular
        .module('spafoo.module.ShareApp', ['spafoo.ctrl.ShareApp'])
        .config(configShareApp);

    configShareApp.$inject = ['$stateProvider'];

    function configShareApp($stateProvider: angular.ui.IStateProvider) {
        var ShareAppState: angular.ui.IState = {
            name: 'ShareApp',
            url: '/ShareApp',
            templateUrl: 'app/templates/ShareApp.html',
            controller: 'ShareApp'
        };

        $stateProvider.state(ShareAppState);
    }
})();
