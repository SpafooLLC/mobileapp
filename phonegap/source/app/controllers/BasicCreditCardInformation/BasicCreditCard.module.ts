((): void => {
    'use strict';

    angular
        .module('spafoo.module.BasicCreditCard', ['spafoo.ctrl.BasicCreditCard'])
        .config(configBasicCreditCard);

    configBasicCreditCard.$inject = ['$stateProvider'];

    function configBasicCreditCard($stateProvider: angular.ui.IStateProvider) {
        var BasicCreditCardState: angular.ui.IState = {
            name: 'BasicCreditCard',
            url: '/BasicCreditCard',
            templateUrl: 'app/templates/CreditCardInformation.html',
            controller: 'BasicCreditCard as cc'
        };

        $stateProvider.state(BasicCreditCardState);
    }
})();
