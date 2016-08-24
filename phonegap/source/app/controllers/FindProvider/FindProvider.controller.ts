module FindProviderController {
    export interface IFindProvider {
        doLogin(): void

    }
    class FindProviderController implements IFindProvider {

        $inject = ['$state', '$scope', '$ionicLoading']
        constructor($state: angular.ui.IState, $scope: angular.IScope, $ionicLoading: ionic.loading.IonicLoadingService) {
            this.doLogin();
        }
        doLogin() {
            alert("hi provider");
        }
    }


    angular.module('spafoo.ctrl.FindProvider', []).controller('FindProvider', FindProviderController);

}