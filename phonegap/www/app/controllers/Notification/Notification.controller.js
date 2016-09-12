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
            self.CustomerHttp.get('/GetMyNotification/' + self.customerID).then(function (response) {
                self.NotificaitonData = response.GetMyNotificationResult;
                self.NotificationCount = self.NotificaitonData.length;
                for (var i = 0; i <= self.NotificaitonData.length; i++) {
                    self.NotificaitonData[i].datedField = self.SharedHttp.getFormatedDate(self.NotificaitonData[i].datedField, "dd-MMM-yyyy");
                    switch (self.NotificaitonData[i].typeNameField) {
                        case "AppointmentFixed":
                            self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section.";
                            break;
                        case "ClientReview2Provider":
                            self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> given review to you";
                            break;
                        case "AppointmentCompleted":
                            self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has completed the appointment. Please check 'My Schedule' section to rate this activity";
                            break;
                        case "IHaveArrived":
                            self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has arrived to your appointment location";
                            break;
                        case "AppointmentFixed":
                            self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                            break;
                        case "AppointmentFixed":
                            self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                            break;
                        case "ASAPAppProResp":
                            self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has given Date & Time for requested, ASAP <a href='#'>appointment </a>";
                            break;
                        case "ASAPAppointment":
                            self.NotificaitonData[i].typeNameField = "You requested for ASAP <a href='#'>appointment</a>";
                            break;
                        case "ASAPClientDeny":
                            self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> did NOT accepted the Date & Time given by you for ASAP <a href='#'>appointment</a>";
                            break;
                        case "ASAPClientAccepted":
                            self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has accepted the Date & Time given by you for ASAP appointment";
                            break;
                        case "AppointmentCancelled":
                            self.NotificaitonData[i].typeNameField = " Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has cancelled the appointment";
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
            var confirmations = confirm("Are you Sure Want to remove ? ");
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
