((): void => {
    'use strict';

    angular
        .module('spafoo.module.ProMyScheduleLanding', [])
        .config(configProMyScheduleLanding);

    configProMyScheduleLanding.$inject = ['$stateProvider'];

    function configProMyScheduleLanding($stateProvider: angular.ui.IStateProvider) {
        var MyScheduleState: angular.ui.IState = {
            name: 'ProMyScheduleLanding',
            url: '/ProMyScheduleLanding',
            templateUrl: 'app/templates/Pro-MySchedule.html',
           
        };

        $stateProvider.state(MyScheduleState);
    }
})();
