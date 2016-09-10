((): void => {
    'use strict';

    angular
        .module('spafoo.module.MyProfileEdit', ['spafoo.ctrl.MyProfileEdit'])
        .config(configMyProfileEdit);

    configMyProfileEdit.$inject = ['$stateProvider'];

    function configMyProfileEdit($stateProvider: angular.ui.IStateProvider) {
        var MyProfileEditState: angular.ui.IState = {
            name: 'MyProfileEdit',
            url: '/MyProfileEdit',
            templateUrl: 'app/templates/Client-MyProfileEdit.html',
            controller: 'MyProfileEdit as mpe'
        };

        $stateProvider.state(MyProfileEditState);
    }
})();
