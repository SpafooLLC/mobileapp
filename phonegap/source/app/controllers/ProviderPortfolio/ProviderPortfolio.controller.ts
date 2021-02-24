module ProviderPortfolioController {
    
    class ProviderPortfolioController {
        UserID: number;
        ServiceData: any;
        profilePic: string;
        RatingField: string;
        Rateperson: string;
        TagField: string;
        ProviderServiceList: any;
        WorkSamplesList: any;
        ReviewData:any;
        distance: string;
        customerType: string;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$stateParams'];
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
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp,
            private $stateParams: angular.ui.IStateParamsService
        ) {
            var self = this;
            //this.UserID = this.$window.localStorage.getItem('ProviderIDs');
            self.UserID = $stateParams.userId;
            self.distance = $stateParams.distance;
            
            self.getProviderPortfolio(this.UserID);
            self.getReviewDetails(this.UserID);
            self.customerType = window.localStorage.getItem("Role");
         
           $('.fancybox').fancybox();
        }
showTab(tabname:any){
    $(".tab-pane.fade").removeClass("in").removeClass("active");    
  $("#"+tabname).addClass("in").addClass("active");

}
        getProviderPortfolio(UserID:any) {
            var self = this;
          
            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response: any) {
                console.log("asdsadsadsadsadsad", response);
                var temp = response.GetUserInfoResult.profileField.cellField ;
                response.GetUserInfoResult.profileField.cellField = temp[0]+temp[1]+temp[2]  + "-" + temp[3]+temp[4]+temp[5] +"-" + temp[6]+temp[7]+temp[8]+temp[9];
                self.ServiceData = response.GetUserInfoResult;
                self.ServiceData.displayNameField = self.ServiceData.firstNameField + " " + self.ServiceData.lastNameField[0] + ".";
                 self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.profilePic = imgres; });
                 self.SharedHttp.GetMyRating(UserID).then(function (res) { self.RatingField = res.split(':')[0] ; self.Rateperson = res.split(':')[1] });
                self.SharedHttp.GetProTagLine(UserID).then(function (res) { self.TagField = res; });
                self.SharedHttp.GetProviderServices(UserID).then(function (res) {self.ProviderServiceList = res; });
                self.SharedHttp.GetWorkSamples(UserID).then(function (res) { self.WorkSamplesList = res; });
             
                var str = self.ServiceData.profileField.biographyField;
                var uri_encoded =str!=null? str.replace(/%([^\d].)/, "%25$1"):"";                
                var decoded = decodeURIComponent(uri_encoded);
                self.ServiceData.profileField.biographyField = decoded;
                 
               
                 //self.GetProviderServices(UserID)

                //alert(decodeURI(self.ServiceData.profileField.biographyField));
            }, function (error) {
                if (error === null) {

                } else {
                    console.log(error);

                }
            });
        }

        getReviewDetails(UserID: any) {
            var self = this;
            self.CustomerHttp.get('/GetMyReview/' + UserID).then(function (response: any) {
                self.ReviewData = response.GetMyReviewResult;
                $.each(self.ReviewData, function (i, item) {
                    var str = item.commentsField;
                    var uri_encoded = str.replace(/%([^\d].)/, "%25$1");

                    self.ReviewData[i].commentsField = decodeURIComponent(uri_encoded);
                    self.ReviewData[i].datedField = self.SharedHttp.getFormatedDate(item.datedField, "MM/dd/yyyy");


                    self.SharedHttp.GetUserInfo(item.byUserIDField).then(function (res: any) {

                        switch (self.ReviewData[i].displayNameField) {
                            case 1: self.ReviewData[i].displayNameField = res.firstNameField + " " + res.lastNameField[0] + "."; break;
                            case 2: self.ReviewData[i].displayNameField = res.firstNameField; break;
                            case 3: self.ReviewData[i].displayNameField = res.lastNameField; break;
                            case 4: self.ReviewData[i].displayNameField = res.firstNameField + " " + res.lastNameField; break;
                         

                        }
                        // self.ReviewData[i].displayNameField = res.displayNameField;

                        self.ReviewData[i].RegionField = res.profileField.regionField;

                    });

                });

            }, function (error) {
                if (error === null) {

                } else {
                    //console.log(error);

                }
            });
        }


        GoToProviderReview() {
            var self = this;
            self.$state.go('ProReviewListing', { userId: this.$stateParams.userId });

        }
    }


    angular.module('spafoo.ctrl.ProviderPortfolio',[]).controller('ProviderPortfolio',ProviderPortfolioController);

}