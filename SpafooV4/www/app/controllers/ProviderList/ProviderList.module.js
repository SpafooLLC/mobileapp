(function () {
    'use strict';
    angular
        .module('spafoo.module.ProviderList', ['spafoo.ctrl.ProviderList'])
        .config(configProviderList);
    configProviderList.$inject = ['$stateProvider'];
    function configProviderList($stateProvider) {
        var ProviderListState = {
            name: 'ProviderList',
            url: '/ProviderList',
            templateUrl: 'app/templates/ProviderList.html',
            controller: 'ProviderList as pl'
        };
        $stateProvider.state(ProviderListState);
    }
})();

//# sourceMappingURL=ProviderList.module.js.map
