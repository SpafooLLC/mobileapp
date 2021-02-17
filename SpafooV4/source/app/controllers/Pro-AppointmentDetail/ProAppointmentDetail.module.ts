((): void => {
    'use strict';

    angular
        .module('spafoo.module.ProAppointmentDetail', ['spafoo.ctrl.ProAppointmentDetail'])
        .config(configProAppointmentDetail);

    configProAppointmentDetail.$inject = ['$stateProvider'];

    function configProAppointmentDetail($stateProvider: angular.ui.IStateProvider) {
        var ProAppointmentDetailState: angular.ui.IState = {
            name: 'ProAppointmentDetail',
            url: '/ProAppointmentDetail',
            templateUrl: 'app/templates/Pro-AppointmentDetail.html',
            controller: 'ProAppointmentDetail as pad'
        };

        $stateProvider.state(ProAppointmentDetailState);
    }
})();
