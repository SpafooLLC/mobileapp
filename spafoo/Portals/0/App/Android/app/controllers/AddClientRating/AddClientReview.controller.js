var AddClientReviewController;
(function (AddClientReviewController_1) {
    var AddClientReviewController = (function () {
        function AddClientReviewController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp, $stateParams) {
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
        AddClientReviewController.prototype.getProviderInfo = function () {
            var self = this;
            self.isChecked = false;
            self.clientId = self.$stateParams.clientId;
            self.appointmentID = self.$stateParams.appId;
            self.CustomerHttp.get('/GetUserInfo/' + self.clientId).then(function (response) {
                self.ServiceData = response.GetUserInfoResult;
                self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.profilePic = imgres; });
            }, function (error) {
                if (error === null) {
                }
                else {
                }
            });
            self.CustomerHttp.get('/ListRating/1').then(function (response) {
                self.listRateData = response;
                console.log(self.listRateData);
            }, function (error) {
                if (error === null) {
                }
                else {
                }
            });
        };
        AddClientReviewController.prototype.getRate = function (rate) {
            var self = this;
            self.rateValue = '0' + ':' + rate;
        };
        AddClientReviewController.prototype.toggleCheck = function () {
            var self = this;
            self.isChecked = self.isChecked == true ? false : true;
        };
        AddClientReviewController.prototype.postRateInfo = function (ratingNameField, ratingTypeIDField, value) {
            var self = this;
            if (ratingNameField === 'Communication') {
                self.communication = ratingTypeIDField + ':' + value;
            }
            else if (ratingNameField === 'Time Punctuality') {
                self.timePunctuality = ratingTypeIDField + ':' + value;
            }
            else if (ratingNameField === 'Cooperation') {
                self.cooperation = ratingTypeIDField + ':' + value;
            }
            else if (ratingNameField === 'Attitude') {
                self.attitude = ratingTypeIDField + ':' + value;
            }
        };
        AddClientReviewController.prototype.redirectTo = function (href) {
            $('#PDone').modal('toggle');
            this.$state.go(href);
        };
        AddClientReviewController.prototype.postRating = function () {
            var self = this;
            self.ratingCSV = self.rateValue + '|' + self.timePunctuality + '|' + self.communication + '|' + self.cooperation + '|' + self.attitude;
            self.reviewCSV = self.aboutClientLike + ':' + self.aboutClientDislike + ':' + self.commentTxt + ':-1';
            //console.log(self.ratingCSV);
            //console.log(self.reviewCSV);
            var data = {
                "AppID": self.appointmentID,
                "RatingByID": self.$window.localStorage.getItem('CustomerID'),
                "RatingCSV": self.ratingCSV,
                "RatingToID": self.clientId,
                "ReviewCSV": self.reviewCSV
            };
            console.log(data);
            self.CustomerHttp.post(data, '/AddRating').then(function (res) {
                self.messages = 'Thank you for rating';
                $('#PDone').modal();
            }, function (error) {
            });
        };
        AddClientReviewController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$stateParams'];
        return AddClientReviewController;
    }());
    angular.module('spafoo.ctrl.AddClientReview', []).controller('AddClientReview', AddClientReviewController);
})(AddClientReviewController || (AddClientReviewController = {}));

//# sourceMappingURL=AddClientReview.controller.js.map
