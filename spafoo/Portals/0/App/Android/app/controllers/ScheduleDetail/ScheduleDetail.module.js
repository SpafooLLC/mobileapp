(function () {
    'use strict';
    angular
        .module('spafoo.module.ScheduleDetail', ['spafoo.ctrl.ScheduleDetail'])
        .config(configScheduleDetail);
    configScheduleDetail.$inject = ['$stateProvider'];
    function configScheduleDetail($stateProvider) {
        var ScheduleDetailState = {
            name: 'ScheduleDetail',
            url: '/ScheduleDetail',
            templateUrl: 'app/templates/ScheduleDetail.html',
            controller: 'ScheduleDetail as scD'
        };
        $stateProvider.state(ScheduleDetailState);
    }
})();

//# sourceMappingURL=ScheduleDetail.module.js.map
