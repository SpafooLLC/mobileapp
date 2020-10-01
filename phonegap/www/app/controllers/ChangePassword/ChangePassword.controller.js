var ChangePasswordController;
(function (ChangePasswordController_1) {
    var ChangePasswordController = (function () {
        function ChangePasswordController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
        }
        ChangePasswordController.prototype.doChangePassword = function (Regdata) {
            var self = this;
            if (this.DoValidation(Regdata)) {
                var customerID = self.$window.localStorage.getItem('CustomerID');
                var data = Regdata;
                data.UserID = parseInt(customerID);
                self.$ionicLoading.show();
                self.CustomerHttp.post(data, '/ChangePasswordUser').then(function (response) {
                    //  alert(response.Success);
                    self.messages = response.Success;
                    $("#PDone").modal();
                    if (response.Success == "Password changed successfully") {
                        setTimeout(function () { window.history.go(-1); }, 10000);
                    }
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
        ChangePasswordController.prototype.DoValidation = function (Regdata) {
            var self = this;
            if (Regdata == undefined) {
                self.messages = "Please Enter Current Password.";
                $("#PDoneError").modal();
                return false;
            }
            if (Regdata.CurrentPassword === null || Regdata.CurrentPassword === '' || Regdata.CurrentPassword == undefined) {
                self.messages = "Please Enter Current Password.";
                $("#PDoneError").modal();
                return false;
            }
            if (Regdata.NewPassword === null || Regdata.NewPassword === '' || Regdata.NewPassword == undefined) {
                self.messages = "Please Enter New Password.";
                $("#PDoneError").modal();
                return false;
            }
            if (Regdata.ConfirmNewPassword === null || Regdata.ConfirmNewPassword === '' || Regdata.ConfirmNewPassword == undefined) {
                self.messages = "Please Enter Confirm New Password. ";
                $("#PDoneError").modal();
                return false;
            }
            if (Regdata.ConfirmNewPassword != Regdata.NewPassword) {
                self.messages = "Password Not Matched. ";
                $("#PDoneError").modal();
                return false;
            }
            return true;
        };
        ChangePasswordController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window'];
        return ChangePasswordController;
    }());
    angular.module('spafoo.ctrl.ChangePassword', []).controller('ChangePassword', ChangePasswordController);
})(ChangePasswordController || (ChangePasswordController = {}));

//# sourceMappingURL=ChangePassword.controller.js.map
