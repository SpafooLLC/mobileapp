var ServicesController;
(function (ServicesController_1) {
    var ServicesController = (function () {
        function ServicesController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp) {
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
            this.pdata = 0;
            this.getServiceList(-1);
            // this.PreviousID = "-1";
            //alert("Hi");
        }
        ServicesController.prototype.getServiceList = function (ParentServiceID) {
            var self = this;
            //alert(ParentServiceID);
            self.CustomerHttp.get('/GetServiceList/' + ParentServiceID).then(function (response) {
                self.ServiceData = response.GetServiceListResult;
                // alert(JSON.stringify(response.GetServiceListResult));
                if (response.GetServiceListResult.length === 0) {
                    //  alert("getServiceList : " + self.pdata + " " + self.PreviousID);
                    self.$window.localStorage.setItem('ServiceIDs', self.PreviousID);
                    self.$state.go("ProviderList");
                }
                self.PreviousID = response.GetServiceListResult[0].parentIDField;
                self.pdata = response.GetServiceListResult[0].parentIDField;
                self.$ionicLoading.hide();
            }, function (error) {
                if (error === null) {
                    self.$ionicLoading.hide();
                }
                else {
                    //console.log(error);
                    self.$ionicLoading.hide();
                }
            });
            self.PreviousID = ParentServiceID;
        };
        ServicesController.prototype.getParentData = function (ParentServiceID) {
            var self = this;
            //  alert("getParentData : " + self.pdata);
            self.CustomerHttp.get('/GetSpecificServiceRecord/' + self.pdata).then(function (response) {
                //   alert(JSON.stringify(response.GetSpecificServiceRecordResult[0].parentIDField));
                self.getServiceList(response.GetSpecificServiceRecordResult[0].parentIDField);
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
            self.PreviousID = ParentServiceID;
        };
        ServicesController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp'];
        return ServicesController;
    }());
    angular.module('spafoo.ctrl.Services', []).controller('Services', ServicesController);
})(ServicesController || (ServicesController = {}));

//# sourceMappingURL=Services.controller.js.map
