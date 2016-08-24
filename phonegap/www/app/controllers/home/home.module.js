(function () {
    'use strict';
    angular
        .module('spafoo.module.home', ['spafoo.ctrl.home'])
        .config(configHome);
    configHome.$inject = ['$stateProvider'];
    function configHome($stateProvider) {
        var homeState = {
            name: 'home',
            url: '/home',
            templateUrl: 'app/templates/index.html',
            controller: 'home'
        };
        $stateProvider.state(homeState);
    }
})();

//# sourceMappingURL=home.module.js.map
