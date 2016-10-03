
((): void => {
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
        'spafoo.module.ProSetSoonest', "spafoo.module.ContactUs", 'spafoo.module.AvailableCities'
         ];

    angular
        .module('spafoo', moduleDependencies)
        .config(configAppUrl)
      .config(function ($ionicConfigProvider: any) {
          $ionicConfigProvider.views.maxCache(0);
          $ionicConfigProvider.views.swipeBackEnabled(true);
        })
        .run(function ($ionicPlatform: any) {
            var tabClick = 0;
            $ionicPlatform.registerBackButtonAction(function () {
                if (tabClick === 0) {
                    tabClick++;
                    var loc = window.location.href;

                    if (loc.substr(loc.lastIndexOf('/') + 1) != 'home') {

                        window.history.go(-1);
                    }
                    setTimeout(function () { tabClick = 0 }, 1000);

                } else {
                    //alert(tabClick + ':else');
                    navigator.app.exitApp();
                }
            }, 100);
        })

    configAppUrl.$inject = ['$urlRouterProvider'];

    function configAppUrl($urlRouterProvider: angular.ui.IUrlRouterProvider): void {
        $urlRouterProvider.otherwise('home');
    }
})();
