module MyProfileEditController {
    interface ITimeoutService extends ng.ITimeoutService { }
    class MyProfileEditController {

        ServiceData: any;
        messages: string;
        customerID: number;
        profilePic: string;
        isImageClick:boolean;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp', '$timeout'];
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private toaster: ngtoaster.IToasterService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp,
            private $timeout: ITimeoutService
        ) {
            $("#Telephone").mask("999-999-9999");
            $("#Cell").mask("999-999-9999");
            $("#PostalCode").mask("99999");
            this.customerID = this.$window.localStorage.getItem('CustomerID');
            this.getUserInfo();
           
        }
        getUserInfo() {
            var self = this;
            var status= self.$window.localStorage.getItem('LoginStatus');
            if(status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === ''){
                self.$state.go('login');
            }
            self.CustomerHttp.get('/GetUserJSON/' + self.customerID).then(function (response: any) {

                self.ServiceData = JSON.parse(response.GetUserJSONResult);
                self.ServiceData.Membership.CreatedDate = self.SharedHttp.getFormatedDate(self.ServiceData.Membership.CreatedDate, "dd MMMM yyyy");

                self.SharedHttp.getProfilePics(self.ServiceData.Profile.Photo).then(function (imgres) { self.profilePic = imgres; });


            }, function (error) {
                if (error === null) {
                  
                } else {
                    //console.log(error);

                }
            });
        }

        EditProfile(FirstName: string, LastName: string, DisplayName: string, Email: string, Gender: string, Street: string, City: string, Country: string, PostalCode: string, Phone: string, Mob:string) {
            var self = this;
            var uPos = '';
           
            if (self.doValidation(Email)) {
//alert(FirstName + ", " + LastName + ", " + DisplayName + ", " + Email + ", " + Gender + ", " + Street + ", " + City + ", " + Country + ", " + PostalCode + ", " + Cell);

                Phone = $("#Telephone").val();
                Mob = $("#Cell").val();
                PostalCode = $("#PostalCode").val();

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
                    'p': Phone,
                    'Mo': Mob
                }
             
                self.CustomerHttp.post(data, '/UpdateUser').then(function (response: any) {
                    if (response.Success === 'Success') {
                        self.$state.go("MyProfile");
                    } self.$state.go("MyProfile");
                }, function (error) {
                    //console.log(error);
                });
                //console.log(data);
            }


        }

        doValidation(Email: string) {
           

            var self = this;
            if (Email === null || Email === '' || Email == undefined) {
                self.messages = "Please Enter Email Address.";
                $("#PDoneError").modal();
                return false;
            } else {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!filter.test(Email)) {
                    self.messages = "Invalid email address.";
                    $("#PDoneError").modal();
                    return false;
                }
            }





            return true;
        }

        cameraOption() {
            var self = this;
            //alert('hi');
            self.isImageClick = true;
        }
        capturePhoto(choice: any) {
            //alert('trying to upload');
            var self = this;
            try {
                if (choice === 'G') {
                    //alert(choice);
                    navigator.camera.getPicture(function (imageURI: any) {
                        var extension = imageURI.substr(imageURI.lastIndexOf('.') + 1).toUpperCase();
                        //alert(imageURI);
                        if (extension === 'PNG' || extension === 'JPEG' || extension === 'JPG') {
                            //alert(extension);
                            //self.$timeout(function () {
                                //self.proProfilePic = 'file://' + imageURI;
                                //alert(self.proProfilePic);
                                self.SharedHttp.setProfileImage('file://' + imageURI);
                                self.postImage();
                                // alert(self.SharedHttp.getProfileImage() + '-----' + self.imageURL);
                            //}, 1000);
                        } else {
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
                } else {
                    navigator.camera.getPicture(function (imageURI: any) {
                        var extension = imageURI.substr(imageURI.lastIndexOf('.') + 1).toUpperCase();
                        //alert(imageURI);
                        if (extension === 'PNG' || extension === 'JPEG' || extension === 'JPG') {
                            //self.$timeout(function () {
                                //self.proProfilePic = imageURI;
                                //alert(self.proProfilePic);
                                self.SharedHttp.setProfileImage(imageURI);
                                self.postImage();

                            //}, 1000);


                        } else {
                            self.messages = "PNG,JPEG,JPG images allowed";
                            $("#PDoneError").modal();
                            //alert('PNG,JPEG,JPG images allowed');

                        }
                    }, self.onFail, {
                            quality: 50,
                            destinationType: Camera.DestinationType.FILE_URL,
                            mediaType: Camera.MediaType.ALLMEDIA,
                            sourceType: navigator.camera.PictureSourceType.Camera,
                            correctOrientation: true
                        });
                }

                // Take picture using device camera and retrieve image as base64-encoded string

            } catch (ex) {
                self.messages= 'Profile Image can\'t update';
                $("#PDoneError").modal();
            } finally {
                self.isImageClick = false;
            }

        }

        postImage(): void {
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
            } catch (ex) {
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
                } else {
                    self.messages='Something went wrong with the server';
                    $("#PDoneError").modal();
                    $("#showload").hide();
                }
            }), (function (msg) {
                self.messages= 'Profile Image can\'t update';
                $("#PDoneError").modal();
                $("#showload").hide();
            }), options);

        }


    }


    angular.module('spafoo.ctrl.MyProfileEdit', []).controller('MyProfileEdit', MyProfileEditController);

}