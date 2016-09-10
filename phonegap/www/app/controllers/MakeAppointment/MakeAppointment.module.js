(function () {
    'use strict';
    angular
        .module('spafoo.module.MakeAppointment', ['spafoo.ctrl.MakeAppointment'])
        .config(configMakeAppointment);
    configMakeAppointment.$inject = ['$stateProvider'];
    function configMakeAppointment($stateProvider) {
        var MakeAppointmentState = {
            name: 'MakeAppointment',
            url: '/MakeAppointment/:userId',
            templateUrl: 'app/templates/MakeAppointment.html',
            controller: 'MakeAppointment as ma'
        };
        $stateProvider.state(MakeAppointmentState);
    }
})();

//# sourceMappingURL=MakeAppointment.module.js.map
