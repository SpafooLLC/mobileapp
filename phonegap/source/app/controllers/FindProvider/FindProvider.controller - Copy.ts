﻿module FindProviderController {
    class FindProviderController {
        initialLatLong: any;
        getServicesName: any;
        mapOptions: any;
        mapDiv: any;
        ServiceData: {};
        profilePic: string;
        TagField: string;
        userName: string;
        distance: any;
        infoWindow: boolean;
        userId: number;
        customerType: string;
        messages: string;
        static currentLatLong: any;
        static map: any = 0;
        $inject = ['$state', '$scope', '$ionicLoading', 'CustomerHttp', 'SharedHttp', '$q', '$window']
        constructor(
            private $state: angular.ui.IStateService,
            private $scope: angular.IScope,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp,
            private $q: ng.IQService,
            private $window: ng.IWindowService) {
            var self = this;
            self.customerType = window.localStorage.getItem('Role');
            $window.localStorage.setItem("url1", 'FindProvider');

            //document.addEventListener("deviceready", function () {
            //    // Initialize the map plugin
            //    var options = {
            //        enableHighAccuracy: true,
            //        maximumAge: 3600000
            //    };
            //    navigator.geolocation.getCurrentPosition(self.onSuccess, self.onError, options);
            //});


            document.addEventListener("deviceready", function () {
                self.mapDiv = document.getElementById("map_canvas");
                var options = {
                    enableHighAccuracy: true,
                    maximumAge: 3600000
                };
                // Initialize the map view
              FindProviderController.map = plugin.google.maps.Map.getMap(self.mapDiv, options);

                const init = new plugin.google.maps.LatLng("65.9667","-18.5333");

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
                FindProviderController.map = plugin.google.maps.Map.getMap(self.mapDiv, self.mapOptions);
          
                FindProviderController.map.on(plugin.google.maps.event.MAP_CLICK, function () {

                    $("#infowindow").hide();
                    //self.infoWindow = false;
                });
                // Wait until the map is ready status.
                //   map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
            }, false);




            $("#infowindow").hide();
            if (FindProviderController.map != 0) {
                FindProviderController.map.clear();
            }
            self.doSearchProvider();
            self.userId = 0;

        }
        doSearchProvider() {

            var self = this;

            this.CustomerHttp.get("/ListRootBottomService").then(function (response: any) {
                var _Final = ""
                $.each(response.ListRootBottomServiceResult, function (i, o) {

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
                    //alert('code: ' + e.code + '\n' + 'message: ' + e.message + '\n');


                });
        }
        onSuccess(position: any) {

            var self = this;
            FindProviderController.currentLatLong = position;
            self.mapDiv = document.getElementById("map_canvas");


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

                    'zoom': 15,
                    //'bearing': 50
                }
            };
            FindProviderController.map = plugin.google.maps.Map.getMap(self.mapDiv, self.mapOptions);
            FindProviderController.map.on(plugin.google.maps.event.MAP_CLICK, function () {

                $("#infowindow").hide();
                //self.infoWindow = false;
            });
            // You have to wait the MAP_READY event.
        }
        onError(e: any) {
            //alert(JSON.stringify('test:'+ e));
        }
        getProviders(serviceId: any) {
            var self = this;
            FindProviderController.map.clear();
            FindProviderController.map.setClickable(true);
            $("#infowindow").hide();
            self.CustomerHttp.get('/ListProvidersByServices/' + serviceId).then(function (response: any) {
                if (response.ListProvidersByServicesResult.length != 0) {
                    for (var i = 0; i < response.ListProvidersByServicesResult.length; i++) {
                        self.addMarkers(response.ListProvidersByServicesResult[i].vanityUrlField, response.ListProvidersByServicesResult[i].userIDField);
                        if (i == 0) {
                            var lat = response.ListProvidersByServicesResult[i].vanityUrlField.substring(0, response.ListProvidersByServicesResult[i].vanityUrlField.indexOf(':'));
                            var long = response.ListProvidersByServicesResult[i].vanityUrlField.substring(response.ListProvidersByServicesResult[i].vanityUrlField.indexOf(':') + 1);

                            const providerLoc = new plugin.google.maps.LatLng(lat, long);
                            alert(providerLoc);
                            FindProviderController.map.animateCamera({
                                'target': providerLoc,
                                'zoom': 10
                            }, function (marker: any) {
                                marker.showInfoWindow();
                            });
                        }
                    }
                } else {
                    FindProviderController.map.setClickable(false);
                    self.messages = 'No provider found for the service you have chosen';
                    $("#PDone").modal();
                }
            }, function (e) {

            })

        }
        rad(x: any) {
            return x * Math.PI / 180;
        };

        getDistance(p1: any, p2: any) {

            var self = this;
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = self.rad(p2.latitude - p1.latitude);
            var dLong = self.rad(p2.longitude - p1.longitude);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(self.rad(p1.latitude)) * Math.cos(self.rad(p2.latitude)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d / 1609.344; // returns the distance in meter
        };
        addMarkers(latlongval: any, userId: any) {

            var self = this;     
            var lat = latlongval.substring(0, latlongval.indexOf(':'));
            var long = latlongval.substring(latlongval.indexOf(':') + 1);
            var providerLatLong = { latitude: lat, longitude: long };
        //    var currentlatlong = { latitude: FindProviderController.currentLatLong.coords.latitude, longitude: FindProviderController.currentLatLong.coords.longitude };
          
            const providerLoc = new plugin.google.maps.LatLng(lat, long);
            FindProviderController.map.addMarker({
                'position': providerLoc,
                'icon': 'data:image/png;base64,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',
                'styles': {
                    'text-align': 'left',
                    'font-weight': 'bold',
                    'color': 'green'
                },
                //'id':userId,
            }, function (marker: any) {
                marker.set("params", {
                    id: userId,
                    //distance: self.getDistance(providerLatLong, currentlatlong).toFixed(1)
                });

                marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function () {
                    self.getUserInfo(marker.get("params").id).then(function (data: any) {
                        marker.setTitle(data.name);
                      //  marker.setSnippet(marker.get("params").distance + " miles away");
                        marker.setSnippet(" miles away");
                       self.profilePic = data.profilePic;
                        self.TagField = data.tagField;
                        self.userName = data.name;
                        self.userId = data.userId;
                        marker.showInfoWindow();
                        //self.infoWindow = true;
                        $("#infowindow").show();

                    }, function (e) { });
                });
            });


        }
        getUserInfo(userId: any) {

            var image = '';
            var tagline = '';
            var name = ''
            var deferred = this.$q.defer();
            var self = this;

            self.CustomerHttp.get('/GetUserInfo/' + userId).then(function (response: any) {
                self.ServiceData = response.GetUserInfoResult;

                self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) {

                    image = imgres;
                    self.SharedHttp.GetProTagLine(userId).then(function (res) {

                        tagline = res;
                        var data = { name: response.GetUserInfoResult.displayNameField, profilePic: image, tagField: tagline, userId: userId };

                        deferred.resolve(data);
                    }, function (e) { deferred.reject("failed to get data") });

                }, function (e) { deferred.reject("failed to get data") });

                //var str = self.ServiceData.profileField.biographyField;
                //var uri_encoded = str.replace(/%([^\d].)/, "%25$1");
                //var decoded = decodeURIComponent(uri_encoded);
                //self.ServiceData.profileField.biographyField = decoded;
                //self.SharedHttp.GetProviderServices(UserID).then(function (res) { self.ProviderServiceList = res; });
                //self.SharedHttp.GetWorkSamples(UserID).then(function (res) { self.WorkSamplesList = res; });
                //self.GetProviderServices(UserID)
                //alert(decodeURI(self.ServiceData.profileField.biographyField));
                //setTimeout(function () {
                //    alert(response.GetUserInfoResult.displayNameField + image + tagline);
                //    return { name: response.displayNameField, profilePic: self.profilePic, tagField: self.TagField }
                //}, 5000)


            }, function (error) {
                if (error === null) {

                } else {
                    //console.log(error);

                }
            });
            return deferred.promise;
        }

    }


    angular.module('spafoo.ctrl.FindProvider', []).controller('FindProvider', FindProviderController);

}