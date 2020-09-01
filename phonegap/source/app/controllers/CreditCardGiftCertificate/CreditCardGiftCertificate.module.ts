((): void => {
    'use strict';

    angular
        .module('spafoo.module.CreditCardGiftCertificate', ['spafoo.ctrl.CreditCardGiftCertificate'])
        .config(configCreditCardGiftCertificate);

    configCreditCardGiftCertificate.$inject = ['$stateProvider'];

    function configCreditCardGiftCertificate($stateProvider: angular.ui.IStateProvider) {
        var CreditCardGiftCertificateState: angular.ui.IState = {
            name: 'CreditCardGiftCertificate',
            url: '/CreditCardGiftCertificate/:GiftToFirstName/:GiftToLastName/:GiftToEmailID/:Message/:Amount',
            templateUrl: 'app/templates/CreditCardGiftCertificate.html',
            controller: 'CreditCardGiftCertificate as ccgc'
        };

        $stateProvider.state(CreditCardGiftCertificateState);
    }
})();
