var PriceListController;
(function (PriceListController_1) {
    var PriceListController = /** @class */ (function () {
        function PriceListController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp) {
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
            var self = this;
            self.getProviderList(-1);
        }
        PriceListController.prototype.getProviderList = function (ServiceID) {
            var self = this;
            self.CustomerHttp.get('/GetServicesIn/' + ServiceID).then(function (response) {
                //    self.CustomerHttp.get('/ListProvidersByServices/-1').then(function (response: any) {
                self.ServiceData = response.GetServicesInResult;
                console.log(JSON.stringify(self.ServiceData));
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
        PriceListController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp'];
        return PriceListController;
    }());
    angular.module('spafoo.ctrl.PriceList', []).controller('PriceList', PriceListController);
})(PriceListController || (PriceListController = {}));

//# sourceMappingURL=PriceList.controller.js.map
