var registerController;
(function (registerController) {
    var RegisterController = (function () {
        function RegisterController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, $timeout, SharedHttp) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.$timeout = $timeout;
            this.SharedHttp = SharedHttp;
        }
        RegisterController.prototype.doRegister = function (Regdata) {
            var self = this;
            //  alert("hello");
            if (this.DoValidation(Regdata)) {
                if (self.SharedHttp.getPicID() === null || self.SharedHttp.getPicID() === '' || self.SharedHttp.getPicID() === undefined || self.SharedHttp.getPicID() === 'undefined') {
                    Regdata.picFID = null;
                    self.SharedHttp.setPicID(null);
                }
                else {
                    Regdata.picFID = self.SharedHttp.getPicID();
                    self.SharedHttp.setPicID(null);
                }
                //  alert(JSON.stringify(Regdata));
                var data = Regdata;
                self.$ionicLoading.show();
                self.CustomerHttp.post(data, '/RegisterUser').then(function (response) {
                    if (parseInt(response.CustomerID) > 0) {
                        self.$window.localStorage.setItem('CustomerID', response.CustomerID);
                        self.SharedHttp.DoLogin(data.Username, data.Password).then(function (e) { self.$state.go("home"); });
                        ;
                    }
                    self.$ionicLoading.hide();
                }, function (error) {
                    if (error === null) {
                        self.$ionicLoading.hide();
                    }
                    else {
                        console.log(error);
                        self.$ionicLoading.hide();
                    }
                });
            }
        };
        RegisterController.prototype.GoRegistertext = function (IsProvider) {
            var self = this;
            self.$state.go("RegisterProvider");
        };
        RegisterController.prototype.DoValidation = function (Regdata) {
            var self = this;
            // alert(JSON.stringify(Regdata.Password));
            if (Regdata == undefined) {
                self.messages = "Please Enter First Name.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.FirstName === null || Regdata.FirstName === '' || Regdata.FirstName == undefined || Regdata == undefined) {
                self.messages = "Please Enter First Name.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.LastName === null || Regdata.LastName === '' || Regdata.LastName == undefined) {
                self.messages = "Please Enter Last Name.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.Username === null || Regdata.Username === '' || Regdata.Username == undefined) {
                self.messages = "Please Enter Username. ";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.Password === null || Regdata.Password === '' || Regdata.Password == undefined) {
                self.messages = "Please Enter Password.";
                $("#PDone").modal();
                return false;
            }
            else if (Regdata.Password.length < 8) {
                self.messages = "Password should be minimum Eight Character.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.ConfirmPassword === null || Regdata.ConfirmPassword === '' || Regdata.ConfirmPassword == undefined) {
                self.messages = "Please Enter Confirm Password.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.ConfirmPassword != Regdata.Password) {
                self.messages = "Password not Matched.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.EmailAddress === null || Regdata.EmailAddress === '' || Regdata.EmailAddress == undefined) {
                self.messages = "Please Enter Email Address.";
                $("#PDone").modal();
                return false;
            }
            else {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!filter.test(Regdata.EmailAddress)) {
                    self.messages = "Invalid email address.";
                    $("#PDone").modal();
                    return false;
                }
            }
            if (Regdata.MobileNo === null || Regdata.MobileNo === '' || Regdata.MobileNo == undefined) {
                self.messages = "Please Enter Mobile Number.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.Street === null || Regdata.Street === '' || Regdata.Street == undefined) {
                self.messages = "Please Enter Address.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.City === null || Regdata.City === '' || Regdata.City == undefined) {
                self.messages = "Please Enter City. ";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.State === null || Regdata.State === '' || Regdata.State == undefined) {
                self.messages = "Please Select State.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.Zipcode === null || Regdata.Zipcode === '' || Regdata.Zipcode == undefined) {
                self.messages = "Please Enter Zip code.";
                $("#PDone").modal();
                return false;
            }
            if (Regdata.termscondition === null || Regdata.termscondition === '' || Regdata.termscondition == undefined) {
                self.messages = "Please check the Payment terms";
                $("#PDone").modal();
                return false;
            }
            return true;
        };
        RegisterController.prototype.cameraOption = function () {
            var self = this;
            self.isImageClick = true;
        };
        RegisterController.prototype.capturePhoto = function (choice) {
            //alert('trying to upload');
            var self = this;
            try {
                if (choice === 'G') {
                    //alert(choice);
                    navigator.camera.getPicture(function (imageURI) {
                        var extension = imageURI.substr(imageURI.lastIndexOf('.') + 1).toUpperCase();
                        //alert(extension);
                        if (extension === 'PNG' || extension === 'JPEG' || extension === 'JPG') {
                            //alert(extension);
                            self.$timeout(function () {
                                self.imageURL = 'file://' + imageURI;
                                self.SharedHttp.setProfileImage(self.imageURL);
                                self.postImage();
                                // alert(self.SharedHttp.getProfileImage() + '-----' + self.imageURL);
                            }, 1000);
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
                else {
                    navigator.camera.getPicture(function (imageURI) {
                        var extension = imageURI.substr(imageURI.lastIndexOf('.') + 1).toUpperCase();
                        // alert(extension);
                        if (extension === 'PNG' || extension === 'JPEG' || extension === 'JPG') {
                            self.$timeout(function () {
                                self.imageURL = imageURI;
                                self.SharedHttp.setProfileImage(imageURI);
                                self.postImage();
                            }, 1000);
                        }
                        else {
                            self.messages = "PNG,JPEG,JPG images allowed";
                            $("#PDone").modal();
                        }
                    }, self.onFail, {
                        quality: 50,
                        destinationType: Camera.DestinationType.FILE_URL,
                        mediaType: Camera.MediaType.ALLMEDIA,
                        sourceType: navigator.camera.PictureSourceType.Camera,
                        correctOrientation: true
                    });
                }
            }
            catch (ex) {
                self.messages = "Can\'nt upload image";
                $("#PDone").modal();
            }
            finally {
                self.isImageClick = false;
            }
        };
        RegisterController.prototype.postImage = function () {
            var self = this;
            var imageURI = self.SharedHttp.getProfileImage();
            var options = new FileUploadOptions();
            options.fileKey = 'file';
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = 'application/pdf';
            try {
                var ft = new FileTransfer();
            }
            catch (ex) {
                self.toaster.error('exception generated:' + ex, 'Error');
            }
            ft.upload(imageURI, 'http://dev.spafoo.com/DesktopModules/NS_ClientRegistration/Script/jquery-uploadify/rhprofilepic.ashx', (function (r) {
                //self.messages = "Profile Image updated";
                //$("#PDone").modal();               
                if (r.responseCode === '200' || r.responseCode === 200) {
                    var resArr = r.response.split('|');
                    self.SharedHttp.setPicID(resArr[0]);
                    self.SharedHttp.setPicPath(resArr[1]);
                }
                else {
                    self.toaster.error('Something went wrong with the server', 'Error');
                }
            }), (function (msg) {
                self.messages = "Profile Image can\'t updated";
                $("#PDone").modal();
                return msg;
            }), options);
        };
        RegisterController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', '$timeout', 'SharedHttp'];
        return RegisterController;
    }());
    angular.module('spafoo.ctrl.register', []).controller('register', RegisterController);
})(registerController || (registerController = {}));

//# sourceMappingURL=register.controller.js.map
