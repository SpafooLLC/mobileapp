module MakeAppointmentController {
    export interface IMakeAppointment {
        doLogin(): void

    }
    class MakeAppointmentController implements IMakeAppointment {
        
        $inject = ['$state', '$scope', '$ionicLoading']
        constructor($state: angular.ui.IState, $scope: angular.IScope, $ionicLoading: ionic.loading.IonicLoadingService)
        {
            var mySelect = $('#first-disabled2');
            $('#special').on('click', function () {
                mySelect.find('option:selected').prop('disabled', true);
                mySelect.selectpicker('refresh');
            });

            $('#special2').on('click', function () {
                mySelect.find('option:disabled').prop('disabled', false);
                mySelect.selectpicker('refresh');
            });
            $('#basic2').selectpicker({
                liveSearch: true,
                maxOptions: 1
            });
        }
        doLogin()
        {

        }

    }


    angular.module('spafoo.ctrl.MakeAppointment',[]).controller('MakeAppointment',MakeAppointmentController);

}