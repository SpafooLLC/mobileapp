module ForgotPasswordController {

    class ForgotPasswordController {

        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window'];
        username: string;
        password: string;
        messages: string;
        MainView: string;
        VerifiedEmail: string;
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
            var self = this;
            self.MainView = 'Send-Code';
        }

        doSendCode(Regdata: any) {
            var self = this;

            if (Regdata == undefined) {

                self.messages = "Please Enter Email Address.";
                $("#PDoneError").modal();
                return false;
            }
            if (Regdata.EmailAddress === null || Regdata.EmailAddress === '' || Regdata.EmailAddress == undefined) {
                self.messages = "Please Enter Email Address.";
                $("#PDoneError").modal();
                return false;
            } else {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!filter.test(Regdata.EmailAddress)) {
                    self.messages = "Invalid email address.";
                    $("#PDoneError").modal();
                    return false;
                }
            }

            self.CustomerHttp.get('/RequestVCode/' + Regdata.EmailAddress).then(function (response) {
                if (response.RequestVCodeResult == "done") {
                    self.MainView = 'Enter-Code';
                    self.VerifiedEmail = Regdata.EmailAddress;
                }
                else {
                    self.messages = "Entered email does not match, please try again.";
                    $("#PDoneError").modal();
                }
            }, function (error) { });
        }




        doConfirmCode(Regdata: any) {
            var self = this;
            if (Regdata == undefined) {

                self.messages = "Please enter new password.";
                $("#PDoneError").modal();
                return false;
            }

            if (Regdata.code === null || Regdata.code === '' || Regdata.code == undefined) {
                self.messages = "Please enter code.";
                $("#PDoneError").modal();
                return false;
            }
            self.CustomerHttp.get('/VerifyCode/' + self.VerifiedEmail + '/' + Regdata.code).then(function (response) {
                if (response.VerifyCodeResult == "1") {
                    self.MainView = 'Enter-NewPassword';
                }
                else {
                    self.messages = "Verification Code you enter is wrong.";
                    $("#PDoneError").modal();
                }
            }, function (error) { });



        }
        doNewPassword(Regdata: any) {
            var self = this;
            if (this.DoValidation(Regdata)) {
                var data = Regdata;
                data.UserEmailID = self.VerifiedEmail;
                self.CustomerHttp.post(data, '/ChangePwd').then(function (response) {

                    if (response == "1") {
                        self.MainView = 'Enter-Success';
                    }
                    else {
                        self.messages = "Password not changed successfully.";
                        $("#PDoneError").modal();
                    }
                }, function (error) { });
            }

        }

        back2SendCode(currentPage: any) {
            var self = this;
            switch (currentPage) {
                case 'Enter-Code': self.MainView = 'Send-Code';
                    break;
                case 'Enter-NewPassword': self.MainView = 'Enter-Code';
                    break;

            }
        }



        doForgotPassword(Regdata: any) {

            var self = this;

            //if (this.DoValidation(Regdata)) {
            //    var customerID = self.$window.localStorage.getItem('CustomerID');
            //    var data = Regdata;
            //    data.UserID = parseInt(customerID);
            //    self.$ionicLoading.show();
            //    self.CustomerHttp.post(data, '/ForgotPasswordUser').then(function (response) {
            //        self.messages = response.Success;
            //        $("#PDone").modal();
            //        if (response.Success == "Password changed successfully") {
            //            setTimeout(function () { window.history.go(-1); }, 10000);
            //        }
            //        self.$ionicLoading.hide();
            //    }, function (error) {
            //        if (error === null) {
            //            self.$ionicLoading.hide();
            //        } else {
            //            console.log(error);
            //            self.$ionicLoading.hide();
            //        }

            //    });
            //}
        }

        DoValidation(Regdata: any) {
            var self = this;

            if (Regdata == undefined) {

                self.messages = "Please Enter New Password.";
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


    angular.module('spafoo.ctrl.ForgotPassword', []).controller('ForgotPassword', ForgotPasswordController);

}