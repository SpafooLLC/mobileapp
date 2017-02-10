(function () {
    'use strict';
    angular
        .module('spafoo.module.TermsOfUse', [])
        .config(configTermsOfUse);
    configTermsOfUse.$inject = ['$stateProvider'];
    function configTermsOfUse($stateProvider) {
        var TermsOfUseState = {
            name: 'TermsOfUse',
            url: '/TermsOfUse',
            templateUrl: 'app/templates/TermsOfUse.html',
        };
        $stateProvider.state(TermsOfUseState);
    }
})();

//# sourceMappingURL=TermsOfUse.js.map
