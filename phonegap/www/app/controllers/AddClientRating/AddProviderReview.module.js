(function () {
    'use strict';
    angular
        .module('spafoo.module.AddProviderReview', ['spafoo.ctrl.AddProviderReview'])
        .config(configAddProviderReview);
    configAddProviderReview.$inject = ['$stateProvider'];
    function configAddProviderReview($stateProvider) {
        var AddProviderRatingState = {
            name: 'AddProviderReview',
            url: '/AddProviderReview/:appId/:providerId',
            templateUrl: 'app/templates/AddProviderReview.html',
            controller: 'AddProviderReview as apr'
        };
        $stateProvider.state(AddProviderRatingState);
    }
})();

//# sourceMappingURL=AddProviderReview.module.js.map
