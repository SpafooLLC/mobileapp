module ProReviewListingController {

    class ProReviewListingController {
        UserID: number;
        ServiceData: {}; ReviewData: {};
        profilePic: string;
        RatingField: string;
        Rateperson: string;
        TagField: string;
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
            this.UserID = $stateParams.userId;
            //this.UserID = this.$window.localStorage.getItem('ProviderIDs');
            this.getProviderReview(this.UserID);
        }

        getProviderReview(UserID: any) {
            var self = this;
            self.SharedHttp.GetUserInfo(UserID).then(function (res: any) {
                self.ServiceData = res;
               
                self.SharedHttp.GetMyRating(UserID).then(function (ress) { self.RatingField = ress.split(':')[0]; self.Rateperson = ress.split(':')[1] });
                self.SharedHttp.GetProTagLine(UserID).then(function (resss) { self.TagField = resss; });            
                self.SharedHttp.getProfilePics(parseInt(res.profileField.photoField)).then(function (imgres) { self.profilePic = imgres; });
           
            }).then(function () {  self.getReviewDetails(UserID);});

        
        }

        getReviewDetails(UserID: any) {
            var self = this;
            self.CustomerHttp.get('/GetMyReview/' + UserID).then(function (response: any) {
                self.ReviewData = response.GetMyReviewResult;
                $.each(self.ReviewData, function (i, item) {
                    var str = item.commentsField ;
                    var uri_encoded = str.replace(/%([^\d].)/, "%25$1");
                    self.ReviewData[i].commentsField = decodeURIComponent(uri_encoded);
                    self.ReviewData[i].datedField = self.SharedHttp.getFormatedDate(item.datedField, "dd/MM/yyyy");
                    
                    self.SharedHttp.GetUserInfo(item.byUserIDField).then(function (res: any) {
                        self.ReviewData[i].displayNameField = res.displayNameField;
                     
                        self.ReviewData[i].RegionField = res.profileField.regionField;
                    
                   });
                   
                });​ 

            }, function (error) {
                if (error === null) {

                } else {
                    console.log(error);

                }
            });
        }


    }


    angular.module('spafoo.ctrl.ProReviewListing', []).controller('ProReviewListing', ProReviewListingController);

}