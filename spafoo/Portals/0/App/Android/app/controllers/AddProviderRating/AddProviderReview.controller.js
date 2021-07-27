var AddProviderReviewController;
(function (AddProviderReviewController_1) {
    var AddProviderReviewController = (function () {
        function AddProviderReviewController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp, $stateParams) {
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
            this.getProviderInfo();
        }
        AddProviderReviewController.prototype.getProviderInfo = function () {
            var self = this;
            self.isChecked = false;
            self.providerId = self.$stateParams.providerId;
            self.appointmentID = self.$stateParams.appId;
            self.CustomerHttp.get('/GetUserInfo/' + self.providerId).then(function (response) {
                self.ServiceData = response.GetUserInfoResult;
                self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.profilePic = imgres; });
            }, function (error) {
                if (error === null) {
                }
                else {
                    console.log(error);
                }
            });
            self.CustomerHttp.get('/ListRating/2').then(function (response) {
                self.listRateData = response;
                console.log(self.listRateData);
            }, function (error) {
                if (error === null) {
                }
                else {
                    console.log(error);
                }
            });
        };
        AddProviderReviewController.prototype.getRate = function (rate) {
            var self = this;
            self.rateValue = '0' + ':' + rate;
        };
        AddProviderReviewController.prototype.toggleCheck = function () {
            var self = this;
            self.isChecked = self.isChecked == true ? false : true;
        };
        AddProviderReviewController.prototype.postRateInfo = function (ratingNameField, ratingTypeIDField, value) {
            var self = this;
            if (ratingNameField === 'Work Quality') {
                self.workQuality = ratingTypeIDField + ':' + value;
            }
            else if (ratingNameField === 'Time Punctuality') {
                self.timePunctuality = ratingTypeIDField + ':' + value;
            }
        };
        AddProviderReviewController.prototype.redirectTo = function (href) {
            $('#PDone').modal('toggle');
            this.$state.go(href);
        };
        AddProviderReviewController.prototype.postRating = function () {
            var self = this;
            self.ratingCSV = self.rateValue + '|' + self.workQuality + '|' + self.timePunctuality;
            self.reviewCSV = '-1:-1:' + self.commentTxt + ':' + self.dropDownVal;
            console.log(self.ratingCSV);
            console.log(self.reviewCSV);
            var data = {
                "AppID": self.appointmentID,
                "RatingByID": self.$window.localStorage.getItem('CustomerID'),
                "RatingCSV": self.ratingCSV,
                "RatingToID": self.providerId,
                "ReviewCSV": self.reviewCSV
            };
            self.CustomerHttp.post(data, '/AddRating').then(function (res) {
                self.messages = 'Thank you for rating';
                $('#PDone').modal();
            }, function (error) {
            });
        };
        AddProviderReviewController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$stateParams'];
        return AddProviderReviewController;
    }());
    angular.module('spafoo.ctrl.AddProviderReview', []).controller('AddProviderReview', AddProviderReviewController);
})(AddProviderReviewController || (AddProviderReviewController = {}));

//# sourceMappingURL=AddProviderReview.controller.js.map
