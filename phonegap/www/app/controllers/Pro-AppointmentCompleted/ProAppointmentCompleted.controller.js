var ProAppointmentCompletedController;
(function (ProAppointmentCompletedController_1) {
    var ProAppointmentCompletedController = (function () {
        function ProAppointmentCompletedController($q, $state, $scope, $location, CustomerHttp, $window, SharedHttp, $stateParams) {
            this.$q = $q;
            this.$state = $state;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.SharedHttp = SharedHttp;
            this.$stateParams = $stateParams;
            this.getClientInfo();
        }
        ProAppointmentCompletedController.prototype.getClientInfo = function () {
            var self = this;
            self.UserID = this.$window.localStorage.getItem('CustomerID');
            self.clientId = self.$stateParams.clientId;
            self.authTxnIDField = self.$stateParams.authTxnIDField;
            self.appointmentIDField = self.$stateParams.appointmentIDField;
            self.payTxnIDField = self.$stateParams.payTxnIDField;
            self.amountField = self.$stateParams.amountField;
            self.getAppointmentPhotos(self.appointmentIDField).then(function (res) {
                self.serviceData = res;
                console.log(self.serviceData);
            });
        };
        ProAppointmentCompletedController.prototype.getAppointmentPhotos = function (appId) {
            var deferred = this.$q.defer();
            var self = this;
            self.CustomerHttp.get('/GetAppointmentPhotos/' + self.appointmentIDField).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        ProAppointmentCompletedController.prototype.CompleteApp = function () {
            var self = this;
            self.UserID = this.$window.localStorage.getItem('CustomerID');
            self.clientId = self.$stateParams.clientId;
            self.authTxnIDField = self.$stateParams.authTxnIDField;
            self.appointmentIDField = self.$stateParams.appointmentIDField;
            self.payTxnIDField = self.$stateParams.payTxnIDField;
            self.amountField = self.$stateParams.amountField;
            //console.log(self.UserID + ':' + self.clientId + ':' + self.authTxnIDField + ':' + self.appointmentIDField + ':' + self.payTxnIDField + ':' + self.amountField + ':' + self.comment);
            //self.message = 'Appointment Completed';
            //$("#PDone").modal();
            var data = {
                TxnID: self.authTxnIDField,
                Amount: self.amountField
            };
            self.CustomerHttp.post(data, '/ChargePreviousAuth').then(function (res) {
                var response = JSON.parse(res);
                var upData = {
                    ID: self.appointmentIDField,
                    Comment: self.comment,
                    PaymentTxnID: self.payTxnIDField
                };
                self.CustomerHttp.post(upData, '/UpdateAppointment').then(function (upRes) {
                    var navData = {
                        ByID: self.UserID,
                        NotTypeID: 8,
                        RelatedEntityID: self.appointmentIDField,
                        ToID: self.clientId
                    };
                    self.CustomerHttp.post(navData, '/AddNotification').then(function (navRes) {
                        self.message = 'Appointment Completed';
                        $("#PDone").modal();
                    }, function (navError) {
                    });
                }, function (erError) {
                });
            }, function (error) {
                alert('someError on ChargePreviosAuth');
            });
        };
        ProAppointmentCompletedController.prototype.AddSampleImage = function (fileID) {
            var self = this;
            try {
                //alert(choice);
                navigator.camera.getPicture(function (imageURI) {
                    var extension = imageURI.substr(imageURI.lastIndexOf('.') + 1).toUpperCase();
                    //alert(imageURI);
                    if (extension === 'PNG' || extension === 'JPEG' || extension === 'JPG') {
                        //alert(extension);
                        $("#showload").show();
                        var options = new FileUploadOptions();
                        options.fileKey = 'file';
                        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                        options.mimeType = 'application/pdf';
                        var params = {
                            'UID': self.customerID,
                            'FileId': fileID
                        };
                        alert(JSON.stringify(params));
                        options.params = params;
                        try {
                            var ft = new FileTransfer();
                        }
                        catch (ex) {
                            self.toaster.error('exception generated:' + ex, 'Error');
                        }
                        ft.upload(imageURI, 'http://dev.spafoo.com/DesktopModules/NS_ManageScheduledServices/Scripts/jquery-uploadify/mHandler.ashx', (function (r) {
                            alert(JSON.stringify(r));
                            if (r.responseCode === '200' || r.responseCode === 200) {
                                self.SharedHttp.GetWorkSamples(self.customerID).then(function (res) {
                                    self.$timeout(function () {
                                        self.WorkSamplesList = res;
                                    }, 3000);
                                });
                                $("#showload").hide();
                            }
                            else {
                                alert('Something went wrong with the server ');
                                $("#showload").hide();
                            }
                        }), (function (msg) {
                            alert("Sample Image can\'t upload : " + JSON.stringify(msg));
                            $("#showload").hide();
                        }), options);
                    }
                    else {
                        self.messages = "PNG,JPEG,JPG images allowed";
                        alert('PNG,JPEG,JPG images allowed');
                    }
                }, self.onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URL,
                    mediaType: Camera.MediaType.ALLMEDIA,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                    correctOrientation: true
                });
            }
            catch (ex) {
                self.messages = "Can\'nt upload image";
                alert('Can\'nt upload image');
            }
            finally {
                self.isImageClick = false;
            }
        };
        ProAppointmentCompletedController.prototype.RemoveAppointmentImage = function (fileId) {
            var self = this;
            var params = {
                'ID': fileId
            };
            self.CustomerHttp.post(params, '/RemoveAppointmentPhoto').then(function (res) {
                self.SharedHttp.GetWorkSamples(self.customerID).then(function (res) {
                    self.$timeout(function () {
                        self.WorkSamplesList = res;
                    }, 3000);
                });
            }, function (error) {
                alert('Something went wrong with the server');
            });
        };
        ProAppointmentCompletedController.$inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp', '$stateParams'];
        return ProAppointmentCompletedController;
    }());
    angular.module('spafoo.ctrl.ProAppointmentCompleted', []).controller('ProAppointmentCompleted', ProAppointmentCompletedController);
})(ProAppointmentCompletedController || (ProAppointmentCompletedController = {}));

//# sourceMappingURL=ProAppointmentCompleted.controller.js.map
