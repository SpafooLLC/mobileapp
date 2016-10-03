(function () {
    'use strict';
    angular
        .module('spafoo.module.AvailableCities', [])
        .config(configAvailableCities);
    configAvailableCities.$inject = ['$stateProvider'];
    function configAvailableCities($stateProvider) {
        var AvailableCitiesState = {
            name: 'AvailableCities',
            url: '/AvailableCities',
            templateUrl: 'app/templates/AvailableCities.html',
        };
        $stateProvider.state(AvailableCitiesState);
    }
})();

//# sourceMappingURL=AvailableCities.js.map
