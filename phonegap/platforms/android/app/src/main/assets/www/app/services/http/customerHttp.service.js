var spafoo;
(function (spafoo) {
    var httpservice;
    (function (httpservice) {
        var CustomerScreenHttp = /** @class */ (function () {
            function CustomerScreenHttp($http, $log, $q, $window, $location) {
                this.$http = $http;
                this.$log = $log;
                this.$q = $q;
                this.$window = $window;
                this.$location = $location;
                //      this.WebURL = 'http://webapispafoo.nn.mt.cisinlive.com/SpaServices.svc'; 
                this.WebURL = 'http://websvc.spafoo.com/SpaServices.svc';
                //    this.WebURL = 'http://localhost:61874/SpaServices.svc';
            }
            // *** create customer ***
            CustomerScreenHttp.prototype.post = function (data, url) {
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
                    console.log(error);
                    alert('Issue with processing. Contact administrator');
                });
                return deferred.promise;
            };
            CustomerScreenHttp.prototype.get = function (url) {
                var deferred = this.$q.defer();
                var apiUrl = this.WebURL + url;
                $("#showload").show();
                this.$http.get(apiUrl).success(function (data) {
                    deferred.resolve(data);
                    $("#showload").hide();
                }).error(function (error) {
                    deferred.reject(error);
                    $("#showload").hide();
                    alert('Issue with processing. Contact administrator');
                });
                return deferred.promise;
            };
            CustomerScreenHttp.$inject = ['$http', '$log', '$q', '$window', '$location'];
            return CustomerScreenHttp;
        }());
        httpservice.CustomerScreenHttp = CustomerScreenHttp;
        angular
            .module('spafoo.httpservice', [])
            .service('CustomerHttp', CustomerScreenHttp);
    })(httpservice = spafoo.httpservice || (spafoo.httpservice = {}));
})(spafoo || (spafoo = {}));

//# sourceMappingURL=customerHttp.service.js.map
