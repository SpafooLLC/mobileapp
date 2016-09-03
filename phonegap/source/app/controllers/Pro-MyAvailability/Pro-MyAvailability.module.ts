﻿((): void => {
    'use strict';

    angular
        .module('spafoo.module.ProMyAvailability', ['spafoo.ctrl.ProMyAvailability'])
        .config(configProMyAvailability);

    configProMyAvailability.$inject = ['$stateProvider'];

    function configProMyAvailability($stateProvider: angular.ui.IStateProvider) {
        var MyScheduleState: angular.ui.IState = {
            name: 'ProMyAvailability',
            url: '/ProMyAvailability',
            templateUrl: 'app/templates/Pro-MyAvailability.html',
            controller: 'ProMyAvailability as pma'
        };

        $stateProvider.state(MyScheduleState);
    }
})();
