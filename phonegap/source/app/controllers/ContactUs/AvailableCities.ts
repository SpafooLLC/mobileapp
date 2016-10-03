((): void => {
    'use strict';

    angular
        .module('spafoo.module.AvailableCities', [])
        .config(configAvailableCities);

    configAvailableCities.$inject = ['$stateProvider'];

    function configAvailableCities($stateProvider: angular.ui.IStateProvider) {
        var AvailableCitiesState: angular.ui.IState = {
            name: 'AvailableCities',
            url: '/AvailableCities',
            templateUrl: 'app/templates/AvailableCities.html',
            
        };

        $stateProvider.state(AvailableCitiesState);
    }
})();
