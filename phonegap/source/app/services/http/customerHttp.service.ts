module spafoo.httpservice {
    export interface Iwindow extends ng.IWindowService {

    }
    export interface ICustomerScreenHttp {
        get(url: string): ng.IPromise<string>;
        post(data: any, url: string): ng.IPromise<any>;
    }

    export class CustomerScreenHttp implements ICustomerScreenHttp {
        WebURL: string;
        static $inject = ['$http', '$log', '$q', '$window', '$location'];
        constructor(

            private $http: ng.IHttpService,
            private $log: ng.ILogService,
            private $q: ng.IQService,

            private $window: Iwindow,
            private $location: any
        ) {
           this.WebURL = 'http://websvc.spafoo.com/SpaServices.svc';
            // this.WebURL = 'http://localhost:61874/SpaServices.svc';
        }


        // *** create customer ***
        post(data: any, url: string): ng.IPromise<any> {
            //alert('datapost' + JSON.stringify (data) + url);
            var deferred = this.$q.defer();
            var apiUrl = this.WebURL + url;
            //alert('apiurl' + apiUrl);
            $("#showload").show();
            this.$http.post(apiUrl, data).success(function (data) {
                deferred.resolve(data);
                $("#showload").hide();
            }).error(function (error) {
                deferred.reject(error);
                $("#showload").hide();
                alert('Connection : Please Check Internet Connection.');
            });
            return deferred.promise;
        }
        get(url: string): ng.IPromise<string> {
            var deferred = this.$q.defer();
            var apiUrl = this.WebURL + url;
            $("#showload").show();
            this.$http.get(apiUrl).success(function (data) {
                deferred.resolve(data);
                $("#showload").hide();
            }).error(function (error) {
                deferred.reject(error);
                $("#showload").hide();
                alert('Connection : Please Check Internet Connection.');
            });
            return deferred.promise;
        }

    }
    angular
        .module('spafoo.httpservice', [])
        .service('CustomerHttp', CustomerScreenHttp);
}
