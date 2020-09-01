var GiftCertificateController;
(function (GiftCertificateController_1) {
    // export interface IGiftCertificate {
    var GiftCertificateController = /** @class */ (function () {
        function GiftCertificateController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, $timeout, SharedHttp, $rootScope) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.$timeout = $timeout;
            this.SharedHttp = SharedHttp;
            this.$rootScope = $rootScope;
            window.localStorage.setItem("url", 'GiftCertificate');
            // $("#PhoneNo").mask("000-000-0000");
            setTimeout(function () {
                $("#MobileNo").mask("000-000-0000");
                $("#VerifyMobileNo").mask("000-000-0000");
                $("#Zipcode").mask("00000");
            }, 2000);
        }
        GiftCertificateController.prototype.doGiftCertificate = function (Regdata) {
            var self = this;
            //  alert("hello");
            if (this.DoValidation(Regdata)) {
                $("#MobileNo").mask("000-000-0000");
                self.$state.go("CreditCardGiftCertificate", { GiftToFirstName: Regdata.FirstName, GiftToLastName: Regdata.LastName, GiftToEmailID: Regdata.EmailAddress, Message: Regdata.Message, Amount: Regdata.Amount });
            }
        };
        GiftCertificateController.prototype.DoValidation = function (Regdata) {
            var self = this;
            // alert(JSON.stringify(Regdata.Password));
            if (Regdata == undefined) {
                self.messages = "Please Select Amount. ";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.Amount === null || Regdata.Amount === '' || Regdata.Amount == undefined) {
                self.messages = "Please Select Amount. ";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.FirstName === null || Regdata.FirstName === '' || Regdata.FirstName == undefined || Regdata == undefined) {
                self.messages = "Please Enter First Name.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.LastName === null || Regdata.LastName === '' || Regdata.LastName == undefined) {
                self.messages = "Please Enter Last Name.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.EmailAddress === null || Regdata.EmailAddress === '' || Regdata.EmailAddress == undefined) {
                self.messages = "Please Enter Email Address.";
                $("#PDone").modal();
                return false;
            }
            else {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!filter.test(Regdata.EmailAddress)) {
                    self.messages = "Invalid email address.";
                    $("#PDone").modal();
                    return false;
                }
            }
            if ($("#MobileNo").val() == '' || $("#MobileNo").val() == undefined) {
                self.messages = "Phone # is required";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.Message === null || Regdata.Message === '' || Regdata.Message == undefined) {
                self.messages = "Please Enter Message.";
                $("#PDone").modal();
                return false;
            }
            return true;
        };
        GiftCertificateController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', '$timeout', 'SharedHttp', '$rootScope'];
        return GiftCertificateController;
    }());
    angular.module('spafoo.ctrl.GiftCertificate', []).controller('GiftCertificate', GiftCertificateController);
})(GiftCertificateController || (GiftCertificateController = {}));

//# sourceMappingURL=GiftCertificate.controller.js.map
