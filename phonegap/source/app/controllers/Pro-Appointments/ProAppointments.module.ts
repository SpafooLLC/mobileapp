((): void => {
    'use strict';

    angular
        .module('spafoo.module.ProAppointments', ['spafoo.ctrl.ProAppointments'])
        .config(configProAppointments);

    configProAppointments.$inject = ['$stateProvider'];

    function configProAppointments($stateProvider: angular.ui.IStateProvider) {
        var ProAppointmentsState: angular.ui.IState = {
            name: 'ProAppointments',
            url: '/ProAppointments',
            templateUrl: 'app/templates/Pro-Appointments.html',
            controller: 'ProAppointments as papp'
        };

        $stateProvider.state(ProAppointmentsState);
    }
})();
