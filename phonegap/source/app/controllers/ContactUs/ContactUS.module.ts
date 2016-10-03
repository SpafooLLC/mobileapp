((): void => {
    'use strict';

    angular
        .module('spafoo.module.ContactUs', [])
        .config(configContactUs);

    configContactUs.$inject = ['$stateProvider'];

    function configContactUs($stateProvider: angular.ui.IStateProvider) {
        var ContactUsState: angular.ui.IState = {
            name: 'ContactUs',
            url: '/ContactUs',
            templateUrl: 'app/templates/ContactUs.html',
            
        };

        $stateProvider.state(ContactUsState);
    }
})();
