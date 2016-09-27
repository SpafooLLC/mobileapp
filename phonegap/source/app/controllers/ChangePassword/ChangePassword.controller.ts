module ChangePasswordController {

    class ChangePasswordController {

        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window'];
        username: string;
        password: string;
        messages: string;
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService
        ) {

        }
        doChangePassword(Regdata: any) {

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
                    } else {
                        console.log(error);
                        self.$ionicLoading.hide();
                    }

                });
            }
        }

        DoValidation(Regdata: any) {
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
        }

    }


    angular.module('spafoo.ctrl.ChangePassword', []).controller('ChangePassword', ChangePasswordController);

}