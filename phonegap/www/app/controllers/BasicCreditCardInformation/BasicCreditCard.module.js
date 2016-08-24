(function () {
    'use strict';
    angular
        .module('spafoo.module.BasicCreditCard', ['spafoo.ctrl.BasicCreditCard'])
        .config(configBasicCreditCard);
    configBasicCreditCard.$inject = ['$stateProvider'];
    function configBasicCreditCard($stateProvider) {
        var BasicCreditCardState = {
            name: 'BasicCreditCard',
            url: '/BasicCreditCard',
            templateUrl: 'app/templates/CreditCardInformation.html',
            controller: 'BasicCreditCard as cc'
        };
        $stateProvider.state(BasicCreditCardState);
    }
})();

//# sourceMappingURL=BasicCreditCard.module.js.map
