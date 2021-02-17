var CreditCardGiftCertificateController;
(function (CreditCardGiftCertificateController_1) {
    var CreditCardGiftCertificateController = (function () {
        function CreditCardGiftCertificateController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp, $stateParams) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.toaster = toaster;
            this.SharedHttp = SharedHttp;
            this.$stateParams = $stateParams;
            this.init();
        }
        CreditCardGiftCertificateController.prototype.init = function () {
            var self = this;
            self.GiftToFirstName = self.$stateParams.GiftToFirstName;
            self.GiftToLastName = self.$stateParams.GiftToLastName;
            self.GiftToEmailID = self.$stateParams.GiftToEmailID;
            self.Message = self.$stateParams.Message;
            self.Amount = self.$stateParams.Amount;
            self.CardName = self.GiftToFirstName + " " + self.GiftToLastName;
            self.isChecked = false;
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                if (self.from != 'reg') {
                    self.$state.go('login');
                }
            }
            self.years = [];
            var date = new Date();
            var year = parseInt(date.getFullYear());
            self.year = year;
            for (var i = 0; i < 20; i++) {
                self.years.push(year++);
            }
        };
        CreditCardGiftCertificateController.prototype.SubmitCreditCardInfo = function (CData) {
            var self = this;
            if (this.DoValidation(CData)) {
                var data;
                data = {};
                data.Expiry = CData.Month + "/" + CData.Year;
                data.CCNumber = CData.CCNumber;
                data.CardCode = CData.CVV;
                data.Amount = self.Amount;
                data.GiftToFirstName = self.GiftToFirstName;
                data.GiftToLastName = self.GiftToLastName;
                data.GiftToEmailID = self.GiftToEmailID;
                data.Message = self.Message;
                data.SenderUserID = self.$window.localStorage.getItem('CustomerID');
                self.CustomerHttp.post(data, '/PostGiftCertificate').then(function (response) {
                    self.Succmesg = response.Success;
                    $("#PSuccess").modal();
                }, function (error) { });
            }
        };
        CreditCardGiftCertificateController.prototype.redirectTo = function (href) {
            this.SharedHttp.redirectTo(href, 'PSuccess');
        };
        CreditCardGiftCertificateController.prototype.DoValidation = function (Regdata) {
            var self = this;
            if (Regdata == undefined) {
                self.messages = "Please enter name on credit card.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.CardName === null || Regdata.CardName === '' || Regdata.CardName == undefined) {
                self.messages = "Please enter name on credit card..";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.CCNumber === null || Regdata.CCNumber === '' || Regdata.CCNumber == undefined) {
                self.messages = "Please Enter Credit Card Number.";
                $("#PDone").modal();
                return false;
            }
            else {
                if (String(Regdata.CCNumber).length < 14) {
                    self.messages = "The field length is invalid for Card Number.";
                    $("#PDone").modal();
                    return false;
                }
            }
            if (Regdata.Month === null || Regdata.Month === '' || Regdata.Month == undefined) {
                self.messages = "Please Select Month.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.Year === null || Regdata.Year === '' || Regdata.Year == undefined) {
                self.messages = "Please Select Year.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.CVV === null || Regdata.CVV === '' || Regdata.CVV == undefined) {
                self.messages = "Please Enter CVV.";
                $("#PDone").modal();
                return false;
            }
            return true;
        };
        CreditCardGiftCertificateController.prototype.ValidateNumber = function (num, id) {
            var self = this;
            if (id == 'cnum') {
                if (isNaN(num)) {
                    self.data.CCNumber = self.number;
                }
                else {
                    self.data.CCNumber = num;
                    self.number = num;
                }
            }
            else {
                if (isNaN(num)) {
                    self.data.CVV = self.numbercvv;
                }
                else {
                    self.data.CVV = num;
                    self.numbercvv = num;
                }
            }
        };
        CreditCardGiftCertificateController.prototype.checkStatus = function ($event) {
            var self = this;
            if ($event.target.checked) {
                self.isChecked = true;
            }
            else {
                self.isChecked = false;
            }
        };
        CreditCardGiftCertificateController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$stateParams'];
        return CreditCardGiftCertificateController;
    }());
    angular.module('spafoo.ctrl.CreditCardGiftCertificate', []).controller('CreditCardGiftCertificate', CreditCardGiftCertificateController);
})(CreditCardGiftCertificateController || (CreditCardGiftCertificateController = {}));

//# sourceMappingURL=CreditCardGiftCertificate.controller.js.map
