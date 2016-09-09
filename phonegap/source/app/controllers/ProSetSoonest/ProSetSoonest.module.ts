((): void => {
    'use strict';

    angular
        .module('spafoo.module.ProSetSoonest', ['spafoo.ctrl.ProSetSoonest'])
        .config(configProSetSoonest);

    configProSetSoonest.$inject = ['$stateProvider'];

    function configProSetSoonest($stateProvider: angular.ui.IStateProvider) {
        var ProSetSoonestState: angular.ui.IState = {
            name: 'ProSetSoonest',
            url: '/ProSetSoonest/:AddressID/:ClientID/:ProviderID/:AppID/:Name1',
            templateUrl: 'app/templates/Pro-SetSoonest.html',
            controller: 'ProSetSoonest as pss'
        };

        $stateProvider.state(ProSetSoonestState);
    }
})();
