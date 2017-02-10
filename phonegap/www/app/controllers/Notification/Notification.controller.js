var NotificationController;
(function (NotificationController_1) {
    var NotificationController = (function () {
        function NotificationController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp, $rootScope) {
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
            this.$rootScope = $rootScope;
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
                self.$rootScope.NotifiCount = self.NotificaitonData.length;
                //  alert()
                for (var i = 0; i <= self.NotificaitonData.length; i++) {
                    self.NotificaitonData[i].datedField = self.SharedHttp.getFormatedDate(self.NotificaitonData[i].datedField, "dd-MMM-yyyy");
                    var role = localStorage.getItem('Role');
                    switch (self.NotificaitonData[i].notificationTypeIDField) {
                        case 4:
                            if (role == 'P') {
                                self.NotificaitonData[i].typeNameFields = self.NotificaitonData[i].byNameField + " has requested an appointment!";
                            }
                            //else {
                            //    self.NotificaitonData[i].typeNameFields = "Your Appointment has been accepted by " + self.NotificaitonData[i].byNameField + ".For more information, please check 'My Schedule' section."
                            //}
                            break;
                        case 5:
                            self.NotificaitonData[i].typeNameFields = " You have appointment with " + self.NotificaitonData[i].byNameField + " in next 24hrs ";
                            break;
                        case 6:
<<<<<<< HEAD
                            self.NotificaitonData[i].typeNameFields = " You have appointment with " + self.NotificaitonData[i].byNameField + " in next 24hrs ";
=======
                            self.NotificaitonData[i].typeNameFields = " You have appointment with " + self.NotificaitonData[i].byNameField + " in next 2hrs ";
>>>>>>> refs/remotes/origin/PawanBranch
                            break;
                        case 14:
                            if (role == 'P') {
                                self.NotificaitonData[i].typeNameFields = self.NotificaitonData[i].byNameField + " has given you a SpaFoo review!";
                            }
                            break;
                        case 8:
                            if (role == 'C') {
                                self.NotificaitonData[i].typeNameFields = "Thank you for choosing SpaFoo!";
                            }
                            break;
                        case 7:
                            if (role == 'C') {
                                self.NotificaitonData[i].typeNameFields = self.NotificaitonData[i].byNameField + " has arrived for your appointment!";
                            }
                            break;
                        case 11:
                            if (role == 'C') {
                                self.NotificaitonData[i].typeNameFields = self.NotificaitonData[i].byNameField + " has accepted your ASAP appointment.Please review the time set for your appointment and accept or deny it to finalize.";
                            }
                            break;
                        case 10:
                            if (role == 'P') {
                                self.NotificaitonData[i].typeNameFields = self.NotificaitonData[i].byNameField + " has requested an ASAP appointment with you! ";
                            }
                            //  else{ self.NotificaitonData[i].typeNameFields = "10 Your ASAP appointment has been requested with " + self.NotificaitonData[i].byNameField; }
                            break;
                        case 13:
                            if (role == 'P') {
                                self.NotificaitonData[i].typeNameFields = self.NotificaitonData[i].byNameField + " did NOT accept the time of your ASAP appointment.";
                            }
                            break;
                        case 12:
                            if (role == 'P') {
                                self.NotificaitonData[i].typeNameFields = self.NotificaitonData[i].byNameField + " has accepted the the time of your ASAP appointment.";
                            }
                            break;
                        case 9:
                            if (role == 'P') {
                                self.NotificaitonData[i].typeNameFields = self.NotificaitonData[i].byNameField + " has cancelled the appointment.";
                            }
                            break;
                        case 15:
                            if (role == 'C') {
<<<<<<< HEAD
                                self.NotificaitonData[i].typeNameFields = " Your appointment has been accepted by " + self.NotificaitonData[i].byNameField + " .For more information, please check 'My Schedule' section.";
=======
                                self.NotificaitonData[i].typeNameFields = " Your appointment has been accepted by " + self.NotificaitonData[i].byNameField + " ,For more information, please check 'My Schedule' section.";
>>>>>>> refs/remotes/origin/PawanBranch
                            }
                            break;
                        case 16:
                            if (role == 'C') {
                                self.NotificaitonData[i].typeNameFields = "Your ASAP appointment has been requested with " + self.NotificaitonData[i].byNameField;
                            }
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
        NotificationController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$rootScope'];
        return NotificationController;
    }());
    angular.module('spafoo.ctrl.Notification', []).controller('Notification', NotificationController);
})(NotificationController || (NotificationController = {}));

//# sourceMappingURL=Notification.controller.js.map
