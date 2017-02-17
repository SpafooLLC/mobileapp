module PriceListController {
  
    class PriceListController  {
        
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp'];
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
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp)
        {
             var self = this;
            self.getProviderList(-1);
        }
        getProviderList(ServiceID: any) {
            var self = this;

            self.CustomerHttp.get('/GetServicesIn/' + ServiceID).then(function (response: any) {

                //    self.CustomerHttp.get('/ListProvidersByServices/-1').then(function (response: any) {
                self.ServiceData = response.GetServicesInResult;
                console.log(JSON.stringify(self.ServiceData));
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


    angular.module('spafoo.ctrl.PriceList',[]).controller('PriceList',PriceListController);

}