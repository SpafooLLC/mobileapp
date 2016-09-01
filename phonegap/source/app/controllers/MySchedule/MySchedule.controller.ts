module MyScheduleController {

    class MyScheduleController {
        UserID: number;
        ServiceData: any;


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
            this.UserID = this.$window.localStorage.getItem('CustomerID');
            this.getClientSchedular(this.UserID);
        }

        getClientSchedular(UserID: any) {
            var self = this;
            self.CustomerHttp.get('/ListAppointmentByClient/' + UserID).then(function (response: any) {
                self.ServiceData = response.ListAppointmentByClientResult;
                $.each(self.ServiceData, function (i, item) {
                    var orderdt = self.SharedHttp.getFormatedDate(item.forDateField, "weekday dd MMMM yyyy");
                    self.ServiceData[i].orderDateField = orderdt;
                    self.ServiceData[i].atTimeField = self.SharedHttp.getFormatedTime(item.atTimeField);
                    self.ServiceData[i].DayField = orderdt.split(' ')[1];
                    self.ServiceData[i].MonthField = orderdt.split(' ')[2];
                    var serviceName = "";
                    $.each(item.servicesField, function (ig, sitem) {
                        serviceName += sitem.serviceNameField + ",";
                    });
                    self.ServiceData[i].ServiceList = serviceName.substr(0, serviceName.lastIndexOf(','));
                    self.SharedHttp.GetUserInfo(item.providerIDField).then(function (res: any) {
                        self.ServiceData[i].displayNameField = res.displayNameField;
                    });
                    self.SharedHttp.GetAddressInfo(item.appointmentIDField).then(function (e: any) { self.ServiceData[i].addressField = e;   });
                });
            }, function (error) {
            });
        }

        GoToProviderPortfolio(UserID: any) {
            var self = this;
            self.$window.localStorage.setItem('ProviderIDs', UserID);
            self.$state.go("ProviderPortfolio");
        }
        GoToScheduleDetail(AppointmentID: any) {
            var self = this;
            self.$window.localStorage.setItem('AppointmentIDs', AppointmentID);
            self.$state.go("ScheduleDetail");
        }
    }


    angular.module('spafoo.ctrl.MySchedule', []).controller('MySchedule', MyScheduleController);

}