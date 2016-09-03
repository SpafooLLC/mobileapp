module ProAppointmentDetailController {

    class ProAppointmentDetailController {
        AppID: number;
        ServiceData: any;
        amountField: any;
        authTxnIDField: any;
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
            this.AppID = this.$window.localStorage.getItem('AppointmentIDs');
            this.getClientSchedular(this.AppID);
        }

        getClientSchedular(AppID: any) {
            var self = this;
            self.CustomerHttp.get('/GetAppointment/' + AppID).then(function (response: any) {
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
                self.SharedHttp.GetUserInfo(self.ServiceData.clientIDField).then(function (res: any) {
                    self.ServiceData.displayNameField = res.displayNameField;
                    //self.SharedHttp.getProfilePics(res.profileField.photoField).then(function (imgres) { self.ServiceData.profilePic = imgres; });

                });
                //console.log(response);
            }, function (error) {
            });
        }

       
    }


    angular.module('spafoo.ctrl.ProAppointmentDetail', []).controller('ProAppointmentDetail', ProAppointmentDetailController);

}