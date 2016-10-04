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
            var self = this;
            self.UserID = this.$window.localStorage.getItem('CustomerID');
            self.getClientSchedular(self.UserID);
        }

        getClientSchedular(UserID: any) {
            var self = this;
            var status= self.$window.localStorage.getItem('LoginStatus');
            if(status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === ''){
                self.$state.go('login');
            }
            self.CustomerHttp.get('/ListAppointmentByClient/' + UserID).then(function (response: any) {
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
                    } else {
                        var orderdt = self.SharedHttp.getFormatedDate(item.forDateField, "weekday dd MMMM yyyy");
                        self.ServiceData[i].orderDateField = orderdt;
                        self.ServiceData[i].DayField = orderdt.split(' ')[1];
                        self.ServiceData[i].MonthField = orderdt.split(' ')[2];
                    }

                    if (item.atTimeField === 'undefined' || item.atTimeField === undefined || item.atTimeField === null || item.atTimeField === '') {
                        self.ServiceData[i].atTimeField = '00:00 --'
                    } else {
                        self.ServiceData[i].atTimeField = self.SharedHttp.getFormatedTime(item.atTimeField);
                    }


                    var serviceName = "";
                    $.each(item.servicesField, function (ig, sitem) {
                
                        if (parseInt(sitem.qtyField) > 1) {
                          serviceName += sitem.serviceNameField + "(" + sitem.qtyField + "),";  
                        }
                        else {
                            serviceName += sitem.serviceNameField + ",";
                        }
                    });
                    self.ServiceData[i].ServiceList = serviceName.substr(0, serviceName.lastIndexOf(','));
                    self.SharedHttp.GetUserInfo(item.providerIDField).then(function (res: any) {
                        self.ServiceData[i].displayNameField = res.displayNameField;
                        if (self.ServiceData[i].statusField == 1) {
                            self.CustomerHttp.get('/DidIRated/' + self.ServiceData[i].clientIDField + '/' + self.ServiceData[i].appointmentIDField).then(function (res: any) {
                                self.ServiceData[i].isRate = res.DidIRatedResult;
                            }, function (error: any) {

                            });
                        }
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

        HideApp4Me(AppID: any) {
            var conf = confirm("Are you sure want to remove ?");
            if (conf) {
                var self = this;
                var UserType = self.$window.localStorage.getItem('Role');
                self.SharedHttp.HideApp4Me(AppID, UserType).then(function (e: any) {

                    if (e.HideApp4MeResult.Success == "Removed Successfully") {
                        self.getClientSchedular(self.UserID);
                    }
                });
            }

        }


        GoToScheduleDetail(AppointmentID: any) {
            var self = this;
            self.$window.localStorage.setItem('AppointmentIDs', AppointmentID);
            self.$state.go("ScheduleDetail");
        }
        acceptAppointment(data: any)
        {
            var self = this;
            self.CustomerHttp.get("/UpdateAppStatus/" + data + "/0").then(function (res) { self.getClientSchedular(self.UserID); });
        }
        denyAppointment(data: any) {
            var confirmations = confirm("Are you sure to deny this appointment ? ");
            if (confirmations) {
                var self = this;
                self.CustomerHttp.get("/RemoveApp/" + data).then(function (res: any) { self.getClientSchedular(self.UserID) });
            }
        }
    }


    angular.module('spafoo.ctrl.MySchedule', []).controller('MySchedule', MyScheduleController);

}