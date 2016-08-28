module mainController {
    export interface IMain {


    }
    class MainController implements IMain {
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
            this.$rootScope.GetLoginStatus = Boolean( this.$window.localStorage.getItem('LoginStatus'));   
        }


    doLogOut() {
        this.$rootScope.GetLoginStatus = false;
        this.$window.localStorage.setItem('LoginStatus', "false");
        this.$rootScope.UserProfileName = "Welcome to Spafoo";
        this.$window.localStorage.setItem('CustomerName', "Welcome to Spafoo");
            this.$state.go('home');
        }

    dotest(userid:any) {
        alert("this is test " + userid);
    }


    }

    angular.module('spafoo.ctrl.Main', []).controller('Main', MainController);

}