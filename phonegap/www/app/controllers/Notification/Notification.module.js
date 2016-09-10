(function () {
    'use strict';
    angular
        .module('spafoo.module.Notification', ['spafoo.ctrl.Notification'])
        .config(configNotification);
    configNotification.$inject = ['$stateProvider'];
    function configNotification($stateProvider) {
        var NotificationState = {
            name: 'Notification',
            url: '/Notification',
            templateUrl: 'app/templates/Notification.html',
            controller: 'Notification as noti'
        };
        $stateProvider.state(NotificationState);
    }
})();

//# sourceMappingURL=Notification.module.js.map
