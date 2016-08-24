var ProviderListController;
(function (ProviderListController_1) {
    var ProviderListController = (function () {
        function ProviderListController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.toaster = toaster;
            this.pdata = 0;
            this.ServiceIDs = this.$window.localStorage.getItem('ServiceIDs');
            // alert(this.ServiceIDs);
            this.getProviderList(this.ServiceIDs);
        }
        ProviderListController.prototype.getProviderList = function (ServiceID) {
            var self = this;
            self.CustomerHttp.get('/ListProvidersByServices/' + ServiceID).then(function (response) {
                self.ServiceData = response.ListProvidersByServicesResult;
                self.getProfilePics(self.ServiceData.profileField.photoField);
            }, function (error) {
                if (error === null) {
                    self.$ionicLoading.hide();
                }
                else {
                    console.log(error);
                    self.$ionicLoading.hide();
                }
            });
        };
        ProviderListController.prototype.getProfilePics = function (customerID) {
            var self = this;
            self.CustomerHttp.get('/GetProfilePic/' + customerID).then(function (response) {
                self.profilePic = "http://dev.spafoo.com" + response.GetProfilePicResult;
                self.$ionicLoading.hide();
            }, function (error) {
                if (error === null) {
                    self.$ionicLoading.hide();
                }
                else {
                    console.log(error);
                    self.$ionicLoading.hide();
                }
            });
        };
        ProviderListController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster'];
        return ProviderListController;
    }());
    angular.module('spafoo.ctrl.ProviderList', []).controller('ProviderList', ProviderListController);
})(ProviderListController || (ProviderListController = {}));

//# sourceMappingURL=ProviderList.controller.js.map
