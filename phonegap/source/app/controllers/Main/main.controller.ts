module mainController { 
    class MainController {
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', '$rootScope', 'SharedHttp'];
        GetLoginStatus: boolean;
        NotifiCount: number; 
        getRole:string;
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
            this.$rootScope.UserProfileName = this.$window.localStorage.getItem('CustomerName');
            this.$rootScope.GetLoginStatus = (this.$window.localStorage.getItem('LoginStatus')=="true" ?true:false);
            this.$rootScope.getRole = (this.$window.localStorage.getItem('Role')=="P" ?"P":"C");
            console.log(this.$rootScope.getRole);
            var customerID = this.$window.localStorage.getItem('CustomerID');
            var seldf = this;
            if (customerID != null) {
                seldf.SharedHttp.GetMyNotification(customerID).then(function (res: any) { seldf.$rootScope.NotifiCount = res.length; });
            }
        }


    doLogOut() {
        this.$rootScope.GetLoginStatus = false;

        this.$window.localStorage.setItem('LoginStatus', "false");
        this.$rootScope.UserProfileName = "Welcome to Spafoo";
        this.$window.localStorage.setItem('CustomerName', "Welcome to Spafoo");
        this.$window.localStorage.setItem('Role', null);
      //  alert("LogOut :: "+this.$rootScope.GetLoginStatus + ", type Of :: " + typeof (this.$rootScope.GetLoginStatus));

            this.$state.go('home');
        }

   


    }

    angular.module('spafoo.ctrl.Main', []).controller('Main', MainController);

}