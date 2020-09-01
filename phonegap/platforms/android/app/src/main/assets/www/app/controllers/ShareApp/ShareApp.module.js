(function () {
    'use strict';
    angular
        .module('spafoo.module.ShareApp', ['spafoo.ctrl.ShareApp'])
        .config(configShareApp);
    configShareApp.$inject = ['$stateProvider'];
    function configShareApp($stateProvider) {
        var ShareAppState = {
            name: 'ShareApp',
            url: '/ShareApp',
            templateUrl: 'app/templates/ShareApp.html',
            controller: 'ShareApp'
        };
        $stateProvider.state(ShareAppState);
    }
})();

//# sourceMappingURL=ShareApp.module.js.map
