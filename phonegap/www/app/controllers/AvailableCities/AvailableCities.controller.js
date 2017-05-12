var AvailableCitiesController;
(function (AvailableCitiesController_1) {
    var AvailableCitiesController = (function () {
        function AvailableCitiesController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, $sce) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.$sce = $sce;
            var self = this;
            var modeid = 460;
            self.GetAvailableCitiesHTML(modeid);
        }
        AvailableCitiesController.prototype.GetAvailableCitiesHTML = function (modeId) {
            var self = this;
            self.CustomerHttp.get('/GetHTML/' + modeId).then(function (response) {
                var decoded = angular.element('<textarea />').html(response.GetHTMLResult).text();
                self.html = self.$sce.trustAsHtml(decoded);
            }, function (error) {
            });
        };
        AvailableCitiesController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', '$sce'];
        return AvailableCitiesController;
    }());
    angular.module('spafoo.ctrl.AvailableCities', []).controller('AvailableCities', AvailableCitiesController);
})(AvailableCitiesController || (AvailableCitiesController = {}));

//# sourceMappingURL=AvailableCities.controller.js.map
