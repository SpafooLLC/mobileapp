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
            $("#Telephone").mask("000-000-0000");
            $("#Cell").mask("000-000-0000");
            $("#PostalCode").mask("00000");
            this.customerID = this.$window.localStorage.getItem('CustomerID');
            this.getUserInfo();
        }
        MyProfileEditController.prototype.getUserInfo = function () {
            var self = this;
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
            self.CustomerHttp.get('/GetUserJSON/' + self.customerID).then(function (response) {
                self.ServiceData = JSON.parse(response.GetUserJSONResult);
                self.ServiceData.Membership.CreatedDate = self.SharedHttp.getFormatedDate(self.ServiceData.Membership.CreatedDate, "dd MMMM yyyy");
                self.SharedHttp.getProfilePics(self.ServiceData.Profile.Photo).then(function (imgres) { self.profilePic = imgres; });
            }, function (error) {
                if (error === null) {
                }
                else {
                }
            });
        };
        MyProfileEditController.prototype.EditProfile = function (FirstName, LastName, DisplayName, Email, Gender, Street, City, Country, PostalCode, Phone, Mob) {
            var self = this;
            var uPos = '';
            if (FirstName == "" || FirstName == null) {
                self.messages = "Please Enter Firstname.";
                $("#PDoneError").modal();
                return;
            }
            if (LastName == "" || LastName == null) {
                self.messages = "Please Enter Lastname.";
                $("#PDoneError").modal();
                return;
            }
            if (DisplayName == "" || DisplayName == null) {
                self.messages = "Please Enter DisplayName.";
                $("#PDoneError").modal();
                return;
            }
            if (Email == "" || Email == null) {
                self.messages = "Please Enter Email.";
                $("#PDoneError").modal();
                return;
            }
            if (Gender == "" || Gender == null) {
                self.messages = "Please Enter Gender.";
                $("#PDoneError").modal();
                return;
            }
            if (Street == "" || Street == null) {
                self.messages = "Please Enter Street.";
                $("#PDoneError").modal();
                return;
            }
            if (City == "" || City == null) {
                self.messages = "Please Enter City.";
                $("#PDoneError").modal();
                return;
            }
            if (Country == "" || Country == null) {
                self.messages = "Please Enter Country.";
                $("#PDoneError").modal();
                return;
            }
            if (PostalCode == "" || PostalCode == null) {
                self.messages = "Please Enter PostalCode.";
                $("#PDoneError").modal();
                return;
            }
            if (Mob == "" || Mob == null) {
                self.messages = "Please Enter Mobile No.";
                $("#PDoneError").modal();
                return;
            }
            if (self.doValidation(Email)) {
                //alert(FirstName + ", " + LastName + ", " + DisplayName + ", " + Email + ", " + Gender + ", " + Street + ", " + City + ", " + Country + ", " + PostalCode + ", " + Cell);
                Phone = "";
                Mob = $("#Cell").val();
                PostalCode = $("#PostalCode").val();
                var data = {
                    'UserID': parseInt(self.customerID),
                    'FN': FirstName,
                    'LN': LastName,
                    'DN': DisplayName,
                    'E': Email,
                    'Gender': Gender,
                    'Str': Street,
                    'City': City,
                    'Region': Country,
                    'PC': PostalCode,
                    'p': Phone,
                    'Mo': Mob
                };
                self.CustomerHttp.post(data, '/UpdateUser').then(function (response) {
                    if (response.Success === 'Success') {
                        self.$state.go("MyProfile");
                    }
                    self.$state.go("MyProfile");
                }, function (error) {
                    //console.log(error);
                });
            }
        };
        MyProfileEditController.prototype.doValidation = function (Email) {
            var self = this;
            if (Email === null || Email === '' || Email == undefined) {
                self.messages = "Please Enter Email Address.";
                $("#PDoneError").modal();
                return false;
            }
            else {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!filter.test(Email)) {
                    self.messages = "Invalid email address.";
                    $("#PDoneError").modal();
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
                            $("#PDoneError").modal();
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
                            $("#PDoneError").modal();
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
                self.messages = 'Profile Image can\'t update';
                $("#PDoneError").modal();
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
            }
            ft.upload(imageURI, 'http://www.spafoo.com/DesktopModules/NS_UserProfile/Scripts/jquery-uploadify/mProfileHandler.ashx', (function (r) {
                //alert(JSON.stringify(r));
                if (r.responseCode === '200' || r.responseCode === 200) {
                    var resArr = r.response.split('|');
                    self.SharedHttp.setPicID(resArr[0]);
                    self.SharedHttp.setPicPath(resArr[1]);
                    self.$timeout(function () {
                        self.profilePic = "http://www.spafoo.com" + resArr[1];
                    }, 2000);
                    $("#showload").hide();
                }
                else {
                    self.messages = 'Something went wrong with the server';
                    $("#PDoneError").modal();
                    $("#showload").hide();
                }
            }), (function (msg) {
                self.messages = 'Profile Image can\'t update';
                $("#PDoneError").modal();
                $("#showload").hide();
            }), options);
        };
        MyProfileEditController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$timeout'];
        return MyProfileEditController;
    }());
    angular.module('spafoo.ctrl.MyProfileEdit', []).controller('MyProfileEdit', MyProfileEditController);
})(MyProfileEditController || (MyProfileEditController = {}));

//# sourceMappingURL=MyProfileEdit.controller.js.map
