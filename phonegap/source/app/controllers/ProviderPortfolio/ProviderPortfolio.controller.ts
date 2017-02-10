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
        customerType: string;
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
            var self = this;
            //this.UserID = this.$window.localStorage.getItem('ProviderIDs');
            self.UserID = $stateParams.userId;
            self.distance = $stateParams.distance;
            
            self.getProviderPortfolio(this.UserID);
            self.customerType = window.localStorage.getItem("Role");
         
           $('.fancybox').fancybox();
        }

        getProviderPortfolio(UserID:any) {
            var self = this;
          
            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response: any) {
                self.ServiceData = response.GetUserInfoResult;
                self.ServiceData.displayNameField = self.ServiceData.firstNameField + " " + self.ServiceData.lastNameField[0] + ".";
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