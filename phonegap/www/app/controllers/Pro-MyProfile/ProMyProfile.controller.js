var ProMyProfileController;
(function (ProMyProfileController_1) {
    var ProMyProfileController = (function () {
        function ProMyProfileController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp) {
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
            this.getUserInfo();
            $('.fancybox').fancybox();
        }
        ProMyProfileController.prototype.getUserInfo = function () {
            var self = this;
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
            var customerID = self.$window.localStorage.getItem('CustomerID');
            self.CustomerHttp.get('/GetUserJSON/' + customerID).then(function (response) {
                self.ServiceData = JSON.parse(response.GetUserJSONResult);
                //console.log(self.ServiceData);
<<<<<<< HEAD
=======
                self.ServiceData.DisplayName1 = self.ServiceData.FirstName + " " + self.ServiceData.LastName[0] + ".";
>>>>>>> refs/remotes/origin/PawanBranch
                self.ServiceData.Membership.CreatedDate = self.SharedHttp.getFormatedDate(self.ServiceData.Membership.CreatedDate, "dd MMMM yyyy");
                self.getUserNotificationInfo(customerID);
                var str = self.ServiceData.Profile.Biography;
                var uri_encoded = str.replace(/%([^\d].)/, "%25$1");
                var decoded = decodeURIComponent(uri_encoded);
                self.ServiceData.Profile.Biography = decoded;
                self.SharedHttp.getProfilePics(self.ServiceData.Profile.Photo).then(function (imgres) { self.proProfilePic = imgres; });
                self.SharedHttp.GetWorkSamples(customerID).then(function (res) { self.WorkSamplesList = res; });
                self.rolePosition = self.ServiceData.Profile.ProfileProperties[1].PropertyValue.split('|').map(Number);
                self.getRoles().then(function (res) {
                    self.Roles = res;
                    var rArr = new Array();
                    for (var i = 0; i < self.Roles.GetQuestionResult.optionsField.length; i++) {
                        if (self.rolePosition.indexOf(self.Roles.GetQuestionResult.optionsField[i].onSelectField) > -1) {
                            rArr.push(self.Roles.GetQuestionResult.optionsField[i].optionTextField);
                        }
                    }
                    //console.log(rArr)
                    self.applRole = rArr;
                }, function (error) {
                    //alert(error);
                });
                self.CustomerHttp.get('/GetProviderServices/' + customerID).then(function (res) {
                    self.serviceOffered = res.GetProviderServicesResult;
                }, function (err) {
                });
            }, function (error) {
                if (error === null) {
                }
                else {
                }
            });
        };
        ProMyProfileController.prototype.getRoles = function () {
            var self = this;
            var deferred = this.$q.defer();
            self.CustomerHttp.get('/GetQuestion/5').then(function (res) {
                deferred.resolve(res);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        ProMyProfileController.prototype.getUserNotificationInfo = function (customerID) {
            var self = this;
            self.CustomerHttp.get('/GetMyNotification/' + customerID).then(function (response) {
                self.NotificaitonData = response.GetMyNotificationResult;
                self.NotificationCount = self.NotificaitonData.length;
            }, function (error) {
                if (error === null) {
                }
                else {
                    console.log(error);
                }
            });
        };
        ProMyProfileController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp'];
        return ProMyProfileController;
    }());
    angular.module('spafoo.ctrl.ProMyProfile', []).controller('ProMyProfile', ProMyProfileController);
})(ProMyProfileController || (ProMyProfileController = {}));

//# sourceMappingURL=ProMyProfile.controller.js.map
