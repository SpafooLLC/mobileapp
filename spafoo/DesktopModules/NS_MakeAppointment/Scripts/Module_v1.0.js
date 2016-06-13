var NSD_MA_CurrentPro = "";
var NSD_MA_CPayProfile = "";
var NSD_MA_SelectedProfileID = "0";
var NS_MA_LoggedUser = "";
$(document).ready(function () {
    NSD_MA_CurrentPro = $.cookie('NSD_CurrentUser');// this cookie is created when user comes through service dashboard module
    if (NS_MA_ClientID == -1) {
        bootbox.alert("You need to log in, to access this area");
         return false;
    }
    if (NSD_MA_CurrentPro == null) {
        bootbox.alert('Invalid Session Found')
        return false;
    }
    $("#NS_lblProName").text(NSD_MA_CurrentPro.split(":")[1]);
    $('#NS_MA_SelectAddress').selectpicker();
    NSD_GetProviderServices(NSD_MA_CurrentPro.split(":")[0]);
    GetProfileAddress(NS_MA_ClientID);
    CheckMyPaymentProfile();
});
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
                    _restaddress += aryAddr[i]+", ";
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
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetUser";
    $("#NS_MA_txtAddress").val('Just a min...');
    var _data = "{'UID':'" + UID + "'}";
    NSR_MA_MakeRequest(_URL, _data, NS_GetProfileAddress_SuCB);
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
    NSR_MA_MakeRequest(_URL, _data, NSD_GetProviderServices_SuCB);
}
function NSD_GetProviderServices_SuCB(d) {
    if (d.length > 0) {
        $("#dvProviderServices").setTemplateURL('/DesktopModules/NS_MakeAppointment/template/tmpProviderServcies.htm?q=' + $.now());
        $("#dvProviderServices").show().processTemplate(d);;
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
    var state = $("#NS_MA_txtState").val().trim();
    if (state == '') { bootbox.alert('Please specify state'); return false; }
    var zip = $("#NS_MA_txtZip").val().trim();
    if (zip == '') { bootbox.alert('Please specify zip/postal code'); return false; }

    var ordDate = $("#txtOrderDate").val().trim();
    var ordTime = $("#txtOrderTime").val().trim();
    if (ordDate == '') { bootbox.alert('Please select Date of Appointment'); return false; }
    if (isNaN(Date.parse(ordDate))) { bootbox.alert('Please specify a valid Date of Appointment'); return false; }
    if (ordTime == '') { bootbox.alert('Please select Time of Appointment'); return false; }
    if (ValidateTime(ordTime) == false) { bootbox.alert('Please specify a valid Time of Appointment'); return false; }
    return true;
}
function NSD_MA_SaveNOrderSummary(e) {
    if (ValidateformInput()) {
        $("#NS_TopBarlblHeader").text("Order Summary");
        var lstServices = $("#dvProviderServices input[type='checkbox']:checked");
        if (lstServices.length == 0) { bootbox.alert('Please select the Service(s) for Appointment'); return false; }
        var oAddress = '{"Address":[{"City":"' + $("#NS_MA_txtCity").val().trim() + '","State":"' + $("#NS_MA_txtState").val().trim() + '","Zip":"' + $("#NS_MA_txtZip").val().trim() + '","Street":"' + $("#NS_MA_txtAddress").val().trim() + '"}]}';
        var oServices = '{"services":[';
        var oTotalPrice = 0;
        $.each(lstServices, function (i, v) {
            var oPrice = $(v).attr('price');
            oTotalPrice = parseFloat(oPrice) + oTotalPrice;
            if (i < (lstServices.length - 1)) {
                oServices += '{"Qty":"1","ID":"' + v.id.split("_")[2] + '","name":"' + $(v).next().text() + '","price":"' + oPrice + '"},';
            }
            else {
                oServices += '{"Qty":"1","ID":"' + v.id.split("_")[2] + '","name":"' + $(v).next().text() + '","price":"' + oPrice + '"}';
            }
        });
        oServices += "]}";
        var UserLocation = $("#NS_MA_SelectAddress :selected").text()
        var oOther = '{"other":[{"OrderTotal":"' + oTotalPrice + '","UserLocation":"' + UserLocation + '","Date":"' + $("#txtOrderDate").val().trim() + '","Time":"' + $("#txtOrderTime").val().trim() + '","Comment":"' + $("#txtComment").val().trim() + '"}]}';
        $.cookie('NS_UserServices', oServices);
        $.cookie('NS_UserAddress', oAddress);

        $.cookie('NS_Other', oOther);
        NSD_MA_ShowOrderSummary();
    }
}
function NSD_MA_ShowOrderSummary() {
    $("#dvMakeAppointment").removeClass("NS_On").addClass("NS_Off");
    var oServices = JSON.parse($.cookie('NS_UserServices'));
    var oOther = JSON.parse($.cookie('NS_Other'));
    $("#dvOrderSummary").setTemplateURL('/DesktopModules/NS_MakeAppointment/template/tmpOrderSummary.htm?q=' + $.now());
    $("#dvOrderSummary").addClass("NS_On").removeClass('NS_Off').processTemplate(oServices.services);
    $("#NSD_MA_lblOrderDate").text(oOther.other[0].Date);
    $("#NSD_MA_lblOrderTime").text(oOther.other[0].Time);
    $("#NSD_MA_lblOrderTotal").text(oOther.other[0].OrderTotal);
    oUserInput.Amount = oOther.other[0].OrderTotal;
    $("#NSD_MA_lblUserLocation").text(oOther.other[0].UserLocation);
    $("#NSD_MA_lblProviderName").text(NSD_MA_CurrentPro.split(":")[1]);
}
function NSD_MA_ReTotal() {
    var lstInputs = $(".NSOrderInput");
    var _total = 0;
    $.each(lstInputs, function (i, o) {
        if ($(o).val().trim() == "") { $(o).val(1); }
            var id = o.id.split('_')[1];
            var _rate = $(o).attr('rate');
            var _subTotal = (parseInt($(o).val()) * _rate)
            $("#lblItemTotal_" + id).text(_subTotal);
            _total += _subTotal;
        
    });
    oUserInput.Amount = _total;
    $("#NSD_MA_lblOrderTotal").text(_total);
}
function NS_RemoveItem(o, e) {
    $(o).parent().parent().remove();
    NSD_MA_ReTotal();
}
function CheckMyPaymentProfile() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetCustomerProfile";
    var _data = "{'UID':'" + NS_MA_ClientID + "'}";
    NSR_MA_MakeRequest(_URL, _data, CheckMyPaymentProfile_SuCB);
}
function CheckMyPaymentProfile_SuCB(d) {
    if (d.profile.paymentProfiles != null) {
        NSD_MA_CPayProfile = d;
    }
    else {
        NSD_MA_CPayProfile = "";
    }
}
function NSD_MA_ShowPaymentMethod(e) {
  //  e.preventDefaut();
    var lstInputs = $(".NSOrderInput")
    $.each(lstInputs, function (v, i) {
        if ($(i).val().trim() == '') {
            bootbox.alert('Please specify the quantity');
            $(i).focus();
            return false
        }
    });
    // Check if payment profile exist then show Payment Method step to let the user select their credit card from the list
    if (NSD_MA_CPayProfile != "") {
        $("#NS_TopBarlblHeader").text("Payment Method");
        $("#dvOrderSummary").removeClass("NS_On").addClass("NS_Off");
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
    $("#NS_TopBarlblHeader").text("Payment Information");
    var oOther = JSON.parse($.cookie('NS_Other'));
    $("#dvPaymentMethod").removeClass("NS_On").addClass("NS_Off");
    $("#dvCreditCard").setTemplateURL('/DesktopModules/NS_MakeAppointment/template/tmpCreditCard.htm?q=' + $.now());
    $("#dvCreditCard").addClass("NS_On").removeClass('NS_Off').processTemplate("");
    $("#NS_txtCCCardNumber").mask('0000000000000000');
    $("#NS_txtCCCVV").mask('0000');
    $("#NS_MACC_lblOrderTotal").text(oOther.other[0].OrderTotal);
    $("#dvOrderSummary").addClass("NS_Off").removeClass('NS_On');
    if (NSD_MA_SelectedProfileID != "0" && NSD_MA_SelectedProfileID != undefined) {
        $("#dvNewCardInfo").addClass("NS_Off").removeClass('NS_On');
        $("#dvProfilePayment").addClass("NS_On").removeClass('NS_Off');
        $("#lblProfileInfo").html( '<div class="ccharge"> <p><i class="fa fa-info-circle fa-3x"></i> </p>' + 'Your card ending with <strong>' + rblSelectedText + '</strong> will be charge for amount of <span class="camo">' + oOther.other[0].OrderTotal + '</span> USD' + '</div>');
    }
    else {
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
    NSR_MA_MakeRequest(_URL, _data, NS_AddAddress_SuCB);
}
function NS_AddAddress_SuCB(d) {
    if (NS_MA_ClientID == -1) { return false; }
    var oOther = JSON.parse($.cookie('NS_Other'));
    var oService=JSON.parse($.cookie('NS_UserServices'));
    var CSVService = ""; 
    for (var i = 0; i < oService.services.length; i++) {
        var qty = $("#txtOrderQty_" + oService.services[i].ID).val();
        CSVService += oService.services[i].ID + ":" + qty + ":" + oService.services[i].price + ((i == oService.services[i].length - 1) ? '' : '|');
    }
    
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/MakeAppointment";
    var _data = "{'ClientID':'" + NS_MA_ClientID + "','ProviderID':'" + NSD_MA_CurrentPro.split(":")[0] + "','AddressID':'" + d + "','ForDate':'" + oOther.other[0].Date + "','AtTime':'" + oOther.other[0].Time + "','CSVSRVC':'" + CSVService + "','PayTxnID':'" + oUserInput.PayTxnID + "','CCNumber':'" + oUserInput.CardNumber + "','Expriry':'" + oUserInput.Expiry + "'}";
    NSR_MA_MakeRequest(_URL, _data, NS_AddAppointment_SuCB);
}
function NS_AddAppointment_SuCB(d) {
    $.cookie('NS_UserServices', null);
    $.cookie('NS_UserAddress', null);
    $.cookie('NS_Other', null);
    $.cookie('NSD_CurrentUser',null);
    bootbox.alert('<div class="center"><h4 class="center"><i class="fa fa-check-circle fa-3x"></i> </h4> Your Appointment has been confirmed! </div>', function () {
        window.location = NS_MyScheduleTab;
    })
}
function NS_UserInputs(){
    this.NameOnCard='';
    this.CardNumber='';
    this.CardType='';
    this.Expiry='';
    this.Amount=0;
    this.CVV = '';
    this.PayTxnID = '';
    this.CPPID = ''; // Payment Profile Id
    this.CPID = ''; // Customer Profile ID

}
var oUserInput = new NS_UserInputs();

function NS_VerifyCardInput() {
    if (NSD_MA_SelectedProfileID == "0") {
        oUserInput.NameOnCard = $("#NS_txtCCUserName").val().trim();
        oUserInput.CardNumber = $("#NS_txtCCCardNumber").val().trim();
        oUserInput.CardType = $("input:radio[name=radioInline]:checked").val();
        oUserInput.Expiry = $("#ddlCCMonth").val() + "/" + $("#ddlCCYear").val();
        oUserInput.CVV = $("#NS_txtCCCVV").val().trim();
        var IsAccepted = $("#NS_chkAccept").is(":checked");
        if (oUserInput.NameOnCard.length == 0) {
            bootbox.alert('Please specify Name on Card'); return false;
        }
        if (oUserInput.CardNumber < 16) { bootbox.alert('Please specify Card Number'); return false; }
        if (oUserInput.CardType == undefined) { bootbox.alert('Please select your Card Type'); return false; }
        if (oUserInput.CVV.length < 3) {
            bootbox.alert('Please specify Card CVV number provided at back of the card'); return false;
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
            var _Content = ' <h4 class="center"><i class="fa fa-question-circle fa-3x"></i> </h4> <div class="modal-cpbody center"><p>Confirm Payment of</p><div class="finfo">' + oUserInput.Amount + '<span class="usd">&nbsp;USD</span></div><p>To book this appointment?</p> </div>';
            bootbox.confirm(_Content, function (result) {
                if (result) {
                    $(o).text('Please wait...').attr('disabled', 'disabled');
                    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ChargeCard";
                    //string CCNumber, string Expiry, string CardCode, decimal amount
                    var _data = "{'CCNumber':'" + oUserInput.CardNumber + "','Expiry':'" + oUserInput.Expiry + "','CardCode':'" + oUserInput.CVV + "','amount':'" + oUserInput.Amount + "'}";

                    if (NSD_MA_SelectedProfileID != '0') {
                        _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ChargeProfile";
                        //string PID, string PPID, decimal amount
                        _data = "{'PID':'" + NSD_MA_CPayProfile.profile.customerProfileId + "','PPID':'" + NSD_MA_SelectedProfileID + "','amount':'" + oUserInput.Amount + "'}";
                    }
                    NSR_MA_MakeRequest(_URL, _data, NS_ChargeMyCard_SuCB);
                }
            });
        }
    }
}
function NS_ChargeMyCard_SuCB(d) {
    if (d.transactionResponse.errors == null) {
        if (d.transactionResponse.responseCode == 1) {
            oUserInput.PayTxnID = d.transactionResponse.transId;
            NS_MA_SaveAppointment();
        }
    }
    else {
        $("#NS_btnPayNow").text('Pay Now');
        bootbox.alert("Sorry, the transaction was NOT successfull cause of the following reason <br/><br/>" + d.transactionResponse.errors[0].errorText);
        return false
    }
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
}