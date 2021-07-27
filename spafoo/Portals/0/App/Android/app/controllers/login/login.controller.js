var loginController;
(function (loginController_1) {
    var loginController = (function () {
        function loginController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, $rootScope, SharedHttp) {
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
        }
        loginController.prototype.doLogin = function (username, password) {
            var self = this;
            if (username === null || username == '' || username == undefined) {
                self.messages = "Please Enter User Name.";
                $("#PDone").modal();
                return;
            }
            if (password === null || password == '' || password == undefined) {
                self.messages = "Please Enter User Name.";
                $("#PDone").modal();
                return;
            }
            var data = {
                Username: username,
                Password: password,
                HardwareName: "",
                DeviceToken: this.$window.localStorage.getItem('DeviceToken')
            };
            self.CustomerHttp.post(data, '/LoginUser').then(function (response) {
                if (parseInt(response.Source)) {
                    self.$window.localStorage.setItem('CustomerID', response.Source);
                    self.$window.localStorage.setItem('Role', response.Usertype);
                    self.$window.localStorage.setItem('LoginStatus', "true");
                    self.getLoggedUser(response.Source);
                    self.$rootScope.getRole = (self.$window.localStorage.getItem('Role') == "P" ? "P" : "C");
                }
                else {
                    self.$window.localStorage.setItem('CustomerID', "0");
                    self.$window.localStorage.setItem('LoginStatus', "false");
                    self.$window.localStorage.setItem('Role', null);
                    self.$rootScope.GetLoginStatus = false;
                    self.messages = "Login Failed, Please enter correct username and password";
                    $("#PDone").modal();
                }
            }, function (error) {
            });
        };
        loginController.prototype.getLoggedUser = function (UserID) {
            var self = this;
            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response) {
                self.$rootScope.UserProfileName = response.GetUserInfoResult.displayNameField;
                self.$window.localStorage.setItem('CustomerName', response.GetUserInfoResult.displayNameField);
                self.$rootScope.GetLoginStatus = true;
                self.SharedHttp.GetMyNotification(UserID).then(function (res) { self.$rootScope.NotifiCount = res.length; });
                self.$state.go("home");
            }, function (error) { });
        };
        loginController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', '$rootScope', 'SharedHttp'];
        return loginController;
    }());
    angular.module('spafoo.ctrl.login', []).controller('login', loginController);
})(loginController || (loginController = {}));

//# sourceMappingURL=login.controller.js.map
