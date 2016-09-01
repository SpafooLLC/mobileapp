module ShareAppController {
    export interface IShareApp {
        doLogin(): void

    }
    class ShareAppController implements IShareApp {
        
        $inject = ['$state', '$scope', '$ionicLoading']
        constructor($state: angular.ui.IState, $scope: angular.IScope, $ionicLoading: ionic.loading.IonicLoadingService)
        {

        }
        doLogin()
        {

        }

    }


    angular.module('spafoo.ctrl.ShareApp',[]).controller('ShareApp',ShareAppController);

}