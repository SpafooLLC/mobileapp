var MyProfileEditController;
(function (MyProfileEditController_1) {
    var MyProfileEditController = (function () {
        function MyProfileEditController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp, $timeout) {
            this.$q = $q;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicLoading = $ionicLoading;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.toaster = toaster;
            this.SharedHttp = SharedHttp;
            this.$timeout = $timeout;
            this.customerID = this.$window.localStorage.getItem('CustomerID');
            this.getUserInfo();
        }
        MyProfileEditController.prototype.getUserInfo = function () {
            var self = this;
            self.CustomerHttp.get('/GetUserJSON/' + self.customerID).then(function (response) {
                self.ServiceData = JSON.parse(response.GetUserJSONResult);
                self.ServiceData.Membership.CreatedDate = self.SharedHttp.getFormatedDate(self.ServiceData.Membership.CreatedDate, "dd MMMM yyyy");
                self.SharedHttp.getProfilePics(self.ServiceData.Profile.Photo).then(function (imgres) { self.profilePic = imgres; });
            }, function (error) {
                if (error === null) {
                }
                else {
                    console.log(error);
                }
            });
        };
        MyProfileEditController.prototype.EditProfile = function (FirstName, LastName, DisplayName, Email, Gender, Street, City, Country, PostalCode, Cell) {
            var self = this;
            var uPos = '';
            if (self.doValidation(Email)) {
                //alert(FirstName + ", " + LastName + ", " + DisplayName + ", " + Email + ", " + Gender + ", " + Street + ", " + City + ", " + Country + ", " + PostalCode + ", " + Cell);
                var data = {
                    'UserID': self.customerID,
                    'FN': FirstName,
                    'LN': LastName,
                    'DN': DisplayName,
                    'E': Email,
                    'Gender': Gender,
                    'Str': Street,
                    'City': City,
                    'Region': Country,
                    'PC': PostalCode,
                    'P': Cell,
                };
                self.CustomerHttp.post(data, '/UpdateUser').then(function (response) {
                    if (response.Success === 'Success') {
                        self.$state.go("MyProfile");
                    }
                    self.$state.go("MyProfile");
                }, function (error) {
                    console.log(error);
                });
                console.log(data);
            }
        };
        MyProfileEditController.prototype.doValidation = function (Email) {
            var self = this;
            if (Email === null || Email === '' || Email == undefined) {
                self.messages = "Please Enter Email Address.";
                alert('Please Enter Email Address');
                $("#PDone").modal();
                return false;
            }
            else {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!filter.test(Email)) {
                    self.messages = "Invalid email address.";
                    alert('Invalid email address');
                    //$("#PDone").modal();
                    return false;
                }
            }
            return true;
        };
        MyProfileEditController.prototype.cameraOption = function () {
            var self = this;
            //alert('hi');
            self.isImageClick = true;
        };
        MyProfileEditController.prototype.capturePhoto = function (choice) {
            //alert('trying to upload');
            var self = this;
            try {
                if (choice === 'G') {
                    //alert(choice);
                    navigator.camera.getPicture(function (imageURI) {
                        var extension = imageURI.substr(imageURI.lastIndexOf('.') + 1).toUpperCase();
                        //alert(imageURI);
                        if (extension === 'PNG' || extension === 'JPEG' || extension === 'JPG') {
                            //alert(extension);
                            //self.$timeout(function () {
                            //self.proProfilePic = 'file://' + imageURI;
                            //alert(self.proProfilePic);
                            self.SharedHttp.setProfileImage('file://' + imageURI);
                            self.postImage();
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
                else {
                    navigator.camera.getPicture(function (imageURI) {
                        var extension = imageURI.substr(imageURI.lastIndexOf('.') + 1).toUpperCase();
                        //alert(imageURI);
                        if (extension === 'PNG' || extension === 'JPEG' || extension === 'JPG') {
                            //self.$timeout(function () {
                            //self.proProfilePic = imageURI;
                            //alert(self.proProfilePic);
                            self.SharedHttp.setProfileImage(imageURI);
                            self.postImage();
                        }
                        else {
                            self.messages = "PNG,JPEG,JPG images allowed";
                            alert('PNG,JPEG,JPG images allowed');
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
                alert('Can\'nt upload image');
            }
            finally {
                self.isImageClick = false;
            }
        };
        MyProfileEditController.prototype.postImage = function () {
            $("#showload").show();
            var self = this;
            var imageURI = self.SharedHttp.getProfileImage();
            self.SharedHttp.setProfileImage(null);
            var options = new FileUploadOptions();
            options.fileKey = 'file';
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = 'application/pdf';
            var params = {
                'UID': self.customerID
            };
            options.params = params;
            try {
                var ft = new FileTransfer();
            }
            catch (ex) {
                self.toaster.error('exception generated:' + ex, 'Error');
            }
            ft.upload(imageURI, 'http://dev.spafoo.com/DesktopModules/NS_UserProfile/Scripts/jquery-uploadify/mProfileHandler.ashx', (function (r) {
                //alert(JSON.stringify(r));
                if (r.responseCode === '200' || r.responseCode === 200) {
                    var resArr = r.response.split('|');
                    self.SharedHttp.setPicID(resArr[0]);
                    self.SharedHttp.setPicPath(resArr[1]);
                    self.$timeout(function () {
                        self.profilePic = "http://dev.spafoo.com" + resArr[1];
                    }, 2000);
                    $("#showload").hide();
                }
                else {
                    alert('Something went wrong with the server ');
                    $("#showload").hide();
                }
            }), (function (msg) {
                alert("Profile Image can\'t update");
                $("#showload").hide();
            }), options);
        };
        MyProfileEditController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$timeout'];
        return MyProfileEditController;
    }());
    angular.module('spafoo.ctrl.MyProfileEdit', []).controller('MyProfileEdit', MyProfileEditController);
})(MyProfileEditController || (MyProfileEditController = {}));

//# sourceMappingURL=MyProfileEdit.controller.js.map
