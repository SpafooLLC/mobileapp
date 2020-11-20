var NSD_MA_CurrentPro = "";
var NSD_MA_CPayProfile = "";
var NSD_MA_SelectedProfileID = "0";
var NS_MA_LoggedUser = "";
var NS_MA_IsEditMode = false;
var NS_MA_AppointmentObj = "";
var NS_MA_EditSRVC = "";
var NS_MA_EditClient = "";
var NS_MA_EditProv = "";
var NS_MA_ServiceEdited = false;
var NS_MA_IsSoonest = false;
var NS_MA_OccupiedSlots = "";
var NS_MA_IsSlotAvailable = false;
var NS_Session = 0;
var NS_IsCouponApplied = false;
var _HTTPS = "https://www.spafoo.com/"
$(document).ready(function () {
    debugger;
    NSD_MA_CurrentPro = $.cookie('NSD_CurrentUser');// this cookie is created when user comes through service dashboard module
    BindRegions('NS_MA_txtState');
    $("#NS_MA_txtZip").mask('00000');
    
    LoadEditData();
    if (NS_MA_ClientID == -1) {
        bootbox.alert("You need to log in, to access this area");
        return false;
    }
    if (NSD_MA_CurrentPro == null) {
        bootbox.alert('Invalid Session Found')
        return false;
    }
    if ($.cookie('NSD_Soonest') != undefined) {
        NS_MA_IsSoonest = true;
        $(".NS_Soon").hide();
    }
    $("#NS_lblProName").text(NSD_MA_CurrentPro.split(":")[1]);
    $('#NS_MA_SelectAddress').selectpicker();
    NSD_GetProviderServices(NSD_MA_CurrentPro.split(":")[0]);
    GetProfileAddress(NS_MA_ClientID);
    CheckMyPaymentProfile();
});
function LoadEditData() {
    if ($.cookie("NS_MA_IsEditMode") != null) {
        NS_MA_EditSRVC = JSON.parse($.cookie('NS_MA_EditSRVC'));
        NS_MA_EditProv = JSON.parse($.cookie('NS_MA_EditProv'));
        NS_MA_EditClient = JSON.parse($.cookie('NS_MA_EditClient'));
        NS_MA_AppointmentObj = JSON.parse($.cookie('NS_MA_oApp'));
        NS_MA_AppointmentObj.ClientInfo = NS_MA_EditClient;
        NS_MA_AppointmentObj.ProviderInfo = NS_MA_EditProv;
        NS_MA_AppointmentObj.Services = NS_MA_EditSRVC;
        NS_MA_EditClient = "";
        NS_MA_EditProv = "";
        NS_MA_EditSRVC = "";
        NS_MA_IsEditMode = true;
        //  $("#btnAppUpdate").text('Update');
        var ProName = NS_MA_AppointmentObj.ProviderInfo.LastName + " " + NS_IntialLetter(NS_MA_AppointmentObj.ProviderInfo.FirstName);
        $("#NS_lblProName").text(ProName);
        NSD_MA_CurrentPro = NS_MA_AppointmentObj.ProviderID + ":" + ProName;
        $("#txtOrderTime").val(NS_MA_AppointmentObj.AtTime);
        $("#txtOrderDate").val(NS_MA_AppointmentObj.ForDate);
        $("#txtComment").val(NS_MA_AppointmentObj.Comments);
    }
}
function NS_MA_GetUserAddress(o) {
    $("#NS_MA_dvSelectAddress").show();
    var opt = $(o).val();
    if (opt == "MyCurrent") { NSD_GetMyPosition(); }
    if (opt == "MyProfile") { GetProfileAddress(NS_MA_ClientID); }
    if (opt == "Custom") { $("#NS_MA_dvSelectAddress input[type='text']").val(''); }
}
function NSD_GetMyPosition() {
    $("#NS_MA_txtAddress").val('Just a min...');
    navigator.geolocation.getCurrentPosition(function (position) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        },
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var NSD_SourceAddress = (results[0].formatted_address);
                var aryAddr = NSD_SourceAddress.split(',');
                var aryLength = aryAddr.length;
                $("#NS_MA_txtCity").val(aryAddr[aryLength - 3])
                var aryState = aryAddr[aryLength - 2].split(" ");
                var restState = "";
                for (var i = 0; i < aryState.length - 1; i++) {
                    restState += aryState[i] + " ";
                }
                $("#NS_MA_txtState").val(restState);

                $("#NS_MA_txtZip").val(aryState[aryState.length - 1]);
                var _restaddress = "";
                for (var i = 0; i < (aryLength - 3) ; i++) {
                    _restaddress += aryAddr[i] + ", ";
                }
                $("#NS_MA_txtAddress").val(_restaddress);
            }
        });
    }, function (positionError) {
        //$("#error").text("Error: " + positionError.message);
    },
    {
        enableHighAccuracy: true,
        timeout: 10 * 1000 // 10 seconds
    });
}
function GetProfileAddress(UID) {
    if (!NS_MA_IsEditMode) {
        var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetUser";
        $("#NS_MA_txtAddress").val('Just a min...');
        var _data = "{'UID':'" + UID + "'}";
        NS_MakeRequest(_URL, _data, NS_GetProfileAddress_SuCB);
    }
    else {
        var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppLocation";
        $("#NS_MA_txtAddress").val('Just a min...');
        var _data = "{'AppID':'" + NS_MA_AppointmentObj.AppointmentID + "'}";
        NS_MakeRequest(_URL, _data, NS_GetAppLocation_SuCB);
    }
}
function NS_GetAppLocation_SuCB(d) {
    $("#NS_MA_txtCity").val(d.City)
    $("#NS_MA_txtState").val(d.State);
    $("#NS_MA_txtZip").val(d.Zip);
    $("#NS_MA_txtAddress").val(d.Address);
}
function NS_GetProfileAddress_SuCB(d) {
    NS_MA_LoggedUser = d;
    $("#NS_MA_txtCity").val(d.Profile.City)
    $("#NS_MA_txtState").val(d.Profile.Region);
    $("#NS_MA_txtZip").val(d.Profile.PostalCode);
    $("#NS_MA_txtAddress").val(d.Profile.Street);
}
function NSD_GetProviderServices(UID) {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetProviderServices";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + UID + "'}";
    $("#dvProviderServices").show().text("Just a min...")
    NS_MakeRequest(_URL, _data, NSD_GetProviderServices_SuCB);
}
function NSD_GetProviderServices_SuCB(d) {
    if (d.length > 0) {
        $("#dvProviderServices").setTemplateURL('/DesktopModules/NS_MakeAppointment/template/tmpProviderServcies.htm?q=' + $.now());
        $("#dvProviderServices").show().processTemplate(d);
        if (NS_MA_IsEditMode) {
            // select the previously choosen services
            for (var i = 0; i < NS_MA_AppointmentObj.Services.length; i++) {
                var oService = NS_MA_AppointmentObj.Services[i];
                $("#chk_ProSRVC_" + oService.ServiceID).attr('checked', 1);
                $("#chk_ProSRVC_" + oService.ServiceID).attr('qty', oService.Qty);

            }
        }
        else {
            $("#chk_ProSRVC_" + NSD_MA_CurrentPro.split(":")[2]).attr('checked', 1);
        }
    }
}
function SetEditStatus() {
    if (NS_MA_IsEditMode) {
        NS_MA_ServiceEdited = true;
        $("#btnAppUpdate").text('Continue');
    }
}
function ValidateTime(time) {
    var result = false, m;
    var re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
    if ((m = time.match(re))) {
        result = (m[1].length === 2 ? "" : "0") + m[1] + ":" + m[2];
    }
    return result;
}
function ValidateformInput() {
    var street = $("#NS_MA_txtAddress").val().trim();
    if (street == '') { bootbox.alert('Please specify street'); return false; }
    var city = $("#NS_MA_txtCity").val().trim();
    if (city == '') { bootbox.alert('Please specify City'); return false; }
    var state = $("#NS_MA_txtState").val();
    if (state == '') { bootbox.alert('Please specify state'); return false; }
    var zip = $("#NS_MA_txtZip").val().trim();
    if (zip == '') { bootbox.alert('Please specify zip/postal code'); return false; }
    return true;
}
function NSD_MA_SaveNOrderSummary(e) {
    if (ValidateformInput()) {
        var oAddress = '{"Address":[{"City":"' + $("#NS_MA_txtCity").val().trim() + '","State":"' + $("#NS_MA_txtState").val().trim() + '","Zip":"' + $("#NS_MA_txtZip").val().trim() + '","Street":"' + $("#NS_MA_txtAddress").val().trim() + '"}]}';
        $.cookie('NS_UserAddress', oAddress);
        if ($("#btnAppUpdate").text() == 'Continue') {
            $("#NS_TopBarlblHeader").text("Order Summary");
            var lstServices = $("#dvProviderServices input[type='checkbox']:checked");
            if (lstServices.length == 0) { bootbox.alert('Please select the Service(s) for Appointment'); return false; }

            var oServices = '{"services":[';
            var oTotalPrice = 0;
            $.each(lstServices, function (i, v) {
                var oQty = $(v).attr('qty');
                if (oQty == undefined) oQty = 1;
                var oPrice = parseFloat($(v).attr('price'));
                var oDuration = parseInt($(v).attr('duration'));
                oTotalPrice = (parseFloat(oPrice) * oQty) + oTotalPrice;
                if (i < (lstServices.length - 1)) {
                    oServices += '{"Qty":"' + oQty + '","ID":"' + v.id.split("_")[2] + '","name":"' + $(v).next().text() + '","Duration":"' + oDuration + '","price":"' + oPrice + '"},';
                }
                else {
                    oServices += '{"Qty":"' + oQty + '","ID":"' + v.id.split("_")[2] + '","name":"' + $(v).next().text() + '","Duration":"' + oDuration + '","price":"' + oPrice + '"}';
                }

            });
            oServices += "]}";
            var UserLocation = $("#NS_MA_SelectAddress :selected").text()
            //var oOther = '{"other":[{"OrderTotal":"' + oTotalPrice + '","UserLocation":"' + UserLocation + '","Date":"' + $("#txtOrderDate").val().trim() + '","Time":"' + $("#txtOrderTime").val().trim() + '","Comment":"' + $("#txtComment").val().trim() + '"}]}';
            var oOther = '{"other":[{"OrderTotal":"' + oTotalPrice + '","UserLocation":"' + UserLocation + '","Comment":"' + $("#txtComment").val().trim() + '"}]}';
            $.cookie('NS_UserServices', oServices);
            $.cookie('NS_Other', oOther);
            NSD_MA_ShowOrderSummary();
        }
        if ($("#btnAppUpdate").text() == 'Update') {
            NS_MA_SaveAppointment();
        }
    }
}
function NSD_MA_ShowOrderSummary() {
    $("#dvMakeAppointment").removeClass("NS_On").addClass("NS_Off");
    var oServices = JSON.parse($.cookie('NS_UserServices'));
    var oOther = JSON.parse($.cookie('NS_Other'));
    $("#dvOrderSummary").setTemplateURL('/DesktopModules/NS_MakeAppointment/template/tmpOrderSummary.htm?q=' + $.now());
    $("#dvOrderSummary").addClass("NS_On").removeClass('NS_Off').processTemplate(oServices.services);
    NS_MA_CalTotalSession();
    if (!NS_MA_IsSoonest) {
        $("#NSD_MA_lblOrderDate").text(oOther.other[0].Date);
        $("#NSD_MA_lblOrderTime").text(oOther.other[0].Time);
    }
    else {
        oOther.other[0].Date = '';
        oOther.other[0].Time = '';
    }
    $("#NSD_MA_lblOrderTotal").text(oOther.other[0].OrderTotal);
    $("#lblSubTotal").text(oOther.other[0].OrderTotal);
    $("#lblCDiscount").text("0");
    oUserInput.Amount = oOther.other[0].OrderTotal;
    $("#NSD_MA_lblUserLocation").text(oOther.other[0].UserLocation);
    $("#NSD_MA_lblProviderName").text(NSD_MA_CurrentPro.split(":")[1]);
    $("#NSD_MA_lblTotalServiceSession").text(NS_Session + 'min');
}
function NSD_MA_ApplyCoupon() {
    if ($("#NS_btnValidateCoupon").val() == "Validate") {
        var C = $("#NS_txtCoupon").val().trim();
        if (C != "") {
            $("#NS_btnValidateCoupon").val("Checking...")
            var _URL = "/DesktopModules/NS_ServiceDashboard/rh.asmx/ValidateCoupon";
            var _data = "{'Code':'" + C + "'}";
            NS_MakeRequest(_URL, _data, NSD_MA_OnApplyCoupon);
        }
        else {
            bootbox.alert('Please specify the coupon code');
        }
    }
    return false;
}
function NSD_MA_OnApplyCoupon(d) {
    $("#NS_btnValidateCoupon").val("Validate");
    if (d == null) {
        bootbox.alert("Seems to be invalid coupon code or is expired. Please check the code");
        return false;
    }
    NS_IsCouponApplied = true;
    oUserInput.CouponCode = $("#NS_txtCoupon").val().trim();
    var DiscAmt = 0;
    var OrderAmt = parseFloat($("#lblSubTotal").text());
    if (d.DiscountType == "$") {
        DiscAmt = d.Discount;
    }
    if (d.DiscountType == "%") {
        DiscAmt = (OrderAmt * parseFloat(d.Discount)) / 100;
    }
    $("#lblCDiscount").text(DiscAmt);
    var _total = OrderAmt - DiscAmt;
    oUserInput.Amount = _total;
    oUserInput.Discount = DiscAmt;
    $("#NSD_MA_lblOrderTotal").text(_total);
}
function NSD_MA_ReTotal() {
    var lstInputs = $(".NSOrderInput");
    var _total = 0;
    NS_Session = 0;
    $.each(lstInputs, function (i, o) {
        if ($(o).val().trim() == "") { $(o).val(1); }
        var id = o.id.split('_')[1];
        var _rate = $(o).attr('rate');
        var _subTotal = (parseInt($(o).val()) * _rate)
        $("#lblItemTotal_" + id).text(_subTotal);
        _total += _subTotal;
        if ($(o).attr('duration') != -1) {
            NS_Session += (parseInt($(o).val()) * $(o).attr('duration'));
        }
        else {
            NS_Session += (parseInt($(o).val()) * 60); // default is 60 min
        }
    });
    _total = _total - parseFloat($("#lblCDiscount").text()); // deduct the discount
    oUserInput.Amount = _total;
    $("#NSD_MA_lblOrderTotal").text(_total);

    $("#NSD_MA_lblTotalServiceSession").text(NS_Session + ' minutes');
}
function NS_RemoveItem(o, e) {
    $(o).parent().parent().remove();
    NSD_MA_ReTotal();
}
function CheckMyPaymentProfile() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetCustomerProfile";
    var _data = "{'UID':'" + NS_MA_ClientID + "'}";
    NS_MakeRequest(_URL, _data, CheckMyPaymentProfile_SuCB);
}
function CheckMyPaymentProfile_SuCB(d) {
    if (d != null) {
        if (d.profile != null) {
            if (d.profile.paymentProfiles != null) {
                NSD_MA_CPayProfile = d;
            }
            else {
                NSD_MA_CPayProfile = "";
            }
        }
        else {
            NSD_MA_CPayProfile = "";
        }
    }
    else {
        NSD_MA_CPayProfile = "";
    }
}
function NS_MA_CalTotalSession() {
    var lstInputs = $(".NSOrderInput")
    NS_Session = 0;
    $.each(lstInputs, function (v, i) {
        var oSession = $(i).attr('duration');
        if (oSession != -1) {
            NS_Session += (parseInt(oSession) * parseInt($(i).val().trim()));
        }
        else {
            NS_Session += (60 * parseInt($(i).val().trim()));
        }
    });
}
function NSD_MA_ShowCalendar(e) {
    if (NS_MA_IsSoonest) {
        $("#dvOrderSummary").removeClass("NS_On").addClass("NS_Off");
        NSD_MA_ShowPaymentMethod();
        return false;
    }
    var lstInputs = $(".NSOrderInput")
    NS_Session = 0;
    $.each(lstInputs, function (v, i) {
        if ($(i).val().trim() == '') {
            bootbox.alert('Please specify the quantity');
            $(i).focus();
            return false
        }
        var oSession = $(i).attr('duration');
        if (oSession != -1) {
            NS_Session += (parseInt(oSession) * parseInt($(i).val().trim()));
        }
    });
    $("#dvOrderSummary").removeClass("NS_On").addClass("NS_Off");
    $("#dvTimeSlot").addClass("NS_On").removeClass('NS_Off');
    $("#NS_TopBarlblHeader").text("Appointment Date & Time");
    $('#NS_dvCaldendar').fullCalendar({
        header: { left: 'prev,next today', center: 'title', right: '' },
        defaultView: 'month', selectable: true,
        defaultDate: (new Date()),
        events: function (start, end, timezone, callback) {
            //  start = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate());
            // start = NS_FormatDate(start, 'mm/dd/yy');
            //  end = new Date(end._d.getFullYear(), end._d.getMonth(), end._d.getDate());
            // end = NS_FormatDate(end, 'mm/dd/yy');
            NS_GetProOccupiedSlots(start, end, timezone, callback);
        },
        selectHelper: true,
        select: function (start, end, a, b, c) {
            var today = new Date();
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            var check = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate() + 1);
            if (check < today) {
                bootbox.alert('Sorry, you cannot select date before today');
                return false;
            }
            var _m = moment();
            var _IsToday = (_m.format("DD-MM-YYYY") == start._d.format('dd-MM-yyyy'));
            var SliderStartHours = 00;
            var SliderStartMinutes = 00;
            var SliderEndHours = 23;
            var SliderEndMinutes = 45;
            if (_IsToday) {
                var _afterDate = _m.add(NS_Session, 'minutes');
                var _MaxDate = new Date(_m._d.getFullYear(), _m._d.getMonth(), _m._d.getDate(), SliderEndHours, SliderEndMinutes);
                if (_afterDate > _MaxDate) {
                  //  SliderEndHours = _afterDate.hours() + 1;
                   // SliderEndMinutes = _afterDate.minutes();
                }
                var _t = new Date();
                SliderStartHours = (_t.getHours() + 1);
                SliderStartMinutes = (_t.getMinutes());
                if (SliderStartMinutes < 15) {
                    SliderStartMinutes = 15;
                }
                if (SliderStartMinutes > 15 && SliderStartMinutes < 30) {
                    SliderStartMinutes = 30;
                }
                if (SliderStartMinutes > 30 && SliderStartMinutes < 45) {
                    SliderStartMinutes = 45;
                }
                if (SliderStartMinutes > 45) {
                    SliderStartMinutes = 00;
                    SliderStartHours++;
                }
            }
            // start = NS_FormatDate(Date.parse(start), 'mm/dd/yy HH:MM');
            //  end = NS_FormatDate(Date.parse(end), 'mm/dd/yy HH:MM');
            startTimeRange = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate() + 1, SliderStartHours, SliderStartMinutes);
            endTimeRange = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate() + 1, SliderEndHours, SliderEndMinutes);
            TimePostFix = "";
            var tempH = "";
            var finalH = "";
            var tempM = NS_Session;
            var tempVal = (NS_Session / 60);
            if (NS_Session < 60) {
                tempH = 9;
                tempM = NS_Session;
                finalH = tempH;
            }
            else {
                var tempH = parseInt(tempVal);
                var tempM = tempVal - tempH;
                finalH = 9 + tempH;
            }
            var _Title = NS_FormatDate(Date.parse(check), 'mm/dd/yy');
            $("#lblSlotDate").text(_Title);
            $("#lblServiceSession").text(NS_Session + ' minute(s)');
            var defaultEnd = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate(), finalH, tempM);
            NS_MA_IsSlotAvailable = false;
            $("#imgAvail").hide();
            $("#lblAvail").hide();
            var dialog = $("#NS_dvSliderOuter").dialog({
                autoOpen: true, height: 450, width: 900, modal: true,
                title: 'Choose your time slot',
                buttons: {
                    "Ok": SaveTimeSlot,
                    Cancel: function () {
                        dialog.dialog("close");
                        $("#NS_dvTimeSlider").dateRangeSlider("destroy");
                    }
                },
                close: function () {
                    dialog.dialog("close");
                    $("#NS_dvTimeSlider").dateRangeSlider("destroy");
                }
            })
            $("#NS_dvTimeSlider").dateRangeSlider({
                arrows: false, symmetricPositionning: true,
                bounds: { min: startTimeRange, max: endTimeRange },
                defaultValues: { min: startTimeRange, max: defaultEnd },
                range: { min: { minutes: NS_Session }, max: { minutes: NS_Session } },
                step: { minutes: 15 },
                formatter: function (value) {
                    return GetInAmPm(value); //"" + (hour) + ":" + (minute < 10 ? "0" + minute : minute);// +ampm;
                },
            }).bind("valuesChanged", function (e, data) {
                finalMin = GetInAmPm(data.values.min); // "" + (minHour) + ":" + (minMinutes < 10 ? "0" + minMinutes : minMinutes),
                finalMax = GetInAmPm(data.values.max) //"" + (maxHour) + ":" + (maxMinutes < 10 ? "0" + maxMinutes : maxMinutes);
                $("#NS_lblStartHour").text(finalMin);
                $("#NS_lblEndHour").text(finalMax);
                var _S = $("#lblSlotDate").text() + ' ' + finalMin;
                var _E = $("#lblSlotDate").text() + ' ' + finalMax;
                if (!NS_MA_IsEditMode)
                    NS_IsProviderSlotFree(_S, _E);
                else {
                    NS_IsProviderSlotFreeEM(_S, _E, NS_MA_AppointmentObj.AppointmentID);
                }
            });
            $('#NS_dvCaldendar').fullCalendar('unselect');
        },
        eventClick: function (calEvent, jsEvent, view, a, b, c) { },
        dayClick: function (calEvent, jsEvent, view, a, b, c) { },
        editable: true,
        slotEventOverlap: false,
        eventLimit: true, // allow "more" link when too many events
        views: {
            agenda: {
                eventLimit: 3 // adjust to 6 only for agendaWeek/agendaDay
            }
        }
    })
}

