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
        customer_PaymentProfileId: string;
        MainView: string;
        ProviderServiceList: {};
        messages: any;
        action: any;
        CouponData: any;
        IsHidden: boolean;
        ISvalidCoupon: boolean;
        totalDiscountPrice: number;
        address: string; city: string; state: string; zip: string; AppID: any; info: any; ServiceData: any;
        static $inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', '$rootScope', 'SharedHttp', '$stateParams', '$ionicPopup'];
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

            this.UserID = this.$stateParams.userId;
            this.AppID = 0;
            this.ServiceData = {};
            var status = this.$window.localStorage.getItem('LoginStatus');
            this.customerId = null;
            this.action = '';
            this.checked_services = [];
            if (!status || status == "false") {
                var providerData = { providerId: this.UserID };
                $window.localStorage.setItem("url", window.location.hash);
                this.$state.go("login", providerData);
            } else {
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
            if (this.$stateParams.appointmentId != "null") {
                this.AppointmentID = this.$stateParams.appointmentId;
                this.isEdit = true;
                this.AppID = this.AppointmentID;
            }
            this.ASAP = this.$stateParams.type == 'ASAP';
            if ($stateParams.userId != "null" && this.customerId != null) {

                this.getProviderPortfolio($stateParams.userId);
            }
            else {
                this.$state.go("login");
            }
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            this.IsHidden = false;
            var self = this;
        }
        openDropdown() {
            this.isOpenSelectAdress = this.isOpenSelectAdress == '' ? 'open' : '';
        }
        getProviderPortfolio(UserID: any) {
            var self = this;

            self.CustomerHttp.get('/GetUserInfo/' + UserID).then(function (response: any) {

                response.GetUserInfoResult.displayNameField = response.GetUserInfoResult.firstNameField + " " + response.GetUserInfoResult.lastNameField[0] + ".";

                self.ServiceData = response.GetUserInfoResult;
                for (var i = 0; i < response.GetUserInfoResult.length; i++) {

                }
                if (self.isEdit) {
                    self.getEditInfo();
                }
                self.SharedHttp.GetProviderServices(UserID).then(function (res) {
                    self.ProviderServiceList = res;
                    if (self.ProviderServiceList.length && !self.isEdit) {
                        self.ProviderServiceList.map(function (proServ) {
                            if (proServ.serviceIDField == self.$window.localStorage.getItem('ServiceIDs')) {
                                var serviceString = proServ.serviceIDField + ':' + 1 + ':' + proServ.priceField;
                                setTimeout(function () {
                                    $('input[value="' + serviceString + '"]').prop('checked', 'checked');
                                }, 300);
                                return false;
                            }
                        })
                    }
                });
                self.CustomerHttp.get('/GetUserInfo/' + self.customerId).then(function (response: any) {
                    self.ServiceData.profileField.streetField = response.GetUserInfoResult.profileField.streetField;
                    self.ServiceData.profileField.cityField = response.GetUserInfoResult.profileField.cityField;
                    self.ServiceData.profileField.regionField = response.GetUserInfoResult.profileField.regionField;
                    self.ServiceData.profileField.postalCodeField = response.GetUserInfoResult.profileField.postalCodeField;
                    self.ServiceData.profileField.cellField = response.GetUserInfoResult.profileField.cellField;
                    if (!self.isEdit) {
                        self.info.address = self.ServiceData.profileField.streetField;
                        self.info.city = self.ServiceData.profileField.cityField;
                        self.info.state = self.ServiceData.profileField.regionField;
                        self.info.zip = self.ServiceData.profileField.postalCodeField;
                        self.info.phone = self.ServiceData.profileField.cellField;
                    }
                })
            });
        }

        ValidateCoupon(code: any) {
            var self = this;
            self.ISvalidCoupon = false;
            self.CustomerHttp.get('/ValidateCoupon/' + code).then(function (response: any) {
                self.CouponData = response.ValidateCouponResult;
                var TotalPrices = self.totalPrice;
                if (self.CouponData != null) {   
                    if (self.CouponData.discountTypeField == '%' && self.CouponData.discountTypeField != null) {

                        self.discountPrice = ((parseFloat(self.CouponData.discountField).toFixed(2) * parseFloat(TotalPrices).toFixed(2)) / 100);
                        self.totalDiscountPrice = parseFloat(TotalPrices).toFixed(2) - parseFloat(self.discountPrice).toFixed(2);
                        self.ISvalidCoupon = true;
                    }
                    else if (self.CouponData.discountTypeField == '$' && self.CouponData.discountTypeField != null) {
                        self.discountPrice = self.CouponData.discountField;
                        self.totalDiscountPrice = parseFloat(TotalPrices).toFixed(2) - parseFloat(self.discountPrice).toFixed(2);
                        self.ISvalidCoupon = true;
                    }
                    else {
                        self.totalDiscountPrice = null;
                        self.ISvalidCoupon = false;
                    }
                } else {
                   // self.ISvalidCoupon = false;
                    self.totalDiscountPrice = null;
                }
            });


        }

        getEditInfo() {
            var self = this;
            self.CustomerHttp.get('/GetAppointment/' + self.AppointmentID).then(function (response: any) {
                self.ServiceData.appointment = response.GetAppointmentResult;
                self.CustomerHttp.get('/GetAppLocation/' + self.AppointmentID).then(function (response: any) {
                    var e = response.GetAppLocationResult;
                    self.info.address = e.addressField;
                    self.info.city = e.cityField;
                    self.info.state = e.stateField;
                    self.info.zip = e.zipField;
                    self.info.phone = e.cellField;
                });
                self.appointment = self.ServiceData.appointment;
                setTimeout(function () {
                    self.appointment.servicesField.map(function (serv: any) {
                        var serviceString = serv.serviceIDField + ':' + 1 + ':' + serv.priceField;
                        $('input[value="' + serviceString + '"]').prop('checked', 'checked');
                        self.comment = self.appointment.commentsField;
                    })
                }, 500)
            });
        }

        changedValue(data: any, text: any) {
            var self = this;
            // alert(data);
            self.addressText = text;
            switch (parseInt(data)) {
                case 1:
                    self.GetGPSLocation();
                    break;
                case 2:
                    //alert(self.address);
                    self.info.address = self.ServiceData.profileField.streetField;
                    self.info.city = self.ServiceData.profileField.cityField;
                    self.info.state = self.ServiceData.profileField.regionField;
                    self.info.zip = self.ServiceData.profileField.postalCodeField;
                    self.info.phone = self.ServiceData.profileField.cellField;
                    break;

                case 3:
                    self.info.address = '';
                    self.info.city = '';
                    self.info.state = '';
                    self.info.zip = '';
                    self.info.phone = '';
            }

            this.isOpenSelectAdress = '';

        }

        GetGPSLocation() {
            var self = this;
            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            };
            navigator.geolocation.getCurrentPosition(function (position) {
                const GOOGLE = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                //    alert("onsuccess navigation called");
                var request = {
                    'position': GOOGLE
                };
                plugin.google.maps.Geocoder.geocode(request, function (results: any) {
                    if (results.length) {
                        var result = results[0];
                        var position = result.position;
                        //  alert(result.subThoroughfare + "/ " + result.thoroughfare + "/" + result.locality + "/" + result.adminArea + "/" + result.postalCode);
                        //if (result.subThoroughfare == "undefined" || result.subThoroughfare == "" || result.thoroughfare == "" || result.subThoroughfare == undefined || result.thoroughfare == undefined || result.postalCode == "" || result.postalCode == undefined || result.postalCode == "undefined" || result.locality == undefined || result.locality == "" || result.locality == "undefined" || result.adminArea == "undefined" || result.adminArea == undefined || result.adminArea == "")
                        //{

                        //}
                        if (result.subThoroughfare == "undefined" || result.subThoroughfare == "" || result.thoroughfare == "" || result.subThoroughfare == undefined || result.thoroughfare == "undefined" || result.thoroughfare == undefined) {
                            self.info.address = '';
                        }
                        else {
                            self.info.address = result.subThoroughfare + " " + result.thoroughfare;
                        }
                        if (result.locality == undefined || result.locality == "" || result.locality == "undefined") {
                            self.info.city = '';
                        }
                        else {
                            self.info.city = result.locality;
                        }
                        if (result.adminArea == "undefined" || result.adminArea == undefined || result.adminArea == "") {
                            self.info.state = '';
                        }
                        else {
                            self.info.state = result.adminArea;
                        }
                        if (result.postalCode == "" || result.postalCode == undefined || result.postalCode == "undefined") {
                            self.info.zip = '';
                        }
                        else {
                            self.info.zip = result.postalCode;
                        }

                        /*self.info.address = result.subThoroughfare || '' + " " + result.thoroughfare || '';
                        self.info.city = result.locality || '';
                        self.info.state = result.adminArea || '';
                        self.info.zip = result.postalCode || '';*/

                    }
                });
            }, self.onError, options);

        }

        onError(e: any) {
        
        }

        viewSelect(view: any) {
            var self = this;
            view = self.ASAP && view == 'Appointment-DateTime' ? 'Order-Summary' : view;
            if (self.isEdit && view == 'Basic-Info') {
                self.getEditInfo();
            } else if (self.backToCalendar && view == 'Payment-Method') {
                if (self.ASAP) {
                    view = 'Order-Summary';
                } else {
                    self.appointmentView();
                    return;
                }
            }
            this.MainView = view;
        }

        CreateAppointment(Rcd: any) {
            var self = this;
            var status = self.SharedHttp.getLoginStatus();
            var servLists = [];
            self.totalDuration = 0;
            self.totalPrice = 0;
            if ($("#addressfield").val() == '') {
                self.messages = "Enter address field to proceed";
                $("#PDone").modal();

                return;
            }
            if ($("#cityfield").val() == '') {
                self.messages = "Enter city field to proceed";
                $("#PDone").modal();
                return;
            }
            if ($("#statefield").val() == '') {
                self.messages = "Enter state field to proceed";
                $("#PDone").modal();
                return;
            }
            if ($("#zipfield").val() == '') {
                self.messages = "Enter postal code field to proceed";
                $("#PDone").modal();
                return;
            }

            $('.serviceChecks:checked').map(function () {
                var ServId = this.value.split(':')[0];
                self.ProviderServiceList.map(function (serv) {
                    if (serv.serviceIDField == ServId) {
                        self.totalDuration += serv.durationField == '-1' ? 60 : serv.durationField;
                        self.totalPrice += serv.priceField;
                        servLists.push(serv);
                    }
                })
            });
            self.selectedServices = servLists;
            //console.log(self.selectedServices);
            if (self.selectedServices.length) {
                self.MainView = 'Order-Summary';
                self.selectedServices.map(function (ser) {
                    ser.qtyField = 1;
                    if (self.isEdit) {
                        self.appointment.servicesField.map(function (srvc) {
                            if (srvc.serviceIDField == ser.serviceIDField) {
                                ser.qtyField = srvc.qtyField;
                            }
                        });
                        self.changeSummery();
                    }
                });
            } else {
                self.showIonicAlert('Please select the Service(s) for Appointment');
            }
        }


        changeSummery(value) {
            var self = this;
            self.totalDuration = 0;
            self.totalPrice = 0;
            if (value > 10) {
                self.showIonicAlert('Max allowed value for a single item is 10');
            }
            self.serviceString = self.selectedServices.map(function (serv) {
                self.totalDuration += isNaN(serv.durationField * serv.qtyField) ? serv.durationField == '-1' ? 60 : serv.durationField : serv.durationField == '-1' ? 60 : serv.durationField * serv.qtyField;
                self.totalPrice += isNaN(serv.priceField * serv.qtyField) ? serv.priceField : serv.priceField * serv.qtyField;
                //servLists.push(serv);
            });
            self.serviceString = '';
            self.selectedServices.map(function (srvc) {
                var str = srvc.serviceIDField + ':' + srvc.qtyField + ':' + srvc.priceField;
                if (self.serviceString == '') {
                    self.serviceString = str;
                } else {
                    self.serviceString += '|' + str;
                }
            });
        }



        removeService(index) {
            var self = this;
            self.selectedServices.splice(index, 1);
            !self.selectedServices.length ? self.MainView = 'Basic-Info' : self.changeSummery();
        }

        appointmentView() {
            var self = this;
            self.changeSummery();
            self.eventSource = [];
            if (self.ASAP) {
                self.paymentMethod();
            } else {
                var startDate = new Date('08/28/2016');
                var endDate = new Date('10/09/2016');
                self.staticEvents = [
                    {
                        events: [],
                    }
                ];
                self.uiConfig = {
                    calendar: {
                        contentHeight: 'auto',
                        header: { left: 'prev,next today', center: '', right: 'title' },
                        defaultView: 'month', selectable: true, timezone: 'local',
                        defaultDate: (new Date()),
                        selectHelper: true,
                        dayClick: function (date: any, jsEvent: any, view: any) {
                            self.onTimeSelected(date, jsEvent);
                        },
                        editable: true,
                        slotEventOverlap: false,
                        eventLimit: 1,
                        viewRender: function (view, element) { this.calendar.removeEvents(); if (self.isToday(view.end, true)) self.getOccupiedSlots(view.start, view.end); }
                    }
                };
                setTimeout(function () {
                    $('.fc-toolbar > .fc-center').html('<div class="pctip"><i class="fa red2 fa-square"></i> Provider Not Available &nbsp;&nbsp;&nbsp;<i class="fa blue fa-square"></i> Already Reserved</div>');
                }, 0);
                //self.getOccupiedSlots();
                self.MainView = 'Appointment-DateTime'
            }
        }

        getOccupiedSlots(start, end) {

            var self = this;
            //self.staticEvents[0].events = [];
            var date = new Date(), y = date.getFullYear(), m = date.getMonth();
            var start = moment().format('MM/DD/YYYY');
            var end = moment(end).format('MM/DD/YYYY');
            var postObj = {
                EndDateTime: end,
                ProID: self.$stateParams.userId,
                StartDateTime: start,
            };
            self.CustomerHttp.get('/ListMyAvail/' + self.UserID).then(function (res: any) {

                var aviles = JSON.parse(res.ListMyAvailResult);
                for (var i = 0; i < aviles.length; i++) {
                    var starthours = aviles[i].StartTime.Hours > 9 ? aviles[i].StartTime.Hours : '0' + aviles[i].StartTime.Hours;
                    var startminutes = aviles[i].StartTime.Minutes > 9 ? aviles[i].StartTime.Minutes : '0' + aviles[i].StartTime.Minutes;
                    var endhours = aviles[i].EndTime.Hours > 9 ? aviles[i].EndTime.Hours : '0' + aviles[i].EndTime.Hours;
                    var endminutes = aviles[i].EndTime.Minutes > 9 ? aviles[i].EndTime.Minutes : '0' + aviles[i].EndTime.Minutes;
                    var dateMonth = aviles[i].Date;
                    var dateMonth1 = self.SharedHttp.getFormatedDate(dateMonth, "MM DD");
                    var abcDate = (dateMonth).replace("/Date(", "").replace(")/", "");

                    self.staticEvents[0].events.push({
                        start: moment(parseInt(abcDate)).format('YYYY-MM-DD'),
                        title: moment(endhours + ':' + endminutes, 'HH:mm').format('h:mm A') + ' - ' + moment(starthours + ':' + startminutes, 'HH:mm').format('h:mm A'),
                        dateField: dateMonth1,
                        color: '#ff0000'
                    });
                }
                self.CustomerHttp.post(postObj, '/GetProOccupiedSlots').then(function (d: any) {
                    var _Today = new Date();
                    $.each(d, function (i, o) {
                        self.staticEvents[0].events.push({ title: moment(o.atTimeField, 'HH:mm').format('h:mm A') + ' - ' + moment(o.endTimeField, 'HH:mm').format('h:mm A'), start: o.forDateField + ' ' + o.atTimeField, end: o.forDateField + ' ' + o.endTimeField, color: '#1e319b', textColor: 'white' });
                    });
                });
            });
        }

        onViewTitleChanged = function (title) {
            this.viewTitle = title;
        };

        onTimeSelected(time, event) {
            var self = this;
            self.availability = false;
            if (!self.isToday(time, true)) {
                //   alert(time);
                self.showIonicAlert('Sorry, you cannot select date before today');
            } else {

                var mins = parseInt(moment().format('m'));
                var hrs = parseInt(moment().format('h'));
                var A = moment().format('A');

                if (mins > 0 && mins < 15) { mins = 15 } else if (mins > 15 && mins < 30) { mins = 30 } else if (mins > 30 && mins < 45) { mins = 45 } else if (mins > 45) { mins = 0; hrs = hrs + 1; }
                var currenttime = hrs + ":" + mins + " " + A;

                self.selectedDate = time;
                self.onlyDate = moment(self.selectedDate).format('L');
                self.from = self.isToday(time, true) ? moment(currenttime, 'h:mm A').add(60, 'm').format("h:mm A") : moment('09.00', "h:mm A").format("h:mm A");
                self.to = self.isToday(time, true) ? moment(moment(currenttime, 'h:mm A').add(60, 'm').format("h:mm A"), "h:mm A").add(self.totalDuration, 'm').format("h:mm A") : moment('09.00', 'h:mm A').add(self.totalDuration, 'm').format("h:mm A");

                $('#PDoneSlider').modal();


                var todayCurrentTime = moment(moment(currenttime, 'h:mm A').add(60, 'm').format("h:mm A"), "h:mm A").format("X");
                //var to = self.isToday(time, true) ? todayCurrentTime : moment(currenttime, 'h:mm A').format("X");
                //var from = self.isToday(time, true) ? moment(moment(currenttime, 'h:mm A').add(60, 'm').format("h:mm A"), "h:mm A").add(self.totalDuration, 'm').format("X") : moment(currenttime, 'h:mm A').add(self.totalDuration, 'm').format("X");

                var to = self.isToday(time, false) ? todayCurrentTime : moment('00:00', 'h:mm A').format("X");
                var from = self.isToday(time, false) ? moment(moment(currenttime, 'h:mm A').add(60, 'm').format("h:mm A"), "h:mm A").add(self.totalDuration, 'm').format("X") : moment('00:00', 'h:mm A').add(self.totalDuration, 'm').format("X");

                //var from = +moment('09:00', 'h:mm A').add(self.totalDuration, 'm').format("X");

                var min = self.isToday(time, false) ? todayCurrentTime : moment('00:00', 'h:mm A').format("X");

                var max = moment('23:45', 'h:mm A').format("X");
                //setTimeout(function(){
                $("#range").ionRangeSlider({
                    type: "double",
                    min: min,
                    max: max,
                    from: to,
                    to: from,
                    //step: +moment('05', 'mm').format('h:mm A A'),
                    step: 900,
                    //step: 300000,
                    drag_interval: true,
                    prettify: function (num) {
                        return moment(num, "X").format("h:mm A");
                    },
                    onFinish: function (data) {
                        self.from = moment(data.from, "X").format("h:mm A");
                        self.to = moment(data.to, "X").format("h:mm A");
                        self.isSlotAvailable();
                    },
                    force_edges: true
                });
                self.slider = $("#range").data("ionRangeSlider");
                self.slider.update({
                    min: min,
                    max: max,
                    from: to,
                    to: from
                });
                self.isSlotAvailable();
                //}, 3000)
            }
        }

        destroySlider() {
            var self = this;
            self.slider.destroy();
        }

        dateTimeChooseDone() {
            var self = this;
            if (self.availability) {
                $('#PDoneSlider').modal('hide');
                self.showSTTime = self.selectedFrom;
                self.showENTime = self.selectedTo;
                self.showTHDay = self.onlyDate;
                $('#PConfirm').modal('show');
            } else {
                self.showIonicAlert('Please select an available time slot');
            }
        }

        showIonicAlert(text, template) {
            var self = this;
            $(".modal").modal('hide');
            self.messages = text;
            $("#PDone").modal();
        }

        actionAfterOk(ac) {
            var self = this;
            if (self.action == 'redirectAfterAppointment') {
                self.redirectAfterAppointment();
            }
        }

        customCardPage() {
            var self = this;
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
            for (var i = 0; i < 20; i++) {
                self.years.push(year++);
            }
            self.chkBilling = true;
            self.Address = self.info.address;
            self.City = self.info.city;
            self.State = self.info.state;
            self.Zip = self.info.zip;

            $("#MobileNo").mask("000-000-0000");
            setTimeout(function () {
                $("#MobileNo").val(self.info.phone);
            }
                , 1000)


        }


        paymentMethod() {
            var self = this;
            self.backToCalendar = false;
            self.CustomerHttp.get('/GetCustomerProfile/' + self.customerId).then(function (resp) {
                self.selectedCard = 0;
                self.CCards = [];
                var profile = JSON.parse(resp.GetCustomerProfileResult);
                if (profile) {

                    profile = profile.profile;
                    //      alert(JSON.stringify(profile));
                    //   self.customer_PaymentProfileId = profile.customerPaymentProfileId;
                    self.PID = profile.customerProfileId;
                    //  self.customer_PaymentProfileId = null;
                    if (typeof profile.paymentProfiles != "undefined" && profile.paymentProfiles) {
                        profile.paymentProfiles.map(function (cc) {
                            self.CCards.push(cc);
                        });
                        self.CustomerEmail = profile.email;
                        self.MainView = 'Payment-Method';
                    } else {
                        self.backToCalendar = true;
                        self.customCardPage();
                    }

                } else {
                    self.backToCalendar = true;
                    self.customCardPage();
                }
            });
        }

        isSlotAvailable() {
            var self = this;
            var appId = self.$window.localStorage.getItem('AppointmentIDs');
            var providerId = self.$stateParams.userId;
            var postObj = {
                AppID: self.AppID,
                EndDateTime: self.onlyDate + ' ' + self.from,
                ProID: providerId,
                StartDateTime: self.onlyDate + ' ' + self.to
            };
            var url = self.isEdit ? '/IsProviderSlotFreeEM' : '/IsProviderSlotFree';
            self.CustomerHttp.post(postObj, url).then(function (response: any) {
                if (response === true) {
                    self.selectedFrom = self.from;
                    self.selectedTo = self.to;
                    self.availability = true;
                } else {
                    self.availability = false;
                }
            })
        }
           
        isToday(start, todayAnd) {
            var today = new Date();
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate() );
            var check = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate() + 1);
            return todayAnd ? check >= today : moment(check).format('X') == moment(today).format('X');
        }


        validatePaymentMethod() {
            var self = this;
            if (self.selectedCard == 0) {
                self.customCardPage();
            } else {
                self.showIonicConfirmation();
            }
        }

        customCardPayment() {

            var self = this;
            self.Phone = $("#MobileNo").val();
            if (self.nameOnCard == '' || !self.nameOnCard.trim().length) {
                self.showIonicAlert('Name on card is required');
            } else if (self.nameOnCard.trim().length > 150) {
                self.showIonicAlert('Name of card should be max lenth 150');
            } else if (self.cardNumber == '' || !self.cardNumber.trim().length) {
                self.showIonicAlert('Card number is required');
            } else if (/\D/.test(self.cardNumber)) {
                self.showIonicAlert('Card number must be numeric');
            } else if (self.cardNumber.length < 14 || self.cardNumber.length > 16) {
                self.showIonicAlert('Card number should be between 14-16');
            } else if (self.radioInline == '' || !self.radioInline.trim().length) {
                self.showIonicAlert('Card type is required');
            } else if (self.cvv == '' || !self.cvv.trim().length) {
                self.showIonicAlert('CVV is required');
            } else if (/\D/.test(self.cvv)) {
                self.showIonicAlert('CVV must be numeric');
            } else if (self.cvv.trim().length < 3 || self.cvv.trim().length > 4) {
                self.showIonicAlert('CVV should be 3-4');
            }
            else if (self.Address == '' || self.Address == undefined) {
                self.showIonicAlert('Address must be required');
            }
            else if (self.City == '' || self.City == undefined) {
                self.showIonicAlert('City must be required');
            }
            else if (self.State == '' || self.State == undefined) {
                self.showIonicAlert('State must be required');
            }
            else if (self.Zip == '' || self.Zip == undefined) {
                self.showIonicAlert('Zip/Postal Code must be required');
            }
            else if ($("#MobileNo").val() == '' || $("#MobileNo").val() == undefined) {
                self.showIonicAlert('Phone no must be required');
            } else if (self.paymentTerm == '' || self.paymentTerm == undefined) {
                self.showIonicAlert('You need to agree with our payment terms');
            }
            else if (self.paymentTerm == '' || self.paymentTerm == undefined) {
                self.showIonicAlert('You need to agree with our payment terms');
            }
            else {
                self.showIonicConfirmation(true);
            }
        }

        showIonicConfirmation(customCard) {
            var self = this;

            self.type = customCard || false;
            if (!self.type) {
                var card = self.CCards.filter(function (cc) {
                    return cc.customerPaymentProfileId === self.selectedCard;
                });
                self.card = card[0];
                self.mainCard = self.card.payment.Item.cardNumber;
            } else {
                var cFull = self.cardNumber;
                self.mainCard = 'XX' + cFull.slice(cFull.length - 4, cFull.length);
            }
            // self.messages = 'Your card ending with ' + self.mainCard + ' will be charge for amount of ' + self.totalPrice + ' USD';
            self.messages = 'Your card ending in ' + self.mainCard.replace('XXXX', 'XX') + ' will be charged $' + self.totalPrice + ' USD after the appointment is completed. If cancelled within 12 hours of the set appointment time, you will be charged $25.';
            $("#PDonePayment").modal();
        }

        HandleCCAddresUI() {
            var self = this;
            self.IsHidden = true;
            $("#MobileNo").mask("000-000-0000");
            if (self.chkBilling) {
                self.IsHidden = false;
                self.Address = self.info.address;
                self.City = self.info.city;
                self.State = self.info.state;
                self.Zip = self.info.zip;
                $("#MobileNo").val(self.info.phone)
            }
            else {
                self.Address = '';
                self.City = '';
                self.State = '';
                self.Zip = '';
                $("#MobileNo").val('');
            }

        }

        actionPayment() {
            var self = this;
            self.totalPrice = (self.totalDiscountPrice != null ? self.totalDiscountPrice : self.totalPrice);
            if (!self.type) {
                var PID = self.PID;
                var PPID = self.card.customerPaymentProfileId;
                self.customer_PaymentProfileId = PPID;
                // at this point you have he customerPaymentProfileId, now no more auth or capture ..just subbmit the data to web method to create appointment
                // this is the flow when user select existing card ?
                var amount = self.totalPrice;
                //  alert(PID + ' / ' + PPID + ' /' + amount);
                //str.slice(str.length -  4, str.length);
                //self.CustomerHttp.get('/AuthProfileJSON/' + PID + '/' + PPID + '/' + amount).then(function (response: any) {
                //    var resp = JSON.parse(response.AuthProfileJSONResult);
                //    //   console.log("hi ji :: " +JSON.stringify(resp));
                //    if (resp.transactionResponse.responseCode == 1) {
                //        self.transId = resp.transactionResponse.transId;
                self.finalMakeAppointment();
                //    } else {
                //        self.showIonicAlert('Sorry, the transaction was NOT successfull cause of the following reason ' + resp.transactionResponse.errors[0].errorText);
                //    }
                //})
            } else {
                //    alert('hi');
                var obj = {
                    "Amount": self.totalPrice,
                    "CCNumber": self.cardNumber,
                    "CVV": self.cvv,
                    "Email": self.CustomerEmail,
                    "Expiry": self.expMonth + '/' + self.expYear,
                    "UID": self.customerId,
                    "Name": self.nameOnCard, "Address": self.Address, "City": self.City, "State": self.State, "Zip": self.Zip, "Phone": $("#MobileNo").val()

                };
                //self.CustomerHttp.post(obj, '/AuthCardJSON1').then(function (response: any) {
                //   var resp = JSON.parse(response);

                //if (response.Usertype == '1')
                //{
                //    console.log(JSON.stringify(response));

                //        if (response.Source === 'E00039' || response.Source === 'I00001') {
                //            self.finalMakeAppointment();
                //            self.customer_PaymentProfileId = response.CustomerID;
                //        }
                //        else
                //        {
                //            self.showIonicAlert('Sorry, the transaction was NOT successfull cause of the following reason ' + response.Success );
                //        }

                //}
                //else {
                //    self.showIonicAlert('Sorry, the transaction was NOT successfull cause of the following reason ' + resp.transactionResponse.errors[0].errorText);
                //}

                //if (resp.transactionResponse.responseCode == 1) {
                //    self.transId = resp.transactionResponse.transId;

                //    //if (self.saveCardInfo) {
                self.CustomerHttp.post(obj, '/CreateCustomerProfile').then(function (response) {
                    console.log(JSON.stringify(response));

                    if (response.Source === 'E00039' || response.Source === 'I00001') {
                        self.finalMakeAppointment();
                        self.customer_PaymentProfileId = response.CustomerID;
                    }
                    else {
                        self.showIonicAlert('Sorry, the transaction was NOT successfull cause of the following reason ' + response.Success);
                    }

                }, function (error) { });
                //}


                //} else {
                //    //self.modalGoback = true;
                //    self.showIonicAlert('Sorry, the transaction was NOT successfull cause of the following reason ' + resp.transactionResponse.errors[0].errorText);
                //}
                //   });
            }
        }


        wronInfoGoBack() {
            var self = this;
            if (self.modalGoback) {
                self.MainView = 'Payment-Method';
            } else if (self.action == 'redirectAfterAppointment') {
                self.redirectAfterAppointment();
            }
        }
        finalMakeAppointment() {
            var self = this;
            var postObj = {
                city: self.info.city,
                state: self.info.state,
                street: self.info.address,
                zip: self.info.zip
            };
            self.CustomerHttp.post(postObj, '/AddAddress').then(function (response: any) {
                self.CustomerHttp.get('/UpdateCouponCount/' + self.CouponCode).then(function (response: any) {
  });
                self.addressId = response;
              
            });
            self.action = 'redirectAfterAppointment';
            $("#PDonePayment").modal('hide');
            self.showIonicAlert(/*'<i class="fa fa-check-circle fa-3x"></i>', */'Your Appointment has been confirmed!')
        }

        redirectAfterAppointment() {
            var self = this;
            var AtTime = self.ASAP ? '' : moment(self.selectedFrom, 'h:mm A A').format('h:mm A');
            var EndTime = self.ASAP ? '' : moment(self.selectedTo, 'h:mm A A').format('h:mm A');
            var ForDate = self.ASAP ? '' : self.onlyDate;
            //  alert(self.customer_PaymentProfileId + "   " + self.PID);
            var obj = {
                AddressID: self.addressId,
                AtTime: AtTime,
                CCNumber: '',
                CSVSRVC: self.serviceString + '|',
                ClientID: self.customerId,
                Comment: self.comment,
                EditAppID: self.AppID,
                EndTime: EndTime,
                Expriry: '',
                ForDate: ForDate,
                PayTxnID: '',
                ProviderID: self.$stateParams.userId,
                PayProfileID: self.customer_PaymentProfileId  //(self.card != undefined ? self.card.customerPaymentProfileId : self.PID)
            };
            self.CustomerHttp.post(obj, '/MakeAppointment').then(function (response: any) {
                if (!isNaN(parseInt(response))) {
                    self.$state.go('MySchedule');
                } else {
                    self.showIonicAlert('Sorry, your appointment not successfully done!');
                }
            })
        }

        showPTerm() {
            $('#PTerms').modal();
        }

    }


    angular.module('spafoo.ctrl.MakeAppointment', []).controller('MakeAppointment', MakeAppointmentController);

}
