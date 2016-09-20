module MakeAppointmentController {
    interface IMakeAppointmentController {
        UserID: number;
        ServiceData: {};
        ProviderServiceList: {};
        address: string; city: string; state: string; zip: string;
    }
    class MakeAppointmentController implements IMakeAppointmentController {
        UserID: number;
        ServiceData: {};
        MainView: string;
        ProviderServiceList: {};
        messages: any;
        action: any;
        address: string; city: string; state: string; zip: string; AppID: any; info: any;
        static $inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', '$rootScope', 'SharedHttp','$stateParams', '$ionicPopup'];
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private $rootScope: any,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp,
            private $stateParams: angular.ui.IStateParamsService,
            private $ionicPopup: ionic.popup.IonicPopupService
        ) {

            this.UserID = this.$window.localStorage.getItem('ProviderIDs');
            this.AppID = 0;
            var status = this.$window.localStorage.getItem('LoginStatus');
            this.customerId = null;
            this.action = '';
            this.checked_services = [];
            if(!status || status == "false"){
                var providerData = {providerId: this.UserID};
                this.$state.go("login", providerData);
            }else{
                this.customerId = $window.localStorage.getItem('CustomerID');
            }
            var mySelect = $('#first-disabled2');
            $('#special').on('click', function () {
                mySelect.find('option:selected').prop('disabled', true);
                mySelect.selectpicker('refresh');
            });

            $('#special2').on('click', function () {
                mySelect.find('option:disabled').prop('disabled', false);
                mySelect.selectpicker('refresh');
            });

            /*$('#basic2').selectpicker({
             liveSearch: false,
             maxOptions: 1,
             change: function(){
             console.log(this);
             }
             });*/
            this.isOpenSelectAdress = '';
            this.info = {};
            this.addressId = '';
            this.comment = '';
            this.MainView = 'Basic-Info';
            this.addressText = 'My Profile Address';
            this.selectedServices = [];
            this.totalPrice = 0;
            this.totalDuration = 0;
            this.isEdit = false;
            if(this.$stateParams.appointmentId != "null"){
                this.AppointmentID = this.$stateParams.appointmentId;
                this.isEdit = true;
                this.AppID = this.AppointmentID;
            }
            this.ASAP = this.$stateParams.type == 'ASAP';
            this.getProviderPortfolio($stateParams.userId);
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var self = this;
            this.uiConfig = {
                calendar: {
                    height: 450,

                    header: {
                        right: 'today prev,next'
                    },
                    dayClick: function(date: any, jsEvent: any, view: any){
                        self.onTimeSelected(date, jsEvent);
                    },
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize
                }
            };
            this.staticEvents = [

                // your event source
                {
                    events: [ // put the array in the `events` property

                       /* {
                            title: 'event2',
                            start: '2016-09-01',
                            end: '2016-09-01'
                        }, {
                            title: 'event2',
                            start: '2016-09-03',
                            end: '2016-09-03'
                        }, {
                            title: 'event2',
                            start: '2016-09-05',
                            end: '2016-09-05'
                        }, {
                            title: 'event2',
                            start: '2016-09-07',
                            end: '2016-09-07'
                        }, {
                            title: 'event2',
                            start: '2016-09-09',
                            end: '2016-09-09'
                        },*/

                    ],
                    color: 'green',     // an option!
                    textColor: 'black' // an option!
                }

                // any other event sources...

            ];
            this.eventSource = this.staticEvents;
            /*this.renderCalender = function() {

             /!*if($calender.calendars[$calender]){
             $calender.calendars[$calender].fullCalendar('render');
             }*!/
             };*/
            //$("#addressfield").val('result.subThoroughfare + " " + result.thoroughfare;');
            //setTimeout(function () {
            //    $("#addressfield").val('result.subThoroughfare + " " + result.thoroughfare;');
            //    this.address = 'result.subThoroughfare + " " + result.thoroughfare;'
            //    this.city = 'result.locality';
            //    this.state = 'result.adminArea';
            //    this.zip = 'result.postalCode';
            //}, 5000);

        }
        openDropdown(){
            this.isOpenSelectAdress = this.isOpenSelectAdress == '' ? 'open' : '';
        }
        getProviderPortfolio(UserID: any) {
            var self = this;

            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response: any) {
                self.ServiceData = response.GetUserInfoResult;
                self.SharedHttp.GetProviderServices(UserID).then(function (res) { self.ProviderServiceList = res; });
                if (self.customerId != null) {
                    self.CustomerHttp.get('/GetUserInfo/' + self.customerId).then(function (response: any) {
                        self.info.address = self.ServiceData.profileField.streetField = response.GetUserInfoResult.profileField.streetField;
                        self.info.city = self.ServiceData.profileField.cityField = response.GetUserInfoResult.profileField.cityField;
                        self.info.state = self.ServiceData.profileField.regionField = response.GetUserInfoResult.profileField.regionField;
                        self.info.zip = self.ServiceData.profileField.postalCodeField = response.GetUserInfoResult.profileField.postalCodeField;
                        if (self.isEdit) {
                            self.CustomerHttp.get('/GetAppointment/' + self.AppointmentID).then(function (response: any) {
                                self.ServiceData.appointment = response.GetAppointmentResult;
                                self.CustomerHttp.get('/GetAppLocation/' + self.AppointmentID).then(function (response: any) {
                                    var e = response.GetAppLocationResult;
                                    self.info.address = e.addressField;
                                    self.info.city = e.cityField;
                                    self.info.state = e.stateField;
                                    self.info.zip = e.zipField;

                                });
                                self.appointment = self.ServiceData.appointment;
                                self.appointment.servicesField.map(function (serv: any) {
                                    var serviceString = serv.serviceIDField + ':' + 1 + ':' + serv.priceField;
                                    $('input[value="' + serviceString + '"]').prop('checked', 'checked');
                                    self.comment = self.appointment.commentsField;
                                })
                            });
                        }
                    });
                }
            });
        }

        changedValue(data: any, text: any) {
            var self = this;
            // alert(data);
            self.addressText = text;
            switch ( parseInt( data))
            {
                case 1:
                    self.GetGPSLocation(); break;
                case 2:

                    //self.address = self.ServiceData.profileField.streetField;
                    //self.city = self.ServiceData.profileField.cityField;
                    //self.state = self.ServiceData.profileField.regionField;
                    //self.zip = self.ServiceData.profileField.postalCodeField;

                    //alert(self.address);
                    $("#addressfield").val(self.ServiceData.profileField.streetField);
                    $("#cityfield").val(self.ServiceData.profileField.cityField);
                    $("#statefield").val(self.ServiceData.profileField.regionField);
                    $("#zipfield").val(self.ServiceData.profileField.postalCodeField);

                    break;

                case 3:
                    $("#addressfield").val('');
                    $("#cityfield").val('');
                    $("#statefield").val('');
                    $("#zipfield").val('');

            }

            this.isOpenSelectAdress = '';

        }

        GetGPSLocation() {
            var self = this;
            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            };
            navigator.geolocation.getCurrentPosition(function(position){
                var self = this;
                const GOOGLE = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                //    alert("onsuccess navigation called");
                var request = {
                    'position': GOOGLE
                };
                plugin.google.maps.Geocoder.geocode(request, function (results: any) {
                    if (results.length) {
                        var result = results[0];
                        var position = result.position;
                        $("#addressfield").val(result.subThoroughfare + " " + result.thoroughfare);
                        $("#cityfield").val(result.locality);
                        $("#statefield").val(result.adminArea);
                        $("#zipfield").val(result.postalCode);
                        self.info.address = result.subThoroughfare + " " + result.thoroughfare;
                        self.info.city = result.locality;
                        self.info.state = result.adminArea;
                        self.info.zip = result.postalCode;
                    }
                });
               /* $.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+ position.coords.longitude+'&sensor=true', function(resp){
                    var addressObj = resp.results[0].address_components;
                    self.info.address = addressObj[0].long_name + " " + addressObj[1].long_name;
                    self.info.city = addressObj[4].long_name;
                    self.info.state = addressObj[5].long_name;
                    self.info.zip = addressObj[7].long_name;
                    $("#addressfield").val(addressObj[0].long_name + " " + addressObj[1].long_name);
                    $("#cityfield").val(addressObj[4].long_name);
                    $("#statefield").val(addressObj[5].long_name);
                    $("#zipfield").val(addressObj[7].long_name);
                });*/
            }, self.onError, options);

        }

        onError(e: any) {
            alert(JSON.stringify(e));
        }

        viewSelect(view: any){
            var self = this;
            view = self.ASAP && view == 'Appointment-DateTime' ? 'Order-Summary' : view;
            console.log(view);
            this.MainView = view;
        }

        CreateAppointment(Rcd: any) {
            var self = this;
            var status = self.SharedHttp.getLoginStatus();
            var servLists = [];
            self.totalDuration = 0;
            self.totalPrice = 0;
            $('.serviceChecks:checked').map(function () {
                var ServId = this.value.split(':')[0];
                self.ProviderServiceList.map(function(serv){
                    if(serv.serviceIDField == ServId){
                        self.totalDuration+=serv.durationField;
                        self.totalPrice+=serv.priceField;
                        servLists.push(serv);
                    }
                })
            });
            self.selectedServices = servLists;
            if(self.selectedServices.length) {
                self.MainView = 'Order-Summary';
                self.selectedServices.map(function(ser){
                   ser.qtyField = 1;
                });
            } else{
                self.showIonicAlert('Please select the Service(s) for Appointment');
            }
        }
        changeSummery(){
            var self = this;
            self.totalDuration = 0;
            self.totalPrice = 0;
            self.serviceString = self.selectedServices.map(function(serv){
                self.totalDuration+= isNaN(serv.durationField * serv.qtyField) ? serv.durationField : serv.durationField * serv.qtyField;
                self.totalPrice+= isNaN(serv.priceField * serv.qtyField) ? serv.priceField : serv.priceField * serv.qtyField;
                //servLists.push(serv);
            });
            self.serviceString = '';
            self.selectedServices.map(function(srvc) {
                var str = srvc.serviceIDField+':'+srvc.qtyField+':'+srvc.priceField;
                if(self.serviceString == ''){
                    self.serviceString = str;
                } else{
                    self.serviceString+='|'+str;
                }
            });
        }
        appointmentView(){
            var self = this;
            self.changeSummery();
            self.eventSource = [];
            //self.eventSource.push(self.appointment.forDateField);
            if(self.ASAP){
                self.paymentMethod();
            } else{
                var startDate = '08/28/2016';
                var endDate = '10/09/2016';

                var postObj = {
                    EndDateTime: endDate,
                    //EndDateTime:self.from,
                    ProID: self.$stateParams.userId,
                    //StartDateTime:self.to
                    StartDateTime: startDate,
                };
                self.CustomerHttp.post(postObj, '/GetProOccupiedSlots').then(function (response: any) {

                    console.log(response);
                    if(response.length){
                        response.map(function(slot){
                            self.staticEvents[0].events.push({/*title: slot.atTimeField+' - 'slot.endTimeField, */start: slot.forDateField+' '+slot.atTimeField, end: slot.forDateField+' '+slot.endTimeField, startTime: slot.atTimeField, endTime: slot.endTimeField, color: 'green'});
                        });
                    }

                });
                self.MainView = 'Appointment-DateTime'
            }
        }

        onViewTitleChanged = function (title) {
            this.viewTitle = title;
        };

        onTimeSelected(time, event){
            var self = this;
            self.availability = false;
            if(!self.isToday(time)){
                self.showIonicAlert('Sorry, you cannot select date before today');
            } else{
                self.selectedDate = time;
                self.onlyDate = moment(self.selectedDate).format('L');
                var tTime = self.totalDuration;
                self.from = self.onlyDate+' '+moment('09.00', "HH:mm").format("HH:mm");
                self.to = self.onlyDate+' '+moment('09.00', 'HH:mm').add(self.totalDuration, 'm').format("HH:mm");
                $('#PDoneSlider').modal();
                /*var popUp = self.$ionicPopup.show({
                    scope: self.$scope,
                    title: 'Choose your time slot',
                    templateUrl: 'app/templates/Partials/AppointmentSlotSlider.html',
                    buttons: [
                        { text: 'Cancel' },
                        {
                            text: '<b>Ok</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                e.preventDefault();
                                if(self.availability){
                                    self.paymentMethod();
                                    popUp.close();
                                } else{
                                    self.showIonicAlert('Please select an available time slot');
                                }
                            }
                        }
                    ]
                });*/
                self.isSlotAvailable();
                setTimeout(function(){
                    $("#range").ionRangeSlider({
                        type: "double",
                        min: +moment('09:00', 'HH:mm').format("X"),
                        max: +moment('21:00', 'HH:mm').format("X"),
                        from: +moment('09:00', 'HH:mm').format("X"),
                        to: +moment('09:00', 'HH:mm').add(self.totalDuration, 'm').format("X"),
                        //step: +moment('05', 'mm').format('hh:mm A'),
                        //step: 300000,
                        drag_interval: true,
                        prettify: function (num) {
                            return moment(num, "X").format("hh:mm A");
                        },
                        onFinish: function (data) {
                            self.from = self.onlyDate+' '+moment(data.from, "X").format("HH:mm");
                            self.to = self.onlyDate+' '+moment(data.to, "X").format("HH:mm");
                            self.isSlotAvailable();
                        },
                    });
                }, 100)
            }
        }

        dateTimeChooseDone(){
            var self = this;
            if(self.availability){
                $('#PDoneSlider').modal('hide');
                self.paymentMethod();
            } else{
                self.showIonicAlert('Please select an available time slot');
            }
        }

        showIonicAlert(text, template){
            var self = this;
            $(".modal").modal('hide');
            self.messages = text;
            $("#PDone").modal();
            /*var template = template || '';
            return self.$ionicPopup.alert({
                title: text,
                template: template
            });*/
        }

        actionAfterOk(ac){
            var self = this;
            if(self.action == 'redirectAfterAppointment'){
                self.redirectAfterAppointment();
            }
        }

        paymentMethod(){
            var self = this;
            self.CustomerHttp.get('/GetCustomerProfile/'+this.customerId).then(function(resp){
                self.selectedCard = 0;
                self.CCards = [];
                var profile = JSON.parse(resp.GetCustomerProfileResult).profile;
                self.PID = profile.customerProfileId;
                if(typeof profile.paymentProfiles != "undefined" && profile.paymentProfiles.length){
                    profile.paymentProfiles.map(function(cc){
                        self.CCards.push(cc);
                    });
                    self.CustomerEmail = profile.email;
                }
                self.MainView = 'Payment-Method';
            });
        }

        isSlotAvailable(){
            var self = this;
            var appId = self.$window.localStorage.getItem('AppointmentIDs');
            var providerId = self.$stateParams.userId;
            var postObj = {
                AppID: self.AppID,
                EndDateTime:self.from,
                ProID:providerId,
                StartDateTime:self.to
            };
            var url = self.isEdit ? '/IsProviderSlotFreeEM' : '/IsProviderSlotFree';
            self.CustomerHttp.post(postObj, url).then(function (response: any) {
                if(response === true){
                    self.selectedFrom = self.from;
                    self.selectedTo = self.to;
                    self.availability = true;
                }else{
                    self.availability = false;
                }
            })
        }

        isToday (time) {
            var today = new Date(),
                currentCalendarDate = new Date(time);

            today.setHours(0, 0, 0, 0);
            currentCalendarDate.setHours(0, 0, 0, 0);
            return currentCalendarDate.getTime() >= today.getTime();
        }

        validatePaymentMethod(){
            var self = this;
            if(self.selectedCard == 0){
                self.MainView = 'Payment-Information';
                self.nameOnCard = '';
                self.cardNumber = '';
                self.radioInline = '';
                self.paymentTerm = '';
                self.cvv = '';
                self.expMonth = '01';
                self.modalGoback = false;
                self.years = [];
                var date = new Date();
                var year = parseInt(date.getFullYear());
                self.expYear = year;
                for(var i = 0; i < 20; i++){
                    self.years.push(year++);
                }
            }else{
                self.showIonicConfirmation();
            }
        }
        customCardPayment(){
            var self = this;
            if(self.nameOnCard == '' || !self.nameOnCard.trim().length){
                self.showIonicAlert('Name on card is required');
            } else if(self.nameOnCard.trim().length > 150){
                self.showIonicAlert('Name of card should be max lenth 150');
            } else if(self.cardNumber == '' || !self.cardNumber.trim().length){
                self.showIonicAlert('Card number is required');
            }  else if(isNaN(parseInt(self.cardNumber))){
                self.showIonicAlert('Card number must be numeric');
            }  else if(self.cardNumber.length < 14 || self.cardNumber.length > 16){
                self.showIonicAlert('Card number should be between 14-16');
            } else if(self.radioInline == '' || !self.radioInline.trim().length){
                self.showIonicAlert('Card type is required');
            } else if(self.cvv == '' || !self.cvv.trim().length){
                self.showIonicAlert('CVV is required');
            } else if(isNaN(parseInt(self.cvv))){
                self.showIonicAlert('CVV must be numeric');
            } else if(self.cvv.trim().length < 3 || self.cvv.trim().length > 4){
                self.showIonicAlert('CVV shuld be 3-4');
            } else if(self.paymentTerm == ''){
                self.showIonicAlert('You need to agree with our payment terms');
            } else{
                self.showIonicConfirmation(true);
            }
        }
        showIonicConfirmation(customCard){
            var self = this;

            self.type = customCard || false;
            if(!self.type) {
                var card = self.CCards.filter(function (cc) {
                    return cc.customerPaymentProfileId === self.selectedCard;
                });
                self.card = card[0];
                self.mainCard = self.card.payment.Item.cardNumber;
            } else{
                var cFull = self.cardNumber;
                self.mainCard = 'XXXX'+cFull.slice(cFull.length -  4, cFull.length);
            }
            self.messages = 'Your card ending with '+self.mainCard+' will be charge for amount of '+self.totalPrice+' USD';
            $("#PDonePayment").modal();

            /*var confirmPopup = self.$ionicPopup.confirm({
                title: '<i style="color: #112173" class="fa fa-info-circle fa-3x"></i>',
                template: 'Your card ending with '+self.mainCard+' will be charge for amount of '+self.totalPrice+' USD'
            });*/
            /*confirmPopup.then(function(res) {
                if(res) {
                    if (!type) {
                        var PID = self.PID;
                        var PPID = card.customerPaymentProfileId;
                        var amount = self.totalPrice;
                        //str.slice(str.length -  4, str.length);
                        self.CustomerHttp.get('/AuthProfileJSON/' + PID + '/' + PPID + '/' + amount).then(function (response:any) {
                            var resp = JSON.parse(response.AuthProfileJSONResult);
                            if (resp.transactionResponse.responseCode == 1) {
                                self.transId = resp.transactionResponse.transId;
                                self.finalMakeAppointment();
                            } else {
                                self.showIonicAlert('Sorry, the transaction was NOT successfull cause of the following reason', resp.transactionResponse.errors[0].errorText);
                            }
                        })
                    } else{
                        var obj = {
                            "Amount": self.totalPrice,
                            "CCNumber": self.cardNumber,
                            "CVV": self.cvv,
                            "Email": self.CustomerEmail,
                            "Expiry":self.expMonth+'/'+self.expYear,
                            "UID": self.customerId
                        };
                        self.CustomerHttp.post(obj, '/AuthCardJSON').then(function (response:any) {
                            var resp = JSON.parse(response);
                            if (resp.transactionResponse.responseCode == 1) {
                                self.transId = resp.transactionResponse.transId;
                                self.finalMakeAppointment();
                            } else {
                                self.showIonicAlert('Sorry, the transaction was NOT successfull cause of the following reason', resp.transactionResponse.errors[0].errorText);
                            }
                        })
                    }
                }
            });*/
        }
        actionPayment(){
            var self = this;
            if (!self.type) {
                var PID = self.PID;
                var PPID = self.card.customerPaymentProfileId;
                var amount = self.totalPrice;
                //str.slice(str.length -  4, str.length);
                self.CustomerHttp.get('/AuthProfileJSON/' + PID + '/' + PPID + '/' + amount).then(function (response:any) {
                    var resp = JSON.parse(response.AuthProfileJSONResult);
                    if (resp.transactionResponse.responseCode == 1) {
                        self.transId = resp.transactionResponse.transId;
                        self.finalMakeAppointment();
                    } else {
                        self.showIonicAlert('Sorry, the transaction was NOT successfull cause of the following reason '+resp.transactionResponse.errors[0].errorText);
                    }
                })
            } else{
                var obj = {
                    "Amount": self.totalPrice,
                    "CCNumber": self.cardNumber,
                    "CVV": self.cvv,
                    "Email": self.CustomerEmail,
                    "Expiry":self.expMonth+'/'+self.expYear,
                    "UID": self.customerId
                };
                self.CustomerHttp.post(obj, '/AuthCardJSON').then(function (response:any) {
                    var resp = JSON.parse(response);
                    if (resp.transactionResponse.responseCode == 1) {
                        self.transId = resp.transactionResponse.transId;
                        self.finalMakeAppointment();
                    } else {
                        self.modalGoback = true;
                        self.showIonicAlert('Sorry, the transaction was NOT successfull cause of the following reason '+resp.transactionResponse.errors[0].errorText);
                    }
                })
            }
        }
        wronInfoGoBack(){
            var self = this;
            if(self.modalGoback) self.MainView = 'Payment-Method';
        }
        finalMakeAppointment(){
            var self = this;
            var postObj = {
                city: self.info.city,
                state: self.info.state,
                street: self.info.address,
                zip: self.info.zip
            };
            self.CustomerHttp.post(postObj, '/AddAddress').then(function (response: any) {
                self.addressId = response;
            });
            self.action = 'redirectAfterAppointment';
            $("#PDonePayment").modal('hide');
            self.showIonicAlert(/*'<i class="fa fa-check-circle fa-3x"></i>', */'Your Appointment has been confirmed!')
        }

        redirectAfterAppointment(){
            var self = this;
            var AtTime = self.ASAP ? '' : moment(self.selectedFrom, 'hh:mm A').format('HH:mm');
            var EndTime = self.ASAP ? '' : moment(self.selectedTo, 'hh:mm A').format('HH:mm');
            var ForDate = self.ASAP ? '' : self.onlyDate;
            var obj = {
                AddressID: self.addressId,
                AtTime: AtTime,
                CCNumber: '',
                CSVSRVC: self.serviceString+'|',
                ClientID: self.customerId,
                Comment: self.comment,
                EditAppID: self.AppID,
                EndTime: EndTime,
                Expriry: '',
                ForDate: ForDate,
                PayTxnID: '',
                ProviderID: self.$stateParams.userId,
                oAuthTxn: self.transId
            };
            self.CustomerHttp.post(obj,'/MakeAppointment').then(function (response: any) {
                if(!isNaN(parseInt(response))){
                    self.$state.go('MySchedule');
                }else{
                    self.showIonicAlert('Sorry, your appointment not successfully done!');
                }
            })
        }

    }


    angular.module('spafoo.ctrl.MakeAppointment', []).controller('MakeAppointment', MakeAppointmentController);

}