var PayProfileID = "";
var NS_UserInfo = "";
$(document).ready(function () {
    ShowMyProfile();
    CheckMyPaymentProfile()
    $("#txtCardNumber").mask('0000000000000000');
    $("#txtCardCode").mask('0000');
   
});

function ShowMyProfile() {
    if (NS_UP_UID == -1) { bootbox.alert('You need to login to access this area.'); return false; }
    $("#lblTopHeader").text('My Profile');
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetUser";
    var _data = "{'UID':'" + NS_UP_UID + "'}";
    $("#dvClientInfo").addClass("NS_On").removeClass('NS_Off').text("Just a min...")
    NSR_UP_MakeRequest(_URL, _data, ShowMyProfile_SuCB);
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
    NSR_UP_MakeRequest(_URL, _data, CheckMyPaymentProfile_SuCB);
}
function CheckMyPaymentProfile_SuCB(d) {
    setTimeout(function () {
        if (d.profile != null) {
            PayProfileID = d.profile.customerProfileId;
        }
        $("#dvCCList").setTemplateURL('/DesktopModules/NS_UserProfile/temp/userCards.htm?q=' + $.now());
        if ((d.profile != null) && (d.profile.paymentProfiles != null)) {
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
}
var NS_UProfile = new NS_CCProfile();

function UpdateCCInfo(e, o) {
    e.preventDefault();
    if (NS_CCInfoIsValid()) {
        CreateCCProfile(o);
    }
}
function NS_CCInfoIsValid() {
    NS_UProfile.CCNumber = $("#txtCardNumber").val().trim();
    NS_UProfile.CVV = $("#txtCardCode").val().trim();
    NS_UProfile.Expiry = $("#ddlCCMonth").val() + "/" + $("#ddlCCYear").val();
    NS_UProfile.UserID = NS_UP_UID;
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
    $("#txtCardNumber").val('');
    $("#txtCardCode").val('');
    return true;
}
function CreateCCProfile(o) {
    // $(o).text('Wait...');
    if (PayProfileID == '') {
        var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/CreateCustomerProfile";
        var _data = "{'UID':'" + NS_UProfile.UserID + "','CCNumber':'" + NS_UProfile.CCNumber + "','Expiry':'" + NS_UProfile.Expiry + "','CVV':'" + NS_UProfile.CVV + "','Email':'" + NS_UserInfo.Email + "'}";
        NSR_UP_MakeRequest(_URL, _data, CreateCCProfile_SuCB);
    }
    else {
        //string PID, string CCNumber, string Expiry, string CVV  
        var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/CreateCustomerPaymentProfile";
        var _data = "{'PID':'" + PayProfileID + "','CCNumber':'" + NS_UProfile.CCNumber + "','Expiry':'" + NS_UProfile.Expiry + "','CVV':'" + NS_UProfile.CVV + "'}";
        NSR_UP_MakeRequest(_URL, _data, CreateCCProfile_SuCB);
    }
}
function CreateCCProfile_SuCB(d) {
    if (d.resultCode == 0) {
        CheckMyPaymentProfile();
        $("#dvAddCCForm").slideToggle();
        bootbox.alert('Your card information is saved successfully.')
    }
    else if (d.resultCode == 1) {
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
            NSR_UP_MakeRequest(_URL, _data, RemovePayProfile_SuCB);
        }
    })
}
function RemovePayProfile_SuCB(d) {
    CheckMyPaymentProfile();
}