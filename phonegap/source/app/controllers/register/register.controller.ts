module registerController {
    export interface IRegister {
        doRegister(
            Username: string,
            FirstName: string,
            LastName: string,
            EmailAddress: string,
            PortalID: number,
            Password: string,
            Street: string,
            City: string,
            State: string,
            Zipcode: string,
            PhoneNo: string,
            MobileNo: string,
            picFID: string): void;
    }
    class RegisterController implements IRegister {
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window'];
        username: string;
        password: string;
        messages: string;
        profileImage: string;
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
        doRegister(Regdata: any) {

            var self = this;
            //  alert("hello");
            if (this.DoValidation(Regdata)) {

                var data = Regdata;

                self.$ionicLoading.show();
                self.CustomerHttp.post(data, '/RegisterUser').then(function (response: any) {

                    if (parseInt(response.CustomerID) > 0) {
                        self.$window.localStorage.setItem('CustomerID', response.CustomerID);
                        self.$state.go("BasicCreditCard");
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

        GoRegistertext(IsProvider: any) {

            var self = this;
            self.$state.go("RegisterProvider");
        }

        DoValidation(Regdata: any) {
            var self = this;
            if (Regdata == undefined) {

                self.messages = "Please Enter First Name.";
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
            if (Regdata.Username === null || Regdata.Username === '' || Regdata.Username == undefined) {

                self.messages = "Please Enter Username. ";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.Password === null || Regdata.Password === '' || Regdata.Password == undefined) {

                self.messages = "Please Enter Password.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.ConfirmPassword === null || Regdata.ConfirmPassword === '' || Regdata.ConfirmPassword == undefined) {

                self.messages = "Please Enter Confirm Password.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.ConfirmPassword != Regdata.Password) {

                self.messages = "Password not Matched.";
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
            if (Regdata.MobileNo === null || Regdata.MobileNo === '' || Regdata.MobileNo == undefined) {
                self.messages = "Please Enter Mobile Number.";
                $("#PDone").modal();
                return false;
            }

            if (Regdata.Street === null || Regdata.Street === '' || Regdata.Street == undefined) {
                self.messages = "Please Enter Address.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.City === null || Regdata.City === '' || Regdata.City == undefined) {
                self.messages = "Please Enter City. ";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.State === null || Regdata.State === '' || Regdata.State == undefined) {
                self.messages = "Please Select State.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.Zipcode === null || Regdata.Zipcode === '' || Regdata.Zipcode == undefined) {
                self.messages = "Please Enter Zip code.";
                $("#PDone").modal();
                return false;
            }
            return true;
        }
      
    }


    angular.module('spafoo.ctrl.register', []).controller('register', RegisterController);

}