(function () {
    'use strict';
    angular
        .module('spafoo.module.ProMyProfile', ['spafoo.ctrl.ProMyProfile'])
        .config(configMyProfile);
    configMyProfile.$inject = ['$stateProvider'];
    function configMyProfile($stateProvider) {
        var ProMyProfileState = {
            name: 'ProMyProfile',
            url: '/ProMyProfile',
            templateUrl: 'app/templates/Pro-MyProfile.html',
            controller: 'ProMyProfile as pmp'
        };
        $stateProvider.state(ProMyProfileState);
    }
})();

//# sourceMappingURL=ProMyProfile.module.js.map
