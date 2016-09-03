var ProAppointmentsController;
(function (ProAppointmentsController_1) {
    var ProAppointmentsController = (function () {
        function ProAppointmentsController($q, $state, $scope, $location, CustomerHttp, $window, SharedHttp) {
            this.$q = $q;
            this.$state = $state;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.SharedHttp = SharedHttp;
            this.UserID = this.$window.localStorage.getItem('CustomerID');
            this.getProviderSchedular(this.UserID);
        }
        ProAppointmentsController.prototype.getProviderSchedular = function (UserID) {
            var self = this;
            self.CustomerHttp.get('/ListAppointmentByProvider/' + UserID).then(function (response) {
                self.ServiceData = response.ListAppointmentByProviderResult;
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
                    self.SharedHttp.GetUserInfo(item.clientIDField).then(function (res) {
                        self.ServiceData[i].displayNameField = res.displayNameField;
                        self.ServiceData[i].userIDField = res.userIDField;
                    });
                    self.SharedHttp.GetAddressInfo(item.appointmentIDField).then(function (e) { self.ServiceData[i].addressField = e; });
                });
            }, function (error) {
            });
        };
        ProAppointmentsController.prototype.RemoveCancelled = function (AppointmentID) {
            var self = this;
            self.CustomerHttp.get('/RemoveApp/' + AppointmentID).then(function (response) {
                alert(JSON.stringify(response));
                self.getProviderSchedular(this.UserID);
            }, function (error) {
            });
        };
        ProAppointmentsController.prototype.UnSeenStatus = function (AppointmentID) {
            var self = this;
            self.CustomerHttp.get('/UpdateAppSeenStatus/' + AppointmentID).then(function (response) {
                alert(JSON.stringify(response));
                self.getProviderSchedular(this.UserID);
            }, function (error) {
            });
        };
        ProAppointmentsController.prototype.GoToProviderPortfolio = function (UserID) {
            var self = this;
            self.$window.localStorage.setItem('ProviderIDs', UserID);
            self.$state.go("ProviderPortfolio");
        };
        ProAppointmentsController.prototype.GoToScheduleDetail = function (AppointmentID) {
            var self = this;
            self.$window.localStorage.setItem('AppointmentIDs', AppointmentID);
            self.$state.go("ProAppointmentDetail");
        };
        ProAppointmentsController.prototype.GoToProviderReview = function (userid) {
            alert("called" + userid);
            var self = this;
            self.$state.go('ProReviewListing', { userId: userid });
        };
        ProAppointmentsController.$inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp'];
        return ProAppointmentsController;
    }());
    angular.module('spafoo.ctrl.ProAppointments', []).controller('ProAppointments', ProAppointmentsController);
})(ProAppointmentsController || (ProAppointmentsController = {}));

//# sourceMappingURL=ProAppointments.controller.js.map
