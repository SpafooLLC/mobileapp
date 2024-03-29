var ProviderListController;
(function (ProviderListController_1) {
    var ProviderListController = (function () {
        function ProviderListController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.toaster = toaster;
            this.SharedHttp = SharedHttp;
            this.pdata = 0;
            this.ProviderIDlst = '';
            var self = this;
            self.ServiceIDs = self.$window.localStorage.getItem('ServiceIDs');
            // alert(this.ServiceIDs);
            //  self.SharedHttp.IsGPSOn();
            //cordova.plugins.locationAccuracy.canRequest(function (canRequest: any) {
            //    if (canRequest) {
            //        cordova.plugins.locationAccuracy.request(function (success: any) {
            //          //  alert("Successfully requested accuracy: " + JSON.stringify( success));
            //            //setTimeout(function () {
            //            // //   navigator.geolocation.getCurrentPosition(self.onSuccess, self.onError, options);
            //            //  //  self.getProviderList(self.ServiceIDs);
            //            //    $state.go('ProviderList');
            //            //}, 5000);
            //        }, function (error: any) {
            //            //   alert("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
            //            if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
            //                if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
            //                    cordova.plugins.diagnostic.switchToLocationSettings();
            //                }
            //            }
            //        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
            //    }
            //});
            self.proindex = 0;
            self.options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            };
            // navigator.geolocation.getCurrentPosition(self.onSuccess, self.onError, self.options);
            self.getProviderList(self.ServiceIDs);
        }
        ProviderListController.prototype.GetWithInMile = function () {
            var self = this;
            self.CustomerHttp.get('/GetWithInMile').then(function (response) {
                self.InMile = parseInt(response.GetWithInMileResult);
            });
        };
        ProviderListController.prototype.getProviderList = function (ServiceID) {
            debugger;
            var self = this;
            //document.addEventListener("deviceready", function () {
            //   CheckGPS.check(function () {
            $("#showload").show();
            self.CustomerHttp.get('/GetWithInMile').then(function (response) {
                debugger;
                self.InMile = parseInt(response.GetWithInMileResult);
                // self.InMile  = 1000000;
                navigator.geolocation.getCurrentPosition(self.onSuccess, self.onError, self.options);
                setTimeout(function () {
                    self.CustomerHttp.post({ ServiceID: self.ServiceIDs }, '/ListProvidersByServices_p').then(function (response) {
                        console.log("reponse list provider by serive", response);
                        self.ServiceData = response;
                        debugger;
                        for (var i = 0; i < response.length; i++) {
                            debugger;
                            self.GetDistanceBetween(self.ServiceData[i].userInfoField.vanityUrlField, i);
                            var sid = parseInt(self.ServiceIDs);
                            var pricedata = self.ServiceData[i].servicesField.filter(function (z) { return z.serviceIDField == sid; })[0];
                            // self.ServiceData[i].minimumField = pricedata.minimumField;
                            // self.ServiceData[i].rangeToField = pricedata.rangeToField;
                            if (parseInt(self.ServiceData[i].userInfoField.distance) <= parseInt(self.InMile)) {
                                self.ServiceData[i].userInfoField.displayNameField = self.ServiceData[i].userInfoField.firstNameField + " " + self.ServiceData[i].userInfoField.lastNameField[0] + ".";
                                if (self.ServiceData[i].userInfoField.profileField.photoField != null) {
                                    self.getProfilePics(self.ServiceData[i].userInfoField.profileField.photoField, i);
                                    self.GetProTagLine(self.ServiceData[i].userInfoField.userIDField, i);
                                    self.GetMyRating(self.ServiceData[i].userInfoField.userIDField, i);
                                }
                                else {
                                    self.ServiceData[i].userInfoField.profileField.photoField = "";
                                }
                                ;
                                self.proindex++;
                                self.ProviderIDlst += self.ServiceData[i].userInfoField.userIDField + "|";
                            }
                            if (self.proindex == 0 && parseInt(self.ServiceData[i].userInfoField.distance) >= parseInt(self.InMile)) {
                                self.NoDatafound = "Sorry, no provider found for the selected service ";
                            }
                        }
                    }, function (error) {
                        if (error === null) {
                            self.$ionicLoading.hide();
                        }
                        else {
                            console.log(error);
                            self.$ionicLoading.hide();
                        }
                    });
                }, 3000);
            });
            // },
            //     function () {
            //         self.SharedHttp.IsGPSOn();
            //     });
            // });
        };
        ProviderListController.prototype.GetDistanceBetween = function (latlong, index) {
            var lat1 = latlong.substring(0, latlong.indexOf(':'));
            var long1 = latlong.substring(latlong.indexOf(':') + 1);
            var self = this;
            //   alert(JSON.stringify(ProviderListController.currentlatlong) + " ::: Lat1 --> " + lat1 + " Long ::: " + long1);
            var lat2 = ProviderListController.currentlatlong.coords.latitude;
            var long2 = ProviderListController.currentlatlong.coords.longitude;
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = self.rad(lat2 - lat1);
            var dLong = self.rad(long2 - long1);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(self.rad(lat1)) * Math.cos(self.rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            self.ServiceData[index].userInfoField.distance = (d / 1609.344).toFixed(1);
            // returns the distance in meter
        };
        ProviderListController.prototype.onSuccess = function (position) {
            //  alert(JSON.stringify(position.coords.latitude + ", " + position.coords.longitude));
            ProviderListController.currentlatlong = position;
            //  alert( "static Variable :: "+ JSON.stringify(ProviderListController.currentlatlong.coords.latitude + ", " + ProviderListController.currentlatlong.coords.longitude))
        };
        ProviderListController.prototype.rad = function (x) {
            return x * Math.PI / 180;
        };
        ;
        ProviderListController.prototype.onError = function (fnerr) {
            console.log(fnerr);
        };
        ProviderListController.prototype.getProfilePics = function (photoID, index) {
            var self = this;
            self.CustomerHttp.get('/GetProfilePic/' + photoID).then(function (response) {
                //self.profilePic = "http://www.spafoo.com" + response.GetProfilePicResult;
                self.ServiceData[index].userInfoField.profileField.photoField = "http://www.spafoo.com" + response.GetProfilePicResult;
                //  alert(self.ServiceData[index].profileField.photoField);
                self.$ionicLoading.hide();
            }, function (error) {
                if (error === null) {
                    self.$ionicLoading.hide();
                }
                else {
                    console.log(error);
                    self.$ionicLoading.hide();
                }
            });
        };
        ProviderListController.prototype.GetProTagLine = function (UserID, index) {
            var self = this;
            self.CustomerHttp.get('/GetProTagLine/' + UserID).then(function (response) {
                self.ServiceData[index].TagField = decodeURIComponent(decodeURI(response.GetProTagLineResult.Success));
            }, function (error) {
                if (error === null) {
                }
                else {
                }
            });
        };
        ProviderListController.prototype.AnyProvider = function () {
            var self = this;
            console.log(" All SErvice Data :::", self.ProviderIDlst);
            var ProIDs = -1 + "|" + self.ProviderIDlst;
            this.$state.go("MakeAppointment", { userId: (ProIDs.substring(0, ProIDs.lastIndexOf('|'))), appointmentId: null, type: "NORMAL" });
        };
        ProviderListController.prototype.GetMyRating = function (UserID, index) {
            var self = this;
            self.CustomerHttp.get('/GetMyRating/' + UserID).then(function (response) {
                self.ServiceData[index].starField = parseInt(response.GetMyRatingResult.Success.split(':')[0]);
                self.ServiceData[index].Rateperson = parseInt(response.GetMyRatingResult.Success.split(':')[1]);
                //   alert(self.ServiceData[index].starField);
            }, function (error) {
                if (error === null) {
                }
                else {
                    console.log(error);
                }
            });
        };
        ProviderListController.prototype.GoToProviderPortfolio = function (UserID) {
            var self = this;
            //this.$rootScope.dotest(UserID) 
            self.$window.localStorage.setItem('ProviderIDs', UserID);
            self.$state.go("ProviderPortfolio");
        };
        ProviderListController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp'];
        return ProviderListController;
    }());
    angular.module('spafoo.ctrl.ProviderList', []).controller('ProviderList', ProviderListController);
})(ProviderListController || (ProviderListController = {}));

//# sourceMappingURL=ProviderList.controller.js.map
