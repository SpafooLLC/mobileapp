var ProReviewListingController;
(function (ProReviewListingController_1) {
    var ProReviewListingController = (function () {
        function ProReviewListingController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp, $stateParams) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.toaster = toaster;
            this.SharedHttp = SharedHttp;
            this.$stateParams = $stateParams;
            this.UserID = $stateParams.userId;
            //this.UserID = this.$window.localStorage.getItem('ProviderIDs');
            this.getProviderReview(this.UserID);
        }
        ProReviewListingController.prototype.getProviderReview = function (UserID) {
            var self = this;
            self.SharedHttp.GetUserInfo(UserID).then(function (res) {
                self.ServiceData = res;
                self.SharedHttp.GetMyRating(UserID).then(function (ress) { self.RatingField = ress.split(':')[0]; self.Rateperson = ress.split(':')[1]; });
                self.SharedHttp.GetProTagLine(UserID).then(function (resss) { self.TagField = resss; });
                self.SharedHttp.getProfilePics(parseInt(res.profileField.photoField)).then(function (imgres) { self.profilePic = imgres; });
            }).then(function () { self.getReviewDetails(UserID); });
        };
        ProReviewListingController.prototype.getReviewDetails = function (UserID) {
            var self = this;
            self.CustomerHttp.get('/GetMyReview/' + UserID).then(function (response) {
                self.ReviewData = response.GetMyReviewResult;
                $.each(self.ReviewData, function (i, item) {
                    var str = item.commentsField;
                    var uri_encoded = str.replace(/%([^\d].)/, "%25$1");
                    self.ReviewData[i].commentsField = decodeURIComponent(uri_encoded);
                    self.ReviewData[i].datedField = self.SharedHttp.getFormatedDate(item.datedField, "dd/MM/yyyy");
                    self.SharedHttp.GetUserInfo(item.byUserIDField).then(function (res) {
                        self.ReviewData[i].displayNameField = res.displayNameField;
                        self.ReviewData[i].RegionField = res.profileField.regionField;
                    });
                });
            }, function (error) {
                if (error === null) {
                }
                else {
                    console.log(error);
                }
            });
        };
        ProReviewListingController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$stateParams'];
        return ProReviewListingController;
    }());
    angular.module('spafoo.ctrl.ProReviewListing', []).controller('ProReviewListing', ProReviewListingController);
})(ProReviewListingController || (ProReviewListingController = {}));

//# sourceMappingURL=Pro-ReviewListing.controller.js.map
