((): void => {
    'use strict';

    angular
        .module('spafoo.module.ProEditProfile', ['spafoo.ctrl.ProEditProfile'])
        .config(configProEditProfile);

    configProEditProfile.$inject = ['$stateProvider'];

    function configProEditProfile($stateProvider: angular.ui.IStateProvider) {
        var ProEditProfileState: angular.ui.IState = {
            name: 'ProEditProfile',
            url: '/ProEditProfile',
            templateUrl: 'app/templates/Pro-MyProfileEdit.html',
            controller: 'ProEditProfile as pep'
        };

        $stateProvider.state(ProEditProfileState);
    }
})();
