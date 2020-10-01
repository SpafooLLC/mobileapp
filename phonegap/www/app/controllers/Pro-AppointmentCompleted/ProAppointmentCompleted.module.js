(function () {
    'use strict';
    angular
        .module('spafoo.module.ProAppointmentCompleted', ['spafoo.ctrl.ProAppointmentCompleted'])
        .config(configProAppointmentCompleted);
    configProAppointmentCompleted.$inject = ['$stateProvider'];
    function configProAppointmentCompleted($stateProvider) {
        var ProAppointmentCompletedState = {
            name: 'ProAppointmentCompleted',
            url: '/ProAppointmentCompleted/:clientId/:authTxnIDField/:appointmentIDField/:payTxnIDField/:amountField/:PID/:PPID/:discount',
            templateUrl: 'app/templates/Pro-AppointmentCompleted.html',
            controller: 'ProAppointmentCompleted as pac'
        };
        $stateProvider.state(ProAppointmentCompletedState);
    }
})();

//# sourceMappingURL=ProAppointmentCompleted.module.js.map
