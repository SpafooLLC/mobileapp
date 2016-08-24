((): void => {
    'use strict';

    angular
        .module('spafoo.module.MySchedule', ['spafoo.ctrl.MySchedule'])
        .config(configMySchedule);

    configMySchedule.$inject = ['$stateProvider'];

    function configMySchedule($stateProvider: angular.ui.IStateProvider) {
        var MyScheduleState: angular.ui.IState = {
            name: 'MySchedule',
            url: '/MySchedule',
            templateUrl: 'app/templates/Pro-MySchedule.html',
            controller: 'MySchedule as ms'
        };

        $stateProvider.state(MyScheduleState);
    }
})();
