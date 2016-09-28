module NotificationController {
 
    class NotificationController  {        
        
        NotificaitonData: any;
        customerID: number;
        NotificationCount: number;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp'];
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private toaster: ngtoaster.IToasterService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp
        ) {
            this.customerID = this.$window.localStorage.getItem('CustomerID');
            this.getUserNotificationInfo();
            
        }
    
        getUserNotificationInfo() {
            var self = this;
            var status= self.$window.localStorage.getItem('LoginStatus');
            if(status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === ''){
                self.$state.go('login');
            }
            self.CustomerHttp.get('/GetMyNotification/' + self.customerID).then(function (response: any) {
                self.NotificaitonData = response.GetMyNotificationResult;
                self.NotificationCount = self.NotificaitonData.length;
                for (var i = 0; i <= self.NotificaitonData.length; i++) {

                    self.NotificaitonData[i].datedField = self.SharedHttp.getFormatedDate(self.NotificaitonData[i].datedField, "dd-MMM-yyyy")
                    var role = localStorage.getItem('Role');
                   
                        switch (self.NotificaitonData[i].notificationTypeIDField) {
                            // case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section.";
                            case 4: if (role == 'P') { self.NotificaitonData[i].typeNameField = "You have new Appointment with " + self.NotificaitonData[i].byNameField } else { self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section."};
                                break;
                            case 14: self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> given review to you";
                                break;
                            case 8: self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has completed the appointment.";
                                break;
                            case 7: if (role == 'C') { self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has arrived to your appointment location" } else { self.NotificaitonData[i].typeNameField ="I Have Arrived" };
                                break;
                            //case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                            //    break;
                            //case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                            //    break;
                            case 11: self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has given Date & Time for requested, ASAP <a href='#'>appointment </a>";
                                break;
                            // case "ASAPAppointment": self.NotificaitonData[i].typeNameField = "You requested for ASAP <a href='#'>appointment</a>";
                            case 10: if (role == 'P') { self.NotificaitonData[i].typeNameField = " Client " + self.NotificaitonData[i].byNameField + " <a href='#'>appointment</a> has requested for ASAP appointment" } else { self.NotificaitonData[i].typeNameField = "You requested for ASAP <a href='#'>appointment</a>" };
                                break;
                            case 13: self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> did NOT accepted the Date & Time given by you for ASAP <a href='#'>appointment</a>";
                                break;
                            case 12: self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has accepted the Date & Time given by you for ASAP appointment";
                                break;
                            case 9: self.NotificaitonData[i].typeNameField = " Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has cancelled the appointment";
                                break;

                        }
                    
                    //else {
                    //    switch (self.NotificaitonData[i].notificationTypeIDField) {
                    //         case 4: self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section.";
                    //      //  case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Appointment fixed by " + self.NotificaitonData[i].byNameField;
                    //            break;
                    //        case "ClientReview2Provider": self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> given review to you";
                    //            break;
                    //        case "AppointmentCompleted": self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has completed the appointment. Please check 'My Schedule' section to rate this activity";
                    //            break;
                    //        case "IHaveArrived": self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has arrived to your appointment location";
                    //            break;
                    //        case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                    //            break;
                    //        case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                    //            break;
                    //        case "ASAPAppProResp": self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has given Date & Time for requested, ASAP <a href='#'>appointment </a>";
                    //            break;
                    //         case 10: self.NotificaitonData[i].typeNameField = "You requested for ASAP <a href='#'>appointment</a>";
                    //        //case "ASAPAppointment": self.NotificaitonData[i].typeNameField = " Client " + self.NotificaitonData[i].byNameField + " <a href='#'>appointment</a> has requested for ASAP appointment";
                    //            break;
                    //        case "ASAPClientDeny": self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> did NOT accepted the Date & Time given by you for ASAP <a href='#'>appointment</a>";
                    //            break;
                    //        case "ASAPClientAccepted": self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has accepted the Date & Time given by you for ASAP appointment";
                    //            break;
                    //        case "AppointmentCancelled": self.NotificaitonData[i].typeNameField = " Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has cancelled the appointment";
                    //            break;

                    //    }
                    //}
                }

            }, function (error) {
                if (error === null) {
                    self.$ionicLoading.hide();
                } else {
                    console.log(error);
                    self.$ionicLoading.hide();
                }
            });



        }



        RemoveUserNotification() {
            var confirmations = confirm("Are you sure want to remove it ? ");
            if (confirmations) {
                var self = this;
             
                self.CustomerHttp.get('/RemoveUserNotification/' + self.customerID).then(function (response) {
                    self.getUserNotificationInfo();
                    self.$ionicLoading.hide();
                }, function (error) {
                    if (error === null) {
                        self.$ionicLoading.hide();
                    } else {
                        console.log(error);
                        self.$ionicLoading.hide();
                    }
                });
            }

        }

        RemoveNotification(NotifyID: any) {
            var confirmations = confirm("Are you Sure Want to remove ?");
            if (confirmations) {
                var self = this;               
                self.CustomerHttp.get('/RemoveNotification/' + NotifyID).then(function (response) {
                    self.getUserNotificationInfo();
                    self.$ionicLoading.hide();
                }, function (error) {
                    if (error === null) {
                        self.$ionicLoading.hide();
                    } else {
                        console.log(error);
                        self.$ionicLoading.hide();
                    }
                });
            }
        }
    }


    angular.module('spafoo.ctrl.Notification',[]).controller('Notification',NotificationController);

}