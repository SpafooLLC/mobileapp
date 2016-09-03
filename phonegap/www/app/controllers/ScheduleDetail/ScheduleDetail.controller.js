var ScheduleDetailController;
(function (ScheduleDetailController_1) {
    var ScheduleDetailController = (function () {
        function ScheduleDetailController($q, $state, $scope, $location, CustomerHttp, $window, SharedHttp) {
            this.$q = $q;
            this.$state = $state;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.SharedHttp = SharedHttp;
            this.AppointmentID = this.$window.localStorage.getItem('AppointmentIDs');
            this.getScheduleDetail(this.AppointmentID);
        }
        ScheduleDetailController.prototype.getScheduleDetail = function (AppointmentID) {
            var self = this;
            self.CustomerHttp.get('/GetAppointment/' + AppointmentID).then(function (response) {
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
                self.SharedHttp.GetUserInfo(self.ServiceData.providerIDField).then(function (res) {
                    self.ServiceData.displayNameField = res.displayNameField;
                    self.SharedHttp.getProfilePics(res.profileField.photoField).then(function (imgres) { self.ServiceData.profilePic = imgres; });
                });
            }, function (error) {
            });
        };
        ScheduleDetailController.prototype.CancelSchdule = function () {
            var self = this;
            var PostData = { 'AID': this.AppointmentID, 'TxnID': this.authTxnIDField, 'Amount': this.amountField };
            //  alert(JSON.stringify(PostData));
            self.CustomerHttp.post(PostData, '/RefundCard').then(function (response) {
                //  alert(JSON.stringify(response));
                self.messages = response.messages.messageField[0].textField;
                $("#PDone").modal();
            }, function (error) {
                alert(error);
            });
        };
        ScheduleDetailController.$inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp'];
        return ScheduleDetailController;
    }());
    angular.module('spafoo.ctrl.ScheduleDetail', []).controller('ScheduleDetail', ScheduleDetailController);
})(ScheduleDetailController || (ScheduleDetailController = {}));

//# sourceMappingURL=ScheduleDetail.controller.js.map
