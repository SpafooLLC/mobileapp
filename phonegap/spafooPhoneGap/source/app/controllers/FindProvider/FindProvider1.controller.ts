module FindProviderController {
  
    class FindProviderController  {
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window'];
           getServicesName: any;
        mapDiv: any;
        map: any;
        mapOptions: {};
        initialLatLong: any; 
        messages: string;
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService
        ) {
            alert("prividers hi");
  var self = this;
          
            document.addEventListener("deviceready", function () {
                // Define a div tag with id="map_canvas"
                self.mapDiv = document.getElementById("map_canvas");

                // Initialize the map plugin
                self.initialLatLong = navigator.geolocation.getCurrentPosition(self.geolocationSuccess);
                const init = new plugin.google.maps.LatLng(self.initialLatLong.lat, self.initialLatLong.long);
                self.mapOptions = {
                    'backgroundColor': 'white',
                    'mapType': plugin.google.maps.MapTypeId.HYBRID,
                    'controls': {
                        'compass': true,
                        'myLocationButton': true,
                        'indoorPicker': true,
                        'zoom': true
                    },
                    'gestures': {
                        'scroll': true,
                        'tilt': true,
                        'rotate': true,
                        'zoom': true
                    },
                    'camera': {
                        'latLng': init,
                        'tilt': 30,
                        'zoom': 15,
                        'bearing': 50
                    }
                };
                self.map = plugin.google.maps.Map.getMap(self.mapDiv, self.mapOptions);

                // You have to wait the MAP_READY event.
                self.map.on(plugin.google.maps.event.MAP_READY, function onMapInit(map1: any) {
                   map1.showDialog();
                });

            });
            self.doLogin();
        }



        geolocationSuccess(position: any) {
            alert('position called'+JSON.stringify(position));
            return {
                lat: position.coords.latitude, long: position.coords.longitude
            } 

        }
        doLogin() {
            var self = this;
            this.CustomerHttp.get("/ListRootBottomService").then(function (response) {

                var _Final = ""
                $.each(response.ListRootBottomServiceResult, function (i, o) {
                    debugger;
                    if (o.parentIDField == -1) {
                        if (_Final.trim() == '') {
                            _Final = "<option value='-1'>Select Service</option><optgroup label='" + o.serviceNameField + "'>";
                        }
                        else
                            _Final += "</optgroup><optgroup label='" + o.serviceNameField + "'>";
                    }
                    else {
                        _Final += "<option value='" + o.serviceIDField + "'>" + o.serviceNameField + "</option>";
                    }
                })
                $('#ddlServices').html(_Final);
                self.getServicesName = response.ListRootBottomServiceResult;
            },
                function (e) {
                    alert(JSON.stringify(e));


                });
        }
        getProviders(service: any) {
            var self = this;
            self.CustomerHttp.get('/ListProvidersByServices/' + service).then(function (response) {
                for (var i = 0; i < response.ListProvidersByServicesResult.length; i++) {
                    self.addMarkers(response.ListProvidersByServicesResult[i].vanityUrlField);
                }
            }, function (e) {

            })

        }
        addMarkers(latlong: any) {
            var self = this;
            alert(latlong);
            var lat = latlong.substring(0, latlong.indexOf(':'));
            var long = latlong.substring(latlong.indexOf(':') + 1);
            alert(lat + '  ' + long);
            const GOOGLE = new plugin.google.maps.LatLng(lat, long);
            self.map = plugin.google.maps.Map.getMap(self.mapDiv, {
                'camera': {
                    'latLng': GOOGLE,
                    'zoom': 17
                }
            });
            self.map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
                self.map.addMarker({
                    'position': GOOGLE,
                    'title': "Hello GoogleMap for Cordova!"
                }, function (marker: any) {
                    marker.showInfoWindow();
                });
            });



        }

    }
    angular.module('spafoo.ctrl.FindProvider',[]).controller('FindProvider',FindProviderController);

}