(function () {
    'use strict';
    angular
        .module('spafoo.module.ProviderPortfolio', ['spafoo.ctrl.ProviderPortfolio'])
        .config(configProviderPortfolio);
    configProviderPortfolio.$inject = ['$stateProvider'];
    function configProviderPortfolio($stateProvider) {
        var ProviderPortfolioState = {
            name: 'ProviderPortfolio',
            url: '/ProviderPortfolio/:userId',
            templateUrl: 'app/templates/ProviderPortfolio.html',
            controller: 'ProviderPortfolio as PvP'
        };
        $stateProvider.state(ProviderPortfolioState);
    }
})();

//# sourceMappingURL=ProviderPortfolio.module.js.map
