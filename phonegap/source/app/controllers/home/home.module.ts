((): void => {
    'use strict';

    angular
        .module('spafoo.module.home', ['spafoo.ctrl.home'])
        .config(configHome);

    configHome.$inject = ['$stateProvider'];

    function configHome($stateProvider: angular.ui.IStateProvider) {
        var homeState: angular.ui.IState = {
            name: 'home',
            url: '/home',
            templateUrl: 'app/templates/index.html',
            controller: 'home'
        };

        $stateProvider.state(homeState);
    }
})();
