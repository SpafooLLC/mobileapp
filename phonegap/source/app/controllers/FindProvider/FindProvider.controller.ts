module FindProviderController {
    class FindProviderController{
        initialLatLong: any;
        getServicesName: any;
        mapOptions: any;
       mapDiv: any;
        static map: any;
        $inject = ['$state', '$scope', '$ionicLoading', 'CustomerHttp']
        constructor(
            private $state: angular.ui.IState,
            private $scope: angular.IScope,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp) {
            var self = this;
          
            document.addEventListener("deviceready", function () {
           
               
                // Initialize the map plugin
                var options = {
                    enableHighAccuracy: true,
                    maximumAge: 3600000
                };
                navigator.geolocation.getCurrentPosition(self.onSuccess, self.onError, options);
               
                //navigator.geolocation.getCurrentPosition(self.geolocationSuccess, self.geoLocationError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: false });
                alert("positions" + JSON.stringify(self.initialLatLong));
            });
            self.doSearchProvider();
        }
        doSearchProvider()
        {
            var self = this;
            this.CustomerHttp.get("/ListRootBottomService").then(function (response:any) {
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
                    alert('code: ' + e.code + '\n' + 'message: ' + e.message + '\n');


                });
        }
        onSuccess(position: any) {
            var self = this;
            self.mapDiv = document.getElementById("map_canvas");
         
            alert('mapdiv option' + self.mapDiv);
            const init = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
                    'tilt': 30,
                    'zoom': 15,
                    'bearing': 50
                }
            };
            FindProviderController.map = plugin.google.maps.Map.getMap(self.mapDiv, self.mapOptions);
            // You have to wait the MAP_READY event.
        }
        onError(e: any)
        {
            alert(JSON.stringify(e));
        }
        getProviders(service: any) {
            var self = this;
            FindProviderController.map.clear();
            self.CustomerHttp.get('/ListProvidersByServices/' + service).then(function (response:any) {
                for (var i = 0; i < response.ListProvidersByServicesResult.length; i++) {
                    self.addMarkers(response.ListProvidersByServicesResult[i].vanityUrlField);
                }
            }, function (e) {

            })

        }
        addMarkers(latlongval: any)
        {
            var lat = latlongval.substring(0, latlongval.indexOf(':'));
            var long = latlongval.substring(latlongval.indexOf(':') + 1);
            const providerLoc = new plugin.google.maps.LatLng(lat, long);
         
        
                FindProviderController.map.addMarker({
                    'position': providerLoc,

                    'title': "Hello GoogleMap for Cordova!"
                }, function (marker:any) {

                    marker.showInfoWindow();
                    marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function () {
                        alert("Marker is clicked");
                    });

                });

            
        }

    }


    angular.module('spafoo.ctrl.FindProvider',[]).controller('FindProvider',FindProviderController);

}