(function () {
    'use strict';
    var moduleDependencies = [
        'ionic',
        'ui.router',
        'spafoo.module.home',
        'spafoo.module.login',
        'spafoo.module.register',
        'spafoo.httpservice',
        'toaster',
        'spafoo.ctrl.Main',
        'spafoo.module.MakeAppointment',
        'spafoo.module.MySchedule',
        'spafoo.module.BasicCreditCard',
        'spafoo.module.Services',
        'spafoo.module.MyProfile',
        'spafoo.module.RegisterProvider',
        'spafoo.module.ChangePassword',
        'spafoo.module.FindProvider',
        'spafoo.module.ProviderList', 'spafoo.httpsharedservice',
        'spafoo.module.ProviderPortfolio',
        'spafoo.module.ProReviewListing', 'spafoo.module.ScheduleDetail',
        'spafoo.module.ProMyAvailability', 'spafoo.module.ProMyScheduleLanding',
        'spafoo.module.AddProviderReview', 'spafoo.module.About', 'spafoo.module.ShareApp',
        'spafoo.module.ProMyProfile', 'spafoo.module.ProEditProfile', 'spafoo.module.ProAppointments',
        'ui.calendar', 'spafoo.module.AddClientReview', 'spafoo.module.ProAppointmentDetail',
        'spafoo.module.Notification', 'spafoo.module.ProAppointmentCompleted', 'spafoo.module.MyProfileEdit', 'angularMoment',
        'spafoo.module.ProSetSoonest'
    ];
    angular
        .module('spafoo', moduleDependencies)
        .config(configAppUrl)
        .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.views.swipeBackEnabled(true);
    });
    configAppUrl.$inject = ['$urlRouterProvider'];
    function configAppUrl($urlRouterProvider) {
        $urlRouterProvider.otherwise('home');
    }
})();

//# sourceMappingURL=app.js.map
