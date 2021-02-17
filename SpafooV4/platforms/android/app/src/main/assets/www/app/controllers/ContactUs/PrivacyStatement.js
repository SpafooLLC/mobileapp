(function () {
    'use strict';
    angular
        .module('spafoo.module.PrivacyStatement', [])
        .config(configPrivacyStatement);
    configPrivacyStatement.$inject = ['$stateProvider'];
    function configPrivacyStatement($stateProvider) {
        var PrivacyStatementState = {
            name: 'PrivacyStatement',
            url: '/PrivacyStatement',
            templateUrl: 'app/templates/PrivacyStatement.html',
        };
        $stateProvider.state(PrivacyStatementState);
    }
})();

//# sourceMappingURL=PrivacyStatement.js.map
