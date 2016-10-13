(function () {
    'use strict';
    angular
        .module('spafoo.module.ContactUs', [])
        .config(configContactUs);
    configContactUs.$inject = ['$stateProvider'];
    function configContactUs($stateProvider) {
        var ContactUsState = {
            name: 'ContactUs',
            url: '/ContactUs',
            templateUrl: 'app/templates/ContactUs.html',
        };
        $stateProvider.state(ContactUsState);
    }
})();

//# sourceMappingURL=FindProvider.module.js.map
