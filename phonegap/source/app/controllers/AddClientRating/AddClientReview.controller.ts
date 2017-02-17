module AddClientReviewController {

    interface IAddClientReviewController {
        clientId: string;
        appointmentID: string;
        ServiceData: any;
        listRateData: any;
        profilePic: string;
        rateValue: string;
        isChecked: boolean;
        commentTxt: string;
        dropDownVal: string;
        ratingCSV: string;
        communication: string;
        cooperation: string;
        timePunctuality: string;
        reviewCSV: string;
        messages: string;
        aboutClientLike: string;
        aboutClientDislike: string;
        attitude: string;
    }

    interface IStateParams extends angular.ui.IStateParamsService {
    }

    class AddClientReviewController implements IAddClientReviewController {
        clientId: string;
        appointmentID: string;
        ServiceData: any;
        listRateData: any;
        profilePic: string;
        rateValue: string;
        isChecked: boolean;
        commentTxt: string;
        dropDownVal: string;
        ratingCSV: string;
        communication: string;
        cooperation: string;
        timePunctuality: string;
        reviewCSV: string;
        messages: string;
        aboutClientLike: string;
        aboutClientDislike: string;
        attitude: string;
        pageName: string;
        UserID: string;
        authTxnIDField: string;
        appointmentIDField: string;
        payTxnIDField: string;
        amountField: string;
        PID: string;
        PPID: string;


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
            private $stateParams: IStateParams
        ) {
            this.getProviderInfo();
            this.pageName = this.$stateParams.pageName;

        }
        CompleteApp() {
            var self = this;
            self.UserID = this.$window.localStorage.getItem('CustomerID');
            self.clientId = self.$stateParams.clientId;
            self.authTxnIDField = self.$stateParams.authTxnIDField;
            self.appointmentIDField = self.$stateParams.appointmentIDField;
            self.payTxnIDField = self.$stateParams.payTxnIDField;
            self.amountField = self.$stateParams.amountField;

            self.PID = self.$stateParams.PID;
            self.PPID = self.$stateParams.PPID;

            //console.log(self.UserID + ':' + self.clientId + ':' + self.authTxnIDField + ':' + self.appointmentIDField + ':' + self.payTxnIDField + ':' + self.amountField + ':' + self.comment);
            //self.message = 'Appointment Completed';
            //$("#PDone").modal();
            self.SharedHttp.completeAppService(self.UserID, self.clientId, self.authTxnIDField, self.appointmentIDField, self.payTxnIDField, self.amountField, self.$stateParams.comment, self.PID, self.PPID);
        }
        getProviderInfo() {
            var self = this;
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
            self.isChecked = false;
            self.clientId = self.$stateParams.clientId;
            self.appointmentID = self.$stateParams.appId;
            self.CustomerHttp.get('/GetUserInfo/' + self.clientId).then(function (response: any) {
                self.ServiceData = response.GetUserInfoResult;
                self.ServiceData.firstNameField = self.ServiceData.firstNameField + " " + self.ServiceData.lastNameField[0] + "."
                self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.profilePic = imgres; });
            }, function (error) {
                if (error === null) {

                } else {
                    //console.log(error);
                }
            });
            self.CustomerHttp.get('/ListRating/1').then(function (response: any) {
                self.listRateData = response;
                console.log(self.listRateData);
            }, function (error) {
                if (error === null) {

                } else {
                    //console.log(error);
                }
            });

        }

        getRate(rate: string) {
            var self = this;
            self.rateValue = '0' + ':' + rate;
        }

        toggleCheck() {
            var self = this;
            self.isChecked = self.isChecked == true ? false : true;
        }

        postRateInfo(ratingNameField: string, ratingTypeIDField: string, value: string) {
            var self = this;
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

        postRating() {
            var self = this;
            if (self.rateValue == null || self.rateValue == "") {
                self.messages = "Please choose rating.";
                $("#PDoneError").modal();
                return;
            }
            if (self.timePunctuality == null || self.timePunctuality == "") {
                self.messages = "Please choose timePunctuality";
                $("#PDoneError").modal();
                return;
            }
            if (self.communication == null || self.communication == "") {
                self.messages = "Please choose communication";
                $("#PDoneError").modal();
                return;
            }
            if (self.cooperation == null || self.cooperation == "") {
                self.messages = "Please choose cooperation.";
                $("#PDoneError").modal();
                return;
            }

            if (self.attitude == null || self.attitude == "") {
                self.messages = "Please choose attitude.";
                $("#PDoneError").modal();
                return;
            }


            self.ratingCSV = self.rateValue + '|' + self.timePunctuality + '|' + self.communication + '|' + self.cooperation + '|' + self.attitude;
            self.reviewCSV = self.aboutClientLike + ':' + self.aboutClientDislike + ':' + self.commentTxt + ':-1';
            //console.log(self.ratingCSV);
            //console.log(self.reviewCSV);
            var data = {
                "AppID": self.appointmentID,
                "RatingByID": self.$window.localStorage.getItem('CustomerID'),
                "RatingCSV": self.ratingCSV,
                "RatingToID": self.clientId,
                "ReviewCSV": self.reviewCSV
            }
            console.log(data);
            self.CustomerHttp.post(data, '/AddRating').then(function (res) {
                self.messages = 'Thank you for rating';
                $('#PDone').modal();
            }, function (error) {

            });

        }

    }


    angular.module('spafoo.ctrl.AddClientReview', []).controller('AddClientReview', AddClientReviewController);

}