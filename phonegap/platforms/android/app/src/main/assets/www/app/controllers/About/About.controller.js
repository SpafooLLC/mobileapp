var AboutController;
(function (AboutController_1) {
    var AboutController = /** @class */ (function () {
        function AboutController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, $sce) {
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
            var modeid = 459;
            self.GetAvailableCitiesHTML(modeid);
        }
        AboutController.prototype.GetAvailableCitiesHTML = function (modeId) {
            var self = this;
            self.CustomerHttp.get('/GetHTML/' + modeId).then(function (response) {
                var decoded = angular.element('<textarea />').html(response.GetHTMLResult).text();
                self.html = self.$sce.trustAsHtml(decoded);
            }, function (error) {
            });
        };
        AboutController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', '$sce'];
        return AboutController;
    }());
    angular.module('spafoo.ctrl.About', []).controller('About', AboutController);
})(AboutController || (AboutController = {}));

//# sourceMappingURL=About.controller.js.map
