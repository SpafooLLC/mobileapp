var ProAppointmentDetailController;
(function (ProAppointmentDetailController_1) {
    var ProAppointmentDetailController = (function () {
        function ProAppointmentDetailController($q, $state, $scope, $location, CustomerHttp, $window, SharedHttp) {
            this.$q = $q;
            this.$state = $state;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.SharedHttp = SharedHttp;
            this.AppID = this.$window.localStorage.getItem('AppointmentIDs');
            this.getClientSchedular(this.AppID);
        }
        ProAppointmentDetailController.prototype.getClientSchedular = function (AppID) {
            var self = this;
            self.CustomerHttp.get('/GetAppointment/' + AppID).then(function (response) {
                self.ServiceData = response.GetAppointmentResult;
                var orderdt = self.SharedHttp.getFormatedDate(self.ServiceData.forDateField, "weekday dd MMMM yyyy");
                self.ServiceData.orderDateField = orderdt;
                self.ServiceData.atTimeField = self.SharedHttp.getFormatedTime(self.ServiceData.atTimeField);
                self.ServiceData.DayField = orderdt.split(' ')[1];
                self.ServiceData.MonthField = orderdt.split(' ')[2];
                self.amountField = self.ServiceData.amountField;
                self.authTxnIDField = self.ServiceData.authTxnIDField;
                self.SharedHttp.GetAddressInfo(self.ServiceData.appointmentIDField).then(function (e) { self.ServiceData.addressField = e; });
                var serviceName = "";
                $.each(self.ServiceData.servicesField, function (ig, sitem) {
                    serviceName += sitem.serviceNameField + ",";
                });
                self.ServiceData.ServiceList = serviceName.substr(0, serviceName.lastIndexOf(','));
                self.SharedHttp.GetUserInfo(self.ServiceData.clientIDField).then(function (res) {
                    self.ServiceData.displayNameField = res.displayNameField;
                    //self.SharedHttp.getProfilePics(res.profileField.photoField).then(function (imgres) { self.ServiceData.profilePic = imgres; });
                });
                //console.log(response);
            }, function (error) {
            });
        };
        ProAppointmentDetailController.$inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp'];
        return ProAppointmentDetailController;
    }());
    angular.module('spafoo.ctrl.ProAppointmentDetail', []).controller('ProAppointmentDetail', ProAppointmentDetailController);
})(ProAppointmentDetailController || (ProAppointmentDetailController = {}));

//# sourceMappingURL=ProAppointmentDetail.controller.js.map
