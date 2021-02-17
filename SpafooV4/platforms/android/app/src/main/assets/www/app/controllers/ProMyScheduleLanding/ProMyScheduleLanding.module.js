(function () {
    'use strict';
    angular
        .module('spafoo.module.ProMyScheduleLanding', [])
        .config(configProMyScheduleLanding);
    configProMyScheduleLanding.$inject = ['$stateProvider'];
    function configProMyScheduleLanding($stateProvider) {
        var MyScheduleState = {
            name: 'ProMyScheduleLanding',
            url: '/ProMyScheduleLanding',
            templateUrl: 'app/templates/Pro-MySchedule.html',
        };
        $stateProvider.state(MyScheduleState);
    }
})();

//# sourceMappingURL=ProMyScheduleLanding.module.js.map
