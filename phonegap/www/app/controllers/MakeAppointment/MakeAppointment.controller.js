var MakeAppointmentController;
(function (MakeAppointmentController_1) {
    var MakeAppointmentController = (function () {
        function MakeAppointmentController($q, $state, $scope, $location, CustomerHttp, $window, SharedHttp, $stateParams) {
            this.$q = $q;
            this.$state = $state;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.SharedHttp = SharedHttp;
            this.$stateParams = $stateParams;
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
            this.getProviderPortfolio($stateParams.userId);
            //$("#addressfield").val('result.subThoroughfare + " " + result.thoroughfare;');
            //setTimeout(function () {
            //    $("#addressfield").val('result.subThoroughfare + " " + result.thoroughfare;');
            //    this.address = 'result.subThoroughfare + " " + result.thoroughfare;'
            //    this.city = 'result.locality';
            //    this.state = 'result.adminArea';
            //    this.zip = 'result.postalCode';
            //}, 5000);
        }
        MakeAppointmentController.prototype.getProviderPortfolio = function (UserID) {
            var self = this;
            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response) {
                self.ServiceData = response.GetUserInfoResult;
                self.SharedHttp.GetProviderServices(UserID).then(function (res) { self.ProviderServiceList = res; });
            }, function (error) {
            });
        };
        MakeAppointmentController.prototype.changedValue = function (data) {
            //   alert("changed value called");
            var self = this;
            // alert(data);
            switch (parseInt(data)) {
                case 1:
                    self.GetGPSLocation();
                    break;
                case 2:
                    //self.address = self.ServiceData.profileField.streetField;
                    //self.city = self.ServiceData.profileField.cityField;
                    //self.state = self.ServiceData.profileField.regionField;
                    //self.zip = self.ServiceData.profileField.postalCodeField;
                    //alert(self.address);
                    $("#addressfield").val(self.ServiceData.profileField.streetField);
                    $("#cityfield").val(self.ServiceData.profileField.cityField);
                    $("#statefield").val(self.ServiceData.profileField.regionField);
                    $("#zipfield").val(self.ServiceData.profileField.postalCodeField);
                    break;
                case 3:
                    $("#addressfield").val('');
                    $("#cityfield").val('');
                    $("#statefield").val('');
                    $("#zipfield").val('');
            }
        };
        MakeAppointmentController.prototype.GetGPSLocation = function () {
            var self = this;
            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            };
            navigator.geolocation.getCurrentPosition(self.onSuccess, self.onError, options);
        };
        MakeAppointmentController.prototype.onSuccess = function (position) {
            var self = this;
            var GOOGLE = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            //    alert("onsuccess navigation called");
            var request = {
                'position': GOOGLE
            };
            plugin.google.maps.Geocoder.geocode(request, function (results) {
                if (results.length) {
                    var result = results[0];
                    var position = result.position;
                    var addressfield = [
                        result.subThoroughfare || "",
                        result.thoroughfare || "",
                        result.locality || "",
                        result.adminArea || "",
                        result.postalCode || "",
                        result.country || ""].join(", ");
                    //alert("results are" + addressfield);
                    //alert("address are" + result.subThoroughfare + " " + result.thoroughfare);
                    //alert("city are" + result.locality);
                    //alert("state are" + result.adminArea);
                    //alert("zip are" + result.postalCode);
                    $("#addressfield").val(result.subThoroughfare + " " + result.thoroughfare);
                    $("#cityfield").val(result.locality);
                    $("#statefield").val(result.adminArea);
                    $("#zipfield").val(result.postalCode);
                }
                else {
                    alert("Not found");
                }
            });
            alert(JSON.stringify(position));
        };
        MakeAppointmentController.prototype.onError = function (e) {
            alert(JSON.stringify(e));
        };
        MakeAppointmentController.prototype.CustomSaveAddress = function (Address, City, State, Zip) {
            alert("Address :: " + Address + " City :: " + City + ", State :: " + State + ", Zip :: " + Zip);
        };
        MakeAppointmentController.prototype.CreateAppointment = function (Rcd) {
            alert(JSON.stringify(Rcd));
            var valuesArray = $('input[name="serviceChk"]:checked').map(function () {
                return this.value;
            }).get().join("|");
            alert(valuesArray);
        };
        MakeAppointmentController.$inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp', '$stateParams'];
        return MakeAppointmentController;
    }());
    angular.module('spafoo.ctrl.MakeAppointment', []).controller('MakeAppointment', MakeAppointmentController);
})(MakeAppointmentController || (MakeAppointmentController = {}));

//# sourceMappingURL=MakeAppointment.controller.js.map
