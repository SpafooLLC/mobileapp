module registerController {
    export interface IRegister {

        doRegister(
            Username: string,
            FirstName: string,
            LastName: string,
            EmailAddress: string,
            PortalID: number,
            Password: string,
            Street: string,
            City: string,
            State: string,
            Zipcode: string,
            PhoneNo: string,
            MobileNo: string,
            picFID: string): void;
        capturePhoto(choice: any): void;
        cameraOption(): void;
    }
    interface ITimeoutService extends ng.ITimeoutService { }
    class RegisterController implements IRegister {
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', '$timeout', 'SharedHttp'];
        username: string;
        password: string;
        messages: string; messagessuc: string;
        profileImage: string;
        imageURL: string;
        isImageClick: boolean;
        picFID: string;
        picPath: string;
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private $timeout: ITimeoutService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp
        ) {

        }
        doRegister(Regdata: any) {

            var self = this;
            //  alert("hello");
            if (this.DoValidation(Regdata)) {

                if (self.SharedHttp.getPicID() === null || self.SharedHttp.getPicID() === '' || self.SharedHttp.getPicID() === undefined || self.SharedHttp.getPicID() === 'undefined') {
                    Regdata.picFID = null;
                    self.SharedHttp.setPicID(null);
                } else {
                    Regdata.picFID = self.SharedHttp.getPicID();
                    self.SharedHttp.setPicID(null);
                }
                alert(JSON.stringify(Regdata));

                var data = Regdata;

                self.$ionicLoading.show();
                self.CustomerHttp.post(data, '/RegisterUser').then(function (response: any) {

                    if (parseInt(response.CustomerID) > 0) {
                        self.$window.localStorage.setItem('CustomerID', response.CustomerID);
                        self.SharedHttp.DoLogin(data.Username, data.Password).then(function (e) { self.$state.go("home"); });;
                        //self.$state.go("BasicCreditCard");
                    }
                    self.$ionicLoading.hide();
                }, function (error) {
                    if (error === null) {
                        self.$ionicLoading.hide();
                    } else {
                        console.log(error);
                        self.$ionicLoading.hide();
                    }

                });
            }
        }

        GoRegistertext(IsProvider: any) {

            var self = this;
            self.$state.go("RegisterProvider");
        }

        DoValidation(Regdata: any) {
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
            else if (Regdata.Password.length <8) {
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
            } else {
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
        }

        cameraOption() {
            var self = this;
            self.isImageClick = true;
        }
        capturePhoto(choice: any) {
            //alert('trying to upload');
            var self = this;
            try {
                if (choice === 'G') {
                    //alert(choice);
                    navigator.camera.getPicture(function (imageURI:any) {
                        var extension = imageURI.substr(imageURI.lastIndexOf('.') + 1).toUpperCase();
                        //alert(extension);
                        if (extension === 'PNG' || extension === 'JPEG' || extension === 'JPG') {
                            //alert(extension);
                            //self.$timeout(function () {
                                //self.imageURL = 'file://' + imageURI;
                                self.SharedHttp.setProfileImage('file://' + imageURI);
                                self.postImage();
                               // alert(self.SharedHttp.getProfileImage() + '-----' + self.imageURL);
                            //}, 1000);
                        } else {
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
                } else {
                    navigator.camera.getPicture(function (imageURI:any) {
                        var extension = imageURI.substr(imageURI.lastIndexOf('.') + 1).toUpperCase();
                       // alert(extension);
                        if (extension === 'PNG' || extension === 'JPEG' || extension === 'JPG') {
                            self.$timeout(function () {
                                self.imageURL = imageURI;
                                self.SharedHttp.setProfileImage(imageURI);
                                self.postImage();
                                
                            }, 1000);


                        } else {
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

                // Take picture using device camera and retrieve image as base64-encoded string

            } catch (ex) {
                self.messages = "Can\'nt upload image";
                $("#PDone").modal(); 
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
       
            try {
                var ft = new FileTransfer();
            } catch (ex) {
                self.toaster.error('exception generated:' + ex, 'Error');
            }
           
            ft.upload(imageURI, 'http://dev.spafoo.com/DesktopModules/NS_ClientRegistration/Script/jquery-uploadify/rhprofilepic.ashx', (function (r) {
               
                //self.messages = "Profile Image updated";
                //$("#PDone").modal();               
                if (r.responseCode === '200' || r.responseCode === 200) {
                    var resArr = r.response.split('|');
                    self.SharedHttp.setPicID(resArr[0]);
                    self.SharedHttp.setPicPath(resArr[1]);
                    self.$timeout(function () {
                        self.imageURL = "http://dev.spafoo.com" + resArr[1];
                    }, 2000);
                    $("#showload").hide();
                    alert(JSON.stringify(r));
                } else {
                    self.toaster.error('Something went wrong with the server', 'Error');
                    $("#showload").hide();
                } 
            }), (function (msg) {
                    self.messages = "Profile Image can\'t updated";
                    $("#PDone").modal();
                    $("#showload").hide();
               
                return msg;

            }), options);

        }

    }


    angular.module('spafoo.ctrl.register', []).controller('register', RegisterController);

}