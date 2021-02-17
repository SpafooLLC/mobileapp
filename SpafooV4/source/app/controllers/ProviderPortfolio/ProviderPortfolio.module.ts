((): void => {
    'use strict';

    angular
        .module('spafoo.module.ProviderPortfolio', ['spafoo.ctrl.ProviderPortfolio'])
        .config(configProviderPortfolio);

    configProviderPortfolio.$inject = ['$stateProvider'];

    function configProviderPortfolio($stateProvider: angular.ui.IStateProvider) {
        var ProviderPortfolioState: angular.ui.IState = {
            name: 'ProviderPortfolio',
            url: '/ProviderPortfolio/:userId/:distance',
            templateUrl: 'app/templates/ProviderPortfolio.html',
            controller: 'ProviderPortfolio as PvP'
        };

        $stateProvider.state(ProviderPortfolioState);
    }
})();
