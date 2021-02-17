module ProAppointmentDetailController {

    class ProAppointmentDetailController {
        AppID: number;
        ServiceData: any;
        amountField: any;
        authTxnIDField: any;
        mapDiv: any;
        mapOptions: any;
        static clientsPosition: any;
        static map: any;
        currloc: any;
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

            // document.addEventListener("deviceready", function () {

            //     var self = this;
            //     self.mapDiv = document.getElementById("map_area");


            //     const init = new plugin.google.maps.LatLng(-1, -1);
            //     self.mapOptions = {
            //         'backgroundColor': 'white',
            //         'mapType': plugin.google.maps.MapTypeId.ROADMAP,
            //         'controls': {
            //             'compass': true,
            //             'myLocationButton': true,
            //             'indoorPicker': true,
            //             'zoom': true
            //         },
            //         'gestures': {
            //             'scroll': true,

            //             'rotate': true,
            //             'zoom': true
            //         },
            //         'camera': {
            //             'latLng': init,

            //             'zoom': 15,
            //             //'bearing': 50
            //         }
            //     };
            //     ProAppointmentDetailController.map = plugin.google.maps.Map.getMap(self.mapDiv, self.mapOptions);
            //     ProAppointmentDetailController.map.on(plugin.google.maps.event.MAP_CLICK, function () {

            //         $("#infowindow").hide();
            //         //self.infoWindow = false;

            //     });
            //     // You have to wait the MAP_READY event.
            // });

        }

        NavigateMaps() {
          var self = this;
            // var options = {
            //     enableHighAccuracy: true,
            //     maximumAge: 3600000
            // };
            // navigator.geolocation.getCurrentPosition(function (e) {


            //     launchnavigator.navigate([e.coords.latitude, e.coords.longitude], {
            //         start: self.clientsPosition
            //     });

            // }, function (e) { }, options);
 var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            };
            
            navigator.geolocation.getCurrentPosition(self.onSuccess, self.onError, options);
           
        }

onSuccess(position: any) {
            var self = this;
            ProAppointmentDetailController.currentLatLong = position;
          //  alert(JSON.stringify(position));
           // alert(JSON.stringify(ProAppointmentDetailController.currentLatLong.coords.latitude + ", " + ProAppointmentDetailController.currentLatLong.coords.longitude))
        //    alert(JSON.stringify(ProAppointmentDetailController.clientsPosition))
            launchnavigator.navigate([parseFloat(ProAppointmentDetailController.clientsPosition.split(',')[0]), parseFloat(ProAppointmentDetailController.clientsPosition.split(',')[1])], {
                start: ProAppointmentDetailController.currentLatLong.coords.latitude + "," + ProAppointmentDetailController.currentLatLong.coords.longitude

            });
           
        }
        onError() {
         
        }
        getClientSchedular(AppID: any) {
            var self = this;
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
            self.CustomerHttp.get('/GetAppointment/' + AppID).then(function (response: any) {
                self.ServiceData = response.GetAppointmentResult;
                var orderdt = self.SharedHttp.getFormatedDate(self.ServiceData.forDateField, "weekday dd MMMM yyyy");
               self.ServiceData.PID =self.ServiceData.customerProfileIDField;
                self.ServiceData.PPID = self.ServiceData.payProfileIDField; 
                self.ServiceData.discount = self.ServiceData.discountField; 
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
                    self.ServiceData.displayNameField = res.firstNameField + " " + res.lastNameField[0] + ".";
                    self.ServiceData.telephoneField = res.profileField.cellField;
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
                    ProAppointmentDetailController.clientsPosition = position.lat + ',' + position.lng;
                    ProAppointmentDetailController.map.addMarker({
                        'position': position,
                        'icon': 'data:image/png;base64,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',

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