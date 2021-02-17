((): void => {
    'use strict';

    angular
        .module('spafoo.module.ProviderList', ['spafoo.ctrl.ProviderList'])
        .config(configProviderList);

    configProviderList.$inject = ['$stateProvider'];

    function configProviderList($stateProvider: angular.ui.IStateProvider) {
        var ProviderListState: angular.ui.IState = {
            name: 'ProviderList',
            url: '/ProviderList',
            templateUrl: 'app/templates/ProviderList.html',
            controller: 'ProviderList as pl'
        };

        $stateProvider.state(ProviderListState);
    }
})();