function SaveTimeSlot() {
    if (NS_MA_IsSlotAvailable) {
        var _str = 'You have selected ' + $("#NS_lblStartHour").text() + ' to ' + $("#NS_lblEndHour").text() + ' on ' + $("#lblSlotDate").text() + "<br>Continue with this ?";
        bootbox.confirm(_str, function (r) {
            if (r == true) {
                var oTimeSlot = '{"TimeSlot":[{"dated":"' + $("#lblSlotDate").text() + '","start":"' + $("#NS_lblStartHour").text() + '","end":"' + $("#NS_lblEndHour").text() + '"}]}';
                $.cookie('NS_TimeSlot', oTimeSlot);
                $("#NS_dvSliderOuter").dialog("close");
                NSD_MA_ShowPaymentMethod();
            }
        })
    }
    else {
        bootbox.alert('Sorry the chosen slot is not available. Please try other time slot');
        return false;
    }
}
function NSD_MA_ShowPaymentMethod() {
    // Check if payment profile exist then show Payment Method step to let the user select their credit card from the list
    if (NSD_MA_CPayProfile != "") {
        $("#NS_TopBarlblHeader").text("Payment Method");
        $("#dvTimeSlot").removeClass("NS_On").addClass("NS_Off");
        $("#dvPaymentMethod").setTemplateURL('/DesktopModules/NS_MakeAppointment/template/tmpPaymentMethod.htm?q=' + $.now());
        $("#dvPaymentMethod").addClass("NS_On").removeClass('NS_Off').processTemplate("");
        // Bind Credit Card list
        $("#dvUserCards").setTemplateURL('/DesktopModules/NS_MakeAppointment/template/tmpUserCards.htm?q=' + $.now());
        $("#dvUserCards").processTemplate(NSD_MA_CPayProfile.profile.paymentProfiles);
    }
    else {//if no payment profile, then skip this payment method step and go straight to Credit Card Section
        NSD_MA_ShowCreditCard();
    }
}
function NSD_MA_ShowCreditCard(e) {
    NSD_MA_SelectedProfileID = $("input[name='rblUserCard']:checked").val();
    var rblSelecteID = $("input[name='rblUserCard']:checked").attr('id');
    var rblSelectedText = $("label[for='" + rblSelecteID + "']").text()
    var oOther = JSON.parse($.cookie('NS_Other'));
    // oOther.other[0].OrderTotal = oUserInput.Amount
    $("#dvPaymentMethod").addClass("NS_Off").removeClass('NS_On');
    if (NSD_MA_SelectedProfileID != "0" && NSD_MA_SelectedProfileID != undefined) {
        bootbox.confirm('<div class="ccharge"> <p><i class="fa fa-info-circle fa-3x"></i> </p>' + 'Your card ending in <strong>' + rblSelectedText + '</strong> will be charged for <span class="camo">$' + oOther.other[0].OrderTotal + ' USD</span> after the appointment is completed.<br/>If cancelled within 12 hours of the set appointment time, you will be charged $25.' + '</div>',
            function (r) {
                if (r) {
                    if (NSD_MA_SelectedProfileID != '0') {
                        oUserInput.CPPID = NSD_MA_SelectedProfileID;
                        NS_MA_SaveAppointment();
                        // Now we dont need to authorize the profile while scheduling the appointment, just save the payment profile id with Order and charge it later on
                        //_URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/AuthProfile";
                        //string PID, string PPID, decimal amount
                        //_data = "{'PID':'" + NSD_MA_CPayProfile.profile.customerProfileId + "','PPID':'" + NSD_MA_SelectedProfileID + "','amount':'" + oUserInput.Amount + "'}";
                        // NS_MakeRequest(_URL, _data, NS_ChargeMyCard_SuCB);
                    }
                }
                else {
                    $("#dvPaymentMethod").addClass("NS_On").removeClass('NS_Off');
                }
            });
    }
    else {
        $("#NS_TopBarlblHeader").text("Payment Information");
        var oOther = JSON.parse($.cookie('NS_Other'));
        $("#dvTimeSlot").removeClass("NS_On").addClass("NS_Off");
        $("#dvCreditCard").setTemplateURL('/DesktopModules/NS_MakeAppointment/template/tmpCreditCard.htm?q=' + $.now());
        $("#dvCreditCard").addClass("NS_On").removeClass('NS_Off').processTemplate("");
        $("#NS_txtCCCardNumber").mask('0000000000000000');
        $("#NS_txtCCCVV").mask('0000');
        $("#NS_txtCCZip").mask('00000');
        $("#NS_txtCCPhone").mask('0000000000');
        $("#NS_MACC_lblOrderTotal").text(oUserInput.Amount);
        $("#dvOrderSummary").addClass("NS_Off").removeClass('NS_On');

        $("#dvNewCardInfo").addClass("NS_On").removeClass('NS_Off');;
        $("#dvProfilePayment").addClass("NS_Off").removeClass('NS_On');
        $("#lblProfileInfo").text('');
    }
}
function NS_MA_SaveAppointment() {
    var oAddress = JSON.parse($.cookie('NS_UserAddress'));
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/AddAddress";
    //string street,string city,string state,string zip
    var _data = "{'street':'" + oAddress.Address[0].Street + "','city':'" + oAddress.Address[0].City + "','state':'" + oAddress.Address[0].State + "','zip':'" + oAddress.Address[0].Zip + "'}";
    NS_MakeRequest(_URL, _data, NS_AddAddress_SuCB);
}
function NS_AddAddress_SuCB(d) {
    if (NS_MA_ClientID == -1) { return false; }
    var EditAppID = 0;
    if (NS_MA_IsEditMode) {
        EditAppID = NS_MA_AppointmentObj.AppointmentID;
        if ($("#btnAppUpdate").text() == 'Update') {
            NS_UpdateAppBasicInfo(d);
            return false;
        }
    }
    var oOther = JSON.parse($.cookie('NS_Other'));
    var oService = JSON.parse($.cookie('NS_UserServices'));
    var oTimeSlot = JSON.parse($.cookie('NS_TimeSlot'));
    var CSVService = "";
    for (var i = 0; i < oService.services.length; i++) {
        var qty = $("#txtOrderQty_" + oService.services[i].ID).val();
        CSVService += oService.services[i].ID + ":" + qty + ":" + oService.services[i].price + ((i == oService.services[i].length - 1) ? '' : '|');
    }
    var _Comment = $("#txtComment").val();

    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/MakeAppointment";
    var _data = '';
    if (!NS_MA_IsSoonest)
        _data = "{'ClientID':'" + NS_MA_ClientID + "','ProviderID':'" + NSD_MA_CurrentPro.split(":")[0] + "','AddressID':'" + d + "','ForDate':'" + oTimeSlot.TimeSlot[0].dated + "','AtTime':'" + oTimeSlot.TimeSlot[0].start + "','EndTime':'" + oTimeSlot.TimeSlot[0].end + "','CSVSRVC':'" + CSVService + "','PayTxnID':'" + oUserInput.PayTxnID + "','CCNumber':'" + oUserInput.CardNumber + "','Expriry':'" + oUserInput.Expiry + "','Comment':'" + _Comment + "','PayProfileID':'" + oUserInput.CPPID + "','EditAppID':'" + EditAppID + "','Discount':'" + oUserInput.Discount + "'}";
    else {
        _data = "{'ClientID':'" + NS_MA_ClientID + "','ProviderID':'" + NSD_MA_CurrentPro.split(":")[0] + "','AddressID':'" + d + "','ForDate':'','AtTime':'','EndTime':'','CSVSRVC':'" + CSVService + "','PayTxnID':'" + oUserInput.PayTxnID + "','CCNumber':'" + oUserInput.CardNumber + "','Expriry':'" + oUserInput.Expiry + "','Comment':'" + _Comment + "','PayProfileID':'" + oUserInput.CPPID + "','EditAppID':'" + EditAppID + "','Discount':'" + oUserInput.Discount + "'}";
    }
    NS_MakeRequest(_URL, _data, NS_AddAppointment_SuCB);
}
function NS_AddAppointment_SuCB(d) {
    bootbox.hideAll();
    $.cookie('NS_UserServices', null);
    $.cookie('NS_UserAddress', null);
    $.cookie('NS_Other', null);
    $.cookie('NSD_CurrentUser', null);

    var _URL = "/DesktopModules/NS_ServiceDashboard/rh.asmx/UpdateCouponCount";
    var _data = "{'Code':'" + oUserInput.CouponCode + "'}";
    NS_MakeRequest(_URL, _data, function () {
        setTimeout(function () {
            bootbox.alert('<div class="center"><h4 class="center"><i class="fa fa-check-circle fa-3x"></i> </h4> Your Appointment has been requested, waiting on provider reply. </div>', function () {
                window.location = NS_MyScheduleTab;
            });
        }, 1000);
    });
}
function NS_UpdateAppBasicInfo(d) {
    //int AppID,int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string Comment
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppBasicInfo";
    var _data = "{'ClientID':'" + NS_MA_AppointmentObj.ClientID + "','ProviderID':'" + NS_MA_AppointmentObj.ProviderID + "','AddressID':'" + d + "','ForDate':'" + $("#txtOrderDate").val() + "','AtTime':'" + $("#txtOrderTime").val() + "','Comment':'" + $("#txtComment").val() + "','AppID':'" + NS_MA_AppointmentObj.AppointmentID + "','EndTime':'" + NS_MA_AppointmentObj.EndTime + "'}";
    NS_MakeRequest(_URL, _data, NS_UpdateAppBasicInfo_SuCB);
}
function NS_UpdateAppBasicInfo_SuCB() {
    bootbox.alert('<div class="center"><h4 class="center"><i class="fa fa-check-circle fa-3x"></i> </h4>Thank you, your appointment has been updated! </div>', function () {
        window.location = NS_MyScheduleTab;
    })
}
function NS_UserInputs() {
    this.NameOnCard = '';
    this.CardNumber = '';
    this.CardType = '';
    this.Expiry = '';
    this.Amount = 0;
    this.Discount = 0;
    this.CVV = '';
    this.PayTxnID = '';
    this.oAuthTxnID = '';
    this.CPPID = ''; // Payment Profile Id
    this.CPID = ''; // Customer Profile ID
    // CC Address Profile
    this.Address = "";
    this.City = "";
    this.State = "";
    this.zip = "";
    this.Phone = "";
    this.BillingSame = true;
    this.CouponCode = '';
}
var oUserInput = new NS_UserInputs();

