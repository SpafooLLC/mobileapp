(function () {
    'use strict';
    angular
        .module('spafoo.module.CreditCardGiftCertificate', ['spafoo.ctrl.CreditCardGiftCertificate'])
        .config(configCreditCardGiftCertificate);
    configCreditCardGiftCertificate.$inject = ['$stateProvider'];
    function configCreditCardGiftCertificate($stateProvider) {
        var CreditCardGiftCertificateState = {
            name: 'CreditCardGiftCertificate',
            url: '/CreditCardGiftCertificate/:GiftToFirstName/:GiftToLastName/:GiftToEmailID/:Message/:Amount',
            templateUrl: 'app/templates/CreditCardGiftCertificate.html',
            controller: 'CreditCardGiftCertificate as ccgc'
        };
        $stateProvider.state(CreditCardGiftCertificateState);
    }
})();

//# sourceMappingURL=CreditCardGiftCertificate.module.js.map
