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
            var self = this;
            self.ServiceIDs = self.$window.localStorage.getItem('ServiceIDs');
            // alert(this.ServiceIDs);
            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            };
            navigator.geolocation.getCurrentPosition(self.onSuccess, self.onError, options);
            setTimeout(function () { self.getProviderList(self.ServiceIDs); }, 1000);
        }
        ProviderListController.prototype.getProviderList = function (ServiceID) {
            var self = this;
            self.CustomerHttp.get('/ListProvidersByServices/' + ServiceID).then(function (response) {
                self.ServiceData = response.ListProvidersByServicesResult;
                for (var i = 0; i <= response.ListProvidersByServicesResult.length; i++) {
                    if (self.ServiceData[i].profileField.photoField != null) {
                        self.getProfilePics(self.ServiceData[i].profileField.photoField, i);
                        self.GetProTagLine(self.ServiceData[i].userIDField, i);
                        self.GetMyRating(self.ServiceData[i].userIDField, i);
                    }
                    else {
                        self.ServiceData[i].profileField.photoField = "";
                    }
                    ;
                    //console.log(self.ServiceData[i].vanityUrlField)
                    self.GetDistanceBetween(self.ServiceData[i].vanityUrlField, i);
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
        };
        ProviderListController.prototype.GetDistanceBetween = function (latlong, index) {
            var lat1 = latlong.substring(0, latlong.indexOf(':'));
            var long1 = latlong.substring(latlong.indexOf(':') + 1);
            var self = this;
            var lat2 = ProviderListController.currentlatlong.coords.latitude;
            var long2 = ProviderListController.currentlatlong.coords.longitude;
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = self.rad(lat2 - lat1);
            var dLong = self.rad(long2 - long1);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(self.rad(lat1)) * Math.cos(self.rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            self.ServiceData[index].distance = (d / 1609.344).toFixed(1);
            // returns the distance in meter
        };
        ProviderListController.prototype.onSuccess = function (position) {
            ProviderListController.currentlatlong = position;
            //   alert(JSON.stringify(ProviderListController.currentlatlong.coords.latitude +", "+ProviderListController.currentlatlong.coords.longitude ))
        };
        ProviderListController.prototype.rad = function (x) {
            return x * Math.PI / 180;
        };
        ;
        ProviderListController.prototype.onError = function () {
        };
        ProviderListController.prototype.getProfilePics = function (photoID, index) {
            var self = this;
            self.CustomerHttp.get('/GetProfilePic/' + photoID).then(function (response) {
                //self.profilePic = "http://www.spafoo.com" + response.GetProfilePicResult;
                self.ServiceData[index].profileField.photoField = "http://www.spafoo.com" + response.GetProfilePicResult;
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
