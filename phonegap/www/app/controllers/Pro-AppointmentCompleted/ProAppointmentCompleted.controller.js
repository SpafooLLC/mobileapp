var ProAppointmentCompletedController;
(function (ProAppointmentCompletedController_1) {
    var ProAppointmentCompletedController = (function () {
        function ProAppointmentCompletedController($q, $state, $scope, $location, CustomerHttp, $window, SharedHttp, $stateParams, $timeout) {
            this.$q = $q;
            this.$state = $state;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.SharedHttp = SharedHttp;
            this.$stateParams = $stateParams;
            this.$timeout = $timeout;
            this.getClientInfo();
            this.page = window.location.hash.split('/')[1];
        }
        ProAppointmentCompletedController.prototype.getClientInfo = function () {
            var self = this;
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
            self.UserID = this.$window.localStorage.getItem('CustomerID');
            self.clientId = self.$stateParams.clientId;
            self.authTxnIDField = self.$stateParams.authTxnIDField;
            self.appointmentIDField = self.$stateParams.appointmentIDField;
            self.payTxnIDField = self.$stateParams.payTxnIDField;
            self.amountField = self.$stateParams.amountField;
            self.PID = self.$stateParams.PID;
            self.PPID = self.$stateParams.PPID;
            self.getAppointmentPhotos(self.appointmentIDField).then(function (res) {
                self.$timeout(function () {
                    self.appointmentPhotoList = res;
                }, 2000);
                //console.log(self.appointmentPhotoList);
            });
        };
        ProAppointmentCompletedController.prototype.getAppointmentPhotos = function (appId) {
            var deferred = this.$q.defer();
            var self = this;
            self.CustomerHttp.get('/GetAppointmentPhotos/' + self.appointmentIDField).then(function (response) {
                deferred.resolve(response.GetAppointmentPhotosResult);
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
            self.SharedHttp.completeAppService(self.UserID, self.clientId, self.authTxnIDField, self.appointmentIDField, self.payTxnIDField, self.amountField, self.comment, self.PID, self.PPID);
        };
        //CompleteApp1() {
        //    var self = this;
        //    self.UserID = this.$window.localStorage.getItem('CustomerID');
        //    self.clientId = self.$stateParams.clientId;
        //    self.authTxnIDField = self.$stateParams.authTxnIDField;
        //    self.appointmentIDField = self.$stateParams.appointmentIDField;
        //    self.payTxnIDField = self.$stateParams.payTxnIDField;
        //    self.amountField = self.$stateParams.amountField;
        //    //console.log(self.UserID + ':' + self.clientId + ':' + self.authTxnIDField + ':' + self.appointmentIDField + ':' + self.payTxnIDField + ':' + self.amountField + ':' + self.comment);
        //    //self.message = 'Appointment Completed';
        //    //$("#PDone").modal();
        //    var data = {
        //        TxnID: self.authTxnIDField,
        //        Amount: self.amountField
        //    };
        //    self.CustomerHttp.post(data, '/ChargePreviousAuth').then(function (res: any) {
        //        var response = JSON.parse(res);
        //        var upData = {
        //            ID: self.appointmentIDField,
        //            Comment: self.comment,
        //            PaymentTxnID: self.payTxnIDField
        //        };
        //        self.CustomerHttp.post(upData, '/UpdateAppointment').then(function (upRes: any) {
        //            var navData = {
        //                ByID: self.UserID,
        //                NotTypeID: 8,
        //                RelatedEntityID: self.appointmentIDField,
        //                ToID: self.clientId
        //            };
        //            self.CustomerHttp.post(navData, '/AddNotification').then(function (navRes: any) {
        //                self.message = 'Appointment Completed';
        //                //$("#PDone").modal();
        //                self.$state.go("ProAppointments");
        //            }, function (navError: any) {
        //            })
        //        }, function (erError: any) {
        //        });
        //    }, function (error: any) {
        //        //alert('someError on ChargePreviosAuth');
        //    });
        //}
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
                            'UID': self.UserID,
                            'AID': self.appointmentIDField
                        };
                        //alert(JSON.stringify(params));
                        options.params = params;
                        try {
                            var ft = new FileTransfer();
                        }
                        catch (ex) {
                        }
                        ft.upload(imageURI, 'http://www.spafoo.com/DesktopModules/NS_ManageScheduledServices/Scripts/jquery-uploadify/mHandler.ashx', (function (r) {
                            if (r.responseCode === '200' || r.responseCode === 200) {
                                self.getAppointmentPhotos(self.appointmentIDField).then(function (res) {
                                    self.$timeout(function () {
                                        self.appointmentPhotoList = res;
                                    }, 2000);
                                    console.log(self.appointmentPhotoList);
                                });
                                $("#showload").hide();
                            }
                            else {
                                self.message = "Something went wrong with the server ";
                                //alert('Something went wrong with the server ');
                                $("#PDone").modal();
                                $("#showload").hide();
                            }
                        }), (function (msg) {
                            self.message = "Sample Image can\'t upload ";
                            $("#PDone").modal();
                            //alert("Sample Image can\'t upload ");
                            $("#showload").hide();
                        }), options);
                    }
                    else {
                        self.messages = "PNG,JPEG,JPG images allowed";
                        $("#PDone").modal();
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
                self.message = "Can\'nt upload image";
                $("#PDone").modal();
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
            self.CustomerHttp.get('/RemoveAppointmentPhoto/' + params.ID).then(function (res) {
                self.getAppointmentPhotos(self.appointmentIDField).then(function (res) {
                    self.$timeout(function () {
                        self.appointmentPhotoList = res;
                    }, 2000);
                    console.log(self.appointmentPhotoList);
                });
            }, function (error) {
                self.message = 'Something went wrong with the server';
                $("#PDone").modal();
                // alert('Something went wrong with the server');
            });
        };
        ProAppointmentCompletedController.$inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp', '$stateParams', '$timeout'];
        return ProAppointmentCompletedController;
    }());
    angular.module('spafoo.ctrl.ProAppointmentCompleted', []).controller('ProAppointmentCompleted', ProAppointmentCompletedController);
})(ProAppointmentCompletedController || (ProAppointmentCompletedController = {}));

//# sourceMappingURL=ProAppointmentCompleted.controller.js.map
