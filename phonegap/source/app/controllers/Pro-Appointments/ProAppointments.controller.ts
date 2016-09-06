module ProAppointmentsController {
    
    class ProAppointmentsController  {
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
            this.getProviderSchedular(this.UserID);
        }

        getProviderSchedular(UserID: any) {
            var self = this;
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
                    } else {
                        self.ServiceData[i].atTimeField = self.SharedHttp.getFormatedTime(item.atTimeField);
                    }
                    
                    
                    
                    var serviceName = "";
                    $.each(item.servicesField, function (ig, sitem) {
                        serviceName += sitem.serviceNameField + ",";
                    });
                    self.ServiceData[i].ServiceList = serviceName.substr(0, serviceName.lastIndexOf(','));
                    self.SharedHttp.GetUserInfo(item.clientIDField).then(function (res: any) {
                        self.ServiceData[i].displayNameField = res.displayNameField;
                        self.ServiceData[i].userIDField = res.userIDField;
                    });
                    self.SharedHttp.GetAddressInfo(item.appointmentIDField).then(function (e: any) { self.ServiceData[i].addressField = e; });
                });
            }, function (error) {
            });
        }

        RemoveCancelled(AppointmentID: any) {
            var self = this;
            self.CustomerHttp.get('/RemoveApp/' + AppointmentID).then(function (response: any) {
                alert(JSON.stringify(response));
                self.getProviderSchedular(this.UserID);

            }, function (error) {
            });
        }

        UnSeenStatus(AppointmentID: any) {
            var self = this;
            self.CustomerHttp.get('/UpdateAppSeenStatus/' + AppointmentID).then(function (response: any) {
                alert(JSON.stringify(response));
                self.getProviderSchedular(this.UserID);

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
            self.$state.go("ProAppointmentDetail");
        }
        GoToProviderReview(userid: any) {
            alert("called" + userid);
            var self = this;
            self.$state.go('ProReviewListing', { userId: userid });

        }
    }


    angular.module('spafoo.ctrl.ProAppointments',[]).controller('ProAppointments',ProAppointmentsController);

}