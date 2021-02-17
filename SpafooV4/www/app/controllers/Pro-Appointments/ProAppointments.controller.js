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
            this.page = window.location.hash.split('/')[1];
        }
        ProAppointmentsController.prototype.log = function (data) {
            // <a href="http://localhost:61874/SpaServices.svc/GetCalendarURL/">
            console.log("data data data data", data);
            var self = this;
            debugger;
            self.CustomerHttp.get('/GetCalendarURL/' + data.appointmentIDField)
                .then(function (res) {
                console.log("response from GetCalendarURL ", res);
                if (res.GetCalendarURLResult != null || res.GetCalendarURLResult != '') {
                    alert("added to calendar");
                    var target = "_blank";
                    var options = "location=yes,hidden=yes,beforeload=yes";
                    $("#showload").show();
                    window.open(encodeURI(res.GetCalendarURLResult), '_system', 'location=yes');
                    setTimeout(function () {
                        $("#showload").hide();
                    }, 15000);
                }
                else {
                    alert("can not add to calendar");
                }
            }).catch(function (err) {
                console.error("some error in GetCalendarURL ", err);
            });
        };
        ProAppointmentsController.prototype.getProviderSchedular = function (UserID) {
            var self = this;
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
            self.CustomerHttp.get('/ListAppointmentByProvider/' + UserID).then(function (response) {
                console.log("ListAppointmentByProvider", response);
                self.ServiceData = response.ListAppointmentByProviderResult;
                $.each(self.ServiceData, function (i, item) {
                    var temp = self.ServiceData[i].clientPhoneField;
                    self.ServiceData[i].clientPhoneField = temp[0] + temp[1] + temp[2] + "-" + temp[3] + temp[4] + temp[5] + "-" + temp[6] + temp[7] + temp[8] + temp[9];
                    if (item.forDateField === 'undefined' || item.forDateField === undefined || item.forDateField === null || item.forDateField === '') {
                        self.ServiceData[i].orderDateField = '';
                        self.ServiceData[i].DayField = 'ASAP';
                    }
                    else {
                        var orderdt = self.SharedHttp.getFormatedDate(item.forDateField, "weekday dd MMMM yyyy");
                        self.ServiceData[i].orderDateField = orderdt;
                        self.ServiceData[i].DayField = orderdt.split(' ')[1];
                        self.ServiceData[i].MonthField = orderdt.split(' ')[2];
                    }
                    if (item.atTimeField === 'undefined' || item.atTimeField === undefined || item.atTimeField === null || item.atTimeField === '') {
                        //    self.ServiceData[i].atTimeField = '00:00 --'
                        self.ServiceData[i].atTimeField = 'Request';
                    }
                    //else {
                    //    self.ServiceData[i].atTimeField = self.SharedHttp.getFormatedTime(item.atTimeField);
                    //}
                    var serviceName = "";
                    var serviceTime = 0;
                    $.each(item.servicesField, function (ig, sitem) {
                        if (parseInt(sitem.qtyField) > 1) {
                            serviceName += sitem.serviceNameField + "(" + sitem.qtyField + "),";
                            serviceTime += sitem.qtyField * sitem.durationField;
                        }
                        else {
                            serviceName += sitem.serviceNameField + ",";
                            serviceTime += sitem.durationField;
                        }
                    });
                    self.ServiceData[i].ServiceList = serviceName.substr(0, serviceName.lastIndexOf(','));
                    self.ServiceData[i].serviceTime = serviceTime;
                    self.SharedHttp.GetUserInfo(item.clientIDField).then(function (res) {
                        self.ServiceData[i].displayNameField = res.firstNameField + " " + res.lastNameField[0] + ".";
                        ;
                        self.ServiceData[i].userIDField = res.userIDField;
                        if (self.ServiceData[i].statusField == 1) {
                            self.CustomerHttp.get('/DidIRated/' + UserID + '/' + self.ServiceData[i].appointmentIDField).then(function (res) {
                                self.ServiceData[i].isRate = res.DidIRatedResult;
                            }, function (error) { });
                        }
                    });
                    self.SharedHttp.GetAddressInfo(item.appointmentIDField).then(function (e) { self.ServiceData[i].addressField = e; });
                });
            }, function (error) { });
        };
        ProAppointmentsController.prototype.RemoveCancelled = function (AppointmentID) {
            var conf = confirm("Are you sure want to remove ?");
            if (conf) {
                var self = this;
                self.CustomerHttp.get('/RemoveApp/' + AppointmentID).then(function (response) {
                    //alert(JSON.stringify(response));
                    //    alert(self.UserID);
                    self.getProviderSchedular(self.UserID);
                }, function (error) {
                });
            }
        };
        ProAppointmentsController.prototype.HideApp4Me = function (AppID) {
            var conf = confirm("Are you sure want to remove ?");
            if (conf) {
                var self = this;
                var UserType = self.$window.localStorage.getItem('Role');
                self.SharedHttp.HideApp4Me(AppID, UserType).then(function (e) {
                    if (e.HideApp4MeResult.Success == "Removed Successfully") {
                        self.getProviderSchedular(self.UserID);
                    }
                });
            }
        };
        ProAppointmentsController.prototype.acceptAppointment = function (data) {
            var self = this;
            self.CustomerHttp.get("/UpdateAppStatus/" + data + "/0").then(function (res) { self.getProviderSchedular(self.UserID); });
        };
        ProAppointmentsController.prototype.denyAppointment = function (data) {
            var confirmations = confirm("Are you sure to deny this appointment ? ");
            if (confirmations) {
                var self = this;
                self.CustomerHttp.get("/UpdateAppStatus/" + data + "/6").then(function (res) { self.getProviderSchedular(self.UserID); });
            }
        };
        ProAppointmentsController.prototype.acceptAnyProviderAppointment = function (appID) {
            var self = this;
            self.CustomerHttp.get("/AcceptAppointment/" + this.UserID + "/" + appID).then(function (res) { self.getProviderSchedular(self.UserID); });
        };
        ProAppointmentsController.prototype.UnavailableAnyProviderAppointment = function (appID) {
            var confirmations = confirm("Are you sure to deny this appointment ? ");
            if (confirmations) {
                var self = this;
                self.CustomerHttp.get("/Unavailable4Appointment/" + this.UserID + "/" + appID).then(function (res) { self.getProviderSchedular(self.UserID); });
            }
        };
        ProAppointmentsController.prototype.ProviderDenyASAP = function (data) {
            var confirmations = confirm("Are you sure to deny this appointment ? ");
            if (confirmations) {
                var self = this;
                self.CustomerHttp.get("/ProviderDenyASAP/" + data).then(function (res) { self.getProviderSchedular(self.UserID); });
            }
        };
        //UnSeenStatus(AppointmentID: any) {
        //    var self = this;
        //    self.CustomerHttp.get('/UpdateAppSeenStatus/' + AppointmentID).then(function (response: any) {
        //        //alert(JSON.stringify(response));
        //        //    self.getProviderSchedular(this.UserID);
        //    }, function (error) {
        //    });
        //}
        ProAppointmentsController.prototype.GoToProviderPortfolio = function (UserID) {
            var self = this;
            self.$window.localStorage.setItem('ProviderIDs', UserID);
            self.$state.go("ProviderPortfolio");
        };
        ProAppointmentsController.prototype.GoToScheduleDetail = function (AppointmentID) {
            var self = this;
            self.SharedHttp.UnSeenStatus(AppointmentID);
            self.$window.localStorage.setItem('AppointmentIDs', AppointmentID);
            self.$state.go("ProAppointmentDetail");
        };
        ProAppointmentsController.prototype.GoToProviderReview = function (userid) {
            //alert("called" + userid);
            var self = this;
            self.$state.go('ProReviewListing', { userId: userid });
        };
        ProAppointmentsController.$inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp'];
        return ProAppointmentsController;
    }());
    angular.module('spafoo.ctrl.ProAppointments', []).controller('ProAppointments', ProAppointmentsController);
})(ProAppointmentsController || (ProAppointmentsController = {}));

//# sourceMappingURL=ProAppointments.controller.js.map
