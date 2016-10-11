(function () {
    'use strict';
    angular
        .module('spafoo.module.AddClientReview', ['spafoo.ctrl.AddClientReview'])
        .config(configAddClientReview);
    configAddClientReview.$inject = ['$stateProvider'];
    function configAddClientReview($stateProvider) {
        var AddClientRatingState = {
            name: 'AddClientReview',
            url: '/AddClientReview/:appId/:clientId/:pageName/:UserID/:authTxnIDField/:appointmentIDField/:payTxnIDField/:amountField/:comment',
            templateUrl: 'app/templates/Pro-AddClientReview.html',
            controller: 'AddClientReview as acr'
        };
        $stateProvider.state(AddClientRatingState);
    }
})();

//# sourceMappingURL=AddClientReview.module.js.map
