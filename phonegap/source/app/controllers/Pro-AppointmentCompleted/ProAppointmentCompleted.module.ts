((): void => {
    'use strict';

    angular
        .module('spafoo.module.ProAppointmentCompleted', ['spafoo.ctrl.ProAppointmentCompleted'])
        .config(configProAppointmentCompleted);

    configProAppointmentCompleted.$inject = ['$stateProvider'];

    function configProAppointmentCompleted($stateProvider: angular.ui.IStateProvider) {
        var ProAppointmentCompletedState: angular.ui.IState = {
            name: 'ProAppointmentCompleted',
            url: '/ProAppointmentCompleted/:clientId/:authTxnIDField/:appointmentIDField/:payTxnIDField/:amountField',
            templateUrl: 'app/templates/Pro-AppointmentCompleted.html',
            controller: 'ProAppointmentCompleted as pac'
        };

        $stateProvider.state(ProAppointmentCompletedState);
    }
})();
