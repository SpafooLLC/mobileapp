var loginController;
(function (loginController_1) {
    var loginController = (function () {
        function loginController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, $rootScope) {
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
            };
            self.CustomerHttp.post(data, '/LoginUser').then(function (response) {
                if (parseInt(response.Source)) {
                    self.$window.localStorage.setItem('CustomerID', response.Source);
                    self.$window.localStorage.setItem('LoginStatus', "true");
                    self.getLoggedUser(response.Source);
                }
                else {
                    self.$window.localStorage.setItem('CustomerID', "0");
                    self.$window.localStorage.setItem('LoginStatus', "false");
                    self.$rootScope.GetLoginStatus = false;
                    self.messages = "Login Failed, Please enter correct username and password";
                    $("#PDone").modal();
                }
            }, function (error) {
                if (error === null) {
                    //self.toastr.error('No internet connections. Check your connection settings', 'Error');
                    self.$ionicLoading.hide();
                }
                else {
                    console.log(error);
                    //self.toastr.error(error.Failure, 'Error');
                    //self.$ionicPopup.alert({
                    //    title: 'Error', template: error.Failure
                    //});
                    self.$ionicLoading.hide();
                }
            });
        };
        loginController.prototype.getLoggedUser = function (UserID) {
            var self = this;
            //  var UserID = self.$window.localStorage.getItem('CustomerID');
            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response) {
                self.$rootScope.UserProfileName = response.GetUserInfoResult.displayNameField;
                self.$window.localStorage.setItem('CustomerName', response.GetUserInfoResult.displayNameField);
                self.$rootScope.GetLoginStatus = true;
                self.$state.go("home");
                self.$ionicLoading.hide();
            }, function (error) {
                if (error === null) {
                    //self.toastr.error('No internet connections. Check your connection settings', 'Error');
                    self.$ionicLoading.hide();
                }
                else {
                    console.log(error);
                    //self.toastr.error(error.Failure, 'Error');
                    //self.$ionicPopup.alert({
                    //    title: 'Error', template: error.Failure
                    //});
                    self.$ionicLoading.hide();
                }
            });
        };
        loginController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', '$rootScope'];
        return loginController;
    }());
    angular.module('spafoo.ctrl.login', []).controller('login', loginController);
})(loginController || (loginController = {}));

//# sourceMappingURL=login.controller.js.map
