var MyScheduleController;
(function (MyScheduleController_1) {
    var MyScheduleController = (function () {
        function MyScheduleController($q, $state, $scope, $location, CustomerHttp, $window, SharedHttp) {
            this.$q = $q;
            this.$state = $state;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.SharedHttp = SharedHttp;
            this.UserID = this.$window.localStorage.getItem('CustomerID');
            this.getClientSchedular(this.UserID);
        }
        MyScheduleController.prototype.getClientSchedular = function (UserID) {
            var self = this;
            self.CustomerHttp.get('/ListAppointmentByClient/' + UserID).then(function (response) {
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
                    self.SharedHttp.GetUserInfo(item.providerIDField).then(function (res) {
                        self.ServiceData[i].displayNameField = res.displayNameField;
                    });
                    self.SharedHttp.GetAddressInfo(item.appointmentIDField).then(function (e) { self.ServiceData[i].addressField = e; });
                });
            }, function (error) {
            });
        };
        MyScheduleController.prototype.GoToProviderPortfolio = function (UserID) {
            var self = this;
            self.$window.localStorage.setItem('ProviderIDs', UserID);
            self.$state.go("ProviderPortfolio");
        };
        MyScheduleController.prototype.GoToScheduleDetail = function (AppointmentID) {
            var self = this;
            self.$window.localStorage.setItem('AppointmentIDs', AppointmentID);
            self.$state.go("ScheduleDetail");
        };
        MyScheduleController.$inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp'];
        return MyScheduleController;
    }());
    angular.module('spafoo.ctrl.MySchedule', []).controller('MySchedule', MyScheduleController);
})(MyScheduleController || (MyScheduleController = {}));

//# sourceMappingURL=MySchedule.controller.js.map
