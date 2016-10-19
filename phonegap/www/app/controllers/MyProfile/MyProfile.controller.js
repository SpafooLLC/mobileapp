var MyProfileController;
(function (MyProfileController_1) {
    var MyProfileController = (function () {
        function MyProfileController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp, $rootScope) {
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
            this.getUserInfo();
        }
        MyProfileController.prototype.getUserInfo = function () {
            var self = this;
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
            var customerID = self.$window.localStorage.getItem('CustomerID');
            self.CustomerHttp.get('/GetUserInfo/' + customerID).then(function (response) {
                self.ServiceData = response.GetUserInfoResult;
                self.ServiceData.displayNameField1 = response.GetUserInfoResult.firstNameField + " " + response.GetUserInfoResult.lastNameField[0] + ".";
                self.ServiceData.membershipField.createdDateField = self.SharedHttp.getFormatedDate(response.GetUserInfoResult.membershipField.createdDateField, "dd MMMM yyyy");
                self.getUserNotificationInfo(customerID);
                self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.profilePic = imgres; });
                self.GetCustomerProfile(customerID);
            }, function (error) {
                if (error === null) {
                }
                else {
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
                self.$rootScope.NotifiCount = self.NotificaitonData.length;
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
                            self.NotificaitonData[i].typeNameFields = " You have appointment with " + self.NotificaitonData[i].byNameField + " in next 2hrs ";
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
                                self.NotificaitonData[i].typeNameFields = " Your appointment has been accepted by " + self.NotificaitonData[i].byNameField + " ,For more information, please check 'My Schedule' section.";
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
        MyProfileController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$rootScope'];
        return MyProfileController;
    }());
    angular.module('spafoo.ctrl.MyProfile', []).controller('MyProfile', MyProfileController);
})(MyProfileController || (MyProfileController = {}));

//# sourceMappingURL=MyProfile.controller.js.map
