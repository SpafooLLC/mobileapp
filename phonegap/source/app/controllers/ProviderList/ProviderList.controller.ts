module ProviderListController {
 
    class ProviderListController {
        ServiceData: {};
        pdata: number = 0;
        PreviousID: string;
        ServiceIDs: number;
        profilePic: string;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster'];
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private toaster: ngtoaster.IToasterService) {
            this.ServiceIDs = this.$window.localStorage.getItem('ServiceIDs');
           // alert(this.ServiceIDs);
            this.getProviderList(this.ServiceIDs);
           
        }
        getProviderList(ServiceID: any) {
            var self = this;
            
            self.CustomerHttp.get('/ListProvidersByServices/' + ServiceID).then(function (response: any) {
                
                self.ServiceData = response.ListProvidersByServicesResult;
                self.getProfilePics(self.ServiceData.profileField.photoField);

            }, function (error) {
                if (error === null) {
                    self.$ionicLoading.hide();
                } else {
                    console.log(error);
                    self.$ionicLoading.hide();
                }
            });
           
        }
        getProfilePics(customerID: any) {
            var self = this;
            self.CustomerHttp.get('/GetProfilePic/' + customerID).then(function (response: any) {

                self.profilePic = "http://dev.spafoo.com" + response.GetProfilePicResult;
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


    angular.module('spafoo.ctrl.ProviderList',[]).controller('ProviderList',ProviderListController);

}