module ProviderListController {

    class ProviderListController {
        ServiceData: any;
        pdata: number = 0;
        PreviousID: string;
        ServiceIDs: any;
        proindex: number;
        NoDatafound: string;
        InMile: any;
        profilePic: string;
        options: any;
        ProviderIDlst: any = '';
        static currentlatlong: any;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp'];
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private toaster: ngtoaster.IToasterService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp) {
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

        GetWithInMile() {
            var self = this;
            self.CustomerHttp.get('/GetWithInMile').then(function (response: any) {
                self.InMile = parseInt(response.GetWithInMileResult);
            });

        }
        getProviderList(ServiceID: any) {
            var self = this;
            document.addEventListener("deviceready", function () {
             
                //   CheckGPS.check(function () {
                $("#showload").show();            
                self.CustomerHttp.get('/GetWithInMile').then(function (response: any) {
                    self.InMile = parseInt(response.GetWithInMileResult);

                    navigator.geolocation.getCurrentPosition(self.onSuccess, self.onError, self.options);
                    //  setTimeout(function () {
                    self.CustomerHttp.post({ ServiceID: self.ServiceIDs }, '/ListProvidersByServices_p').then(function (response: any) {
                        self.ServiceData = response;

                        for (var i = 0; i <= response.length; i++) {
                            self.GetDistanceBetween(self.ServiceData[i].userInfoField.vanityUrlField, i);
                            var sid = parseInt(self.ServiceIDs);
                            var pricedata = self.ServiceData[i].servicesField.filter((z: any) => z.serviceIDField == sid)[0];
                            self.ServiceData[i].minimumField = pricedata.minimumField;
                            self.ServiceData[i].rangeToField = pricedata.rangeToField;

                            if (parseInt(self.ServiceData[i].userInfoField.distance) <= parseInt(self.InMile)) {
                                self.ServiceData[i].userInfoField.displayNameField = self.ServiceData[i].userInfoField.firstNameField + " " + self.ServiceData[i].userInfoField.lastNameField[0] + ".";

                                if (self.ServiceData[i].userInfoField.profileField.photoField != null) {
                                    self.getProfilePics(self.ServiceData[i].userInfoField.profileField.photoField, i);
                                    self.GetProTagLine(self.ServiceData[i].userInfoField.userIDField, i);
                                    self.GetMyRating(self.ServiceData[i].userInfoField.userIDField, i);
                                }
                                else { self.ServiceData[i].userInfoField.profileField.photoField = ""; };

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
                        } else {
                            console.log(error);
                            self.$ionicLoading.hide();
                        }
                    });
                    //    }, 3000);

                });
                // },
                //     function () {
                //         self.SharedHttp.IsGPSOn();
                //     });

            });
        }
        GetDistanceBetween(latlong: any, index: any) {
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

        }
        onSuccess(position: any) {
            //  alert(JSON.stringify(position.coords.latitude + ", " + position.coords.longitude));

            ProviderListController.currentlatlong = position;
            //  alert( "static Variable :: "+ JSON.stringify(ProviderListController.currentlatlong.coords.latitude + ", " + ProviderListController.currentlatlong.coords.longitude))
        }
        rad(x: any) {
            return x * Math.PI / 180;
        };
        onError(fnerr: any) {
            console.log(fnerr);
        }
        getProfilePics(photoID: any, index: any) {
            var self = this;

            self.CustomerHttp.get('/GetProfilePic/' + photoID).then(function (response: any) {

                //self.profilePic = "http://www.spafoo.com" + response.GetProfilePicResult;
                self.ServiceData[index].userInfoField.profileField.photoField = "http://www.spafoo.com" + response.GetProfilePicResult;
                //  alert(self.ServiceData[index].profileField.photoField);
                self.$ionicLoading.hide();
            }, function (error) {
                if (error === null) {
                    self.$ionicLoading.hide();
                } else {
                    console.log(error);
                    self.$ionicLoading.hide();
                }
            });
        }

        GetProTagLine(UserID: any, index: any) {
            var self = this;

            self.CustomerHttp.get('/GetProTagLine/' + UserID).then(function (response: any) {
                self.ServiceData[index].TagField = decodeURIComponent(decodeURI(response.GetProTagLineResult.Success));
            }, function (error) {
                if (error === null) {

                } else {
                    //console.log(error);

                }
            });
        }

        AnyProvider() {
            var self = this;
            console.log(" All SErvice Data :::", self.ProviderIDlst);

            var ProIDs = -1 + "|" + self.ProviderIDlst


            this.$state.go("MakeAppointment", { userId: (ProIDs.substring(0, ProIDs.lastIndexOf('|'))), appointmentId: null, type: "NORMAL" });
        }
        GetMyRating(UserID: any, index: any) {
            var self = this;
            self.CustomerHttp.get('/GetMyRating/' + UserID).then(function (response: any) {
                self.ServiceData[index].starField = parseInt(response.GetMyRatingResult.Success.split(':')[0]);
                self.ServiceData[index].Rateperson = parseInt(response.GetMyRatingResult.Success.split(':')[1]);
                //   alert(self.ServiceData[index].starField);
            }, function (error) {
                if (error === null) {

                } else {
                    console.log(error);

                }
            });
        }
        GoToProviderPortfolio(UserID: any) {
            var self = this;

            //this.$rootScope.dotest(UserID) 
            self.$window.localStorage.setItem('ProviderIDs', UserID);
            self.$state.go("ProviderPortfolio");
        }
    }


    angular.module('spafoo.ctrl.ProviderList', []).controller('ProviderList', ProviderListController);

}
