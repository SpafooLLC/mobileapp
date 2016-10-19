module AddProviderReviewController {

    interface IAddProviderReviewController{
        providerId:string;
        appointmentID:string;
        ServiceData:any;
        listRateData:any;
        profilePic:string;
        rateValue:string;
        isChecked:boolean;
        commentTxt:string;
        dropDownVal:string;
        ratingCSV:string;
        workQuality:string;
        timePunctuality:string;
        reviewCSV:string;
        messages: string;
        check: boolean;
    }

    interface IStateParams extends angular.ui.IStateParamsService {
    }

    class AddProviderReviewController implements IAddProviderReviewController {
        providerId:string;
        appointmentID:string;
        ServiceData:any;
        listRateData:any;
        profilePic:string;
        rateValue:string;
        isChecked:boolean;
        commentTxt:string;
        dropDownVal:string;
        ratingCSV:string;
        workQuality:string;
        timePunctuality:string;
        reviewCSV:string;
        messages: string;
        check: boolean;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp','$stateParams'];
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
            private $stateParams: IStateParams
        ) {
            this.getProviderInfo();
             

        }
        getProviderInfo() {
            var self = this;
            var status= self.$window.localStorage.getItem('LoginStatus');
            if(status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === ''){
                self.$state.go('login');
            }
            self.isChecked = false;
            self.providerId = self.$stateParams.providerId;
            self.appointmentID = self.$stateParams.appId;
            self.CustomerHttp.get('/GetUserInfo/' + self.providerId).then(function (response: any) {
                self.ServiceData = response.GetUserInfoResult;
                self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.profilePic = imgres;});
            }, function (error) {
                if (error === null) {

                } else {
                    console.log(error);
                }
            });
            self.CustomerHttp.get('/ListRating/2').then(function(response:any){
                self.listRateData=response;
                console.log(self.listRateData);
            },function(error){
                 if (error === null) {

                } else {
                    console.log(error);
                }
            });
            
        }

        getRate(rate:string){
            var self=this;
            self.rateValue='0' + ':' + rate;
        }

        toggleCheck(){
            var self=this;
            self.isChecked = self.isChecked == true ? false : true;
        }

        postRateInfo(ratingNameField:string,ratingTypeIDField:string,value:string){
            var self=this;
            if (ratingNameField === 'Work Quality'){
                self.workQuality = ratingTypeIDField+':'+value;
            } else if (ratingNameField === 'Time Punctuality'){
                self.timePunctuality = ratingTypeIDField + ':' + value;
            }
        }

        redirectTo(href: any) {

            $('#PDone').modal('toggle');
            this.$state.go(href);
        }

        postRating(){
            var self = this;
            if (self.rateValue == null || self.rateValue == "") {
                self.messages = "Please choose rating.";
                $("#PDoneError").modal();
                return;
            }
            if (self.workQuality == null || self.workQuality == "") {
                self.messages = "Please choose workQuality.";
                $("#PDoneError").modal();
                return;
            }
            if (self.timePunctuality == null || self.timePunctuality == "") {
                self.messages = "Please choose timePunctuality.";
                $("#PDoneError").modal();
                return;
            }
            if (self.dropDownVal == null || self.dropDownVal == "") {
                self.messages = "Please choose display name on review page.";
                $("#PDoneError").modal();
                return;
            }
           
            if (self.isChecked == false)
            {
                self.messages = "Please tick the tickbox to give your confirmation";
                $("#PDoneError").modal();
                return;
            }
            self.ratingCSV = self.rateValue + '|' + self.workQuality + '|' + self.timePunctuality;
            self.reviewCSV = '-1:-1:' + self.commentTxt + ':' + self.dropDownVal;
            console.log(self.ratingCSV);
            console.log(self.reviewCSV);
            var data={
                "AppID":self.appointmentID,
                "RatingByID":self.$window.localStorage.getItem('CustomerID'),
                "RatingCSV":self.ratingCSV,
                "RatingToID":self.providerId,
                "ReviewCSV":self.reviewCSV
            }
            self.CustomerHttp.post(data,'/AddRating').then(function(res){
                self.messages = 'Thank you for rating';
                $('#PDone').modal();
            },function(error){

            });
            
        }
       
    }


    angular.module('spafoo.ctrl.AddProviderReview', []).controller('AddProviderReview', AddProviderReviewController);

}