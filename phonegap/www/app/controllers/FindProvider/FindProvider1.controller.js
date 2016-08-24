var FindProviderController;
(function (FindProviderController_1) {
    var FindProviderController = (function () {
        function FindProviderController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            alert("prividers hi");
            var self = this;
            document.addEventListener("deviceready", function () {
                // Define a div tag with id="map_canvas"
                self.mapDiv = document.getElementById("map_canvas");
                // Initialize the map plugin
                self.initialLatLong = navigator.geolocation.getCurrentPosition(self.geolocationSuccess);
                var init = new plugin.google.maps.LatLng(self.initialLatLong.lat, self.initialLatLong.long);
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
                self.map.on(plugin.google.maps.event.MAP_READY, function onMapInit(map1) {
                    map1.showDialog();
                });
            });
            self.doLogin();
        }
        FindProviderController.prototype.geolocationSuccess = function (position) {
            alert('position called' + JSON.stringify(position));
            return {
                lat: position.coords.latitude, long: position.coords.longitude
            };
        };
        FindProviderController.prototype.doLogin = function () {
            var self = this;
            this.CustomerHttp.get("/ListRootBottomService").then(function (response) {
                var _Final = "";
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
                });
                $('#ddlServices').html(_Final);
                self.getServicesName = response.ListRootBottomServiceResult;
            }, function (e) {
                alert(JSON.stringify(e));
            });
        };
        FindProviderController.prototype.getProviders = function (service) {
            var self = this;
            self.CustomerHttp.get('/ListProvidersByServices/' + service).then(function (response) {
                for (var i = 0; i < response.ListProvidersByServicesResult.length; i++) {
                    self.addMarkers(response.ListProvidersByServicesResult[i].vanityUrlField);
                }
            }, function (e) {
            });
        };
        FindProviderController.prototype.addMarkers = function (latlong) {
            var self = this;
            alert(latlong);
            var lat = latlong.substring(0, latlong.indexOf(':'));
            var long = latlong.substring(latlong.indexOf(':') + 1);
            alert(lat + '  ' + long);
            var GOOGLE = new plugin.google.maps.LatLng(lat, long);
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
                }, function (marker) {
                    marker.showInfoWindow();
                });
            });
        };
        FindProviderController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window'];
        return FindProviderController;
    }());
    angular.module('spafoo.ctrl.FindProvider', []).controller('FindProvider', FindProviderController);
})(FindProviderController || (FindProviderController = {}));

//# sourceMappingURL=FindProvider1.controller.js.map
