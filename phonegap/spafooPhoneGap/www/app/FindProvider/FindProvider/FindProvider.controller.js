var FindProviderController;
(function (FindProviderController_1) {
    var FindProviderController = (function () {
        function FindProviderController($state, $scope, $ionicLoading, CustomerHttp) {
            this.$state = $state;
            this.$scope = $scope;
            this.$ionicLoading = $ionicLoading;
            this.CustomerHttp = CustomerHttp;
            this.$inject = ['$state', '$scope', '$ionicLoading', 'CustomerHttp'];
            var self = this;
            document.addEventListener("deviceready", function () {
                self.initialLatLong = navigator.geolocation.getCurrentPosition(self.geolocationSuccess);
            });
        }
        FindProviderController.prototype.doLogin = function () {
            var self = this;
            this.CustomerHttp.get("/ListRootBottomService").then(function (response) {
                var _Final = "";
                $.each(response.ListRootBottomServiceResult, function (i, o) {
                    debugger;
                    if (o.parentIDField == -1) {
                        if (_Final.trim() == '') {
                            _Final = "<option value='-1'>Select Service</option><optgroup label='" + o.serviceNameField + "'>";
                        }
                        else
                            _Final += "</optgroup><optgroup label='" + o.serviceNameField + "'>";
                    }
                    else {
                        _Final += "<option value='" + o.serviceIDField + "'>" + o.serviceNameField + "</option>";
                    }
                });
                $('#ddlServices').html(_Final);
                self.getServicesName = response.ListRootBottomServiceResult;
            }, function (e) {
                alert(JSON.stringify(e));
            });
        };
        FindProviderController.prototype.geolocationSuccess = function (position) {
            alert('position called' + JSON.stringify(position));
            return {
                lat: position.coords.latitude, long: position.coords.longitude
            };
        };
        FindProviderController.prototype.getProviders = function (service) {
            var self = this;
            self.CustomerHttp.get('/ListProvidersByServices/' + service).then(function (response) {
                for (var i = 0; i < response.ListProvidersByServicesResult.length; i++) {
                    self.addMarkers(response.ListProvidersByServicesResult[i].vanityUrlField);
                }
            }, function (e) {
            });
        };
        FindProviderController.prototype.addMarkers = function (latlongval) {
            alert(latlongval);
        };
        return FindProviderController;
    }());
    angular.module('spafoo.ctrl.FindProvider', []).controller('FindProvider', FindProviderController);
})(FindProviderController || (FindProviderController = {}));

//# sourceMappingURL=FindProvider.controller.js.map
