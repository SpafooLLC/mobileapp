((): void => {
    'use strict';

    angular
        .module('spafoo.module.AddClientReview', ['spafoo.ctrl.AddClientReview'])
        .config(configAddClientReview);

    configAddClientReview.$inject = ['$stateProvider'];

    function configAddClientReview($stateProvider: angular.ui.IStateProvider) {
        var AddClientRatingState: angular.ui.IState = {
            name: 'AddClientReview',
            url: '/AddClientReview/:appId/:clientId/:pageName/:UserID/:authTxnIDField/:appointmentIDField/:payTxnIDField/:amountField/:comment',
            templateUrl: 'app/templates/Pro-AddClientReview.html',
            controller: 'AddClientReview as acr'
        };

        $stateProvider.state(AddClientRatingState);
    }
})();
