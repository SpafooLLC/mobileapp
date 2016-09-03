(function () {
    'use strict';
    angular
        .module('spafoo.module.ProEditProfile', ['spafoo.ctrl.ProEditProfile'])
        .config(configProEditProfile);
    configProEditProfile.$inject = ['$stateProvider'];
    function configProEditProfile($stateProvider) {
        var ProEditProfileState = {
            name: 'ProEditProfile',
            url: '/ProEditProfile',
            templateUrl: 'app/templates/Pro-MyProfileEdit.html',
            controller: 'ProEditProfile as pep'
        };
        $stateProvider.state(ProEditProfileState);
    }
})();

//# sourceMappingURL=ProEditProfile.module.js.map
