(function () {
    'use strict';
    angular
        .module('spafoo.module.PriceList', ['spafoo.ctrl.PriceList'])
        .config(configPriceList);
    configPriceList.$inject = ['$stateProvider'];
    function configPriceList($stateProvider) {
        var PriceListState = {
            name: 'PriceList',
            url: '/PriceList',
            templateUrl: 'app/templates/PriceList.html',
            controller: 'PriceList as prlist'
        };
        $stateProvider.state(PriceListState);
    }
})();

//# sourceMappingURL=PriceList.module.js.map
