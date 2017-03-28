module ProviderListController {

    class ProviderListController {
        ServiceData: any;
        pdata: number = 0;
        PreviousID: string;
        ServiceIDs: number;
        proindex: number;

        InMile: number;
        profilePic: string;
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

            self.GetWithInMile();
            self.proindex = 0;

            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            };
            navigator.geolocation.getCurrentPosition(self.onSuccess, self.onError, options);
            setTimeout(function () { self.getProviderList(self.ServiceIDs); }, 1000);

        }

        GetWithInMile()
        {
            var self = this;
            self.CustomerHttp.get('/GetWithInMile').then(function (response: any) {
                self.InMile = parseInt(response.GetWithInMileResult);
            });

        }
        getProviderList(ServiceID: any) {
            var self = this;

          //  self.CustomerHttp.get('/ListProvidersByServices/' + self.ServiceIDs).then(function (response: any) {
            self.CustomerHttp.post({ ServiceID: self.ServiceIDs }, '/ListProvidersByServices_p').then(function (response: any) {
           //    self.CustomerHttp.get('/ListProvidersByServices/-1').then(function (response: any) {
                self.ServiceData = response; 
                console.log(self.ServiceData[0]);
                for (var i = 0; i <= response.length; i++) {
                    // alert(response.ListProvidersByServicesResult[i].firstNameField + " " + response.ListProvidersByServicesResult[i].lastNameField[0] + ".")
                    self.ServiceData[i].displayNameField = self.ServiceData[i].firstNameField + " " + self.ServiceData[i].lastNameField[0] + ".";
                    if (self.ServiceData[i].profileField.photoField != null) {

                        self.getProfilePics(self.ServiceData[i].profileField.photoField, i);
                        self.GetProTagLine(self.ServiceData[i].userIDField, i);
                        self.GetMyRating(self.ServiceData[i].userIDField, i);
                       

                    }
                    else
                    { self.ServiceData[i].profileField.photoField = ""; };
                    self.GetDistanceBetween(self.ServiceData[i].vanityUrlField, i);

                    if (parseInt(self.ServiceData[i].distance) <= parseInt(self.InMile))
                    {
                        self.proindex++;
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

        }
        GetDistanceBetween(latlong: any, index: any)
        {
            var lat1 = latlong.substring(0, latlong.indexOf(':'));
            var long1 = latlong.substring(latlong.indexOf(':') + 1);
            var self = this;
           var lat2= ProviderListController.currentlatlong.coords.latitude;
           var long2= ProviderListController.currentlatlong.coords.longitude;
           var R = 6378137; // Earth’s mean radius in meter
           var dLat = self.rad(lat2 - lat1);
           var dLong = self.rad(long2 - long1);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(self.rad(lat1)) * Math.cos(self.rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            self.ServiceData[index].distance = (d / 1609.344).toFixed(1);
           
           // returns the distance in meter
      
        }
        onSuccess(position: any) {
          
            ProviderListController.currentlatlong = position;
      //    alert(JSON.stringify(ProviderListController.currentlatlong.coords.latitude +", "+ProviderListController.currentlatlong.coords.longitude ))
        }
        rad(x: any) {
            return x * Math.PI / 180;
        };
        onError() {

        }
        getProfilePics(photoID: any, index: any) {
            var self = this;

            self.CustomerHttp.get('/GetProfilePic/' + photoID).then(function (response: any) {

                //self.profilePic = "http://www.spafoo.com" + response.GetProfilePicResult;
                self.ServiceData[index].profileField.photoField = "http://www.spafoo.com" + response.GetProfilePicResult;
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
        GetMyRating(UserID: any, index: any) {
            var self = this;
            self.CustomerHttp.get('/GetMyRating/' + UserID).then(function (response: any) {
                self.ServiceData[index].starField = parseInt(response.GetMyRatingResult.Success.split(':')[0]);
                 self.ServiceData[index].Rateperson= parseInt(response.GetMyRatingResult.Success.split(':')[1]);
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