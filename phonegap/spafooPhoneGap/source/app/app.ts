
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
        'spafoo.module.ProviderList'
         ];

    angular
        .module('spafoo', moduleDependencies)
        .config(configAppUrl)
      .config(function ($ionicConfigProvider: any) {
          $ionicConfigProvider.views.maxCache(0);
          $ionicConfigProvider.views.swipeBackEnabled(true);
        })

    configAppUrl.$inject = ['$urlRouterProvider'];

    function configAppUrl($urlRouterProvider: angular.ui.IUrlRouterProvider): void {
        $urlRouterProvider.otherwise('home');
    }
})();