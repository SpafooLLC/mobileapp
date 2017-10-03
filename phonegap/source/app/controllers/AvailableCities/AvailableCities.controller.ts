module AvailableCitiesController {

    class AvailableCitiesController {
        html: any;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window','$sce'];

        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private $sce: any
        ) {
            var self = this;
            var modeid = 460;
            self.GetAvailableCitiesHTML(modeid);
        }
        GetAvailableCitiesHTML(modeId: any) {
            var self = this;
            self.CustomerHttp.get('/GetHTML/' + modeId).then(function (response: any) {
             var decoded = angular.element('<textarea />').html(response.GetHTMLResult).text();
             self.html = self.$sce.trustAsHtml(decoded);
            }, function (error) {    
            });
        }
    }
    angular.module('spafoo.ctrl.AvailableCities', []).controller('AvailableCities', AvailableCitiesController);
}