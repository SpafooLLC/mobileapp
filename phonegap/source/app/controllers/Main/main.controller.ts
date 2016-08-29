module mainController { 
    class MainController {
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster','$rootScope'];
        GetLoginStatus: boolean; 
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
            private $rootScope: any

        ) { 
            this.$rootScope.UserProfileName = this.$window.localStorage.getItem('CustomerName');
            this.$rootScope.GetLoginStatus = (this.$window.localStorage.getItem('LoginStatus')=="true" ?true:false);
            // alert(this.$rootScope.GetLoginStatus + ", type Of :: " + typeof (this.$rootScope.GetLoginStatus));
        }


    doLogOut() {
        this.$rootScope.GetLoginStatus = false;

        this.$window.localStorage.setItem('LoginStatus', "false");
        this.$rootScope.UserProfileName = "Welcome to Spafoo";
        this.$window.localStorage.setItem('CustomerName', "Welcome to Spafoo");
      //  alert("LogOut :: "+this.$rootScope.GetLoginStatus + ", type Of :: " + typeof (this.$rootScope.GetLoginStatus));

            this.$state.go('home');
        }

   


    }

    angular.module('spafoo.ctrl.Main', []).controller('Main', MainController);

}