module ProviderListController {

    class ProviderListController {
        ServiceData: {};
        pdata: number = 0;
        PreviousID: string;
        ServiceIDs: number;
        profilePic: string;
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
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp) {
            var self = this;
            self.ServiceIDs = self.$window.localStorage.getItem('ServiceIDs');
            // alert(this.ServiceIDs);
            self.getProviderList(this.ServiceIDs);

        }
        getProviderList(ServiceID: any) {
            var self = this;

            self.CustomerHttp.get('/ListProvidersByServices/' + ServiceID).then(function (response: any) {

                self.ServiceData = response.ListProvidersByServicesResult;
                for (var i = 0; i <= response.ListProvidersByServicesResult.length; i++) {

                    if (self.ServiceData[i].profileField.photoField != null) {

                        self.getProfilePics(self.ServiceData[i].profileField.photoField, i);
                        self.GetProTagLine(self.ServiceData[i].userIDField, i)
                        self.GetMyRating(self.ServiceData[i].userIDField, i);

                    }
                    else
                    { self.ServiceData[i].profileField.photoField = ""; };

                }


            }, function (error) {
                if (error === null) {
                    self.$ionicLoading.hide();
                } else {
                    console.log(error);
                    self.$ionicLoading.hide();
                }
            });

        }
        getProfilePics(photoID: any, index: any) {
            var self = this;

            self.CustomerHttp.get('/GetProfilePic/' + photoID).then(function (response: any) {

                //self.profilePic = "http://dev.spafoo.com" + response.GetProfilePicResult;
                self.ServiceData[index].profileField.photoField = "http://dev.spafoo.com" + response.GetProfilePicResult;
                //  alert(self.ServiceData[index].profileField.photoField);
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

        GetProTagLine(UserID: any, index: any) {
            var self = this;

            self.CustomerHttp.get('/GetProTagLine/' + UserID).then(function (response: any) {
                self.ServiceData[index].TagField = decodeURIComponent(decodeURI(response.GetProTagLineResult.Success));
            }, function (error) {
                if (error === null) {

                } else {
                    console.log(error);

                }
            });
        }
        GetMyRating(UserID: any, index: any) {
            var self = this;
            self.CustomerHttp.get('/GetMyRating/' + UserID).then(function (response: any) {
                self.ServiceData[index].starField = parseInt(response.GetMyRatingResult.Success.split(':')[0]);
                 self.ServiceData[index].Rateperson= parseInt(response.GetMyRatingResult.Success.split(':')[1]);
                //   alert(self.ServiceData[index].starField);
            }, function (error) {
                if (error === null) {

                } else {
                    console.log(error);

                }
            });
        }
        GoToProviderPortfolio(UserID: any) {
            var self = this;
            
            //this.$rootScope.dotest(UserID) 
            self.$window.localStorage.setItem('ProviderIDs', UserID);
            self.$state.go("ProviderPortfolio");
        }
    }


    angular.module('spafoo.ctrl.ProviderList', []).controller('ProviderList', ProviderListController);

}