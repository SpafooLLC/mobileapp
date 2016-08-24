module homeController {
    export interface Ihome {
        doLogin(): void

    }
    class homeController implements Ihome {
        
        $inject = ['$state', '$scope', '$ionicLoading']
        constructor($state: angular.ui.IState, $scope: angular.IScope, $ionicLoading: ionic.loading.IonicLoadingService)
        {

        }
        doLogin()
        {

        }

    }


    angular.module('spafoo.ctrl.home',[]).controller('home',homeController);

}