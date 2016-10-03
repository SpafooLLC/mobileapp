(function () {
    'use strict';
    angular
        .module('spafoo.module.ProMyAvailability', ['spafoo.ctrl.ProMyAvailability'])
        .config(configProMyAvailability);
    configProMyAvailability.$inject = ['$stateProvider'];
    function configProMyAvailability($stateProvider) {
        var MyScheduleState = {
            name: 'ProMyAvailability',
            url: '/ProMyAvailability/:AddressID/:ClientID/:ProviderID/:AppID/:Name1/:totalTime',
            templateUrl: 'app/templates/Pro-MyAvailability.html',
            controller: 'ProMyAvailability as pma'
        };
        $stateProvider.state(MyScheduleState);
    }
})();

//# sourceMappingURL=Pro-MyAvailability.module.js.map
