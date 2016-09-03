var MakeAppointmentController;
(function (MakeAppointmentController_1) {
    var MakeAppointmentController = (function () {
        function MakeAppointmentController($http, $state, $scope, $ionicLoading) {
            
            this.$inject = ['$state', '$scope', '$ionicLoading'];

 //=============================services gettting list==============================
           var service_url = 'http://websvc.spafoo.com/SpaServices.svc/GetProviderServices/72';
           
           $http.get(service_url).success(function (data, status) {
               $scope.response = data;
               $scope.service_list = data.GetProviderServicesResult;
               $scope.checked_services = {};
               //console.log($scope.checked_services);
           }).error(function (data, status) {
                   $scope.response = 'Request failed';
               });
           
           //=============================end services gettting list==============================


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
