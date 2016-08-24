var mainController;
(function (mainController) {
    var MainController = (function () {
        function MainController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, $rootScope) {
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
            this.$rootScope.UserProfileName = this.$window.localStorage.getItem('CustomerName');
            this.$rootScope.GetLoginStatus = Boolean(this.$window.localStorage.getItem('LoginStatus'));
        }
        MainController.prototype.doLogOut = function () {
            this.$rootScope.GetLoginStatus = false;
            this.$window.localStorage.setItem('LoginStatus', "false");
            this.$rootScope.UserProfileName = "Welcome to Spafoo";
            this.$window.localStorage.setItem('CustomerName', "Welcome to Spafoo");
            this.$state.go('home');
        };
        MainController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', '$rootScope'];
        return MainController;
    }());
    angular.module('spafoo.ctrl.Main', []).controller('Main', MainController);
})(mainController || (mainController = {}));

//# sourceMappingURL=main.controller.js.map
