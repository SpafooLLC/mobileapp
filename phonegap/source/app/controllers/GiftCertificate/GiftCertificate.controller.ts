module GiftCertificateController {
    // export interface IGiftCertificate {

    //     doGiftCertificate(
    //         Username: string,
    //         FirstName: string,
    //         LastName: string,
    //         EmailAddress: string,
    //         PortalID: number,
    //         Password: string,
    //         Street: string,
    //         City: string,
    //         State: string,
    //         Zipcode: string,
    //         PhoneNo: string,
    //         MobileNo: string,
    //         VerifyMobileNo: string,
    //         picFID: string): void;
    //     capturePhoto(choice: any): void;
    //     cameraOption(): void;
    // }
    interface ITimeoutService extends ng.ITimeoutService { }
    class GiftCertificateController {
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', '$timeout', 'SharedHttp', '$rootScope'];
        username: string;
        password: string;
        messages: string; messagessuc: string;
        profileImage: string;
        imageURL: string;
        isImageClick: boolean;
        picFID: string;
        picPath: string;
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private $timeout: ITimeoutService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp, private $rootScope: any
        ) {
            window.localStorage.setItem("url", 'GiftCertificate');
            // $("#PhoneNo").mask("000-000-0000");
            setTimeout(function () {
                $("#MobileNo").mask("000-000-0000");
                $("#VerifyMobileNo").mask("000-000-0000");
                $("#Zipcode").mask("00000");
            }, 2000);
        }
        doGiftCertificate(Regdata: any) {
            var self = this;
            //  alert("hello");
            if (this.DoValidation(Regdata)) {
                $("#MobileNo").mask("000-000-0000")
                self.$state.go("CreditCardGiftCertificate", { GiftToFirstName: Regdata.FirstName, GiftToLastName: Regdata.LastName, GiftToEmailID: Regdata.EmailAddress, Message: Regdata.Message, Amount: Regdata.Amount });
            }
        }



        DoValidation(Regdata: any) {
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
            } else {
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
        }



    }


    angular.module('spafoo.ctrl.GiftCertificate', []).controller('GiftCertificate', GiftCertificateController);

}