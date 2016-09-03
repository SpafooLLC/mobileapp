(function () {
    'use strict';
    angular
        .module('spafoo.module.ProAppointmentDetail', ['spafoo.ctrl.ProAppointmentDetail'])
        .config(configProAppointmentDetail);
    configProAppointmentDetail.$inject = ['$stateProvider'];
    function configProAppointmentDetail($stateProvider) {
        var ProAppointmentDetailState = {
            name: 'ProAppointmentDetail',
            url: '/ProAppointmentDetail',
            templateUrl: 'app/templates/Pro-AppointmentDetail.html',
            controller: 'ProAppointmentDetail as pad'
        };
        $stateProvider.state(ProAppointmentDetailState);
    }
})();

//# sourceMappingURL=ProAppointmentDetail.module.js.map
