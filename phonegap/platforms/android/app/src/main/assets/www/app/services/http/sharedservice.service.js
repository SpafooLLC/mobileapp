var spafoo;
(function (spafoo) {
    var httpsharedservice;
    (function (httpsharedservice) {
        var SharedHttp = /** @class */ (function () {
            function SharedHttp($q, CustomerHttp, $window, $rootScope, $state) {
                this.$q = $q;
                this.CustomerHttp = CustomerHttp;
                this.$window = $window;
                this.$rootScope = $rootScope;
                this.$state = $state;
            }
            SharedHttp.prototype.getuserType = function () {
                return this.userType;
            };
            SharedHttp.prototype.setuserType = function (value) {
                this.userType = value;
            };
            SharedHttp.prototype.getAddressDetailRcd = function () {
                return this.AddressDetailRcd;
            };
            SharedHttp.prototype.setAddressDetailRcd = function (value) {
                this.AddressDetailRcd = value;
            };
            SharedHttp.prototype.getUuid = function () {
                return this.uuid;
            };
            SharedHttp.prototype.setUuid = function (value) {
                this.uuid = value;
            };
            SharedHttp.prototype.getCustomerId = function () {
                return this.customerId;
            };
            SharedHttp.prototype.setCustomerId = function (value) {
                this.customerId = value;
            };
            SharedHttp.prototype.getProfileImage = function () {
                return this.profileImageUrl;
            };
            SharedHttp.prototype.setProfileImage = function (value) {
                this.profileImageUrl = value;
            };
            SharedHttp.prototype.getPicID = function () {
                return this.picId;
            };
            SharedHttp.prototype.setPicID = function (value) {
                this.picId = value;
            };
            SharedHttp.prototype.getPicPath = function () {
                return this.picPath;
            };
            SharedHttp.prototype.setPicPath = function (value) {
                this.picPath = value;
            };
            SharedHttp.prototype.getLoginStatus = function () {
                return this.LoginStatus;
            };
            SharedHttp.prototype.setLoginStatus = function (value) {
                this.LoginStatus = value;
            };
            SharedHttp.prototype.redirectTo = function (href, ModalId) {
                $('#' + ModalId).modal('toggle');
                this.$state.go(href);
            };
            SharedHttp.prototype.getFormatedTime = function (timeString) {
                var hourEnd = timeString.indexOf(":");
                var H = +timeString.substr(0, hourEnd);
                var h = H % 12 || 12;
                var ampm = H < 12 ? " AM" : " PM";
                timeString = h + timeString.substr(hourEnd, 3) + ampm;
                return timeString;
            };
            SharedHttp.prototype.IsGPSOn = function () {
                //cordova.plugins.locationAccuracy.canRequest(function (canRequest:any) {
                //    if (canRequest) {
                //        cordova.plugins.locationAccuracy.request(function (success:any) {
                //            // alert("Successfully requested accuracy: " + success.message);
                //        }, function (error:any) {
                //            //   alert("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
                //            if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                //                if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                //                    cordova.plugins.diagnostic.switchToLocationSettings();
                //                }
                //            }
                //        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
                //    }
                //});
                document.addEventListener("deviceready", function () {
                    //default dialog
                    cordova.dialogGPS("To find SpaFoo providers in your area, GPS needs to be turned on.  Press 'OK' to turn it on.", //message
                    "Use GPS, with wifi or mobile networks.", //description
                    function (buttonIndex) {
                        switch (buttonIndex) {
                            case 0: break; //cancel
                            case 1: break; //neutro option
                            case 2: break; //user go to configuration
                        }
                    }, "Please Turn on GPS", //title
                    ["Cancel", "Later", "Go"]); //buttons
                });
            };
            SharedHttp.prototype.ishome = function (ishm) {
                //if (ishm)
                //{ $('.Ishome').show(); }
                //else { $('.Ishome').hide(); }
            };
            SharedHttp.prototype.completeAppService = function (UserId, clientID, authTxnIDField, appointmentIDField, payTxnIDField, amountField, comment, PID, PPID, discount) {
                var self = this;
                var UserID = UserId;
                var clientId = clientID;
                var authTxnIDField = authTxnIDField;
                var appointmentIDField = appointmentIDField;
                var payTxnIDField = payTxnIDField;
                var amountField = amountField;
                //console.log(self.UserID + ':' + self.clientId + ':' + self.authTxnIDField + ':' + self.appointmentIDField + ':' + self.payTxnIDField + ':' + self.amountField + ':' + self.comment);
                //self.message = 'Appointment Completed';
                //$("#PDone").modal();
                //var data = {
                //    TxnID: authTxnIDField,
                //    Amount: amountField
                //};
                var data = {
                    UserID: UserId,
                    clientId: clientID,
                    ID: appointmentIDField,
                    authTxnID: authTxnIDField,
                    PaymentTxnID: payTxnIDField,
                    Amount: (Number(amountField) - Number(discount)),
                    PID: PID,
                    PPID: PPID
                };
                self.CustomerHttp.post(data, '/AppointmentCompleted').then(function (res) {
                    self.message = 'Appointment Completed';
                    self.$state.go("ProAppointments");
                }, function (erError) {
                });
                //self.CustomerHttp.post(data, '/ChargePreviousAuth').then(function (res: any) {
                //    var response = JSON.parse(res);
                //    var upData = {
                //        ID: appointmentIDField,
                //        Comment: comment,
                //        PaymentTxnID: payTxnIDField
                //    };
                //    self.CustomerHttp.post(upData, '/UpdateAppointment').then(function (upRes: any) {
                //        var navData = {
                //            ByID: UserID,
                //            NotTypeID: 8,
                //            RelatedEntityID: appointmentIDField,
                //            ToID: clientId
                //        };
                //        self.CustomerHttp.post(navData, '/AddNotification').then(function (navRes: any) {
                //            self.message = 'Appointment Completed';
                //            //$("#PDone").modal();
                //            self.$state.go("ProAppointments");
                //        }, function (navError: any) {
                //        })
                //    }, function (erError: any) {
                //    });
                //}, function (error: any) {
                //    //alert('someError on ChargePreviosAuth');
                //});
            };
            SharedHttp.prototype.getFormatedDate = function (joindates, formatType) {
                if (formatType != "weekday dd MMMM yyyy") {
                    var abcDate = (joindates).replace("/Date(", "").replace(")/", "");
                    this.dates = new Date(parseInt(abcDate));
                }
                else {
                    this.dates = new Date(joindates);
                }
                var month = new Array();
                var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                switch (formatType) {
                    case "dd MMMM yyyy":
                        month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        break;
                    case "dd-MMM-yyyy":
                        month = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
                        break;
                    case "weekday dd MMMM yyyy":
                        month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        break;
                    case "MM DD":
                        month = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        break;
                }
                switch (formatType) {
                    case "dd MMMM yyyy": return (this.dates.getDate() + " " + month[this.dates.getMonth()] + " " + this.dates.getFullYear());
                    case "dd-MMM-yyyy": return (this.dates.getDate() + "-" + month[this.dates.getMonth()] + "-" + this.dates.getFullYear());
                    case "dd/MM/yyyy": return (this.dates.getDate() + "/" + (this.dates.getMonth() + 1) + "/" + this.dates.getFullYear());
                    case "MM/dd/yyyy": return ((this.dates.getMonth() + 1) + "/" + this.dates.getDate() + "/" + this.dates.getFullYear());
                    case "weekday dd MMMM yyyy": return (weekday[this.dates.getDay()] + " " + this.dates.getDate() + " " + month[this.dates.getMonth()] + " " + this.dates.getFullYear());
                    case "MM DD": return (month[this.dates.getMonth()] + " " + this.dates.getDate());
                }
                return (this.dates.getDate() + " " + month[this.dates.getMonth()] + " " + this.dates.getFullYear());
            };
            SharedHttp.prototype.getProfilePics = function (customerID) {
                var deferred = this.$q.defer();
                if (customerID === null || isNaN(customerID)) {
                    this.ImageURl = "images/Site/default-User.png";
                    deferred.resolve(this.ImageURl);
                }
                else {
                    this.CustomerHttp.get('/GetProfilePic/' + customerID).then(function (response) {
                        if (response.GetProfilePicResult.length > 0) {
                            this.ImageURl = "http://www.spafoo.com" + response.GetProfilePicResult;
                        }
                        else {
                            this.ImageURl = "images/Site/default-User.png";
                        }
                        deferred.resolve(this.ImageURl);
                    }, function (error) {
                        deferred.reject(error);
                    });
                }
                return deferred.promise;
            };
            SharedHttp.prototype.GetProTagLine = function (UserID) {
                var deferred = this.$q.defer();
                this.CustomerHttp.get('/GetProTagLine/' + UserID).then(function (response) {
                    this.TagField = decodeURIComponent(decodeURI(response.GetProTagLineResult.Success));
                    deferred.resolve(this.TagField);
                }, function (error) { });
                return deferred.promise;
            };
            SharedHttp.prototype.GetMyRating = function (UserID) {
                var deferred = this.$q.defer();
                this.CustomerHttp.get('/GetMyRating/' + UserID).then(function (response) {
                    this.starField = response.GetMyRatingResult.Success;
                    deferred.resolve(this.starField);
                }, function (error) { });
                return deferred.promise;
            };
            SharedHttp.prototype.GetProviderServices = function (UserID) {
                var deferred = this.$q.defer();
                this.CustomerHttp.get('/GetProviderServices/' + UserID).then(function (response) {
                    this.ProviderServiceList = response.GetProviderServicesResult;
                    deferred.resolve(this.ProviderServiceList);
                }, function (error) { });
                return deferred.promise;
            };
            SharedHttp.prototype.GetWorkSamples = function (UserID) {
                var deferred = this.$q.defer();
                this.CustomerHttp.get('/GetWorkSamples/' + UserID).then(function (response) {
                    this.WorkSamplesList = response.GetWorkSamplesResult;
                    deferred.resolve(this.WorkSamplesList);
                }, function (error) { });
                return deferred.promise;
            };
            SharedHttp.prototype.HideApp4Me = function (AppID, UserType) {
                var deferred = this.$q.defer();
                this.CustomerHttp.get('/HideApp4Me/' + AppID + '/' + UserType).then(function (response) {
                    this.HideApp = response;
                    deferred.resolve(this.HideApp);
                }, function (error) { });
                return deferred.promise;
            };
            SharedHttp.prototype.GetUserInfo = function (UserID) {
                var deferred = this.$q.defer();
                this.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response) {
                    this.GetUserInfoRcd = response.GetUserInfoResult;
                    deferred.resolve(this.GetUserInfoRcd);
                }, function (error) { });
                return deferred.promise;
            };
            SharedHttp.prototype.GetAddressInfo = function (AppointMentID) {
                var deferred = this.$q.defer();
                var self = this;
                this.CustomerHttp.get('/GetAppLocation/' + AppointMentID).then(function (response) {
                    var e = response.GetAppLocationResult;
                    this.GetAddressRcd = (e.addressField + "," + e.cityField + ", " + e.stateField + " - " + e.zipField);
                    self.setAddressDetailRcd((e.addressField + "<br />" + e.cityField + ", " + e.stateField + " - " + e.zipField));
                    //this.GetAddressDetailRcd = (e.addressField + "<br>" + e.cityField + ", " + e.stateField + " - " + e.zipField);
                    //     this.GetAddressRcd = (e.cityField+ ", " + e.stateField );
                    //   alert(this.GetAddressRcd);
                    deferred.resolve(this.GetAddressRcd);
                }, function (error) { });
                return deferred.promise;
            };
            SharedHttp.prototype.GetMyNotification = function (UserID) {
                var deferred = this.$q.defer();
                this.CustomerHttp.get('/GetMyNotification/' + UserID).then(function (response) {
                    this.NotificationList = response.GetMyNotificationResult;
                    deferred.resolve(this.NotificationList);
                }, function (error) { });
                return deferred.promise;
            };
            SharedHttp.prototype.DoLogin = function (username, password) {
                var deferred = this.$q.defer();
                var self = this;
                var data = {
                    Username: username,
                    Password: password,
                };
                self.CustomerHttp.post(data, '/LoginUser').then(function (response) {
                    if (parseInt(response.Source)) {
                        self.$window.localStorage.setItem('CustomerID', response.Source);
                        self.$window.localStorage.setItem('Role', response.Usertype);
                        self.$window.localStorage.setItem('LoginStatus', "true");
                        self.GetUserInfo(response.Source).then(function (res) {
                            self.$rootScope.UserProfileName = res.displayNameField;
                            self.$window.localStorage.setItem('CustomerName', res.displayNameField);
                            self.$rootScope.GetLoginStatus = true;
                        });
                        self.GetMyNotification(response.Source).then(function (res) { self.$rootScope.NotifiCount = res.length; });
                        self.$rootScope.getRole = (self.$window.localStorage.getItem('Role') == "P" ? "P" : "C");
                    }
                    else {
                        self.$window.localStorage.setItem('CustomerID', "0");
                        self.$window.localStorage.setItem('LoginStatus', "false");
                        self.$window.localStorage.setItem('Role', null);
                        self.$rootScope.GetLoginStatus = false;
                        self.messages = "Login Failed, Please enter correct username and password";
                        $("#PDone").modal();
                    }
                    deferred.resolve(self.$rootScope.UserProfileName);
                }, function (error) {
                });
                return deferred.promise;
            };
            SharedHttp.prototype.UnSeenStatus = function (AppointmentID) {
                var self = this;
                self.CustomerHttp.get('/UpdateAppSeenStatus/' + AppointmentID).then(function (response) {
                }, function (error) {
                });
            };
            SharedHttp.$inject = ['$q', 'CustomerHttp', '$window', '$rootScope', '$state'];
            return SharedHttp;
        }());
        httpsharedservice.SharedHttp = SharedHttp;
        angular
            .module('spafoo.httpsharedservice', [])
            .service('SharedHttp', SharedHttp);
    })(httpsharedservice = spafoo.httpsharedservice || (spafoo.httpsharedservice = {}));
})(spafoo || (spafoo = {}));

//# sourceMappingURL=sharedservice.service.js.map
