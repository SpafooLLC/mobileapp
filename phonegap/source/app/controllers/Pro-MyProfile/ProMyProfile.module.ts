((): void => {
    'use strict';

    angular
        .module('spafoo.module.ProMyProfile', ['spafoo.ctrl.ProMyProfile'])
        .config(configMyProfile);

    configMyProfile.$inject = ['$stateProvider'];

    function configMyProfile($stateProvider: angular.ui.IStateProvider) {
        var ProMyProfileState: angular.ui.IState = {
            name: 'ProMyProfile',
            url: '/ProMyProfile',
            templateUrl: 'app/templates/Pro-MyProfile.html',
            controller: 'ProMyProfile as pmp'
        };

        $stateProvider.state(ProMyProfileState);
    }
})();
