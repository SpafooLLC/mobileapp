var ProMyProfileController;
(function (ProMyProfileController_1) {
    var ProMyProfileController = (function () {
        function ProMyProfileController($q, $state, $ionicPopup, $ionicLoading, $scope, $location, CustomerHttp, $window, toaster, SharedHttp) {
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
            this.getUserInfo();
            $('.fancybox').fancybox();
        }
        ProMyProfileController.prototype.showTab = function (tabname) {
            $(".tab-pane.fade").removeClass("in").removeClass("active");
            $("#" + tabname).addClass("in").addClass("active");
        };
        ProMyProfileController.prototype.GoRegistertext = function () {
            var target = "_blank";
            var options = "location=yes,hidden=yes,beforeload=yes";
            $("#showload").show();
            window.open(encodeURI('http://www.spafoo.com/my-profile'), '_system', 'location=yes');
            setTimeout(function () {
                $("#showload").hide();
            }, 15000);
        };
        ProMyProfileController.prototype.getUserInfo = function () {
            var self = this;
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
            var UserID = self.$window.localStorage.getItem('CustomerID');
            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response) {
                self.ServiceData = response.GetUserInfoResult;
                self.ServiceData.displayNameField = self.ServiceData.firstNameField + " " + self.ServiceData.lastNameField[0] + ".";
                self.SharedHttp.getProfilePics(self.ServiceData.profileField.photoField).then(function (imgres) { self.profilePic = imgres; });
                self.SharedHttp.GetMyRating(UserID).then(function (res) { self.RatingField = res.split(':')[0]; self.Rateperson = res.split(':')[1]; });
                self.SharedHttp.GetProTagLine(UserID).then(function (res) { self.TagField = res; });
                self.SharedHttp.GetProviderServices(UserID).then(function (res) { self.ProviderServiceList = res; });
                self.SharedHttp.GetWorkSamples(UserID).then(function (res) { self.WorkSamplesList = res; });
                var str = self.ServiceData.profileField.biographyField;
                var uri_encoded = str != null ? str.replace(/%([^\d].)/, "%25$1") : "";
                var decoded = decodeURIComponent(uri_encoded);
                self.ServiceData.profileField.biographyField = decoded;
                self.getUserNotificationInfo(UserID);
                //self.GetProviderServices(UserID)
                //alert(decodeURI(self.ServiceData.profileField.biographyField));
            }, function (error) {
                if (error === null) {
                }
                else {
                    console.log(error);
                }
            });
            // self.CustomerHttp.get('/GetUserJSON/' + customerID).then(function (response: any) {
            //     self.ServiceData = JSON.parse(response.GetUserJSONResult);
            //     //console.log(self.ServiceData);
            //     self.ServiceData.DisplayName1 = self.ServiceData.FirstName + " " + self.ServiceData.LastName[0] + ".";
            //     self.ServiceData.Membership.CreatedDate = self.SharedHttp.getFormatedDate(self.ServiceData.Membership.CreatedDate, "dd MMMM yyyy");
            //     self.getUserNotificationInfo(customerID);
            //     var str = self.ServiceData.Profile.Biography;
            //     var uri_encoded = str.replace(/%([^\d].)/, "%25$1");                
            //     var decoded = decodeURIComponent(uri_encoded);
            //     self.ServiceData.Profile.Biography = decoded;
            //     self.SharedHttp.getProfilePics(self.ServiceData.Profile.Photo).then(function (imgres) { self.proProfilePic = imgres;});
            //     self.SharedHttp.GetWorkSamples(customerID).then(function (res) { self.WorkSamplesList = res; });
            //     self.rolePosition = self.ServiceData.Profile.ProfileProperties[1].PropertyValue.split('|').map(Number);
            //     self.getRoles().then(function (res: any) {
            //         self.Roles = res;
            //         var rArr = new Array();
            //         for (var i = 0; i < self.Roles.GetQuestionResult.optionsField.length; i++) {
            //             if (self.rolePosition.indexOf(self.Roles.GetQuestionResult.optionsField[i].onSelectField) > -1) {
            //                 rArr.push(self.Roles.GetQuestionResult.optionsField[i].optionTextField);
            //                 //console.log(self.Roles.GetQuestionResult.optionsField[i].optionTextField);
            //             }
            //         }
            //         //console.log(rArr)
            //         self.applRole = rArr;
            //     }, function (error) {
            //         //alert(error);
            //         });           
            //    self.CustomerHttp.get('/GetProviderServices/' + customerID).then( function(res:any) {
            //        self.serviceOffered = res.GetProviderServicesResult;
            //    }, function(err: any) {
            //    })                          
            // }, function (error) {
            //     if (error === null) {
            //     } else {
            //         //console.log(error);
            //     }
            // });
        };
        ProMyProfileController.prototype.getRoles = function () {
            var self = this;
            var deferred = this.$q.defer();
            self.CustomerHttp.get('/GetQuestion/5').then(function (res) {
                deferred.resolve(res);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        ProMyProfileController.prototype.getReviewDetails = function (UserID) {
            var self = this;
            self.CustomerHttp.get('/GetMyReview/' + UserID).then(function (response) {
                self.ReviewData = response.GetMyReviewResult;
                $.each(self.ReviewData, function (i, item) {
                    var str = item.commentsField;
                    var uri_encoded = str.replace(/%([^\d].)/, "%25$1");
                    self.ReviewData[i].commentsField = decodeURIComponent(uri_encoded);
                    self.ReviewData[i].datedField = self.SharedHttp.getFormatedDate(item.datedField, "MM/dd/yyyy");
                    self.SharedHttp.GetUserInfo(item.byUserIDField).then(function (res) {
                        switch (self.ReviewData[i].displayNameField) {
                            case 1:
                                self.ReviewData[i].displayNameField = res.firstNameField + " " + res.lastNameField[0] + ".";
                                break;
                            case 2:
                                self.ReviewData[i].displayNameField = res.firstNameField;
                                break;
                            case 3:
                                self.ReviewData[i].displayNameField = res.lastNameField;
                                break;
                            case 4:
                                self.ReviewData[i].displayNameField = res.firstNameField + " " + res.lastNameField;
                                break;
                        }
                        // self.ReviewData[i].displayNameField = res.displayNameField;
                        self.ReviewData[i].RegionField = res.profileField.regionField;
                    });
                });
            }, function (error) {
                if (error === null) {
                }
                else {
                }
            });
        };
        ProMyProfileController.prototype.getUserNotificationInfo = function (customerID) {
            var self = this;
            self.CustomerHttp.get('/GetMyNotification/' + customerID).then(function (response) {
                self.NotificaitonData = response.GetMyNotificationResult;
                self.NotificationCount = self.NotificaitonData.length;
            }, function (error) {
                if (error === null) {
                }
                else {
                    console.log(error);
                }
            });
        };
        ProMyProfileController.$inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster', 'SharedHttp'];
        return ProMyProfileController;
    }());
    angular.module('spafoo.ctrl.ProMyProfile', []).controller('ProMyProfile', ProMyProfileController);
})(ProMyProfileController || (ProMyProfileController = {}));

//# sourceMappingURL=ProMyProfile.controller.js.map
