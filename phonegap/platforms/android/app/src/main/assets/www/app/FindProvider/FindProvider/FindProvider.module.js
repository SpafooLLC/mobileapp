(function () {
    'use strict';
    angular
        .module('spafoo.module.FindProvider', ['spafoo.ctrl.FindProvider'])
        .config(configFindProvider);
    configFindProvider.$inject = ['$stateProvider'];
    function configFindProvider($stateProvider) {
        var FindProviderState = {
            name: 'FindProvider',
            url: '/FindProvider',
            templateUrl: 'app/templates/FindProvider.html',
            controller: 'FindProvider as findpro'
        };
        $stateProvider.state(FindProviderState);
    }
})();

//# sourceMappingURL=FindProvider.module.js.map
