﻿module mainController {
    class MainController {
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', '$rootScope', 'SharedHttp'];
        GetLoginStatus: boolean;
        NotifiCount: number;
        getRole: string;
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
            private $rootScope: any,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp
            //private $cordovaGoogleAnalytics:any/*: UniversalAnalyticsPlugin*/


        ) {
            this.$rootScope.UserProfileName = this.$window.localStorage.getItem('CustomerName');
            this.$rootScope.GetLoginStatus = (this.$window.localStorage.getItem('LoginStatus') == "true" ? true : false);
            this.$rootScope.getRole = (this.$window.localStorage.getItem('Role') == "P" ? "P" : "C");
            console.log(this.$rootScope.getRole);
            var customerID = this.$window.localStorage.getItem('CustomerID');
            var seldf = this;
            if (customerID != null) {
                seldf.SharedHttp.GetMyNotification(customerID).then(function (res: any) { seldf.$rootScope.NotifiCount = res.length; });
            }

            try {
                document.addEventListener('deviceready', seldf.onDeviceReady, false);

            }
            catch (e) {

            }

        }

        onDeviceReady() {

            if (device.platform === 'iOS') {
                StatusBar.hide();
            }

            var push = PushNotification.init({
                android: {
                    //senderID: "24553703183"
                    senderID: "419078761457"
                },
                browser: {
                    pushServiceURL: 'http://push.api.phonegap.com/v1/push'
                },
                ios: {
                    alert: "true",
                    badge: "true",
                    sound: "true"
                },
                windows: {}
            });

            push.on('registration', function (data: any) {
                // alert(JSON.stringify(data) + ", Device Name :: " + device.model + ", :: Token :: " + data.registrationId);
                try {
                    //  alert(JSON.stringify(data));
                    localStorage.setItem('DeviceToken', data.registrationId);
                    localStorage.setItem('DeviceName', device.model);

                }
                catch (e) {
                    alert(JSON.stringify("Error :: " + e));
                }

            });

            push.on('notification', function (data) {
                //var i = 2;

                if (!data.additionalData.foreground) {
                    //cordova.plugins.notification.badge.set(i);
                    window.location.href = "#/Notification";
                }
                // data.message,
                // data.title,
                // data.count,
                // data.sound,
                // data.image,
                // data.additionalData
            });
            push.on('error', function (e) {
                // alert("Push Error : " + JSON.stringify(e) + " DeviceToken : " + localStorage.getItem('DeviceToken'));
                // e.message
            });

         
            window.ga.debugMode();
            window.ga.startTrackerWithId('UA-97984442-1');
            window.ga.setAllowIDFACollection(true);
        

        }


        doLogOut() {
            this.$rootScope.GetLoginStatus = false;

            this.$window.localStorage.setItem('LoginStatus', "false");
            this.$rootScope.UserProfileName = "Welcome to Spafoo";
            this.$window.localStorage.setItem('CustomerName', "Welcome to Spafoo");
            this.$window.localStorage.setItem('Role', null);
            this.$rootScope.getRole = (this.$window.localStorage.getItem('Role') == "P" ? "P" : "C");
            //  alert("LogOut :: "+this.$rootScope.GetLoginStatus + ", type Of :: " + typeof (this.$rootScope.GetLoginStatus));
            $('.clsmenu').click(function () {
                $('.titre').click();
                $('.tcon').removeClass("tcon-transform");
            });

            this.$state.go('home');
        }

        HideShowMenu() {
            $('.titre').click();
            $('.tcon').removeClass("tcon-transform");
        }




    }

    angular.module('spafoo.ctrl.Main', []).controller('Main', MainController);

}