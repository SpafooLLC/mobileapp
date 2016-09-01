((): void => {
    'use strict';

    angular
        .module('spafoo.module.ScheduleDetail', ['spafoo.ctrl.ScheduleDetail'])
        .config(configScheduleDetail);

    configScheduleDetail.$inject = ['$stateProvider'];

    function configScheduleDetail($stateProvider: angular.ui.IStateProvider) {
        var ScheduleDetailState: angular.ui.IState = {
            name: 'ScheduleDetail',
            url: '/ScheduleDetail',
            templateUrl: 'app/templates/ScheduleDetail.html',
            controller: 'ScheduleDetail as scD'
        };

        $stateProvider.state(ScheduleDetailState);
    }
})();
