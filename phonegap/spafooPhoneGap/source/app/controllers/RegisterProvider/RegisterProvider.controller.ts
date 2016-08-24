module RegisterProviderController {
    export interface IRegisterProvider {
        doLogin(): void

    }
    class RegisterProviderController implements IRegisterProvider {
        
        $inject = ['$state', '$scope', '$ionicLoading']
        constructor($state: angular.ui.IState, $scope: angular.IScope, $ionicLoading: ionic.loading.IonicLoadingService)
        {

        }
        doLogin()
        {

        }

    }


    angular.module('spafoo.ctrl.RegisterProvider',[]).controller('RegisterProvider',RegisterProviderController);

}