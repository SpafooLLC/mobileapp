module ProAppointmentCompletedController {
    interface IStateParams extends angular.ui.IStateParamsService {
    }
    class ProAppointmentCompletedController {
        authTxnIDField: string;
        amountField: string;
        appointmentIDField: string;
        payTxnIDField: string;
        clientId: string;
        comment: string;
        UserID: string;
        message: string;
        serviceData: any;

        static $inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp', '$stateParams'];
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp,
            private $stateParams: IStateParams
        ) {
            this.getClientInfo();
        }

        getClientInfo() {
            var self = this;
            self.UserID = this.$window.localStorage.getItem('CustomerID');
            self.clientId = self.$stateParams.clientId;
            self.authTxnIDField = self.$stateParams.authTxnIDField;
            self.appointmentIDField = self.$stateParams.appointmentIDField;
            self.payTxnIDField = self.$stateParams.payTxnIDField;
            self.amountField = self.$stateParams.amountField;
            self.getAppointmentPhotos(self.appointmentIDField).then(function (res: any) {
                self.serviceData = res;
                console.log(self.serviceData);
            });
            


        }

        getAppointmentPhotos(appId: string): ng.IPromise<string> {
            var deferred = this.$q.defer();
            var self = this;
            self.CustomerHttp.get('/GetAppointmentPhotos/' + self.appointmentIDField).then(function (response: any) {
                deferred.resolve(response);
            }, function (error: any) {
                deferred.reject(error);
                });
            return deferred.promise; 
        }

        

        CompleteApp() {
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
            self.CustomerHttp.post(data, '/ChargePreviousAuth').then(function (res: any) {
                var response = JSON.parse(res);
                var upData = {
                    ID: self.appointmentIDField,
                    Comment: self.comment,
                    PaymentTxnID: self.payTxnIDField
                };
                self.CustomerHttp.post(upData, '/UpdateAppointment').then(function (upRes: any) {
                    var navData = {
                        ByID: self.UserID,
                        NotTypeID: 8,
                        RelatedEntityID: self.appointmentIDField,
                        ToID: self.clientId
                    };
                    self.CustomerHttp.post(navData, '/AddNotification').then(function (navRes: any) {
                        self.message = 'Appointment Completed';
                        $("#PDone").modal();
                    }, function (navError: any) {

                    })
                }, function (erError: any) {

                });

            }, function (error: any) {
                alert('someError on ChargePreviosAuth');
            });
        }

        AddSampleImage(fileID: string) {
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
                        } catch (ex) {
                            self.toaster.error('exception generated:' + ex, 'Error');
                        }

                        ft.upload(imageURI, 'http://dev.spafoo.com/DesktopModules/NS_ManageScheduledServices/Scripts/jquery-uploadify/mHandler.ashx', (function (r: any) {
                            alert(JSON.stringify(r));
                            if (r.responseCode === '200' || r.responseCode === 200) {
                                self.SharedHttp.GetWorkSamples(self.customerID).then(function (res) {
                                    self.$timeout(function () {
                                        self.WorkSamplesList = res;
                                    }, 3000)
                                });
                                $("#showload").hide();
                            } else {
                                alert('Something went wrong with the server ');
                                $("#showload").hide();
                            }
                        }), (function (msg) {
                            alert("Sample Image can\'t upload : " + JSON.stringify(msg));
                            $("#showload").hide();
                        }), options);
                    } else {
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

                // Take picture using device camera and retrieve image as base64-encoded string

            } catch (ex) {
                self.messages = "Can\'nt upload image";
                alert('Can\'nt upload image');
            } finally {
                self.isImageClick = false;
            }

        }

        RemoveAppointmentImage(fileId: any) {
            var self = this;
            var params = {                
                'ID': fileId
            };
            self.CustomerHttp.post(params, '/RemoveAppointmentPhoto').then(function (res) {
                self.SharedHttp.GetWorkSamples(self.customerID).then(function (res) {
                    self.$timeout(function () {
                        self.WorkSamplesList = res;
                    }, 3000)
                });
            }, function (error) {
                alert('Something went wrong with the server');
            });
        }


    }


    angular.module('spafoo.ctrl.ProAppointmentCompleted', []).controller('ProAppointmentCompleted', ProAppointmentCompletedController);

}