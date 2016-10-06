var NotificationController;
(function (NotificationController_1) {
    var NotificationController = (function () {
        function NotificationController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.toaster = toaster;
            this.SharedHttp = SharedHttp;
            this.customerID = this.$window.localStorage.getItem('CustomerID');
            this.getUserNotificationInfo();
        }
        NotificationController.prototype.getUserNotificationInfo = function () {
            var self = this;
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
            self.CustomerHttp.get('/GetMyNotification/' + self.customerID).then(function (response) {
                self.NotificaitonData = response.GetMyNotificationResult;
                self.NotificationCount = self.NotificaitonData.length;
                for (var i = 0; i <= self.NotificaitonData.length; i++) {
                    self.NotificaitonData[i].datedField = self.SharedHttp.getFormatedDate(self.NotificaitonData[i].datedField, "dd-MMM-yyyy");
                    var role = localStorage.getItem('Role');
                    switch (self.NotificaitonData[i].notificationTypeIDField) {
                        // case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section.";
                        case 4:
                            //if (role == 'P') { self.NotificaitonData[i].typeNameField = "You have new Appointment with " + self.NotificaitonData[i].byNameField } else { self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section." };
                            if (role == 'P') {
                                self.NotificaitonData[i].typeNameField = self.NotificaitonData[i].byNameField + " has requested an appointment!";
                            }
                            else {
                                self.NotificaitonData[i].typeNameField = "Your Appointment has been accepted by " + self.NotificaitonData[i].byNameField + ".For more information, please check 'My Schedule' section.";
                            }
                            break;
                        case 14:
                            self.NotificaitonData[i].typeNameField = self.NotificaitonData[i].byNameField + "has given you a SpaFoo review!";
                            //self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> given review to you";
                            break;
                        case 8:
                            if (role == 'C') {
                                self.NotificaitonData[i].typeNameField = "Thank you for choosing SpaFoo!";
                            }
                            //   self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has completed the appointment.";
                            break;
                        case 7:
                            if (role == 'C') {
                                self.NotificaitonData[i].typeNameField = self.NotificaitonData[i].byNameField + " has arrived for your appointment!";
                            }
                            //if (role == 'C') { self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has arrived to your appointment location" } else { self.NotificaitonData[i].typeNameField = "I Have Arrived" };
                            break;
                        //case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                        //    break;
                        //case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                        //    break;
                        case 11:
                            //  self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has given Date & Time for requested, ASAP <a href='#'>appointment </a>";
                            if (role == 'C') {
                                self.NotificaitonData[i].typeNameField = self.NotificaitonData[i].byNameField + " has accepted your ASAP appointment.Please review the time set for your appointment and accept or deny it to finalize.";
                            }
                            break;
                        // case "ASAPAppointment": self.NotificaitonData[i].typeNameField = "You requested for ASAP <a href='#'>appointment</a>";
                        case 10:
                            //    if (role == 'P') {
                            //    self.NotificaitonData[i].typeNameField = " Client " + self.NotificaitonData[i].byNameField + " <a href='#'>appointment</a> has requested for ASAP appointment"
                            //} else
                            //{ self.NotificaitonData[i].typeNameField = "You requested for ASAP <a href='#'>appointment</a>" };
                            if (role == 'P') {
                                self.NotificaitonData[i].typeNameField = self.NotificaitonData[i].byNameField + " has requested an ASAP appointment with you! ";
                            }
                            else {
                                self.NotificaitonData[i].typeNameField = " Your ASAP appointment has been requested with " + self.NotificaitonData[i].byNameField;
                            }
                            break;
                        case 13:
                            if (role == 'P') {
                                self.NotificaitonData[i].typeNameField = self.NotificaitonData[i].byNameField + " did NOT accept the time of your ASAP appointment.";
                            }
                            break;
                        case 12:
                            if (role == 'P') {
                                self.NotificaitonData[i].typeNameField = self.NotificaitonData[i].byNameField + " has accepted the the time of your ASAP appointment.";
                            }
                            //self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has accepted the Date & Time given by you for ASAP appointment";
                            break;
                        case 9:
                            if (role == 'P') {
                                self.NotificaitonData[i].typeNameField = self.NotificaitonData[i].byNameField + " has cancelled the appointment.";
                            }
                            //self.NotificaitonData[i].typeNameField = " Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has cancelled the appointment";
                            break;
                    }
                }
            }, function (error) {
                if (error === null) {
                    self.$ionicLoading.hide();
                }
                else {
                    console.log(error);
                    self.$ionicLoading.hide();
                }
            });
        };
        NotificationController.prototype.RemoveUserNotification = function () {
            var confirmations = confirm("Are you sure want to remove it ? ");
            if (confirmations) {
                var self = this;
                self.CustomerHttp.get('/RemoveUserNotification/' + self.customerID).then(function (response) {
                    self.getUserNotificationInfo();
                    self.$ionicLoading.hide();
                }, function (error) {
                    if (error === null) {
                        self.$ionicLoading.hide();
                    }
                    else {
                        console.log(error);
                        self.$ionicLoading.hide();
                    }
                });
            }
        };
        NotificationController.prototype.RemoveNotification = function (NotifyID) {
            var confirmations = confirm("Are you Sure Want to remove ?");
            if (confirmations) {
                var self = this;
                self.CustomerHttp.get('/RemoveNotification/' + NotifyID).then(function (response) {
                    self.getUserNotificationInfo();
                    self.$ionicLoading.hide();
                }, function (error) {
                    if (error === null) {
                        self.$ionicLoading.hide();
                    }
                    else {
                        console.log(error);
                        self.$ionicLoading.hide();
                    }
                });
            }
        };
        NotificationController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp'];
        return NotificationController;
    }());
    angular.module('spafoo.ctrl.Notification', []).controller('Notification', NotificationController);
})(NotificationController || (NotificationController = {}));

//# sourceMappingURL=Notification.controller.js.map
