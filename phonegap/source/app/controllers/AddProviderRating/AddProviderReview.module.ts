((): void => {
    'use strict';

    angular
        .module('spafoo.module.AddProviderReview', ['spafoo.ctrl.AddProviderReview'])
        .config(configAddProviderReview);

    configAddProviderReview.$inject = ['$stateProvider'];

    function configAddProviderReview($stateProvider: angular.ui.IStateProvider) {
        var AddProviderRatingState: angular.ui.IState = {
            name: 'AddProviderReview',
            url: '/AddProviderReview/:appId/:providerId',
            templateUrl: 'app/templates/AddProviderReview.html',
            controller: 'AddProviderReview as apr'
        };

        $stateProvider.state(AddProviderRatingState);
    }
})();
