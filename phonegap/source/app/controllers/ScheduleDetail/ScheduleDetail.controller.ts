module ScheduleDetailController {

    class ScheduleDetailController {

        AppointmentID: number;
        ServiceData: any;
        authTxnIDField: any;
        amountField: any;
        messages: any;
        static $inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp'];
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp
        ) {
            this.AppointmentID = this.$window.localStorage.getItem('AppointmentIDs');
            this.getScheduleDetail(this.AppointmentID);
        }

        getScheduleDetail(AppointmentID: any) {
            var self = this;
            self.CustomerHttp.get('/GetAppointment/' + AppointmentID).then(function (response: any) {
                self.ServiceData = response.GetAppointmentResult;

                var orderdt = self.SharedHttp.getFormatedDate(self.ServiceData.forDateField, "weekday dd MMMM yyyy");
                self.ServiceData.orderDateField = orderdt;
                self.ServiceData.atTimeField = self.SharedHttp.getFormatedTime(self.ServiceData.atTimeField);
                self.ServiceData.DayField = orderdt.split(' ')[1];
                self.ServiceData.MonthField = orderdt.split(' ')[2];
                self.amountField = self.ServiceData.amountField;
                self.authTxnIDField = self.ServiceData.authTxnIDField;
                self.SharedHttp.GetAddressInfo(self.ServiceData.appointmentIDField).then(function (e: any) { self.ServiceData.addressField = e; });
                var serviceName = "";
                $.each(self.ServiceData.servicesField, function (ig, sitem) {
                    serviceName += sitem.serviceNameField + ",";
                });
                self.ServiceData.ServiceList = serviceName.substr(0, serviceName.lastIndexOf(','));
                self.SharedHttp.GetUserInfo(self.ServiceData.providerIDField).then(function (res: any) {
                    self.ServiceData.displayNameField = res.displayNameField;
                    self.SharedHttp.getProfilePics(res.profileField.photoField).then(function (imgres) { self.ServiceData.profilePic = imgres; });

                });


            }, function (error) {
            });
        }

        CancelSchdule() {
            var self = this;
            var PostData = { 'AID': this.AppointmentID, 'TxnID': this.authTxnIDField, 'Amount': this.amountField };
          //  alert(JSON.stringify(PostData));
            self.CustomerHttp.post(PostData, '/RefundCard').then(function (response: any) {
                self.messages = JSON.parse(response).messages.message[0].text;
                $("#PDone").modal();
            }, function (error) {
                //alert(error)
            });
        }

        dismissAndThen(){
            this.$state.go('MySchedule');
        }


    }


    angular.module('spafoo.ctrl.ScheduleDetail', []).controller('ScheduleDetail', ScheduleDetailController);

}