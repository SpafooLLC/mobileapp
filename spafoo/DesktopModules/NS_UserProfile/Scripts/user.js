var PayProfileID = "";
var NS_UserInfo = "";
$(document).ready(function () {
    ShowMyProfile();
    CheckMyPaymentProfile()
    $("#txtCardNumber").mask('0000000000000000');
    $("#txtCardCode").mask('0000');
    $("#txtCCZip").mask('00000');
    $("#txtCCPhone").mask("0000000000");
});

function ShowMyProfile() {
    if (NS_UP_UID == -1) { bootbox.alert('You need to login to access this area.'); return false; }
    $("#lblTopHeader").text('My Profile');
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetUser";
    var _data = "{'UID':'" + NS_UP_UID + "'}";
    $("#dvClientInfo").addClass("NS_On").removeClass('NS_Off').html(NS_Waiting)
    NS_MakeRequest(_URL, _data, ShowMyProfile_SuCB);
}

function ShowMyProfile_SuCB(d) {
    NS_UserInfo = d;
    $("#dvClientInfo").setTemplateURL('/DesktopModules/NS_UserProfile/temp/userClient.htm?q=' + $.now());
    $("#dvClientInfo").show().processTemplate(d);
    $("#dvAddCCForm").hide();
}
function CheckMyPaymentProfile() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetCustomerProfile";
    var _data = "{'UID':'" + NS_UP_UID + "'}";
    NS_MakeRequest(_URL, _data, CheckMyPaymentProfile_SuCB);
}
function CheckMyPaymentProfile_SuCB(d) {
    setTimeout(function () {
        if ((d!=null) && (d.profile != null)) {
            PayProfileID = d.profile.customerProfileId;
        }
        $("#dvCCList").setTemplateURL('/DesktopModules/NS_UserProfile/temp/userCards.htm?q=' + $.now());
        if ((d!=null) && (d.profile != null) && (d.profile.paymentProfiles != null)) {
            $("#dvCCList").show().processTemplate(d.profile.paymentProfiles);
            $("#dvNoPaymentMethod").hide();
            $("#dvCCList").show();
        }
        else {
            $("#dvCCList").show().processTemplate("");
            $("#dvNoPaymentMethod").show();
            $("#dvCCList").hide();
        }
    }, 2000);
}
function NS_GoBack() {
    if ($("#dvEditClientInfo").is(":visible")) {
        $("#dvEditClientInfo").hide()
        $("#dvClientInfo").show();
    }
}
function CloseCCForm(e) {
    e.preventDefault();
    $("#dvAddCCForm").slideToggle();
}
function ShowAddCCForm(e) {
    e.preventDefault();
    $("#dvAddCCForm").slideToggle();
}
function NS_CCProfile() {
    this.CCNumber = '';
    this.UserID = '';
    this.Expiry = '';
    this.CVV = '';
    this.Address = "";
    this.City = "";
    this.State = "";
    this.Zip = "";
    this.Phone = "";
    this.Name = "";
}
var NS_UProfile = new NS_CCProfile();

