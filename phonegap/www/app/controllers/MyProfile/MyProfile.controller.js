var MyProfileController;
(function (MyProfileController_1) {
    var MyProfileController = (function () {
        function MyProfileController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp) {
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
            this.getUserInfo();
        }
        MyProfileController.prototype.getUserInfo = function () {
            var self = this;
            var customerID = self.$window.localStorage.getItem('CustomerID');
            self.CustomerHttp.get('/GetUserInfo/' + customerID).then(function (response) {
                self.ServiceData = response.GetUserInfoResult;
                self.ServiceData.membershipField.createdDateField = self.SharedHttp.getFormatedDate(response.GetUserInfoResult.membershipField.createdDateField, "dd MMMM yyyy");
                self.getUserNotificationInfo(customerID);
                self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.profilePic = imgres; });
                self.GetCustomerProfile(customerID);
            }, function (error) {
                if (error === null) {
                }
                else {
                    console.log(error);
                }
            });
        };
        MyProfileController.prototype.GetCustomerProfile = function (customerID) {
            var self = this;
            self.CustomerHttp.get('/GetCustomerProfile/' + customerID).then(function (response) {
                self.GetCreditCardData = JSON.parse(response.GetCustomerProfileResult);
            });
        };
        MyProfileController.prototype.RemovePayProfile = function (PID, PPID) {
            var self = this;
            var GetConfirm = confirm("Are you sure want to remove ?");
            if (GetConfirm) {
                self.CustomerHttp.get('/DeleteCustomerPayProfile/' + PID + '/' + PPID).then(function (response) {
                    var customerID = self.$window.localStorage.getItem('CustomerID');
                    self.GetCustomerProfile(customerID);
                });
            }
        };
        MyProfileController.prototype.getUserNotificationInfo = function (customerID) {
            var self = this;
            self.CustomerHttp.get('/GetMyNotification/' + customerID).then(function (response) {
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
        MyProfileController.prototype.RemoveUserNotification = function () {
            var confirmations = confirm("Are you Sure Want to remove ? ");
            if (confirmations) {
                var self = this;
                var customerID = self.$window.localStorage.getItem('CustomerID');
                self.CustomerHttp.get('/RemoveUserNotification/' + customerID).then(function (response) {
                    self.getUserNotificationInfo(customerID);
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
        MyProfileController.prototype.RemoveNotification = function (NotifyID) {
            var confirmations = confirm("Are you Sure Want to remove ?");
            if (confirmations) {
                var self = this;
                var customerID = self.$window.localStorage.getItem('CustomerID');
                self.CustomerHttp.get('/RemoveNotification/' + NotifyID).then(function (response) {
                    self.getUserNotificationInfo(customerID);
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
        MyProfileController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp'];
        return MyProfileController;
    }());
    angular.module('spafoo.ctrl.MyProfile', []).controller('MyProfile', MyProfileController);
})(MyProfileController || (MyProfileController = {}));

//# sourceMappingURL=MyProfile.controller.js.map
