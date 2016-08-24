(function () {
    'use strict';
    angular
        .module('spafoo.module.Services', ['spafoo.ctrl.Services'])
        .config(configServices);
    configServices.$inject = ['$stateProvider'];
    function configServices($stateProvider) {
        var ServicesState = {
            name: 'Services',
            url: '/Services',
            templateUrl: 'app/templates/Services.html',
            controller: 'Services as s'
        };
        $stateProvider.state(ServicesState);
    }
})();

//# sourceMappingURL=Services.module.js.map