function UpdateCCInfo(e, o) {
    e.preventDefault();
    if (NS_CCInfoIsValid()) {
        CreateCCProfile(o);
    }
}
function NS_CCInfoIsValid() {
    NS_UProfile.Name = $("#txtCardName").val().trim();
    NS_UProfile.CCNumber = $("#txtCardNumber").val().trim();
    NS_UProfile.CVV = $("#txtCardCode").val().trim();
    NS_UProfile.Expiry = $("#ddlCCMonth").val() + "/" + $("#ddlCCYear").val();
    NS_UProfile.UserID = NS_UP_UID;
    NS_UProfile.Address = $("#txtCCAddress").val().trim();
    NS_UProfile.City = $("#txtCCCity").val().trim();
    NS_UProfile.State = $("#txtCCState").val().trim();
    NS_UProfile.Zip = $("#txtCCZip").val().trim();
    NS_UProfile.Phone = $("#txtCCPhone").val().trim();
    if (NS_UProfile.Name == "") {
        bootbox.alert("Please specify the Name as on Card");
        return false;
    }
    if (NS_UProfile.CCNumber == "") {
        bootbox.alert('Please specify your 16 digit credit card number');
        $("#txtCardNumber").focus();
        return false;
    }
    if (NS_UProfile.CVV == "") {
        bootbox.alert("Please specify your 3 or 4 digit CVV number provided at the back of card");
        $("#txtCardCode").focus();
        return false;
    }
    if (NS_UProfile.Address == "") {
        bootbox.alert("Please specify the Address");
        $("#txtCCAddress").focus();
        return false;
    }
    if (NS_UProfile.City == "") {
        bootbox.alert("Please specify the City");
        $("#txtCCCity").focus();
        return false;
    }
    if (NS_UProfile.State == "") {
        bootbox.alert("Please specify the State");
        $("#txtCCState").focus();
        return false;
    }
    if (NS_UProfile.Zip == "") {
        bootbox.alert("Please specify the Zip");
        $("#txtCCZip").focus();
        return false;
    }
    if (NS_UProfile.Phone == "") {
        bootbox.alert("Please specify the Phone");
        $("#txtCCPhone").focus();
        return false;
    }
    // clear the textboxes cause they are valid 
    $("#txtCardNumber").val('');
    $("#txtCardCode").val('');
    $("#txtCardName").val('');
    $("#txtCCAddress").val('');
    $("#txtCCCity").val('');
    $("#txtCCState").val('');
    $("#txtCCZip").val('');
    $("#txtCCPhone").val('');
    return true;
}
function CreateCCProfile(o) {
    // $(o).text('Wait...');
    if (PayProfileID == '') {
        var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/CreateCustomerProfile";
        var _data = "{'UID':'" + NS_UProfile.UserID + "','CCNumber':'" + NS_UProfile.CCNumber + "','Expiry':'" + NS_UProfile.Expiry + "','CVV':'" + NS_UProfile.CVV + "','Email':'" + NS_UserInfo.Email + "','name':'" + NS_UProfile.Name + "','adrs':'" + NS_UProfile.Address + "','city':'" + NS_UProfile.City + "','state':'" + NS_UProfile.State + "','zip':'" + NS_UProfile.Zip + "','phone':'" + NS_UProfile.Phone + "'}";
        NS_MakeRequest(_URL, _data, CreateCCProfile_SuCB);
    }
    else {
        //string PID, string CCNumber, string Expiry, string CVV  
        var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/CreateCustomerPaymentProfile";
        var _data = "{'UID':'" + NS_UProfile.UserID + "','PID':'" + PayProfileID + "','CCNumber':'" + NS_UProfile.CCNumber + "','Expiry':'" + NS_UProfile.Expiry + "','CVV':'" + NS_UProfile.CVV + "','name':'" + NS_UProfile.Name + "','adrs':'" + NS_UProfile.Address + "','city':'" + NS_UProfile.City + "','state':'" + NS_UProfile.State + "','zip':'" + NS_UProfile.Zip + "','phone':'" + NS_UProfile.Phone + "'}";
        NS_MakeRequest(_URL, _data, CreateCCProfile_SuCB);
    }
}
function CreateCCProfile_SuCB(d) {
    if (d.messages.resultCode == 0) {
        CheckMyPaymentProfile();
        $("#dvAddCCForm").slideToggle();
        bootbox.alert('Your card information is saved successfully.')
    }
    else if (d.messages.resultCode == 1) {
        bootbox.alert(d.message[0].text)
    }
}
function RemovePayProfile(PPID, e, o) {
    e.preventDefault();
    bootbox.confirm('Are you sure to remove this card?', function (r) {
        if (r) {
            $(o).text("Removing...");
            var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/DeleteCustomerPayProfile";
            var _data = "{'PID':'" + PayProfileID + "','PPID':'" + PPID + "'}";
            NS_MakeRequest(_URL, _data, RemovePayProfile_SuCB);
        }
    })
}
function RemovePayProfile_SuCB(d) {
    CheckMyPaymentProfile();
}
function ShowAvailProviders(AppID,event) {
    $.cookie('NS_AvailPro', AppID);
    window.location = NS_UP_AppointmentTab;
    event.preventDefault();
}