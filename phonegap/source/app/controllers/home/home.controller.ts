module homeController {
    interface ITimeoutService extends ng.ITimeoutService { }
    export interface Ihome {
        doLogin(): void

    }
    class homeController implements Ihome {

        $inject = ['$state', '$scope', '$ionicLoading', '$timeout',  'SharedHttp']
        constructor(
            private $state: angular.ui.IState,
            private $scope: angular.IScope,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $timeout: ITimeoutService
            , private SharedHttp: spafoo.httpsharedservice.ISharedHttp
        ) {

            document.addEventListener("deviceready", this.onDeviceReady, false);
            navigator.geolocation.getCurrentPosition(function (e) { }, function (e) { }, {
                enableHighAccuracy: true,
                maximumAge: 3600000});
            
        }
        doLogin() {

        }
        onDeviceReady() {
            var self = this;
            var tabClick = 0;
            document.addEventListener("backbutton", function (e) {
                e.preventDefault();
                if (tabClick === 0) {
                    tabClick++;
                    if (window.location.href.substr(window.location.href.lastIndexOf('/') + 1) != 'home') {
                        window.history.go(-1);                                               
                    }
                    setTimeout(function () { tabClick = 0;}, 2000);
                   
                } else {
                    //alert(tabClick + ':else');
                    navigator.app.exitApp();
                }
                // navigator.notification.confirm("Are you sure want to exit from App?", onConfirmExit, "Confirmation", "Yes,No");
            }, false);
        }
    }


    angular.module('spafoo.ctrl.home', []).controller('home', homeController);

}