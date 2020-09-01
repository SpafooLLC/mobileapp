(function () {
    'use strict';
    angular
        .module('spafoo.module.GiftCertificate', ['spafoo.ctrl.GiftCertificate'])
        .config(configGiftCertificate);
    configGiftCertificate.$inject = ['$stateProvider'];
    function configGiftCertificate($stateProvider) {
        var GiftCertificateState = {
            name: 'GiftCertificate',
            url: '/GiftCertificate',
            templateUrl: 'app/templates/GiftCertificate.html',
            controller: 'GiftCertificate as giftCert'
        };
        $stateProvider.state(GiftCertificateState);
    }
})();

//# sourceMappingURL=GiftCertificate.module.js.map
