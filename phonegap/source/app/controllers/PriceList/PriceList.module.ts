((): void => {
    'use strict';

    angular
        .module('spafoo.module.PriceList', ['spafoo.ctrl.PriceList'])
        .config(configPriceList);

    configPriceList.$inject = ['$stateProvider'];

    function configPriceList($stateProvider: angular.ui.IStateProvider) {
        var PriceListState: angular.ui.IState = {
            name: 'PriceList',
            url: '/PriceList',
            templateUrl: 'app/templates/PriceList.html',
            controller: 'PriceList as prlist'
        };

        $stateProvider.state(PriceListState);
    }
})();
