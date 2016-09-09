module FindProviderController {
    class FindProviderController{
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
        static currentLatLong: any;
        static map: any=0;
        $inject = ['$state', '$scope', '$ionicLoading', 'CustomerHttp', '$q']
        constructor(
            private $state: angular.ui.IState,
            private $scope: angular.IScope,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp,
            private $q: ng.IQService) {
            var self = this;
          
            document.addEventListener("deviceready", function () {
           
               
                // Initialize the map plugin
                var options = {
                    enableHighAccuracy: true,
                    maximumAge: 3600000
                };
                navigator.geolocation.getCurrentPosition(self.onSuccess, self.onError, options);
               
                //navigator.geolocation.getCurrentPosition(self.geolocationSuccess, self.geoLocationError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: false });
               
            });
            $("#infowindow").hide();
            if (FindProviderController.map != 0)
            {
                FindProviderController.map.clear();
            }
            self.doSearchProvider();
            self.userId = 0;
        }
        doSearchProvider()
        {
          
            var self = this;
            this.CustomerHttp.get("/ListRootBottomService").then(function (response:any) {
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
                    alert('code: ' + e.code + '\n' + 'message: ' + e.message + '\n');


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
        onError(e: any)
        {
            alert(JSON.stringify('test:'+ e));
        }
        getProviders(serviceId: any) {
            var self = this;
            FindProviderController.map.clear();
            self.CustomerHttp.get('/ListProvidersByServices/' + serviceId).then(function (response:any) {
                for (var i = 0; i < response.ListProvidersByServicesResult.length; i++) {
                    self.addMarkers(response.ListProvidersByServicesResult[i].vanityUrlField, response.ListProvidersByServicesResult[i].userIDField);
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
        return d/1609.344; // returns the distance in meter
    };
        addMarkers(latlongval: any, userId: any)
        {

            var self = this;
           
            var lat = latlongval.substring(0, latlongval.indexOf(':'));
            var long = latlongval.substring(latlongval.indexOf(':') + 1);
            var providerLatLong = { latitude: lat, longitude: long };
         
            var currentlatlong = { latitude: FindProviderController.currentLatLong.coords.latitude, longitude: FindProviderController.currentLatLong.coords.longitude };
          
           
           
            const providerLoc = new plugin.google.maps.LatLng(lat, long);
         
          //  alert("add marker called" + FindProviderController.map);
          
          //alert("map ready called of add marker");
               
                //getMapEle.addMarker({
                //    'position': init,
                //    'title': "Hello GoogleMap for Cordova!",
                //    'icon': "images/Site/mapPointers.png"
                //}, function (marker: any) {

                //    marker.showInfoWindow();

            //});
          

                FindProviderController.map.addMarker({
                    'position': providerLoc,
                    'icon': 'data:image/png;base64,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',
                    'styles' : {
                        'text-align': 'left',
                        
                        'font-weight': 'bold',
                        'color': 'green'
                    },
                    //'id':userId,
                }, function (marker: any) {
                    marker.set("params", {
                        id: userId,
                        distance: self.getDistance(providerLatLong, currentlatlong).toFixed(1)
                    });
                    //alert(marker.get("id"));
                    //alert("marker options" + JSON.stringify(marker.id) + JSON.stringify(marker));
                    marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function () {

                      
                      
                        self.getUserInfo(marker.get("params").id).then(function (data: any) {
                          

                            marker.setTitle(data.name );
                            marker.setSnippet(marker.get("params").distance+" miles away");
                            self.profilePic = data.profilePic;
                            self.TagField = data.tagField;
                            self.userName = data.name;
                            self.userId = data.userId;
                            marker.showInfoWindow();
                            //self.infoWindow = true;
                            $("#infowindow").show();

                        }, function (e) { });
                        //self.CustomerHttp.get('/ListProvidersByServices/' + marker.get("params").id).then(function (response: any) { });
                        //alert("Marker is clicked" + JSON.stringify(marker.get("params")));
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
                    console.log(error);

                }
                });
            return deferred.promise;
        }

    }


    angular.module('spafoo.ctrl.FindProvider',[]).controller('FindProvider',FindProviderController);

}