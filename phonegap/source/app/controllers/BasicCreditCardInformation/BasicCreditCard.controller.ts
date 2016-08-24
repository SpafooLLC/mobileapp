﻿module BasicCreditCardController {
    export interface IBasicCreditCard {
        SubmitCreditCardInfo(UID: string,
            CCNumber: string,
            Expiry: string,
            CVV: string,
            Email: string
        ): void


    }
    class BasicCreditCardController implements IBasicCreditCard {
        messages: string;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster'];

        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private toaster: ngtoaster.IToasterService

        ) {

        }
        SubmitCreditCardInfo(CData: any) {
            var self = this;
            //alert(CData.PayLater)

            if (CData != undefined && CData.PayLater == true  )
            {
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
                self.messages ="Please Select Month." ;
                $("#PDone").modal();               
                return false;
            }
            if (Regdata.Year === null || Regdata.Year === '' || Regdata.Year == undefined) {
                self.messages = "Please Select Year.";
                $("#PDone").modal();             
                return false;
            } if (Regdata.CVV === null || Regdata.CVV === '' || Regdata.CVV == undefined) {
                self.messages = "Please Enter CVV.";
                $("#PDone").modal();              
                return false;
            } 
            return true;
        }


    }


    angular.module('spafoo.ctrl.BasicCreditCard', []).controller('BasicCreditCard', BasicCreditCardController);

}