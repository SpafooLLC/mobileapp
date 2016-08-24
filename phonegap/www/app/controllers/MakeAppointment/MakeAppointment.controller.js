var MakeAppointmentController;
(function (MakeAppointmentController_1) {
    var MakeAppointmentController = (function () {
        function MakeAppointmentController($state, $scope, $ionicLoading) {
            this.$inject = ['$state', '$scope', '$ionicLoading'];
            var mySelect = $('#first-disabled2');
            $('#special').on('click', function () {
                mySelect.find('option:selected').prop('disabled', true);
                mySelect.selectpicker('refresh');
            });
            $('#special2').on('click', function () {
                mySelect.find('option:disabled').prop('disabled', false);
                mySelect.selectpicker('refresh');
            });
            $('#basic2').selectpicker({
                liveSearch: true,
                maxOptions: 1
            });
        }
        MakeAppointmentController.prototype.doLogin = function () {
        };
        return MakeAppointmentController;
    }());
    angular.module('spafoo.ctrl.MakeAppointment', []).controller('MakeAppointment', MakeAppointmentController);
})(MakeAppointmentController || (MakeAppointmentController = {}));

//# sourceMappingURL=MakeAppointment.controller.js.map
