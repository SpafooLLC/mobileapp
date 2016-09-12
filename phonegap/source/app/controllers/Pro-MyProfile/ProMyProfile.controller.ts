module ProMyProfileController {

    class ProMyProfileController {
        ServiceData: {};
        NotificaitonData: {};
        proProfilePic: string;
        NotificationCount: number;
        WorkSamplesList:{};
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
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp
        ) {
            this.getUserInfo();

        }
        getUserInfo() {
            var self = this;
            var customerID = self.$window.localStorage.getItem('CustomerID');
            self.CustomerHttp.get('/GetUserInfo/' + customerID).then(function (response: any) {
                self.ServiceData = response.GetUserInfoResult;
                self.ServiceData.membershipField.createdDateField = self.SharedHttp.getFormatedDate(response.GetUserInfoResult.membershipField.createdDateField, "dd MMMM yyyy");
                self.getUserNotificationInfo(customerID);
                var str = self.ServiceData.profileField.biographyField;
                var uri_encoded = str.replace(/%([^\d].)/, "%25$1");                
                var decoded = decodeURIComponent(uri_encoded);
                self.ServiceData.profileField.biographyField = decoded;
                self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.proProfilePic = imgres;});
                self.SharedHttp.GetWorkSamples(customerID).then(function (res) { self.WorkSamplesList = res; });
            }, function (error) {
                if (error === null) {

                } else {
                    console.log(error);

                }
            });
        }


        getUserNotificationInfo(customerID: any) {
            var self = this;
            self.CustomerHttp.get('/GetMyNotification/' + customerID).then(function (response: any) {
                self.NotificaitonData = response.GetMyNotificationResult;
                self.NotificationCount = self.NotificaitonData.length;

            }, function (error) {
                if (error === null) {
                    //self.$ionicLoading.hide();
                } else {
                    console.log(error);
                    //self.$ionicLoading.hide();
                }
            });
        }
        
    }


    angular.module('spafoo.ctrl.ProMyProfile', []).controller('ProMyProfile', ProMyProfileController);

}