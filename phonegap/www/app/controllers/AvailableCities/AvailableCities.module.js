(function () {
    'use strict';
    angular
        .module('spafoo.module.AvailableCities', ['spafoo.ctrl.AvailableCities'])
        .config(configAvailableCities);
    configAvailableCities.$inject = ['$stateProvider'];
    function configAvailableCities($stateProvider) {
        var AvailableCitiesState = {
            name: 'AvailableCities',
            url: '/AvailableCities',
            templateUrl: 'app/templates/AvailableCities.html',
            controller: 'AvailableCities as avct'
        };
        $stateProvider.state(AvailableCitiesState);
    }
})();

//# sourceMappingURL=AvailableCities.module.js.map
