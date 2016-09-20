module ProAppointmentCompletedController {
    interface IStateParams extends angular.ui.IStateParamsService {
    }
    interface ITimeoutService extends ng.ITimeoutService { }
    class ProAppointmentCompletedController {
        authTxnIDField: string;
        amountField: string;
        appointmentIDField: string;
        payTxnIDField: string;
        clientId: string;
        comment: string;
        UserID: string;
        message: string;
        appointmentPhotoList: any;

        static $inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp', '$stateParams', '$timeout'];
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp,
            private $stateParams: IStateParams,
            private $timeout: ITimeoutService
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
                self.$timeout(function () {
                    self.appointmentPhotoList = res;
                }, 2000);
                //console.log(self.appointmentPhotoList);
            });
            


        }

        getAppointmentPhotos(appId: string): ng.IPromise<string> {
            var deferred = this.$q.defer();
            var self = this;
            self.CustomerHttp.get('/GetAppointmentPhotos/' + self.appointmentIDField).then(function (response: any) {
                deferred.resolve(response.GetAppointmentPhotosResult);
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
                            'UID': self.UserID,
                            'AID': self.appointmentIDField
                        };
                        //alert(JSON.stringify(params));
                        options.params = params;

                        try {
                            var ft = new FileTransfer();
                        } catch (ex) {
                            //self.toaster.error('exception generated:' + ex, 'Error');
                        }

                        ft.upload(imageURI, 'http://dev.spafoo.com/DesktopModules/NS_ManageScheduledServices/Scripts/jquery-uploadify/mHandler.ashx', (function (r: any) {
                          
                            if (r.responseCode === '200' || r.responseCode === 200) {
                                self.getAppointmentPhotos(self.appointmentIDField).then(function (res: any) {
                                    self.$timeout(function () {
                                        self.appointmentPhotoList = res;
                                    }, 2000);
                                    console.log(self.appointmentPhotoList);
                                });
                                $("#showload").hide();
                            } else {
                                self.message = "Something went wrong with the server ";
                                //alert('Something went wrong with the server ');
                                $("#PDone").modal();
                                $("#showload").hide();
                            }
                        }), (function (msg: any) {
                                self.message = "Sample Image can\'t upload ";
                                $("#PDone").modal();
                                //alert("Sample Image can\'t upload ");
                            $("#showload").hide();
                        }), options);
                    } else {
                        self.messages = "PNG,JPEG,JPG images allowed";
                        $("#PDone").modal();
                        //alert('PNG,JPEG,JPG images allowed');

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
                self.message = "Can\'nt upload image";
                $("#PDone").modal();
                //alert('Can\'nt upload image');
            } finally {
                self.isImageClick = false;
            }

        }

        RemoveAppointmentImage(fileId: any) {
            var self = this;
            var params = {                
                'ID': fileId
            };
            self.CustomerHttp.get('/RemoveAppointmentPhoto/' + params.ID).then(function (res) {
                self.getAppointmentPhotos(self.appointmentIDField).then(function (res: any) {
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
        }


    }


    angular.module('spafoo.ctrl.ProAppointmentCompleted', []).controller('ProAppointmentCompleted', ProAppointmentCompletedController);

}