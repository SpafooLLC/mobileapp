module MyProfileController {
    export interface IMyProfile {


    }
    class MyProfileController {
        ServiceData: {};
        NotificaitonData: {};
        profilePic: string;
        NotificationCount: number;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster'];

        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private toaster: ngtoaster.IToasterService

        ) {
            this.getUserInfo();

        }
        getUserInfo() {
            var self = this;
            var customerID = self.$window.localStorage.getItem('CustomerID');
            self.CustomerHttp.get('/GetUserInfo/' + customerID).then(function (response: any) {
                self.ServiceData = response.GetUserInfoResult;
                self.ServiceData.membershipField.createdDateField = self.getFormatedDate(response.GetUserInfoResult.membershipField.createdDateField, "dd MMMM yyyy");
                self.getUserNotificationInfo(customerID);
                self.getProfilePics(self.ServiceData.profileField.photoField);
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

        getProfilePics(customerID:any) {
            var self = this;
            self.CustomerHttp.get('/GetProfilePic/' + customerID).then(function (response: any) {

                self.profilePic = "http://dev.spafoo.com" + response.GetProfilePicResult;
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
        getUserNotificationInfo(customerID:any) {
            var self = this;
            self.CustomerHttp.get('/GetMyNotification/' + customerID).then(function (response: any) {
                self.NotificaitonData = response.GetMyNotificationResult;
                self.NotificationCount = self.NotificaitonData.length;
                for (var i = 0; i <= self.NotificaitonData.length; i++) {

                    self.NotificaitonData[i].datedField = self.getFormatedDate(self.NotificaitonData[i].datedField, "dd-MMM-yyyy")

                    switch (self.NotificaitonData[i].typeNameField) {
                        case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section.";
                            break;
                        case "ClientReview2Provider": self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> given review to you";
                            break;
                        case "AppointmentCompleted": self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has completed the appointment. Please check 'My Schedule' section to rate this activity";
                            break;
                        case "IHaveArrived": self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has arrived to your appointment location";
                            break;
                        case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                            break;
                        case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                            break;
                        case "ASAPAppProResp": self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has given Date & Time for requested, ASAP <a href='#'>appointment </a>";
                            break;
                        case "ASAPAppointment": self.NotificaitonData[i].typeNameField = "You requested for ASAP <a href='#'>appointment</a>";
                            break;

                    }
                }
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

        getFormatedDate(joindates: any, formatType: any) {
            var abcDate = (joindates).replace("/Date(", "").replace(")/", "")
            var dates = new Date(parseInt(abcDate));
            var month = new Array();
            switch (formatType) {
                case "dd MMMM yyyy":
                    month[0] = "January";
                    month[1] = "February";
                    month[2] = "March";
                    month[3] = "April";
                    month[4] = "May";
                    month[5] = "June";
                    month[6] = "July";
                    month[7] = "August";
                    month[8] = "September";
                    month[9] = "October";
                    month[10] = "November";
                    month[11] = "December";
                    break;
                case "dd-MMM-yyyy": month[0] = "January";
                    month[1] = "Feb";
                    month[2] = "Mar";
                    month[3] = "April";
                    month[4] = "May";
                    month[5] = "June";
                    month[6] = "July";
                    month[7] = "Aug";
                    month[8] = "Sept";
                    month[9] = "Oct";
                    month[10] = "Nov";
                    month[11] = "Dec";
                    break;
            }
            switch (formatType) {
                case "dd MMMM yyyy": return (dates.getDate() + " " + month[dates.getMonth()] + " " + dates.getFullYear());
                case "dd-MMM-yyyy": return (dates.getDate() + "-" + month[dates.getMonth()] + "-" + dates.getFullYear());


            }

            return (dates.getDate() + " " + month[dates.getMonth()] + " " + dates.getFullYear());
        }

        RemoveUserNotification() {
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
                    } else {
                        console.log(error);
                        self.$ionicLoading.hide();
                    }
                });
            }

        }

        RemoveNotification(NotifyID:any) {
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
                    } else {
                        console.log(error);
                        self.$ionicLoading.hide();
                    }
                });
            }
        }
    }


    angular.module('spafoo.ctrl.MyProfile', []).controller('MyProfile', MyProfileController);

}