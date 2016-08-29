module MakeAppointmentController {
    interface IMakeAppointmentController {
        UserID: number;
        ServiceData: {};
        ProviderServiceList: {};
        Address: string; City: string; State: string; Zip: string;
    }
    class MakeAppointmentController implements IMakeAppointmentController {
        UserID: number;
        ServiceData: {};
        ProviderServiceList: {};
        Address: string; City: string; State: string; Zip: string;
        static $inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp'];
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp
        ) {
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
            this.UserID = this.$window.localStorage.getItem('ProviderIDs');
            this.getProviderPortfolio(75);
        }
        getProviderPortfolio(UserID: any) {
            var self = this;

            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response: any) {
                self.ServiceData = response.GetUserInfoResult;
                self.SharedHttp.GetProviderServices(UserID).then(function (res) { self.ProviderServiceList = res; });
               
             }, function (error) {

            });
        }
        changedValue(data: any) {
            var self = this;
            alert(data);
            switch ( parseInt( data))
            {
                case 1:
                   self.GetGPSLocation(); break;
                case 2:
                    setTimeout(function () {
                        self.Address = self.ServiceData.profileField.streetField;
                        self.City = self.ServiceData.profileField.cityField;
                        self.State = self.ServiceData.profileField.regionField;
                        self.Zip = self.ServiceData.profileField.postalCodeField;
                        alert(self.Address);
                    }, 1000)
                    break;
              


            }

            

        }

        GetGPSLocation() {
            var self = this;
            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            };
            navigator.geolocation.getCurrentPosition(self.onSuccess, self.onError, options);
        }

        onSuccess(position: any) {
            alert(JSON.stringify(position));
        }

       


        onError(e: any) {
            alert(JSON.stringify(e));
        }
        CustomSaveAddress(Address: string, City: string, State: string, Zip: string)
        {
            alert("Address :: " + Address + " City :: " + City + ", State :: " + State + ", Zip :: " + Zip);
        }
        CreateAppointment(Rcd: any) {
            alert(JSON.stringify(Rcd));

            var valuesArray = $('input[name="serviceChk"]:checked').map(function () {
                return this.value;
            }).get().join("|");
            alert(valuesArray);
        }
   


    }


    angular.module('spafoo.ctrl.MakeAppointment', []).controller('MakeAppointment', MakeAppointmentController);

}