function NS_VerifyCardInput() {
    if (NSD_MA_SelectedProfileID == "0" || NSD_MA_SelectedProfileID == undefined) {
        oUserInput.NameOnCard = $("#NS_txtCCUserName").val().trim();
        oUserInput.CardNumber = $("#NS_txtCCCardNumber").val().trim();
        oUserInput.CardType = $("input:radio[name=radioInline]:checked").val();
        oUserInput.Expiry = $("#ddlCCMonth").val() + "/" + $("#ddlCCYear").val();
        oUserInput.CVV = $("#NS_txtCCCVV").val().trim();
        var IsAccepted = $("#NS_chkAccept").is(":checked");
        if (oUserInput.NameOnCard.length == 0) {
            bootbox.alert('Please specify Name on Card'); return false;
        }
        var _CCExpression = /^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
        if (!_CCExpression.test(oUserInput.CardNumber)) {
            bootbox.alert('Credit card seems to be invalid, please specify a valid card number'); return false;
        }
        //if (oUserInput.CardNumber < 16) { bootbox.alert('Please specify Card Number'); return false; }
        if (oUserInput.CardType == undefined) { bootbox.alert('Please select your Card Type'); return false; }
        if (oUserInput.CVV.length < 3) {
            bootbox.alert('Please specify Card CVV number provided at back of the card'); return false;
        }
        if (!$("#chkBilling").is(":checked")) {
            oUserInput.BillingSame = false;
            oUserInput.Address = $("#NS_txtCCAddress").val().trim();
            if (oUserInput.Address == "") {
                bootbox.alert("Please specify the address for credit card", function () {
                    $("#NS_txtCCAddress").focus();
                });
                return false;
            }
            oUserInput.City = $("#NS_txtCCCity").val().trim();
            if (oUserInput.City == "") {
                bootbox.alert("Please specify the City for credit card", function () {
                    $("#NS_txtCCCity").focus();
                });
                return false;
            }
            oUserInput.State = $("#NS_txtCCState").val().trim();
            if (oUserInput.State == "") {
                bootbox.alert("Please specify the State for credit card", function () {
                    $("#NS_txtCCState").focus();
                });
                return false;
            }
            oUserInput.zip = $("#NS_txtCCZip").val().trim();
            if (oUserInput.zip == "") {
                bootbox.alert("Please specify the Zip for credit card", function () {
                    $("#NS_txtCCZip").focus();
                });
                return false;
            }
            oUserInput.Phone = $("#NS_txtCCPhone").val().trim();
            if (oUserInput.Phone == "") {
                bootbox.alert("Please specify the Phone for credit card", function () {
                    $("#NS_txtCCPhone").focus();
                });
                return false;
            }
        }
        else {
            oUserInput.BillingSame = true; // billing address same as specified in profile
            oUserInput.Address = NS_MA_LoggedUser.Profile.Street;
            oUserInput.City = NS_MA_LoggedUser.Profile.City;
            oUserInput.state = NS_MA_LoggedUser.Profile.Region;
            oUserInput.zip = NS_MA_LoggedUser.Profile.PostalCode;
            oUserInput.Phone = NS_MA_LoggedUser.Profile.Cell;
        }
        if (!IsAccepted) {
            bootbox.alert('Please tick the Payment terms as your acceptance');
            return false;
        }
    }
    else if (NSD_MA_SelectedProfileID != "0") {
        var IsAccepted = $("#NS_chkAccept").is(":checked");
        if (!IsAccepted) {
            bootbox.alert('Please tick the Payment terms as your acceptance');
            return false;
        }
    }

    return true;
}
function NS_ChargeMyCard(o, e) {
    if ($('#NS_btnPayNow').text() == 'Pay Now') {
        if (NS_VerifyCardInput()) {
            // if (!NS_MA_IsEditMode) {
            // If not in edit mode, then go ahead and authorize the card or profile
            var _Content = ' <h4 class="center"><i class="fa fa-question-circle fa-3x"></i> </h4> <div class="modal-cpbody center"><p>Confirm Payment of</p><div class="finfo">' + oUserInput.Amount + '<span class="usd">&nbsp;USD</span></div><p>To book this appointment?</p> </div>';
            bootbox.confirm(_Content, function (result) {
                if (result) {
                    $(o).text('Please wait...').attr('disabled', 'disabled');
                    // 13th Feb 2017
                    /* now, the crd wont be authorize but we will create payment profile and save it with appointment info
                     and when provider completes the appointment, we will charge that payment profile.*/
                    CreateCCProfile(); //this method itself will call NS_MA_SaveAppointment 
                    //return false; // D O N T  P R O C E S S T H E  F O L L O W I N G  L I N E S
                    // var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ChargeCard";
                    //var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/AuthCard";
                    ////string CCNumber, string Expiry, string CardCode, decimal amount
                    //var _data = "{'CCNumber':'" + oUserInput.CardNumber + "','Expiry':'" + oUserInput.Expiry + "','CardCode':'" + oUserInput.CVV + "','amount':'" + oUserInput.Amount + "'}";
                    //if (NSD_MA_SelectedProfileID != '0' && NSD_MA_SelectedProfileID != undefined) {
                    //    // _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ChargeProfile";
                    //    _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/AuthProfile";
                    //    //string PID, string PPID, decimal amount
                    //    _data = "{'PID':'" + NSD_MA_CPayProfile.profile.customerProfileId + "','PPID':'" + NSD_MA_SelectedProfileID + "','amount':'" + oUserInput.Amount + "'}";
                    //}
                    //_URL = _HTTPS + _URL;
                    //NS_MakeRequest(_URL, _data, NS_ChargeMyCard_SuCB);
                }
            });
        }
    }
}
function NS_ChargeMyCard_SuCB(d) {
    if (d.transactionResponse.errors == null) {
        if (d.transactionResponse.responseCode == 1) {
            oUserInput.PayTxnID = "";//d.transactionResponse.transId;
            oUserInput.oAuthTxnID = d.transactionResponse.transId;
            if ($("#NS_chkSaveToProfile").is(":checked")) {
                CreateCCProfile(); //this method itself will call NS_MA_SaveAppointment 
            }
            else {
                NS_MA_SaveAppointment();
            }
        }
        else {
            $("#NS_btnPayNow").text('Pay Now');
            bootbox.alert("Sorry, the transaction was NOT successfull cause of the following reason <br/><br/>" + d.messages.message[0].text);
        }
    }
    else {
        $("#NS_btnPayNow").text('Pay Now');
        bootbox.alert("Sorry, the transaction was NOT successfull cause of the following reason <br/><br/>" + d.transactionResponse.errors[0].errorText);
        if (!$("#dvNewCardInfo").is(":visible")) {
            $("#dvPaymentMethod").addClass("NS_On").removeClass('NS_Off');
        }
        return false
    }
}
function NS_IsProviderSlotFree(s, e) {
    $("#imgAvail").attr('src', '/images/dnnanim.gif').show()
    $("#lblAvail").text("Evaluating...");
    //int AppID,int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string Comment
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/IsProviderSlotFree";
    //int ProID, string StartDateTime, string EndDateTime
    //time format : "09/07/2016 9:35
    var _data = "{'ProID':'" + NSD_MA_CurrentPro.split(":")[0] + "','StartDateTime':'" + s + "','EndDateTime':'" + e + "'}";
    NS_MakeRequest(_URL, _data, NS_IsProviderSlotFree_SuCB);
}
function NS_IsProviderSlotFreeEM(s, e, AppID) {
    $("#imgAvail").attr('src', '/images/dnnanim.gif').show()
    $("#lblAvail").text("Evaluating...").show();
    //int AppID,int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string Comment
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/IsProviderSlotFreeEM";
    //int ProID, string StartDateTime, string EndDateTime
    //time format : "09/07/2016 9:35
    var _data = "{'ProID':'" + NSD_MA_CurrentPro.split(":")[0] + "','StartDateTime':'" + s + "','EndDateTime':'" + e + "','AppID':'" + AppID + "'}";
    NS_MakeRequest(_URL, _data, NS_IsProviderSlotFree_SuCB);
}
function NS_IsProviderSlotFree_SuCB(d) {
    NS_MA_IsSlotAvailable = d;
    if (d == true) {
        $("#imgAvail").attr('src', '/DesktopModules/NS_MakeAppointment/Images/Site/tsgrant.png').show();
        $("#lblAvail").html("<span class='ava'>This slot is available</div>").show();
    }
    else {
        $("#imgAvail").attr('src', '/DesktopModules/NS_MakeAppointment/Images/Site/tserror.png').show()
        $("#lblAvail").html("<span class='err'>Sorry,This slot is not free</div>").show();
    }
}
function NS_GetProOccupiedSlots(start, end, timezone, callback) {
    var fStart = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate() + 1);
    fStart = NS_FormatDate(start, 'mm/dd/yy');
    var fEnd = new Date(end._d.getFullYear(), end._d.getMonth(), end._d.getDate() + 1);
    fEnd = NS_FormatDate(end, 'mm/dd/yy');
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetProOccupiedSlots";
    var _data = "{'a':'" + NSD_MA_CurrentPro.split(":")[0] + "','b':'" + fStart + "','c':'" + fEnd + "'}";
    var events = [];
    NS_MakeRequest(_URL, _data, function (d) {
        var _Today = new Date();
        var strToday = ((_Today.getMonth() + 1) < 10 ? '0' : '') + (_Today.getMonth() + 1) + "/" + ((_Today.getDate() < 10) ? '0' : '') + _Today.getDate() + "/" + _Today.getFullYear();
        $.each(d, function (i, o) {
            if (o.ForDate >= strToday) {
                var _AtTime = ApplyAmPm(o.AtTime);
                var _EndTime = ApplyAmPm(o.EndTime);
                events.push({ title: _AtTime + ' - ' + _EndTime, start: o.ForDate + ' ' + _AtTime, end: o.ForDate + ' ' + _EndTime, color: '#1e319b', textColor: 'white' });
            }
        });
        var _URL2 = "/DesktopModules/NS_ManageScheduledServices/rh.asmx/ListMyAvail";
        var _data2 = "{'ProID':'" + NSD_MA_CurrentPro.split(":")[0] + "'}";
        // get List of time-slot available
        NS_MakeRequest(_URL2, _data2, function (d) {
            var TodaysEvent = [];
            var now = new Date();
            var lstDays = [];
            // first create the array of dates from today's to end date on calendar
            for (var i = _Today ; i <= end; i.setDate(i.getDate() + 1)) {
                lstDays.push(new Date(i));
            }
            // now iterate through each date and see the data for each date
            $.each(lstDays, function (i, oDay) {// Loop all the days from start to end
                var lstCurrDay = [];
                // Make another array of all the start-end time to loop through it
                for (var j = 0; j < d.length; j++) {
                    if (NS_FormatJSONDate(d[j].Date, 'mm/dd/yy') == getLocaleShortDateString(oDay)) {
                        lstCurrDay.push(d[j]);
                    }
                }
                // Now iterate through all the times the Provider is not available
                for (var x = 0; x < lstCurrDay.length; x++) {
                    var _tempDate = NS_FormatJSONDate(lstCurrDay[x].Date, 'mm/dd/yy');
                    var _tempStart = NS_ParseDateStr(lstCurrDay[x].EndTime.Hours, lstCurrDay[x].EndTime.Minutes);
                    if (x < lstCurrDay.length - 1) {
                        // if the current loop is not on last entry , 
                        // then Not-Available slots will be start time from current loop and end time from next item in the loop
                        var _tempEnd = NS_ParseDateStr(lstCurrDay[x + 1].StartTime.Hours, lstCurrDay[x + 1].StartTime.Minutes);
                    }
                    else {// if the current loop is on last entry...then have to get the start time of the first entry
                        var _tempEnd = NS_ParseDateStr(lstCurrDay[0].StartTime.Hours, lstCurrDay[0].StartTime.Minutes);
                    }
                    events.push({ title: _tempStart + ' - ' + _tempEnd, start: _tempDate + ' ' + _tempStart, end: _tempDate + ' ' + _tempEnd, color: '#ff0000', textColor: 'white' });
                }
            });
            callback(events);
        });
    });
}

