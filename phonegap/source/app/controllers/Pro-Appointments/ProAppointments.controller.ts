module ProAppointmentsController {

    class ProAppointmentsController {
        UserID: number;
        ServiceData: any;
        isRated: boolean;
        page: string;

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
            this.getProviderSchedular(this.UserID);
            this.page = window.location.hash.split('/')[1];
        }

        getProviderSchedular(UserID: any) {
            var self = this;
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
            self.CustomerHttp.get('/ListAppointmentByProvider/' + UserID).then(function (response: any) {
                self.ServiceData = response.ListAppointmentByProviderResult;
                $.each(self.ServiceData, function (i, item) {
                    if (item.forDateField === 'undefined' || item.forDateField === undefined || item.forDateField === null || item.forDateField === '') {
                        self.ServiceData[i].orderDateField = '';
                        self.ServiceData[i].DayField = '00';
                        self.ServiceData[i].MonthField = '-- -- --';
                    } else {
                        var orderdt = self.SharedHttp.getFormatedDate(item.forDateField, "weekday dd MMMM yyyy");
                        self.ServiceData[i].orderDateField = orderdt;
                        self.ServiceData[i].DayField = orderdt.split(' ')[1];
                        self.ServiceData[i].MonthField = orderdt.split(' ')[2];
                    }

                    if (item.atTimeField === 'undefined' || item.atTimeField === undefined || item.atTimeField === null || item.atTimeField === '') {
                        self.ServiceData[i].atTimeField = '00:00 --'
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

                    self.SharedHttp.GetUserInfo(item.clientIDField).then(function (res: any) {
                        self.ServiceData[i].displayNameField = res.firstNameField + " " + res.lastNameField[0] + ".";;
                        self.ServiceData[i].userIDField = res.userIDField;
                      if (self.ServiceData[i].statusField == 1) {//self.ServiceData[i].clientIDField
                          self.CustomerHttp.get('/DidIRated/' + UserID+ '/' + self.ServiceData[i].appointmentIDField).then(function (res: any) {
                                self.ServiceData[i].isRate = res.DidIRatedResult;
                            }, function (error: any) {});
                        }
                    });
                    self.SharedHttp.GetAddressInfo(item.appointmentIDField).then(function (e: any) { self.ServiceData[i].addressField = e; });
                });
            }, function (error) {});
        }

        RemoveCancelled(AppointmentID: any) {
            var conf = confirm("Are you sure want to remove ?");
            if (conf) {
                var self = this;
                self.CustomerHttp.get('/RemoveApp/' + AppointmentID).then(function (response: any) {
                    //alert(JSON.stringify(response));
                    //    alert(self.UserID);
                    self.getProviderSchedular(self.UserID);

                }, function (error) {
                });
            }
        }
        HideApp4Me(AppID: any) {                         
           var conf = confirm("Are you sure want to remove ?");
           if (conf) {
               var self = this;  
               var UserType = self.$window.localStorage.getItem('Role');     
               self.SharedHttp.HideApp4Me(AppID, UserType).then(function (e: any) {
                 
                   if (e.HideApp4MeResult.Success == "Removed Successfully") {
                       self.getProviderSchedular(self.UserID);
                   }
               });
           }

        }

        acceptAppointment(data: any) {
            var self = this;
            self.CustomerHttp.get("/UpdateAppStatus/" + data + "/0").then(function (res) { self.getProviderSchedular(self.UserID); });
        }
        denyAppointment(data: any) {
            var confirmations = confirm("Are you sure to deny this appointment ? ");
            if (confirmations) {
                var self = this;
                self.CustomerHttp.get("/RemoveApp/" + data).then(function (res: any) { self.getProviderSchedular(self.UserID) });
            }
        }

        //UnSeenStatus(AppointmentID: any) {
        //    var self = this;
        //    self.CustomerHttp.get('/UpdateAppSeenStatus/' + AppointmentID).then(function (response: any) {
        //        //alert(JSON.stringify(response));
        //        //    self.getProviderSchedular(this.UserID);

        //    }, function (error) {
        //    });
        //}
        GoToProviderPortfolio(UserID: any) {
            var self = this;
            self.$window.localStorage.setItem('ProviderIDs', UserID);
            self.$state.go("ProviderPortfolio");
        }
        GoToScheduleDetail(AppointmentID: any) {
            var self = this;
            self.SharedHttp.UnSeenStatus(AppointmentID)
            self.$window.localStorage.setItem('AppointmentIDs', AppointmentID);
            self.$state.go("ProAppointmentDetail");
        }
        GoToProviderReview(userid: any) {
            //alert("called" + userid);
            var self = this;
            self.$state.go('ProReviewListing', { userId: userid });

        }

    }


    angular.module('spafoo.ctrl.ProAppointments', []).controller('ProAppointments', ProAppointmentsController);

}