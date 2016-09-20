module ProAppointmentDetailController {

    class ProAppointmentDetailController {
        AppID: number;
        ServiceData: any;
        amountField: any;
        authTxnIDField: any;
        mapDiv: any;
        mapOptions: any;
        static map: any;
        static currentLatLong: any;
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
            var self = this;
            this.AppID = this.$window.localStorage.getItem('AppointmentIDs');
            this.getClientSchedular(this.AppID);

            document.addEventListener("deviceready", function () {

                var self = this;
                self.mapDiv = document.getElementById("map_area");


                const init = new plugin.google.maps.LatLng(-1, -1);
                self.mapOptions = {
                    'backgroundColor': 'white',
                    'mapType': plugin.google.maps.MapTypeId.ROADMAP,
                    'controls': {
                        'compass': true,
                        'myLocationButton': true,
                        'indoorPicker': true,
                        'zoom': true
                    },
                    'gestures': {
                        'scroll': true,

                        'rotate': true,
                        'zoom': true
                    },
                    'camera': {
                        'latLng': init,

                        'zoom': 15,
                        //'bearing': 50
                    }
                };
                ProAppointmentDetailController.map = plugin.google.maps.Map.getMap(self.mapDiv, self.mapOptions);
                ProAppointmentDetailController.map.on(plugin.google.maps.event.MAP_CLICK, function () {

                    $("#infowindow").hide();
                    //self.infoWindow = false;

                });
                // You have to wait the MAP_READY event.
            });

        }

        getClientSchedular(AppID: any) {
            var self = this;
            self.CustomerHttp.get('/GetAppointment/' + AppID).then(function (response: any) {
                self.ServiceData = response.GetAppointmentResult;
                var orderdt = self.SharedHttp.getFormatedDate(self.ServiceData.forDateField, "weekday dd MMMM yyyy");
                self.ServiceData.orderDateField = orderdt;
                self.ServiceData.atTimeField = self.SharedHttp.getFormatedTime(self.ServiceData.atTimeField);
                self.ServiceData.DayField = orderdt.split(' ')[1];
                self.ServiceData.MonthField = orderdt.split(' ')[2];
                self.amountField = self.ServiceData.amountField;
                self.authTxnIDField = self.ServiceData.authTxnIDField;
                self.SharedHttp.GetAddressInfo(self.ServiceData.appointmentIDField).then(function (e: any) { self.ServiceData.addressField = e; self.addMarkers(); });
                var serviceName = "";
                $.each(self.ServiceData.servicesField, function (ig, sitem) {
                    serviceName += sitem.serviceNameField + ",";
                });
                self.ServiceData.ServiceList = serviceName.substr(0, serviceName.lastIndexOf(','));
                self.SharedHttp.GetUserInfo(self.ServiceData.clientIDField).then(function (res: any) {
                    self.ServiceData.displayNameField = res.displayNameField;
                    //self.SharedHttp.getProfilePics(res.profileField.photoField).then(function (imgres) { self.ServiceData.profilePic = imgres; });

                });
                

                //self.CustomerHttp.get('/GetUserJSON/' + self.ServiceData.clientIDField).then(function (res: any) {
                //    var userInf = JSON.parse(res.GetUserJSONResult);
                //    console.log(userInf);
                //    self.ServiceData.displayNameField = userInf.DisplayName;
                //}, function (error: any) { 
                //})

                //console.log(response);
            }, function (error) {
            });
        }


        addMarkers() {

            var self = this;
            //var currentlatlong = { latitude: FindProviderController.currentLatLong.coords.latitude, longitude: FindProviderController.currentLatLong.coords.longitude };
            var request = {
                'address': self.ServiceData.addressField
            };
            plugin.google.maps.Geocoder.geocode(request, function (results: any) {
                //alert(JSON.stringify(results));
                if (results.length) {
                    var result = results[0];
                    var position = result.position;

                    ProAppointmentDetailController.map.addMarker({
                        'position': position,
                        'title': self.ServiceData.displayNameField
                    }, function (marker) {

                        ProAppointmentDetailController.map.animateCamera({
                            'target': position,
                            'zoom': 17
                        }, function () {
                            marker.showInfoWindow();
                        });

                    });
                } else {
                    //alert("Not found");
                }

            });
            
        }

    }


    angular.module('spafoo.ctrl.ProAppointmentDetail', []).controller('ProAppointmentDetail', ProAppointmentDetailController);

}