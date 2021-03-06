var homeController;
(function (homeController_1) {
    var homeController = (function () {
        function homeController($state, $scope, $ionicLoading, $timeout, SharedHttp) {
            this.$state = $state;
            this.$scope = $scope;
            this.$ionicLoading = $ionicLoading;
            this.$timeout = $timeout;
            this.SharedHttp = SharedHttp;
            this.$inject = ['$state', '$scope', '$ionicLoading', '$timeout', 'SharedHttp'];
            document.addEventListener("deviceready", this.onDeviceReady, false);
        }
        homeController.prototype.doLogin = function () {
        };
        homeController.prototype.onDeviceReady = function () {
            navigator.geolocation.getCurrentPosition(function (e) { }, function (e) { }, {
                enableHighAccuracy: true,
                maximumAge: 3600000
            });
            var self = this;
            //  self.SharedHttp.IsGPSOn();
            var tabClick = 0;
            document.addEventListener("backbutton", function (e) {
                e.preventDefault();
                if (tabClick === 0) {
                    tabClick++;
                    if (window.location.href.substr(window.location.href.lastIndexOf('/') + 1) != 'home') {
                        window.history.go(-1);
                    }
                    setTimeout(function () { tabClick = 0; }, 2000);
                }
                else {
                    //alert(tabClick + ':else');
                    navigator.app.exitApp();
                }
                // navigator.notification.confirm("Are you sure want to exit from App?", onConfirmExit, "Confirmation", "Yes,No");
            }, false);
        };
        return homeController;
    }());
    angular.module('spafoo.ctrl.home', []).controller('home', homeController);
})(homeController || (homeController = {}));

//# sourceMappingURL=home.controller.js.map
