﻿module loginController {
    export interface ILogin  {
        doLogin(username: string, password: string): void;
     

    }
    class loginController implements ILogin {
        messages: string;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', '$rootScope', 'SharedHttp'];
       
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
            private $rootScope: any,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp
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
                    self.$window.localStorage.setItem('Role', response.Usertype);
                    self.$window.localStorage.setItem('LoginStatus', "true");                    
                     self.getLoggedUser(response.Source);
                    self.$rootScope.getRole = (self.$window.localStorage.getItem('Role')=="P" ?"P":"C");
                }
                else {
                    self.$window.localStorage.setItem('CustomerID', "0");
                    self.$window.localStorage.setItem('LoginStatus', "false");
                    self.$window.localStorage.setItem('Role', null);
                    self.$rootScope.GetLoginStatus = false;
                    self.messages = "Login Failed, Please enter correct username and password";
                    $("#PDone").modal();                    
                }
            }, function (error) {
              
            });
        }

        getLoggedUser(UserID: any) {
            var self = this;
            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response:any) {
                self.$rootScope.UserProfileName = response.GetUserInfoResult.displayNameField;
                self.$window.localStorage.setItem('CustomerName', response.GetUserInfoResult.displayNameField);
                self.$rootScope.GetLoginStatus = true;
                self.SharedHttp.GetMyNotification(UserID).then(function (res:any) { self.$rootScope.NotifiCount = res.length; });
                self.$state.go("home");
            }, function (error) {});
        }

     



    }

    angular.module('spafoo.ctrl.login', []).controller('login', loginController);

}