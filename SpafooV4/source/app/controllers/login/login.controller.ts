module loginController {
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
            $("#MobileNo").mask("000-000-0000");
        }


        doLogin(username: string, password: string) {
        //ßalert(this.$window.localStorage.getItem('DeviceToken'));
            var self = this;
            username= $("#MobileNo").unmask("000-000-0000").val();
            $("#MobileNo").mask("000-000-0000");
            if (username === null || username == '' || username == undefined) {                
                self.messages = "Please enter user name";   
                $("#PDoneError").modal();
                return;
            }
            if (password === null || password == '' || password == undefined) {
                self.messages = "Please enter password";
                $("#PDoneError").modal();
                return;
            }

            var data = {
                Username: username,
                Password: password,
                HardwareName: this.$window.localStorage.getItem('DeviceName'),
                DeviceToken: this.$window.localStorage.getItem('DeviceToken')
            };

            self.CustomerHttp.post(data, '/LoginUser').then(function (response:any) {
                console.log("rsposne from login ", response)
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
                    $("#PDoneError").modal();                    
                }
            }, function (error) {
              
            });
        }

        //getLoggedUser(UserID: any) {
        //    var self = this;
        //    self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response:any) {
        //        self.$rootScope.UserProfileName = response.GetUserInfoResult.displayNameField;
        //        self.$window.localStorage.setItem('CustomerName', response.GetUserInfoResult.displayNameField);
        //        self.$rootScope.GetLoginStatus = true;
        //        self.SharedHttp.GetMyNotification(UserID).then(function (res: any) { self.$rootScope.NotifiCount = res.length; });
        //        window.history.go(-1)
        //      //  self.$state.go("home");
        //    }, function (error) {});
        //}

        getLoggedUser(UserID: any) {
            var self = this;
            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response: any) {
                self.$rootScope.UserProfileName = response.GetUserInfoResult.displayNameField;
                self.$window.localStorage.setItem('CustomerName', response.GetUserInfoResult.displayNameField);
                self.$rootScope.GetLoginStatus = true;
                self.SharedHttp.GetMyNotification(UserID).then(function (res: any) { self.$rootScope.NotifiCount = res.length; });
                var v = self.$window.localStorage.getItem('url');

                //if (v == "Register") {

                //    self.$window.localStorage.setItem("url", '0');
                //    window.location.href = "#/home";
                //    //self.$state.go("home");
                //}

                //else {
                //    if (self.$window.localStorage.getItem('Role') == 'P') {
                //        //var v = self.$window.localStorage.getItem('url');

                //        var c = v.substr(v.indexOf('/') + 1);
                //        c = c.substr(0, c.indexOf('/'));

                //        if (c == "MakeAppointment") {
                //            self.$window.localStorage.setItem("url", '0');
                //            window.history.go(-2);

                //        } else {
                //            self.$window.localStorage.setItem("url", '0');
                //            window.history.go(-1);
                //        }



                //    }
                //    else {
                //        window.history.go(-1);
                //    }
                //}

                if (v!=null && v == "Register") {

                    self.$window.localStorage.setItem("url", '0');
                    window.location.href = "#/home";
                    //self.$state.go("home");
                }

                else {
                    if (v!=null && self.$window.localStorage.getItem('Role') == 'P' ) {
                        //var v = self.$window.localStorage.getItem('url');

                        var c = v.substr(v.indexOf('/') + 1);
                        c = c.substr(0, c.indexOf('/'));

                        if (c == "MakeAppointment" && self.$window.localStorage.getItem('url1') != "FindProvider") {
                             
                            self.$window.localStorage.setItem("url", '0');
                            window.history.go(-2);

                        } else {
                            if (self.$window.localStorage.getItem('url1') == "FindProvider") {

                                self.$window.localStorage.setItem("url1", '0');
                                window.location.href = "#/home";
                            }
                            else {
                                self.$window.localStorage.setItem("url", '0');
                                window.history.go(-1);
                            }

                        }



                    }
                    else {

                        window.history.go(-1);
                    }
                }

                //  self.$state.go("home");
            }, function (error) { });
        }
    }

    angular.module('spafoo.ctrl.login', []).controller('login', loginController);

}