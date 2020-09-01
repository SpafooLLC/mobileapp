var ProviderPortfolioController;
(function (ProviderPortfolioController_1) {
    var ProviderPortfolioController = /** @class */ (function () {
        function ProviderPortfolioController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp, $stateParams) {
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
            var self = this;
            //this.UserID = this.$window.localStorage.getItem('ProviderIDs');
            self.UserID = $stateParams.userId;
            self.distance = $stateParams.distance;
            self.getProviderPortfolio(this.UserID);
            self.customerType = window.localStorage.getItem("Role");
            $('.fancybox').fancybox();
        }
        ProviderPortfolioController.prototype.getProviderPortfolio = function (UserID) {
            var self = this;
            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response) {
                self.ServiceData = response.GetUserInfoResult;
                self.ServiceData.displayNameField = self.ServiceData.firstNameField + " " + self.ServiceData.lastNameField[0] + ".";
                self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.profilePic = imgres; });
                self.SharedHttp.GetMyRating(UserID).then(function (res) { self.RatingField = res.split(':')[0]; self.Rateperson = res.split(':')[1]; });
                self.SharedHttp.GetProTagLine(UserID).then(function (res) { self.TagField = res; });
                var str = self.ServiceData.profileField.biographyField;
                var uri_encoded = str.replace(/%([^\d].)/, "%25$1");
                var decoded = decodeURIComponent(uri_encoded);
                self.ServiceData.profileField.biographyField = decoded;
                self.SharedHttp.GetProviderServices(UserID).then(function (res) { self.ProviderServiceList = res; });
                self.SharedHttp.GetWorkSamples(UserID).then(function (res) { self.WorkSamplesList = res; });
                //self.GetProviderServices(UserID)
                //alert(decodeURI(self.ServiceData.profileField.biographyField));
            }, function (error) {
                if (error === null) {
                }
                else {
                    console.log(error);
                }
            });
        };
        ProviderPortfolioController.prototype.GoToProviderReview = function () {
            var self = this;
            self.$state.go('ProReviewListing', { userId: this.$stateParams.userId });
        };
        ProviderPortfolioController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$stateParams'];
        return ProviderPortfolioController;
    }());
    angular.module('spafoo.ctrl.ProviderPortfolio', []).controller('ProviderPortfolio', ProviderPortfolioController);
})(ProviderPortfolioController || (ProviderPortfolioController = {}));

//# sourceMappingURL=ProviderPortfolio.controller.js.map
