((): void => {
    'use strict';

    angular
        .module('spafoo.module.MakeAppointment', ['spafoo.ctrl.MakeAppointment'])
        .config(configMakeAppointment);

    configMakeAppointment.$inject = ['$stateProvider'];

    function configMakeAppointment($stateProvider: angular.ui.IStateProvider) {
        var MakeAppointmentState: angular.ui.IState = {
            name: 'MakeAppointment',
            url: '/MakeAppointment/:userId/:appointmentId',
            templateUrl: 'app/templates/MakeAppointment.html',
            controller: 'MakeAppointment as ma'
        };

        $stateProvider.state(MakeAppointmentState);
    }
})();
