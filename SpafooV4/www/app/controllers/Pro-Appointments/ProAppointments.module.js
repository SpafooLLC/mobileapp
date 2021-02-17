(function () {
    'use strict';
    angular
        .module('spafoo.module.ProAppointments', ['spafoo.ctrl.ProAppointments'])
        .config(configProAppointments);
    configProAppointments.$inject = ['$stateProvider'];
    function configProAppointments($stateProvider) {
        var ProAppointmentsState = {
            name: 'ProAppointments',
            url: '/ProAppointments',
            templateUrl: 'app/templates/Pro-Appointments.html',
            controller: 'ProAppointments as papp'
        };
        $stateProvider.state(ProAppointmentsState);
    }
})();

//# sourceMappingURL=ProAppointments.module.js.map
