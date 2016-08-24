module loginController {
    export interface ILogin  {
        doLogin(username: string, password: string): void;
     

    }
    class loginController implements ILogin {
        messages: string;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', '$rootScope'];
       
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
            private $rootScope :any
        ) {

        }


        doLogin(username: string, password: string) {
            var self = this;
            if (username === null || username == '' || username == undefined) {                
                self.messages = "Please Enter User Name.";
                $("#PDone").modal();
                return;
            }
            if (password === null || password == '' || password == undefined) {
                self.messages = "Please Enter User Name.";
                $("#PDone").modal();
                return;
            }

            var data = {
                Username: username,
                Password: password,
            };

          
            self.CustomerHttp.post(data, '/LoginUser').then(function (response:any) {
                if (parseInt(response.Source)) {
                    self.$window.localStorage.setItem('CustomerID', response.Source);
                    self.$window.localStorage.setItem('LoginStatus', "true");                    
                     self.getLoggedUser(response.Source);
                 
                }
                else {
                    self.$window.localStorage.setItem('CustomerID', "0");
                    self.$window.localStorage.setItem('LoginStatus', "false");
                    self.$rootScope.GetLoginStatus = false;
                    self.messages = "Login Failed, Please enter correct username and password";
                    $("#PDone").modal();                    
                }

                  
                
            }, function (error) {
                if (error === null) {
                    //self.toastr.error('No internet connections. Check your connection settings', 'Error');
                    self.$ionicLoading.hide();
                } else {
                    console.log(error);
                    //self.toastr.error(error.Failure, 'Error');
                    //self.$ionicPopup.alert({
                    //    title: 'Error', template: error.Failure
                    //});
                    self.$ionicLoading.hide();
                }
            });
        }

        getLoggedUser(UserID: any) {
            var self = this;

            //  var UserID = self.$window.localStorage.getItem('CustomerID');
            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response:any) {
                self.$rootScope.UserProfileName = response.GetUserInfoResult.displayNameField;
                self.$window.localStorage.setItem('CustomerName', response.GetUserInfoResult.displayNameField);
                self.$rootScope.GetLoginStatus = true;
                self.$state.go("home");
               
                self.$ionicLoading.hide();
            }, function (error) {
                if (error === null) {
                    //self.toastr.error('No internet connections. Check your connection settings', 'Error');
                    self.$ionicLoading.hide();
                } else {
                    console.log(error);
                    //self.toastr.error(error.Failure, 'Error');
                    //self.$ionicPopup.alert({
                    //    title: 'Error', template: error.Failure
                    //});
                    self.$ionicLoading.hide();
                }
            });
        }



    }

    angular.module('spafoo.ctrl.login', []).controller('login', loginController);

}