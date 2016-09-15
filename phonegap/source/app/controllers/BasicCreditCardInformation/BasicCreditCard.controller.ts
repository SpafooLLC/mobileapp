module BasicCreditCardController {
    export interface IBasicCreditCard {
        SubmitCreditCardInfo(UID: string,
            CCNumber: string,
            Expiry: string,
            CVV: string,
            Email: string
        ): void


    }

    interface IStateParams extends angular.ui.IStateParamsService {
    }

    class BasicCreditCardController implements IBasicCreditCard {
        messages: string;
        Succmesg: string;
        from: string;
        number:number;
        data:any;
        numbercvv:number;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$stateParams'];

        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private toaster: ngtoaster.IToasterService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp,
            private $stateParams: IStateParams
        ) {
            this.init();
        }

        init() {
            var self = this;
            self.from = self.$stateParams.from;
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
                                    
                    self.Succmesg = "Credit Card Information Added Successfully.";
                    $("#PSuccess").modal();  
                }, function (error) { });
            }
        }

        redirectTo(href: any) {
            this.SharedHttp.redirectTo(href, 'PSuccess');          
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
            } else {
                if(String(Regdata.CCNumber).length < 14){
                    self.messages = "The field length is invalid for Card Number.";
                    $("#PDone").modal();
                    return false; 
                }
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
        ValidateNumber( num: any, id:string ){
            var self= this;
            if(id=='cnum'){
                if(isNaN(num)){
                    self.data.CCNumber=self.number;
                } else {
                    self.data.CCNumber=num;
                    self.number=num;
                }
            } else {
                 if(isNaN(num)){
                    self.data.CVV=self.numbercvv;
                } else {
                    self.data.CVV=num;
                    self.numbercvv=num;
                }
            }
        }



    }


    angular.module('spafoo.ctrl.BasicCreditCard', []).controller('BasicCreditCard', BasicCreditCardController);

}