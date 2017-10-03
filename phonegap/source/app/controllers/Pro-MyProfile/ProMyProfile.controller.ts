module ProMyProfileController {

    class ProMyProfileController {
        ServiceData: {};
        NotificaitonData: {};
        proProfilePic: string;
        NotificationCount: number;
        WorkSamplesList:{};
        Roles: any;
        rolePosition: any;
        applRole: any;
        serviceOffered: any;
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
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp
        ) {
            this.getUserInfo();
            $('.fancybox').fancybox();
          
        }
        getUserInfo() {

            var self = this;
            var status= self.$window.localStorage.getItem('LoginStatus');
            if(status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === ''){
                self.$state.go('login');
            }
            var customerID = self.$window.localStorage.getItem('CustomerID');
            self.CustomerHttp.get('/GetUserJSON/' + customerID).then(function (response: any) {
                self.ServiceData = JSON.parse(response.GetUserJSONResult);
                //console.log(self.ServiceData);
                self.ServiceData.DisplayName1 = self.ServiceData.FirstName + " " + self.ServiceData.LastName[0] + ".";
                self.ServiceData.Membership.CreatedDate = self.SharedHttp.getFormatedDate(self.ServiceData.Membership.CreatedDate, "dd MMMM yyyy");
                self.getUserNotificationInfo(customerID);
                var str = self.ServiceData.Profile.Biography;
                var uri_encoded = str.replace(/%([^\d].)/, "%25$1");                
                var decoded = decodeURIComponent(uri_encoded);
                self.ServiceData.Profile.Biography = decoded;
                self.SharedHttp.getProfilePics(self.ServiceData.Profile.Photo).then(function (imgres) { self.proProfilePic = imgres;});
                self.SharedHttp.GetWorkSamples(customerID).then(function (res) { self.WorkSamplesList = res; });
                self.rolePosition = self.ServiceData.Profile.ProfileProperties[1].PropertyValue.split('|').map(Number);
                self.getRoles().then(function (res: any) {
                    self.Roles = res;
                    var rArr = new Array();
                    for (var i = 0; i < self.Roles.GetQuestionResult.optionsField.length; i++) {
                        if (self.rolePosition.indexOf(self.Roles.GetQuestionResult.optionsField[i].onSelectField) > -1) {
                            rArr.push(self.Roles.GetQuestionResult.optionsField[i].optionTextField);
                            //console.log(self.Roles.GetQuestionResult.optionsField[i].optionTextField);
                        }
                    }
                    //console.log(rArr)
                    self.applRole = rArr;
                }, function (error) {
                    //alert(error);
                    });           
               self.CustomerHttp.get('/GetProviderServices/' + customerID).then( function(res:any) {
                   self.serviceOffered = res.GetProviderServicesResult;
               }, function(err: any) {

               })                          
               

            }, function (error) {
                if (error === null) {

                } else {
                    //console.log(error);

                }
            });
        }

        getRoles(): ng.IPromise<string> {
            var self=this;
            var deferred = this.$q.defer();
            self.CustomerHttp.get('/GetQuestion/5').then(function(res:any){
                deferred.resolve(res);
            },function(error:any){
                deferred.reject(error);
            })
            
            return deferred.promise;
        }


        getUserNotificationInfo(customerID: any) {
            var self = this;
            self.CustomerHttp.get('/GetMyNotification/' + customerID).then(function (response: any) {
                self.NotificaitonData = response.GetMyNotificationResult;
                self.NotificationCount = self.NotificaitonData.length;

            }, function (error) {
                if (error === null) {
                    //self.$ionicLoading.hide();
                } else {
                    console.log(error);
                    //self.$ionicLoading.hide();
                }
            });
        }
        
    }


    angular.module('spafoo.ctrl.ProMyProfile', []).controller('ProMyProfile', ProMyProfileController);

}