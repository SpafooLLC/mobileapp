module spafoo.httpsharedservice {

    export interface ISharedHttp {

        deviceName: string;
        customerId: string;
        userType: string;
        uuid: string; dates: Date; picId: string;picPath: string;
        profileImageUrl: string; ImageURl: string; TagField: string; starField: string;
        Rateperson: string; ProviderServiceList: {}; WorkSamplesList: {}; GetUserInfoRcd: {}; GetAddressRcd: any;
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
    }
    export class SharedHttp implements ISharedHttp {
        static $inject = ['$q', 'CustomerHttp'];
        constructor(private $q: ng.IQService, private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp) { }
        dates: Date;
        deviceName: string;
        customerId: string;
        userType: string;
        uuid: string; picId: string; picPath: string;
        profileImageUrl: string; ImageURl: string; TagField: string; starField: string; Rateperson: string;
        ProviderServiceList: {}; WorkSamplesList: {}; GetUserInfoRcd: {}; GetAddressRcd: any;
        getuserType(): any {
            return this.userType;
        }
        setuserType(value: any): any {
            this.userType = value;
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

        getFormatedTime(timeString:any): any {
            
            var hourEnd = timeString.indexOf(":");
            var H = +timeString.substr(0, hourEnd);
            var h = H % 12 || 12;
            var ampm = H < 12 ? " AM" : " PM";
            timeString = h + timeString.substr(hourEnd, 3) + ampm;
           return timeString;
        }

       

        getFormatedDate(joindates: any, formatType: any): any {
            if (formatType != "weekday dd MMMM yyyy") {
                var abcDate = (joindates).replace("/Date(", "").replace(")/", "");
                this.dates = new Date(parseInt(abcDate));
            }
            else {  this.dates = new Date(joindates); }
          
            var month = new Array();
            var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            switch (formatType) {
                case "dd MMMM yyyy":
                    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                    break;
                case "dd-MMM-yyyy": month= ["Jan","Feb","Mar","April", "May","June","July","Aug","Sept","Oct","Nov","Dec"]
                    break;
                case "weekday dd MMMM yyyy":
                    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                    break;
            }
            switch (formatType) {
                case "dd MMMM yyyy": return (this.dates.getDate() + " " + month[this.dates.getMonth()] + " " + this.dates.getFullYear());
                case "dd-MMM-yyyy": return (this.dates.getDate() + "-" + month[this.dates.getMonth()] + "-" + this.dates.getFullYear());
                case "dd/MM/yyyy": return (this.dates.getDate() + "/" + this.dates.getMonth() + 1 + "/" + this.dates.getFullYear());
                case "weekday dd MMMM yyyy": return (weekday[this.dates.getDay()] + " " + this.dates.getDate() + " " + month[this.dates.getMonth()] + " " + this.dates.getFullYear());


            }

            return (this.dates.getDate() + " " + month[this.dates.getMonth()] + " " + this.dates.getFullYear());
        }

        getProfilePics(customerID: any): ng.IPromise<string> {
            var deferred = this.$q.defer();
            
            if (customerID === null || isNaN(customerID )) {
                this.ImageURl = "images/Site/default-User.png";
                deferred.resolve(this.ImageURl);
            }
            else {
                this.CustomerHttp.get('/GetProfilePic/' + customerID).then(function (response: any) {
                    if (response.GetProfilePicResult.length > 0) {
                        this.ImageURl = "http://dev.spafoo.com" + response.GetProfilePicResult;
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
            this.CustomerHttp.get('/GetAppLocation/' + AppointMentID).then(function (response: any) {
                var e= response.GetAppLocationResult
                this.GetAddressRcd = (e.addressField + "," + e.cityField + ", " + e.stateField + " - " + e.zipField);
                deferred.resolve(this.GetAddressRcd);
            }, function (error) { });
            return deferred.promise;
        }






    }
    angular
        .module('spafoo.httpsharedservice', [])
        .service('SharedHttp', SharedHttp);
}