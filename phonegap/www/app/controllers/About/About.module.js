(function () {
    'use strict';
    angular
        .module('spafoo.module.About', ['spafoo.ctrl.About'])
        .config(configAbout);
    configAbout.$inject = ['$stateProvider'];
    function configAbout($stateProvider) {
        var AboutState = {
            name: 'About',
            url: '/About',
            templateUrl: 'app/templates/About.html',
            controller: 'About as abt'
        };
        $stateProvider.state(AboutState);
    }
})();

//# sourceMappingURL=About.module.js.map
