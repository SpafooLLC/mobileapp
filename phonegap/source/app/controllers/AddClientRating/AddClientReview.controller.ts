module AddClientReviewController {

    interface IAddClientReviewController{
        clientId:string;
        appointmentID:string;
        ServiceData:any;
        listRateData:any;
        profilePic:string;
        rateValue:string;
        isChecked:boolean;
        commentTxt:string;
        dropDownVal:string;
        ratingCSV:string;
        communication: string;
        cooperation: string;
        timePunctuality:string;
        reviewCSV:string;
        messages: string;
        aboutClientLike: string;
        aboutClientDislike: string;
        attitude: string;
    }

    interface IStateParams extends angular.ui.IStateParamsService {
    }

    class AddClientReviewController implements IAddClientReviewController {
        clientId:string;
        appointmentID:string;
        ServiceData:any;
        listRateData:any;
        profilePic:string;
        rateValue:string;
        isChecked:boolean;
        commentTxt:string;
        dropDownVal:string;
        ratingCSV:string;
        communication: string;
        cooperation: string;
        timePunctuality:string;
        reviewCSV:string;
        messages: string;      
        aboutClientLike: string;
        aboutClientDislike: string;
        attitude: string;
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
            self.isChecked = false;
            self.clientId = self.$stateParams.clientId;
            self.appointmentID = self.$stateParams.appId;
            self.CustomerHttp.get('/GetUserInfo/' + self.clientId).then(function (response: any) {
                self.ServiceData = response.GetUserInfoResult;
                self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.profilePic = imgres;});
            }, function (error) {
                if (error === null) {

                } else {
                    //console.log(error);
                }
            });
            self.CustomerHttp.get('/ListRating/1').then(function(response:any){
                self.listRateData=response;
                console.log(self.listRateData);
            },function(error){
                 if (error === null) {

                } else {
                    //console.log(error);
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
            if (ratingNameField === 'Communication') {
                self.communication = ratingTypeIDField + ':' + value;
            } else if (ratingNameField === 'Time Punctuality') {
                self.timePunctuality = ratingTypeIDField + ':' + value;
            } else if (ratingNameField === 'Cooperation') {
                self.cooperation = ratingTypeIDField + ':' + value;
            } else if (ratingNameField === 'Attitude') {
                self.attitude = ratingTypeIDField + ':' + value;
            }
        }

        redirectTo(href: any) {

            $('#PDone').modal('toggle');
            this.$state.go(href);
        }

        postRating(){
            var self = this;
            self.ratingCSV = self.rateValue + '|' +self.timePunctuality + '|' + self.communication + '|' + self.cooperation + '|' + self.attitude;
            self.reviewCSV = self.aboutClientLike + ':' + self.aboutClientDislike + ':' + self.commentTxt + ':-1';
            //console.log(self.ratingCSV);
            //console.log(self.reviewCSV);
            var data={
                "AppID":self.appointmentID,
                "RatingByID":self.$window.localStorage.getItem('CustomerID'),
                "RatingCSV":self.ratingCSV,
                "RatingToID":self.clientId,
                "ReviewCSV":self.reviewCSV
            }
            console.log(data);
            self.CustomerHttp.post(data,'/AddRating').then(function(res){
                self.messages = 'Thank you for rating';
                $('#PDone').modal();
            },function(error){

            });
            
        }
       
    }


    angular.module('spafoo.ctrl.AddClientReview', []).controller('AddClientReview', AddClientReviewController);

}