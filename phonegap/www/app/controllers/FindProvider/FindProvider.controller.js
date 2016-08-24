var FindProviderController;
(function (FindProviderController_1) {
    var FindProviderController = (function () {
        function FindProviderController($state, $scope, $ionicLoading) {
            this.$inject = ['$state', '$scope', '$ionicLoading'];
            this.doLogin();
        }
        FindProviderController.prototype.doLogin = function () {
            alert("hi provider");
        };
        return FindProviderController;
    }());
    angular.module('spafoo.ctrl.FindProvider', []).controller('FindProvider', FindProviderController);
})(FindProviderController || (FindProviderController = {}));

//# sourceMappingURL=FindProvider.controller.js.map
