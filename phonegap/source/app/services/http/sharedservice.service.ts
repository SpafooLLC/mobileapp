module spafoo.httpsharedservice {

    export interface ISharedHttp {
        LoginStatus: boolean;
        deviceName: string;
        customerId: string;
        userType: string;
        uuid: string; dates: Date; picId: string; picPath: string; AddressDetailRcd :string,
        profileImageUrl: string; ImageURl: string; TagField: string; starField: string; NotificationList: any;
        Rateperson: string; ProviderServiceList: {}; WorkSamplesList: {}; GetUserInfoRcd: {}; GetAddressRcd: any; HideApp: boolean;
        getLoginStatus(): any;

        getAddressDetailRcd(): any;
        setAddressDetailRcd(value: any): any;

        setLoginStatus(value: any): any;
        getuserType(): any;
        setuserType(value: any): any;
        getUuid(): any;
        setUuid(value: any): any;
        getCustomerId(): any;
        setCustomerId(value: any): any;
        getProfileImage(): any;
        setProfileImage(value: any): any;
        getFormatedDate(joindates: any, formatType: any): any;
        getProfilePics(customerID: any): ng.IPromise<string>;
        GetProTagLine(UserID: any): ng.IPromise<string>;
        GetMyRating(UserID: any): ng.IPromise<string>;
        GetProviderServices(UserID: any): ng.IPromise<string>;
        GetWorkSamples(UserID: any): ng.IPromise<string>;
        GetUserInfo(UserID: any): ng.IPromise<string>;
        getFormatedTime(timeString: any): any;
        GetAddressInfo(AppointMentID: any): ng.IPromise<string>;
        getPicID(): any;
        setPicID(value: any): any;
        getPicPath(): any;
        setPicPath(value: any): any;
        GetMyNotification(UserID: any): ng.IPromise<string>;
        DoLogin(username: string, password: string): ng.IPromise<string>;
        redirectTo(href: any, ModalId: any): void;
<<<<<<< HEAD
        HideApp4Me(AppID: any, UserType: any):ng.IPromise<string> ;
=======
        HideApp4Me(AppID: any, UserType: any): ng.IPromise<string>;
        completeAppService(UserID: any, clientId: any, authTxnIDField: any, appointmentIDField: any, payTxnIDField: any, amountField: any, comment: any): any;
        UnSeenStatus(AppointmentID: any): void;
>>>>>>> refs/remotes/origin/PawanBranch
    }
    export class SharedHttp implements ISharedHttp {
        static $inject = ['$q', 'CustomerHttp', '$window', '$rootScope', '$state'];
        constructor(private $q: ng.IQService, private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp, private $window: ng.IWindowService, private $rootScope: any, private $state: angular.ui.IStateService, ) { }
        LoginStatus: boolean;
        dates: Date;
        deviceName: string;
        customerId: string;
        userType: string;
        uuid: string; picId: string; picPath: string; AddressDetailRcd: string;
        profileImageUrl: string; ImageURl: string; TagField: string; starField: string; Rateperson: string;
        ProviderServiceList: {}; WorkSamplesList: {}; GetUserInfoRcd: {}; GetAddressRcd: any; NotificationList: any; HideApp: any;
        getuserType(): any {
            return this.userType;
        }
        setuserType(value: any): any {
            this.userType = value;
        }
        getAddressDetailRcd(): any {
            return this.AddressDetailRcd;
        }
        setAddressDetailRcd(value: any): any {
            this.AddressDetailRcd = value;
        }
        getUuid(): any {
            return this.uuid;
        }
        setUuid(value: any): any {
            this.uuid = value;
        }
        getCustomerId(): any {
            return this.customerId;
        }
        setCustomerId(value: any): any {
            this.customerId = value;
        }

        getProfileImage(): any {
            return this.profileImageUrl;
        }
        setProfileImage(value: any): any {
            this.profileImageUrl = value;
        }
        getPicID(): any {
            return this.picId;
        }
        setPicID(value: any): any {
            this.picId = value;
        }
        getPicPath(): any {
            return this.picPath;
        }
        setPicPath(value: any): any {
            this.picPath = value;
        }
        getLoginStatus(): any {
            return this.LoginStatus;
        }
        setLoginStatus(value: any): any {
            this.LoginStatus = value;
        }
        redirectTo(href: any, ModalId: any): void {
            $('#' + ModalId).modal('toggle');
            this.$state.go(href);
        }
        getFormatedTime(timeString: any): any {

            var hourEnd = timeString.indexOf(":");
            var H = +timeString.substr(0, hourEnd);
            var h = H % 12 || 12;
            var ampm = H < 12 ? " AM" : " PM";
            timeString = h + timeString.substr(hourEnd, 3) + ampm;
            return timeString;
        }

        completeAppService(UserID: any, clientId: any, authTxnIDField: any, appointmentIDField: any, payTxnIDField: any, amountField: any, comment: any) {

            var self = this;
        

            var UserID = UserID;
            var clientId = clientId;
            var authTxnIDField = authTxnIDField;
            var appointmentIDField = appointmentIDField;
            var payTxnIDField = payTxnIDField;
            var amountField = amountField;

            //console.log(self.UserID + ':' + self.clientId + ':' + self.authTxnIDField + ':' + self.appointmentIDField + ':' + self.payTxnIDField + ':' + self.amountField + ':' + self.comment);
            //self.message = 'Appointment Completed';
            //$("#PDone").modal();
            var data = {
                TxnID: authTxnIDField,
                Amount: amountField
            };
            self.CustomerHttp.post(data, '/ChargePreviousAuth').then(function (res: any) {
                var response = JSON.parse(res);
                var upData = {
                    ID: appointmentIDField,
                    Comment: comment,
                    PaymentTxnID: payTxnIDField
                };
                self.CustomerHttp.post(upData, '/UpdateAppointment').then(function (upRes: any) {
                    var navData = {
                        ByID: UserID,
                        NotTypeID: 8,
                        RelatedEntityID: appointmentIDField,
                        ToID: clientId
                    };
                    self.CustomerHttp.post(navData, '/AddNotification').then(function (navRes: any) {
                        self.message = 'Appointment Completed';
                        //$("#PDone").modal();
                        self.$state.go("ProAppointments");
                    }, function (navError: any) {

                    })
                }, function (erError: any) {

                });

            }, function (error: any) {
                //alert('someError on ChargePreviosAuth');
            });
        }

        getFormatedDate(joindates: any, formatType: any): any {
            if (formatType != "weekday dd MMMM yyyy") {
                var abcDate = (joindates).replace("/Date(", "").replace(")/", "");
                this.dates = new Date(parseInt(abcDate));
            }
            else { this.dates = new Date(joindates); }

            var month = new Array();
            var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            switch (formatType) {
                case "dd MMMM yyyy":
                    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                    break;
                case "dd-MMM-yyyy": month = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
                    break;
                case "weekday dd MMMM yyyy":
                    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                    break;
                case "MM DD":

                    month = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
                    break;
            }
            switch (formatType) {
                case "dd MMMM yyyy": return (this.dates.getDate() + " " + month[this.dates.getMonth()] + " " + this.dates.getFullYear());
                case "dd-MMM-yyyy": return (this.dates.getDate() + "-" + month[this.dates.getMonth()] + "-" + this.dates.getFullYear());
                case "dd/MM/yyyy": return (this.dates.getDate() + "/" + this.dates.getMonth() + 1 + "/" + this.dates.getFullYear());
                case "weekday dd MMMM yyyy": return (weekday[this.dates.getDay()] + " " + this.dates.getDate() + " " + month[this.dates.getMonth()] + " " + this.dates.getFullYear());
                case "MM DD": return (month[this.dates.getMonth()] + " " + this.dates.getDate());
            }
            return (this.dates.getDate() + " " + month[this.dates.getMonth()] + " " + this.dates.getFullYear());
        }
       
        getProfilePics(customerID: any): ng.IPromise<string> {
            var deferred = this.$q.defer();
            if (customerID === null || isNaN(customerID)) {
                this.ImageURl = "images/Site/default-User.png";
                deferred.resolve(this.ImageURl);
            }
            else {
                this.CustomerHttp.get('/GetProfilePic/' + customerID).then(function (response: any) {
                    if (response.GetProfilePicResult.length > 0) {
                        this.ImageURl = "http://www.spafoo.com" + response.GetProfilePicResult;
                    }
                    else {
                        this.ImageURl = "images/Site/default-User.png";
                    }
                    deferred.resolve(this.ImageURl);
                }, function (error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        }

        GetProTagLine(UserID: any): ng.IPromise<string> {
            var deferred = this.$q.defer();
            this.CustomerHttp.get('/GetProTagLine/' + UserID).then(function (response: any) {
                this.TagField = decodeURIComponent(decodeURI(response.GetProTagLineResult.Success));
                deferred.resolve(this.TagField);
            }, function (error) { });
            return deferred.promise;
        }

        GetMyRating(UserID: any): ng.IPromise<string> {
            var deferred = this.$q.defer();
            this.CustomerHttp.get('/GetMyRating/' + UserID).then(function (response: any) {
                this.starField = response.GetMyRatingResult.Success;

                deferred.resolve(this.starField);
            }, function (error) { });
            return deferred.promise;
        }

        GetProviderServices(UserID: any): ng.IPromise<string> {
            var deferred = this.$q.defer();
            this.CustomerHttp.get('/GetProviderServices/' + UserID).then(function (response: any) {
                this.ProviderServiceList = response.GetProviderServicesResult;
                deferred.resolve(this.ProviderServiceList);
            }, function (error) { });
            return deferred.promise;
        }

        GetWorkSamples(UserID: any): ng.IPromise<string> {
            var deferred = this.$q.defer();
            this.CustomerHttp.get('/GetWorkSamples/' + UserID).then(function (response: any) {
                this.WorkSamplesList = response.GetWorkSamplesResult;

                deferred.resolve(this.WorkSamplesList);
            }, function (error) { });
            return deferred.promise;
        }

        HideApp4Me(AppID: any, UserType: any):  ng.IPromise<string>  {
            var deferred = this.$q.defer();
            this.CustomerHttp.get('/HideApp4Me/' + AppID + '/' + UserType).then(function (response: any) {
                this.HideApp =response; 

                deferred.resolve(this.HideApp);
            }, function (error) { });
            return deferred.promise;
        }



        GetUserInfo(UserID: any): ng.IPromise<string> {
            var deferred = this.$q.defer();
            this.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response: any) {
                this.GetUserInfoRcd = response.GetUserInfoResult;
                deferred.resolve(this.GetUserInfoRcd);
            }, function (error) { });
            return deferred.promise;
        }

        GetAddressInfo(AppointMentID: any): ng.IPromise<string> {
            var deferred = this.$q.defer();
            var self = this;
            this.CustomerHttp.get('/GetAppLocation/' + AppointMentID).then(function (response: any) {
                var e = response.GetAppLocationResult
                
                this.GetAddressRcd = (e.addressField + "," + e.cityField + ", " + e.stateField + " - " + e.zipField);
                self.setAddressDetailRcd((e.addressField + "<br />" + e.cityField + ", " + e.stateField + " - " + e.zipField));
                //this.GetAddressDetailRcd = (e.addressField + "<br>" + e.cityField + ", " + e.stateField + " - " + e.zipField);
               //     this.GetAddressRcd = (e.cityField+ ", " + e.stateField );
           //   alert(this.GetAddressRcd);
                deferred.resolve(this.GetAddressRcd);
            }, function (error) { });
            return deferred.promise;
        }


        GetMyNotification(UserID: any): ng.IPromise<string> {
            var deferred = this.$q.defer();
            this.CustomerHttp.get('/GetMyNotification/' + UserID).then(function (response: any) {
                this.NotificationList = response.GetMyNotificationResult;
                deferred.resolve(this.NotificationList);
            }, function (error) { });
            return deferred.promise;
        }

        DoLogin(username: string, password: string): ng.IPromise<string> {
            var deferred = this.$q.defer();
            var self = this;
            var data = {
                Username: username,
                Password: password,
            };

            self.CustomerHttp.post(data, '/LoginUser').then(function (response: any) {
                if (parseInt(response.Source)) {
                    self.$window.localStorage.setItem('CustomerID', response.Source);
                    self.$window.localStorage.setItem('Role', response.Usertype);
                    self.$window.localStorage.setItem('LoginStatus', "true");
                    self.GetUserInfo(response.Source).then(function (res: any) {
                        self.$rootScope.UserProfileName = res.displayNameField;
                        self.$window.localStorage.setItem('CustomerName', res.displayNameField);
                        self.$rootScope.GetLoginStatus = true;
                    });
                    self.GetMyNotification(response.Source).then(function (res: any) { self.$rootScope.NotifiCount = res.length; });
                    self.$rootScope.getRole = (self.$window.localStorage.getItem('Role') == "P" ? "P" : "C");
                }
                else {
                    self.$window.localStorage.setItem('CustomerID', "0");
                    self.$window.localStorage.setItem('LoginStatus', "false");
                    self.$window.localStorage.setItem('Role', null);
                    self.$rootScope.GetLoginStatus = false;
                    self.messages = "Login Failed, Please enter correct username and password";
                    $("#PDone").modal();
                }

                deferred.resolve(self.$rootScope.UserProfileName);
            }, function (error) {

            });
            return deferred.promise;
        }

        UnSeenStatus(AppointmentID: any) :void{
            var self = this;
            self.CustomerHttp.get('/UpdateAppSeenStatus/' + AppointmentID).then(function (response: any) {
               

            }, function (error) {
            });
        }
       
    }
    angular
        .module('spafoo.httpsharedservice', [])
        .service('SharedHttp', SharedHttp);
}