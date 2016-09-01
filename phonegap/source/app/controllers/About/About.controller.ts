module AboutController {
    export interface IAbout {
        doLogin(): void

    }
    class AboutController implements IAbout {
        
        $inject = ['$state', '$scope', '$ionicLoading']
        constructor($state: angular.ui.IState, $scope: angular.IScope, $ionicLoading: ionic.loading.IonicLoadingService)
        {

        }
        doLogin()
        {

        }

    }


    angular.module('spafoo.ctrl.About',[]).controller('About',AboutController);

}