(function () {
    'use strict';
    angular
        .module('spafoo.module.ProReviewListing', ['spafoo.ctrl.ProReviewListing'])
        .config(configProReviewListing);
    configProReviewListing.$inject = ['$stateProvider'];
    function configProReviewListing($stateProvider) {
        var ProReviewListingState = {
            name: 'ProReviewListing',
            url: '/ProReviewListing/:userId',
            templateUrl: 'app/templates/Pro-ReviewListing.html',
            controller: 'ProReviewListing as prl'
        };
        $stateProvider.state(ProReviewListingState);
    }
})();

//# sourceMappingURL=Pro-ReviewListing.module.js.map
