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
            $("#MobileNo").mask("000-000-0000");
        }
        BasicCreditCardController.prototype.init = function () {
            var self = this;
            self.from = self.$stateParams.from;
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
        BasicCreditCardController.prototype.doRegister = function () {
            var self = this;
            var defer = self.$q.defer();
            var data = JSON.parse(localStorage.getItem("registerData"));
            self.CustomerHttp.post(data, '/RegisterUser').then(function (response) {
                if (parseInt(response.CustomerID) > 0) {
                    self.$window.localStorage.setItem('CustomerID', response.CustomerID);
                    self.$window.localStorage.setItem('Role', response.Usertype);
                    self.$window.localStorage.setItem('LoginStatus', "true");
                    self.SharedHttp.DoLogin(data.Username, data.Password).then(function (e) {
                        defer.resolve(e);
                        //self.$state.go("home");
                        self.$state.go("home");
                    });
                }
                self.$ionicLoading.hide();
            }, function (error) {
                if (error === null) {
                    defer.reject(error);
                    self.$ionicLoading.hide();
                }
                else {
                    defer.reject(error);
                    //console.log(error);
                    self.$ionicLoading.hide();
                }
            });
            return defer.promise;
        };
        //SubmitCreditCardInfo(CData: any) {
        //    var self = this;
        //    //alert(CData.PayLater)
        //    if (self.isChecked == true)
        //    {
        //        self.$state.go("MyProfile");
        //    }
        //    else if (this.DoValidation(CData)) {
        //        var data = CData;
        //        data.UID = self.$window.localStorage.getItem('CustomerID');
        //        data.Expiry = data.Month + "/" + data.Year; 
        //        self.$ionicLoading.show();
        //        self.CustomerHttp.post(data, '/CreateCustomerProfile').then(function (response) {
        //            self.Succmesg = "Credit Card Information Added Successfully.";
        //            $("#PSuccess").modal();  
        //        }, function (error) { });
        //    }
        //}
        BasicCreditCardController.prototype.SubmitCreditCardInfo = function (CData, ActionType) {
            var self = this;
            //alert(CData.PayLater)
            switch (ActionType) {
                case 'A':
                    if (this.DoValidation(CData)) {
                        var data = CData;
                        data.UID = self.$window.localStorage.getItem('CustomerID');
                        data.Expiry = data.Month + "/" + data.Year;
                        data.Phone = $("#MobileNo").val();
                        self.CustomerHttp.post(data, '/CreateCustomerProfile').then(function (response) {
                            self.Succmesg = "Credit Card Information Added Successfully.";
                            $("#PSuccess").modal();
                        }, function (error) { });
                    }
                    break;
                case 'R':
                    if (self.isChecked == true) {
                        //   self.doRegister();
                        self.$state.go("MyProfile");
                    }
                    else if (this.DoValidation(CData)) {
                        var data = CData;
                        data.UID = self.$window.localStorage.getItem('CustomerID');
                        data.Expiry = data.Month + "/" + data.Year;
                        data.Phone = $("#MobileNo").val();
                        self.CustomerHttp.post(data, '/CreateCustomerProfile').then(function (response) {
                            self.Succmesg = "Credit Card Information Added Successfully.";
                            $("#PSuccess").modal();
                        }, function (error) { });
                    }
                    break;
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
            if (Regdata.Address == '' || Regdata.Address == undefined) {
                self.messages = "Address must be required";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.City == '' || Regdata.City == undefined) {
                self.messages = "City must be required";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.State == '' || Regdata.State == undefined) {
                self.messages = "State must be required";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.Zip == '' || Regdata.Zip == undefined) {
                self.messages = "Zip/Postal Code must be required";
                $("#PDone").modal();
                return false;
            }
            if ($("#MobileNo").val() == '' || $("#MobileNo").val() == undefined) {
                self.messages = "Phone no must be required";
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
