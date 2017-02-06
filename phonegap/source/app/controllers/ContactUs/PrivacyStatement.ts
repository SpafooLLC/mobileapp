((): void => {
    'use strict';

    angular
        .module('spafoo.module.PrivacyStatement', [])
        .config(configPrivacyStatement);

    configPrivacyStatement.$inject = ['$stateProvider'];

    function configPrivacyStatement($stateProvider: angular.ui.IStateProvider) {
        var PrivacyStatementState: angular.ui.IState = {
            name: 'PrivacyStatement',
            url: '/PrivacyStatement',
            templateUrl: 'app/templates/PrivacyStatement.html',

        };

        $stateProvider.state(PrivacyStatementState);
    }
})();
