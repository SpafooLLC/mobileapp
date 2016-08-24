module MyScheduleController {
    export interface IMySchedule {
        doLogin(): void

    }
    class MyScheduleController implements IMySchedule {
        
        $inject = ['$state', '$scope', '$ionicLoading']
        constructor($state: angular.ui.IState, $scope: angular.IScope, $ionicLoading: ionic.loading.IonicLoadingService)
        {

        }
        doLogin()
        {

        }

    }


    angular.module('spafoo.ctrl.MySchedule',[]).controller('MySchedule',MyScheduleController);

}