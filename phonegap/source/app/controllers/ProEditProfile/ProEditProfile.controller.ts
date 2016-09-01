module ProEditProfileController {
    
    interface IProEditProfileController {
        ServiceData: {};
        NotificaitonData: {};
        proProfilePic: string;
        NotificationCount: number;
        WorkSamplesList:{};
        gender:string;
        isImageClick:boolean;
        imageURL:string;
        messages:string;
        rolePosition:any;
        applPosition:any;
        TagField:string;
        customerID:string;
        ischecked:boolean;



    }
    class ProEditProfileController implements IProEditProfileController {
        ServiceData: {};
        NotificaitonData: {};
        proProfilePic: string;
        NotificationCount: number;
        WorkSamplesList:{};
        gender:string;
        isImageClick:boolean;
        imageURL:string;
        messages:string;
        rolePosition:any;
        applPosition:any;
        TagField:string;
        customerID:string;
        ischecked:boolean;
        
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp'];
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
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp
        ) {
            var self=this;
            this.getUserInfo();
        }
        getUserInfo() {
            var self = this;
            self.customerID = self.$window.localStorage.getItem('CustomerID');
            self.CustomerHttp.get('/GetUserJSON/' + self.customerID).then(function (response: any) {
                self.ServiceData = JSON.parse(response.GetUserJSONResult);
                self.ServiceData.Membership.CreatedDate = self.SharedHttp.getFormatedDate(self.ServiceData.Membership.CreatedDate, "dd MMMM yyyy");
                self.getUserNotificationInfo(self.customerID);
                var str = self.ServiceData.Profile.Biography;
                var uri_encoded = str.replace(/%([^\d].)/, "%25$1");                
                var decoded = decodeURIComponent(uri_encoded);
                self.ServiceData.Profile.Biography = decoded;
                self.SharedHttp.getProfilePics(self.ServiceData.Profile.Photo).then(function (imgres) { self.proProfilePic = imgres;});
                self.SharedHttp.GetWorkSamples(self.customerID).then(function (res) { self.WorkSamplesList = res; });
                self.SharedHttp.GetProTagLine(self.customerID).then(function (res) { self.TagField = res; });
                self.rolePosition = self.ServiceData.Profile.ProfileProperties[1].PropertyValue.split('|').map(Number);
                self.applPosition = self.ServiceData.Roles;

                for (var i=0; i < self.applPosition.length; i++) {   
                     if(self.rolePosition.indexOf(self.ServiceData.Social.Roles[i].RoleID)>-1){
                         self.applPosition[i] = '1';
                     } else {
                         self.applPosition[i] = '0';
                     }
                };
                
                
                console.log(self.applPosition);
                console.log(self.ServiceData);
            }, function (error) {
                if (error === null) {
                } else {
                    console.log(error);
                }
            });
        }


        getUserNotificationInfo(customerID: any) {
            var self = this;
            self.CustomerHttp.get('/GetMyNotification/' + customerID).then(function (response: any) {
                self.NotificaitonData = response.GetMyNotificationResult;
                self.NotificationCount = self.NotificaitonData.length;

            }, function (error) {
                if (error === null) {
                    //self.$ionicLoading.hide();
                } else {
                    console.log(error);
                    //self.$ionicLoading.hide();
                }
            });
        }

        cameraOption() {
            var self = this;
            alert('hi');
            self.isImageClick = true;
        }
        capturePhoto(choice: any) {
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
                                self.proProfilePic = 'file://' + imageURI;
                                self.SharedHttp.setProfileImage(self.proProfilePic);
                                self.postImage();
                               // alert(self.SharedHttp.getProfileImage() + '-----' + self.imageURL);
                            }, 1000);
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
                } else {
                    navigator.camera.getPicture(function (imageURI) {
                        var extension = imageURI.substr(imageURI.lastIndexOf('.') + 1).toUpperCase();
                       // alert(extension);
                        if (extension === 'PNG' || extension === 'JPEG' || extension === 'JPG') {
                            self.$timeout(function () {
                                self.proProfilePic = imageURI;
                                self.SharedHttp.setProfileImage(imageURI);
                                self.postImage();
                                
                            }, 1000);


                        } else {
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

                // Take picture using device camera and retrieve image as base64-encoded string

            } catch (ex) {
                self.messages = "Can\'nt upload image";
                alert('Can\'nt upload image');
            } finally {
                self.isImageClick = false;
            }

        }

        postImage(): void {
            $("#showload").show();
            var self = this;
            var imageURI = self.SharedHttp.getProfileImage();
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
                    $("#showload").hide();
                } else {
                    alert('Something went wrong with the server ');
                    $("#showload").hide();
                } 
            }), (function (msg) {
                    alert("Profile Image can\'t updated");
                    $("#showload").hide();
            }), options);

        }
        // IsChecked(role:any){
        //     console.log(role);
        //     return role.toString(); 
        // }
        upDatePosition($event:any, index:number){
            var self=this;
            if($event.target.checked){
                self.applPosition[index]='1';
            } else {
                self.applPosition[index]='0';
            }
            console.log(self.applPosition);
        }

        EditProfile(FirstName:string, LastName:string, DisplayName:string, Email:string, Gender:string, Street:string, City:string, Country:string, PostalCode:string, Cell:string, typeOfEntity:string, professionalLicense:string, sSN:string, eIN:string, biography:string, tagField:string ){
            var self= this;
            var uPos='';
            if(self.doValidation(Email)){
                for(var i=0; i<self.applPosition.length; i++){
                    uPos=uPos + self.ServiceData.Social.Roles[i].RoleID + '_'+ self.applPosition[i] + '|';
                }

                var data={
                    'UserID':self.customerID,
                    'FN':FirstName,
                    'LN':LastName,
                    'DN':DisplayName,
                    'E':Email,
                    'Gender':Gender,
                    'Str':Street,
                    'City':City,
                    'Region':Country,
                    'PC':PostalCode,
                    'P':Cell,
                    'TOE':typeOfEntity,
                    'Lic':professionalLicense,
                    'SSN':sSN,
                    'EIN':eIN,
                    'Bio':biography,
                    'TagLine':tagField,
                    'uPOS':uPos
                }

                self.CustomerHttp.post(data, '/UpdateUser').then(function (response: any) {
                    if (parseInt(response.CustomerID) > 0) {
                        self.$state.go("ProMyProfile");
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
                console.log(data);
            }
            
            
        }

        doValidation(Email:string){
            
            var self=this;
            if (Email === null || Email === '' || Email == undefined) {
                self.messages = "Please Enter Email Address.";
                alert('Please Enter Email Address');
                $("#PDone").modal();
                return false;
            } else {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!filter.test(Email)) {
                    self.messages = "Invalid email address.";
                    alert('Invalid email address');
                    //$("#PDone").modal();
                    return false;
                }
            }
            if(self.applPosition.indexOf("1")==-1){
                alert('Select atleast one applying position');
                return false;
            } 
            return true;
        }

        
    }

    angular.module('spafoo.ctrl.ProEditProfile', []).controller('ProEditProfile', ProEditProfileController);

}