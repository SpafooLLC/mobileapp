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
        }
        MainController.prototype.doLogOut = function () {
            this.$rootScope.GetLoginStatus = false;
            this.$window.localStorage.setItem('LoginStatus', "false");
            this.$rootScope.UserProfileName = "Welcome to Spafoo";
            this.$window.localStorage.setItem('CustomerName', "Welcome to Spafoo");
            this.$window.localStorage.setItem('Role', null);
            //  alert("LogOut :: "+this.$rootScope.GetLoginStatus + ", type Of :: " + typeof (this.$rootScope.GetLoginStatus));
            this.$state.go('home');
        };
        MainController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', '$rootScope', 'SharedHttp'];
        return MainController;
    }());
    angular.module('spafoo.ctrl.Main', []).controller('Main', MainController);
})(mainController || (mainController = {}));

//# sourceMappingURL=main.controller.js.map
