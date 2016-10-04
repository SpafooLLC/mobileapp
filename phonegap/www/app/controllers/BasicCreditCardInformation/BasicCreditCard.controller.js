var BasicCreditCardController;
(function (BasicCreditCardController_1) {
    var BasicCreditCardController = (function () {
        function BasicCreditCardController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp, $stateParams) {
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
        BasicCreditCardController.prototype.init = function () {
            var self = this;
            self.from = self.$stateParams.from;
            self.isChecked = false;
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
        };
        BasicCreditCardController.prototype.SubmitCreditCardInfo = function (CData) {
            var self = this;
            //alert(CData.PayLater)
            if (self.isChecked == true) {
                self.$state.go("MyProfile");
            }
            else if (this.DoValidation(CData)) {
                var data = CData;
                data.UID = self.$window.localStorage.getItem('CustomerID');
                data.Expiry = data.Month + "/" + data.Year;
                self.$ionicLoading.show();
                self.CustomerHttp.post(data, '/CreateCustomerProfile').then(function (response) {
                    self.Succmesg = "Credit Card Information Added Successfully.";
                    $("#PSuccess").modal();
                }, function (error) { });
            }
        };
        BasicCreditCardController.prototype.redirectTo = function (href) {
            this.SharedHttp.redirectTo(href, 'PSuccess');
        };
        BasicCreditCardController.prototype.DoValidation = function (Regdata) {
            var self = this;
            if (Regdata == undefined) {
                self.messages = "Please Enter Credit Card Number.";
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
        BasicCreditCardController.prototype.ValidateNumber = function (num, id) {
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
        BasicCreditCardController.prototype.checkStatus = function ($event) {
            var self = this;
            if ($event.target.checked) {
                self.isChecked = true;
            }
            else {
                self.isChecked = false;
            }
        };
        BasicCreditCardController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$stateParams'];
        return BasicCreditCardController;
    }());
    angular.module('spafoo.ctrl.BasicCreditCard', []).controller('BasicCreditCard', BasicCreditCardController);
})(BasicCreditCardController || (BasicCreditCardController = {}));

//# sourceMappingURL=BasicCreditCard.controller.js.map
