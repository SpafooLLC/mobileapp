((): void => {
    'use strict';

    angular
        .module('spafoo.module.Notification', ['spafoo.ctrl.Notification'])
        .config(configNotification);

    configNotification.$inject = ['$stateProvider'];

    function configNotification($stateProvider: angular.ui.IStateProvider) {
        var NotificationState: angular.ui.IState = {
            name: 'Notification',
            url: '/Notification',
            templateUrl: 'app/templates/Notification.html',
            controller: 'Notification as noti'
        };

        $stateProvider.state(NotificationState);
    }
})();