function CreateCCProfile() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetCustomerProfile";
    var _data = "{'UID':'" + NS_MA_ClientID + "'}";
    NSD_MA_CPayProfile = '';
    NS_MakeRequest(_URL, _data, function (d) {
        var CCName = $("#NS_txtCCUserName").val().trim();
        var CCNumber = $("#NS_txtCCCardNumber").val().trim();
        var CVV = $("#NS_txtCCCVV").val().trim();
        var Expiry = $("#ddlCCMonth").val() + "/" + $("#ddlCCYear").val();
        if ((d != null) && (d.profile != null)) {
            NSD_MA_CPayProfile = d;
            //string PID, string CCNumber, string Expiry, string CVV  
            var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/CreateCustomerPaymentProfile";
            var _data = "{'UID':'" + NS_MA_LoggedUser.UserID + "','PID':'" + NSD_MA_CPayProfile.profile.customerProfileId + "','CCNumber':'" + CCNumber + "','Expiry':'" + Expiry + "','CVV':'" + CVV + "','name':'" + oUserInput.NameOnCard + "','adrs':'" + oUserInput.Address + "','city':'" + oUserInput.City + "','state':'" + oUserInput.State + "','zip':'" + oUserInput.zip + "','phone':'" + oUserInput.Phone + "'}";
            NS_MakeRequest(_URL, _data, function (r) {
                if ((r.messages.message[0].code == 'E00039') || (r.messages.message[0].code == 'I00001')) {
                    oUserInput.CPPID = r.customerPaymentProfileId;
                    NS_MA_SaveAppointment();
                }
                else { // inform user that you have given wrong credit card detail
                    $("#NS_btnPayNow").text('Pay Now');
                    bootbox.alert("Sorry, the transaction was NOT successfull cause of the following reason <br/><br/>" + r.messages.message[0].text);
                }
            });
        }
        else {
            if (NSD_MA_CPayProfile == '') {
                var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/CreateCustomerProfile";
                var _data = "{'UID':'" + NS_MA_LoggedUser.UserID + "','CCNumber':'" + CCNumber + "','Expiry':'" + Expiry + "','CVV':'" + CVV + "','Email':'" + NS_MA_LoggedUser.Email + "','name':'" + oUserInput.NameOnCard + "','adrs':'" + oUserInput.Address + "','city':'" + oUserInput.City + "','state':'" + oUserInput.State + "','zip':'" + oUserInput.zip + "','phone':'" + oUserInput.Phone + "'}";
                NS_MakeRequest(_URL, _data, function (d) {
                    if (d.messages.message[0].code == 'E00039') {// Profile with card information already exists DUPLICATE entry Case
                        oUserInput.CPID = d.messages.message[0].text.split(" ")[5];
                        oUserInput.CPPID = d.messages.message[0].text.split(" ")[8];
                        NS_MA_SaveAppointment();
                    }
                    else if (d.messages.message[0].code == 'I00001') { // successfully created
                        oUserInput.CPPID = d.messages.message[0].text.split(' ')[1];
                        oUserInput.CPID = d.customerProfileId;
                        NS_MA_SaveAppointment(); // save the detail
                    }
                    else { // inform user that you have given wrong credit card detail
                        $("#NS_btnPayNow").text('Pay Now');
                        bootbox.alert("Sorry, the transaction was NOT successfull cause of the following reason <br/><br/>" + d.messages.message[0].text);
                    }
                });
            }
        }
    });
}

