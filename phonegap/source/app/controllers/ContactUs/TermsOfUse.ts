((): void => {
    'use strict';

    angular
        .module('spafoo.module.TermsOfUse', [])
        .config(configTermsOfUse);

    configTermsOfUse.$inject = ['$stateProvider'];

    function configTermsOfUse($stateProvider: angular.ui.IStateProvider) {
        var TermsOfUseState: angular.ui.IState = {
            name: 'TermsOfUse',
            url: '/TermsOfUse',
            templateUrl: 'app/templates/TermsOfUse.html',

        };

        $stateProvider.state(TermsOfUseState);
    }
})();
