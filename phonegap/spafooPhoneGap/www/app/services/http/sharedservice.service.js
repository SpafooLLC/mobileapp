var ez;
(function (ez) {
    var httpsharedservice;
    (function (httpsharedservice) {
        var SharedHttp = (function () {
            function SharedHttp() {
            }
            SharedHttp.prototype.getuserType = function () {
                return this.userType;
            };
            SharedHttp.prototype.setuserType = function (value) {
                this.userType = value;
            };
            SharedHttp.prototype.getUuid = function () {
                return this.uuid;
            };
            SharedHttp.prototype.setUuid = function (value) {
                this.uuid = value;
            };
            SharedHttp.prototype.getCustomerId = function () {
                return this.customerId;
            };
            SharedHttp.prototype.setCustomerId = function (value) {
                this.customerId = value;
            };
            SharedHttp.prototype.getDeviceName = function () {
                return this.deviceName;
            };
            SharedHttp.prototype.setDeviceName = function (value) {
                this.deviceName = value;
            };
            SharedHttp.prototype.getTimeZone = function () {
                return this.timeZone;
            };
            SharedHttp.prototype.setTimeZone = function (value) {
                this.timeZone = value;
            };
            return SharedHttp;
        }());
        httpsharedservice.SharedHttp = SharedHttp;
        angular
            .module('ez.httpsharedservice', [])
            .service('SharedHttp', SharedHttp);
    })(httpsharedservice = ez.httpsharedservice || (ez.httpsharedservice = {}));
})(ez || (ez = {}));

//# sourceMappingURL=sharedservice.service.js.map