function NS_GoBack(e) {
    //e.preventDefaut();
    if ($("#dvCreditCard").is(":visible")) {
        $(".NS_On").removeClass('NS_On').addClass('NS_Off');
        $("#dvOrderSummary").addClass("NS_On").removeClass('NS_Off');
        $("#NS_TopBarlblHeader").text($("#dvOrderSummary").attr('title'));
        return false;
    }
    if ($("#dvPaymentMethod").is(":visible")) {
        $(".NS_On").removeClass('NS_On').addClass('NS_Off');
        $("#dvOrderSummary").addClass("NS_On").removeClass('NS_Off');
        $("#NS_TopBarlblHeader").text($("#dvOrderSummary").attr('title'));
        return false;
    }
    if ($("#dvOrderSummary").is(":visible")) {
        $(".NS_On").removeClass('NS_On').addClass('NS_Off');
        $("#dvMakeAppointment").addClass("NS_On").removeClass('NS_Off');
        $("#NS_TopBarlblHeader").text($("#dvMakeAppointment").attr('title'));
        return false;
    }
    if ($("#dvTimeSlot").is(":visible")) {
        $(".NS_On").removeClass('NS_On').addClass('NS_Off');
        $("#dvOrderSummary").addClass("NS_On").removeClass("NS_Off");
        $("#NS_TopBarlblHeader").text($("#dvOrderSummary").attr('title'));
        return false;
    }
}
function ShowProID() {
    $.cookie('NSProID', NSD_MA_CurrentPro.split(":")[0]);
    window.open(NSR_DashboardTab, '_blank');
}

function GotoMyProfile() {
    window.open(NSR_MyProfile, '_blank');
}
$(window).unload(function () {
    // Remove the cookie
    $.cookie("NS_MA_IsEditMode", null);
    $.cookie('NSD_Soonest', null);
    $.cookie('NS_MA_EditAID', null);
});

function HandleCCAddresUI(oChk) {
    var dv = $("#NS_dvCCAddress");
    if (!$("#chkBilling").is(":checked")) {
        $("#NS_dvCCAddress input[type='text']").prop("disabled", false)
    }
    else {
        $("#NS_dvCCAddress input[type='text']").val('');
        $("#NS_dvCCAddress input[type='text']").prop("disabled", true)
    }
}