var mainController;
(function (mainController) {
    var MainController = (function () {
        function MainController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, $rootScope, SharedHttp) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.toaster = toaster;
            this.$rootScope = $rootScope;
            this.SharedHttp = SharedHttp;
            this.$rootScope.UserProfileName = this.$window.localStorage.getItem('CustomerName');
            this.$rootScope.GetLoginStatus = (this.$window.localStorage.getItem('LoginStatus') == "true" ? true : false);
            this.$rootScope.getRole = (this.$window.localStorage.getItem('Role') == "P" ? "P" : "C");
            console.log(this.$rootScope.getRole);
            var customerID = this.$window.localStorage.getItem('CustomerID');
            var seldf = this;
            if (customerID != null) {
                seldf.SharedHttp.GetMyNotification(customerID).then(function (res) { seldf.$rootScope.NotifiCount = res.length; });
            }
            document.addEventListener('deviceready', seldf.onDeviceReady, false);
        }
        MainController.prototype.onDeviceReady = function () {
            if (device.platform === 'iOS') {
                StatusBar.hide();
            }
            var push = PushNotification.init({
                android: {
                    senderID: "24553703183"
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
            push.on('registration', function (data) {
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
                // alert(JSON.stringify(data));
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
                alert(JSON.stringify(e));
                // e.message
            });
        };
        MainController.prototype.doLogOut = function () {
            this.$rootScope.GetLoginStatus = false;
            this.$window.localStorage.setItem('LoginStatus', "false");
            this.$rootScope.UserProfileName = "Welcome to Spafoo";
            this.$window.localStorage.setItem('CustomerName', "Welcome to Spafoo");
            this.$window.localStorage.setItem('Role', null);
            //  alert("LogOut :: "+this.$rootScope.GetLoginStatus + ", type Of :: " + typeof (this.$rootScope.GetLoginStatus));
            $('.clsmenu').click(function () {
                $('.titre').click();
                $('.tcon').removeClass("tcon-transform");
            });
            this.$state.go('home');
        };
        MainController.prototype.HideShowMenu = function () {
            $('.titre').click();
            $('.tcon').removeClass("tcon-transform");
        };
        MainController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', '$rootScope', 'SharedHttp'];
        return MainController;
    }());
    angular.module('spafoo.ctrl.Main', []).controller('Main', MainController);
})(mainController || (mainController = {}));

//# sourceMappingURL=main.controller.js.map
