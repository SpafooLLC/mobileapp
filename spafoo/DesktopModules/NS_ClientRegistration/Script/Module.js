var _IsCardCreated = false;
function NSR_CheckUserInput1() {
    if (NSR_ValidateClientForm('NSR') == true) {
        if ($("#chkUserAcceptance").is(":checked")) {
            $("#dvClientStep1").hide();
            $("#btnRegContinue").hide();
            $("#dvClientStep2").show();
            $("#btnRegSave").show();
            $("#lblHeader").text('Credit Card Information');
        }
        else {
            bootbox.alert('Please tick the terms and condition');
        }
    }
    return false;
}
function ShowTermsNPolicy() {
    var Message = "A credit card is required to request an appointment. You will be charged $25 for a cancellation within 12 hours of the start of your requested appointment time. You will be charged at the completion of the service. It is the responsibility of the credit card processing agents/companies and the clients to maintain secure financial information and private credit card number documentation. SpaFoo.com accepts no liability for the failure of VISA/MasterCard/American Express/Discover to protect their clients from fraudulent activities and theft of private information. The above mentioned entities are contracted by SpaFoo.com to provide secure transactions.";
    bootbox.alert({message:Message,title:'Payment Policy'});
}
function NSR_CheckUserInput2() {
    var _isLater = $("#chkAddPaymentLater").is(":checked");
    ValidatorEnable($("[id*='RequiredFieldValidator4']")[0], !_isLater);
    ValidatorEnable($("[id*='RegularExpressionValidator5']")[0], !_isLater);
    ValidatorEnable($("[id*='RegularExpressionValidator6']")[0], !_isLater);
    ValidatorEnable($("[id*='RequiredFieldValidator5']")[0], !_isLater);
    ValidatorEnable($("[id*='RegularExpressionValidator3']")[0], !_isLater);
    ValidatorEnable($("[id*='RegularExpressionValidator4']")[0], !_isLater);
    if (_isLater) {
        $("#btnRegSave").text('Update');
    }
    if ($("#btnRegSave").text() == 'Update') {
        if (!_isLater) {
            if (NSR_ValidateClientForm('NSR_CC') == false) {
                return false;
            }
        }

        NSR_SaveUserApplication(_isLater);
    }

    if ($("#btnRegSave").text() == 'Update Credit Card') {
        CreateCCProfile(NS_UProfile.UserID);
    }
    return false;
}

function NSR_ValidateClientForm(ValidationGroup) {
   return Page_ClientValidate(ValidationGroup);
}

function NSR_SaveUserApplication(IsLater) {
    var UN = $("input[id*='NS_tbUserName']").val().trim();
    var FN = $("input[id*='NS_tbFirstName']").val().trim();
    var LN = $("input[id*='NS_tbLastName']").val().trim();
    var EM = $("input[id*='NS_tbEmail']").val().trim();
    var P = $("input[id*='NS_tbPassword']").val().trim();
    NS_UProfile.Email = EM;
    var url = '/DesktopModules/NS_ClientRegistration/rh.asmx/RegisterUser';
    //UN, FN, LN, EM, P, PID
    var data = "{'UN':'" + UN + "','FN':'" + FN + "','LN':'" + LN + "','EM':'" + EM + "','P':'" + P + "','PID':'" + NSR_PID + "'}";
    NSR_MakeRequest(url, data, NSR_OnRegistration);
}

function NSR_OnRegistration(r) {
    if (r.split(":")[0] != '0') {
        var _isLater = $("#chkAddPaymentLater").is(":checked");
        if (!_isLater) {// if not asked for payment profile to be created now
            r = r.split(":")[1];// get User ID on second position
            CreateCCProfile(r);
        }
        else {
            // if profile asked for later, then just create the user and refresh the page
            bootbox.alert('Thank you , your profile is created successfully', function () {
                window.location = NSR_HTBUrl;
            });
        }
    }
    else {
        var aryR = r.split(":");
        var _info = "Unable to register you cause of following reason\n\n- " + aryR[1];
        bootbox.alert(_info.replace(/([A-Z])/g, ' $1').trim(), function () {
            ShowBasicInfo();
        });//insert spaces before Capital letters
    }
}
function ShowBasicInfo() {
    $("#dvClientStep1").show();
    $("#btnRegContinue").show();
    $("#dvClientStep2").hide();
    $("#btnRegSave").hide();
    $("#lblHeader").text('Basic Profile Information');
}
function NSR_MakeRequest(WBurl, WBData, SuccessCB, FailedCB) {
    $.ajax({
        type: "POST", dataType: "json", contentType: "application/json; charset=utf-8",url: WBurl,data: WBData,
        success: function (data, resp) {
            if (SuccessCB != undefined) { SuccessCB(data.d, resp); }
        },
        error: function (a, b) { if (FailedCB != undefined) { FailedCB(a, b); } }
    });
}
function NS_CCProfile() {
    this.CCNumber = '';
    this.UserID = '';
    this.Expiry = '';
    this.CVV = '';
    this.Email='';
}
var NS_UProfile = new NS_CCProfile();

function CreateCCProfile(UID) {
    NS_UProfile.CCNumber = $("[id*='NS_txtClientCC']").val().trim();
    NS_UProfile.CVV = $("[id*='NS_txtCardCode']").val().trim();
    NS_UProfile.Expiry = $("[id*='ddlCCMonth']").val() + "/" + $("[id*='ddlCCYear']").val();
    NS_UProfile.UserID = UID;
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/CreateCustomerProfile";
    var _data = "{'UID':'" + UID + "','CCNumber':'" + NS_UProfile.CCNumber + "','Expiry':'" + NS_UProfile.Expiry + "','CVV':'" + NS_UProfile.CVV + "','Email':'" + NS_UProfile.Email + "'}";
    NSR_MakeRequest(_URL, _data, CreateCCProfile_SuCB);
}
function CreateCCProfile_SuCB(d) {
    if (d.resultCode == 0) {
        _IsCardCreated = true;
        bootbox.alert('Thank you , your profile is created successfully', function () {
            window.location = NSR_HTBUrl;
        });
    }
    else if (d.resultCode == 1) {
        _IsCardCreated = false;
        bootbox.alert(d.message[0].text, function () {
            $("#btnRegSave").text('Update Credit Card');
        })
    }
}
function NS_GoBack() {
    if ($("#dvClientStep2").is(":visible")) {
        ShowBasicInfo();
    }
}