((): void => {
    'use strict';

    angular
        .module('spafoo.module.ProReviewListing', ['spafoo.ctrl.ProReviewListing'])
        .config(configProReviewListing);

    configProReviewListing.$inject = ['$stateProvider'];

    function configProReviewListing($stateProvider: angular.ui.IStateProvider) {
        var ProReviewListingState: angular.ui.IState = {
            name: 'ProReviewListing',
            url: '/ProReviewListing',
            templateUrl: 'app/templates/Pro-ReviewListing.html',
            controller: 'ProReviewListing as prl'
        };

        $stateProvider.state(ProReviewListingState);
    }
})();
