(function () {
    'use strict';
    angular
        .module('spafoo.module.ProSetSoonest', ['spafoo.ctrl.ProSetSoonest'])
        .config(configProSetSoonest);
    configProSetSoonest.$inject = ['$stateProvider'];
    function configProSetSoonest($stateProvider) {
        var ProSetSoonestState = {
            name: 'ProSetSoonest',
            url: '/ProSetSoonest/:AddressID/:ClientID/:ProviderID/:AppID/:Name1/:totalTime',
            templateUrl: 'app/templates/Pro-SetSoonest.html',
            controller: 'ProSetSoonest as pss'
        };
        $stateProvider.state(ProSetSoonestState);
    }
})();

//# sourceMappingURL=ProSetSoonest.module.js.map
