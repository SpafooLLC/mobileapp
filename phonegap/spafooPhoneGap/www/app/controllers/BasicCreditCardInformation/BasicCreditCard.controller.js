var BasicCreditCardController;
(function (BasicCreditCardController_1) {
    var BasicCreditCardController = (function () {
        function BasicCreditCardController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.toaster = toaster;
        }
        BasicCreditCardController.prototype.SubmitCreditCardInfo = function (CData) {
            var self = this;
            //alert(CData.PayLater)
            if (CData != undefined && CData.PayLater == true) {
                self.$state.go("login");
            }
            else if (this.DoValidation(CData)) {
                var data = CData;
                data.UID = self.$window.localStorage.getItem('CustomerID');
                data.Expiry = data.Month + "/" + data.Year;
                self.$ionicLoading.show();
                self.CustomerHttp.post(data, '/CreateCustomerProfile').then(function (response) {
                    self.$ionicLoading.hide();
                    self.messages = "Registration Completed Successfully";
                    $("#PDone").modal();
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
        BasicCreditCardController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster'];
        return BasicCreditCardController;
    }());
    angular.module('spafoo.ctrl.BasicCreditCard', []).controller('BasicCreditCard', BasicCreditCardController);
})(BasicCreditCardController || (BasicCreditCardController = {}));

//# sourceMappingURL=BasicCreditCard.controller.js.map
