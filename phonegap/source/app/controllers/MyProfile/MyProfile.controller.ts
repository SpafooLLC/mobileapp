﻿module MyProfileController {

    class MyProfileController {
        ServiceData: any;
        NotificaitonData: any;
        GetCreditCardData: any;
        profilePic: string;
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
            this.getUserInfo();
            
        }
        getUserInfo() {
            var self = this;
            var status= self.$window.localStorage.getItem('LoginStatus');
            if(status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === ''){
                self.$state.go('login');
            }
            var customerID = self.$window.localStorage.getItem('CustomerID');
            self.CustomerHttp.get('/GetUserInfo/' + customerID).then(function (response: any) {

                self.ServiceData = response.GetUserInfoResult;
                self.ServiceData.membershipField.createdDateField = self.SharedHttp.getFormatedDate(response.GetUserInfoResult.membershipField.createdDateField, "dd MMMM yyyy");
                self.getUserNotificationInfo(customerID);
                self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.profilePic = imgres;});
                self.GetCustomerProfile(customerID);

            }, function (error) {
                if (error === null) {

                } else {
                    //console.log(error);

                }
            });
        }
        GetCustomerProfile(customerID: any) {
            var self = this;
            self.CustomerHttp.get('/GetCustomerProfile/' + customerID).then(function (response: any) {
                self.GetCreditCardData = JSON.parse( response.GetCustomerProfileResult);
            });
        }
        RemovePayProfile(PID:any,PPID:any) {
            var self = this;
            var GetConfirm = confirm("Are you sure want to remove ?");
            if (GetConfirm) {
                self.CustomerHttp.get('/DeleteCustomerPayProfile/' + PID + '/' + PPID).then(function (response: any) {
                    var customerID = self.$window.localStorage.getItem('CustomerID');
                    self.GetCustomerProfile(customerID);
                });
            }
        }
        getUserNotificationInfo(customerID: any) {
            var self = this;
            self.CustomerHttp.get('/GetMyNotification/' + customerID).then(function (response: any) {
                self.NotificaitonData = response.GetMyNotificationResult;
                self.NotificationCount = self.NotificaitonData.length;
                for (var i = 0; i <= self.NotificaitonData.length; i++) {

                    self.NotificaitonData[i].datedField = self.SharedHttp.getFormatedDate(self.NotificaitonData[i].datedField, "dd-MMM-yyyy")
                    var role = localStorage.getItem('Role');

                    switch (self.NotificaitonData[i].notificationTypeIDField) {
                        // case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section.";
                        case 4:
                            //if (role == 'P') { self.NotificaitonData[i].typeNameField = "You have new Appointment with " + self.NotificaitonData[i].byNameField } else { self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section." };
                            if (role == 'P') {
                                self.NotificaitonData[i].typeNameField = self.NotificaitonData[i].byNameField + " has requested an appointment!";
                            } else {
                                self.NotificaitonData[i].typeNameField = "Your Appointment has been accepted by " + self.NotificaitonData[i].byNameField + ".For more information, please check 'My Schedule' section."
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
                            if (role == 'C') { self.NotificaitonData[i].typeNameField = self.NotificaitonData[i].byNameField + " has arrived for your appointment!" }

                            //if (role == 'C') { self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has arrived to your appointment location" } else { self.NotificaitonData[i].typeNameField = "I Have Arrived" };
                            break;
                        //case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                        //    break;
                        //case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                        //    break;
                        case 11:
                            //  self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has given Date & Time for requested, ASAP <a href='#'>appointment </a>";
                            if (role == 'C') { self.NotificaitonData[i].typeNameField = self.NotificaitonData[i].byNameField + " has accepted your ASAP appointment.Please review the time set for your appointment and accept or deny it to finalize." }


                            break;
                        // case "ASAPAppointment": self.NotificaitonData[i].typeNameField = "You requested for ASAP <a href='#'>appointment</a>";
                        case 10:
                            //    if (role == 'P') {
                            //    self.NotificaitonData[i].typeNameField = " Client " + self.NotificaitonData[i].byNameField + " <a href='#'>appointment</a> has requested for ASAP appointment"
                            //} else
                            //{ self.NotificaitonData[i].typeNameField = "You requested for ASAP <a href='#'>appointment</a>" };
                            if (role == 'P') { self.NotificaitonData[i].typeNameField = self.NotificaitonData[i].byNameField + " has requested an ASAP appointment with you! " } else
                            { self.NotificaitonData[i].typeNameField = " Your ASAP appointment has been requested with " + self.NotificaitonData[i].byNameField; }





                            break;
                        case 13: //self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> did NOT accepted the Date & Time given by you for ASAP <a href='#'>appointment</a>";
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

                  //  switch (self.NotificaitonData[i].typeNameField) {
                  //      case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section.";
                  //          break;
                  //      case "ClientReview2Provider": self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> given review to you";
                  //          break;
                  //      case "AppointmentCompleted": self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has completed the appointment. Please check 'My Schedule' section to rate this activity";
                  //          break;
                  //      case "IHaveArrived": self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has arrived to your appointment location";
                  //          break;
                  //      case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                  //          break;
                  //      case "AppointmentFixed": self.NotificaitonData[i].typeNameField = "Your <a href='#'>Appointment</a> has been fixed. For more information, please check 'My Schedule' section. ";
                  //          break;
                  //      case "ASAPAppProResp": self.NotificaitonData[i].typeNameField = "Provider <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has given Date & Time for requested, ASAP <a href='#'>appointment </a>";
                  //          break;
                  //      case "ASAPAppointment": self.NotificaitonData[i].typeNameField = "You requested for ASAP <a href='#'>appointment</a>";
                  //          break;
                  //      case "ASAPClientDeny": self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> did NOT accepted the Date & Time given by you for ASAP <a href='#'>appointment</a>";
                  //          break;
                  //      case "ASAPClientAccepted": self.NotificaitonData[i].typeNameField = "Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has accepted the Date & Time given by you for ASAP appointment";
                  //          break;
                  //      case "AppointmentCancelled": self.NotificaitonData[i].typeNameField = " Client <a href='#'>" + self.NotificaitonData[i].byNameField + "</a> has cancelled the appointment";
                  //          break;
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

        RemoveNotification(NotifyID: any) {
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