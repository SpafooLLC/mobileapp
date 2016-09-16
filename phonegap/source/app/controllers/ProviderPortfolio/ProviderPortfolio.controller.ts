module ProviderPortfolioController {
    
    class ProviderPortfolioController {
        UserID: number;
        ServiceData: any;
        profilePic: string;
        RatingField: string;
        Rateperson: string;
        TagField: string;
        ProviderServiceList: any;
        WorkSamplesList: any;
        distance: string;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$stateParams'];
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
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp,
            private $stateParams: angular.ui.IStateParamsService
        ) {
          
            //this.UserID = this.$window.localStorage.getItem('ProviderIDs');
            this.UserID = $stateParams.userId;
            this.distance = $stateParams.distance;
            this.getProviderPortfolio(this.UserID);
           $('.fancybox').fancybox();
        }

        getProviderPortfolio(UserID:any) {
            var self = this;
            var status= self.$window.localStorage.getItem('LoginStatus');
            if(status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === ''){
                self.$state.go('login');
            }
            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response: any) {
                 self.ServiceData = response.GetUserInfoResult;  
                 self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.profilePic = imgres; });
                 self.SharedHttp.GetMyRating(UserID).then(function (res) { self.RatingField = res.split(':')[0] ; self.Rateperson = res.split(':')[1] });
                self.SharedHttp.GetProTagLine(UserID).then(function (res) { self.TagField = res; });
                var str = self.ServiceData.profileField.biographyField;
                var uri_encoded = str.replace(/%([^\d].)/, "%25$1");                
                var decoded = decodeURIComponent(uri_encoded);
                self.ServiceData.profileField.biographyField = decoded;
                 self.SharedHttp.GetProviderServices(UserID).then(function (res) {self.ProviderServiceList = res; });
                 self.SharedHttp.GetWorkSamples(UserID).then(function (res) { self.WorkSamplesList = res; });
              
               
                 //self.GetProviderServices(UserID)

                //alert(decodeURI(self.ServiceData.profileField.biographyField));
            }, function (error) {
                if (error === null) {

                } else {
                    console.log(error);

                }
            });
        }


        GoToProviderReview() {
            var self = this;
            self.$state.go('ProReviewListing', { userId: this.$stateParams.userId });

        }
    }


    angular.module('spafoo.ctrl.ProviderPortfolio',[]).controller('ProviderPortfolio',ProviderPortfolioController);

}