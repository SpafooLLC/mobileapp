((): void => {
    'use strict';

    angular
        .module('spafoo.module.MyProfile', ['spafoo.ctrl.MyProfile'])
        .config(configMyProfile);

    configMyProfile.$inject = ['$stateProvider'];

    function configMyProfile($stateProvider: angular.ui.IStateProvider) {
        var MyProfileState: angular.ui.IState = {
            name: 'MyProfile',
            url: '/MyProfile',
            templateUrl: 'app/templates/MyProfile.html',
            controller: 'MyProfile as mp'
        };

        $stateProvider.state(MyProfileState);
    }
})();
