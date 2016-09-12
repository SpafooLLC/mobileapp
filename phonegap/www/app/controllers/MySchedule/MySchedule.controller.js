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
            var self = this;
            self.UserID = this.$window.localStorage.getItem('CustomerID');
            self.getClientSchedular(self.UserID);
        }
        MyScheduleController.prototype.getClientSchedular = function (UserID) {
            var self = this;
            self.CustomerHttp.get('/ListAppointmentByClient/' + UserID).then(function (response) {
                self.ServiceData = response.ListAppointmentByClientResult;
                $.each(self.ServiceData, function (i, item) {
                    var orderdt = self.SharedHttp.getFormatedDate(item.forDateField, "weekday dd MMMM yyyy");
                    //self.ServiceData[i].orderDateField = orderdt;
                    //self.ServiceData[i].atTimeField = self.SharedHttp.getFormatedTime(item.atTimeField);
                    //self.ServiceData[i].DayField = orderdt.split(' ')[1];
                    //self.ServiceData[i].MonthField = orderdt.split(' ')[2];
                    if (item.forDateField === 'undefined' || item.forDateField === undefined || item.forDateField === null || item.forDateField === '') {
                        self.ServiceData[i].orderDateField = '';
                        self.ServiceData[i].DayField = '00';
                        self.ServiceData[i].MonthField = '-- -- --';
                    }
                    else {
                        var orderdt = self.SharedHttp.getFormatedDate(item.forDateField, "weekday dd MMMM yyyy");
                        self.ServiceData[i].orderDateField = orderdt;
                        self.ServiceData[i].DayField = orderdt.split(' ')[1];
                        self.ServiceData[i].MonthField = orderdt.split(' ')[2];
                    }
                    if (item.atTimeField === 'undefined' || item.atTimeField === undefined || item.atTimeField === null || item.atTimeField === '') {
                        self.ServiceData[i].atTimeField = '00:00 --';
                    }
                    else {
                        self.ServiceData[i].atTimeField = self.SharedHttp.getFormatedTime(item.atTimeField);
                    }
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
        MyScheduleController.prototype.acceptAppointment = function (data) {
            var self = this;
            self.CustomerHttp.get("/UpdateAppStatus/" + data + "/0").then(function (res) { self.getClientSchedular(self.UserID); });
        };
        MyScheduleController.prototype.denyAppointment = function (data) {
            var self = this;
            self.CustomerHttp.get("/RemoveApp/" + data).then(function (res) { self.getClientSchedular(self.UserID); });
        };
        MyScheduleController.$inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp'];
        return MyScheduleController;
    }());
    angular.module('spafoo.ctrl.MySchedule', []).controller('MySchedule', MyScheduleController);
})(MyScheduleController || (MyScheduleController = {}));

//# sourceMappingURL=MySchedule.controller.js.map
