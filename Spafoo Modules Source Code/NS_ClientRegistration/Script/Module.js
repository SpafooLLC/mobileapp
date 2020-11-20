var _IsCardCreated = false;
$(document).ready(function () {
    //$("[id$='NS_tbPhone']").mask('000-000-0000');
    $("[id$='NS_tbZip']").mask('00000');
    $("[id$='NS_tbUserName']").mask('000-000-0000');
    $("[id$='NS_tbVerifyUserName']").mask('000-000-0000');
    $("#NS_UserProPic").on('change', function () {
        //var file;
       // if ((file = this.files[0])) {
       //     NS_UploadProfilePic(file, this);
        // }
        NS_ViewPort = 'circle';
        IsProfilePic = true;
        NS_viewWidth = 300;
        NS_viewHeight = 300;
        NS_BoundWidth = 300;
        NS_BoundHeight = 300;
        readFile(this);
    });
});
function NSR_CheckUserInput1() {
    // Check if Profile Picture is uploaded or not
    var IsFileUploaded = $("#NS_UserProPic").attr('uploadedfile');
    if (IsFileUploaded == undefined)
    {
        bootbox.alert('Profile picture is required, please upload a picture');
        return false;
    }
    // check if all the required fields are given ?
    if (NSR_ValidateClientForm('NSR') == true) {
        var R = $("#NS_ddlRegion option:selected").val();
        if (R == '-1') {
            bootbox.alert("Please choose your Region");
            return false;
        }
        // check if user has tick the terms and condition checkbox
        if ($("#chkUserAcceptance").is(":checked")) {
            $("#dvActionPanel").hide();
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
    var Message = "A credit card and a profile picture is required to request an appointment. This will help ensure the safety of Spafoo providers.  You will be charged at the completion of the service.  If you need to cancel, please cancel well ahead of time so that the provider will be notified.  Please note that if your cancellation is within 12 hours of the start of your requested appointment time, your card will be charged $25. <br /><br /><a href='//www.spafoo.com/Portals/0/docs/SpafooClient-TermsandConditions.pdf' target='_blank' >Click here </a>for full document of Terms and Conditions and Payment Policy";
    bootbox.alert({ message: Message, title: 'Terms and Conditions & Payment Policy Summary' });
}
function NSR_CheckUserInput2() {
    var _isLater = $("#chkAddPaymentLater").is(":checked");
    ValidatorEnable($("[id*='RequiredFieldValidator4']")[0], !_isLater);
    ValidatorEnable($("[id*='RegularExpressionValidator5']")[0], !_isLater);
    ValidatorEnable($("[id*='RegularExpressionValidator6']")[0], !_isLater);
    ValidatorEnable($("[id*='RequiredFieldValidator5']")[0], !_isLater);
    ValidatorEnable($("[id*='RegularExpressionValidator3']")[0], !_isLater);
    ValidatorEnable($("[id*='RegularExpressionValidator4']")[0], !_isLater);
    // Billing Address validation
    ValidatorEnable($("[id*='RequiredFieldValidator10']")[0], !_isLater);
    ValidatorEnable($("[id*='RequiredFieldValidator15']")[0], !_isLater);
    ValidatorEnable($("[id*='RequiredFieldValidator16']")[0], !_isLater);
    ValidatorEnable($("[id*='RequiredFieldValidator17']")[0], !_isLater);
    ValidatorEnable($("[id*='RequiredFieldValidator18']")[0], !_isLater);
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
    var UN = $("input[id*='NS_tbUserName']").val().replace(/-/g,'');
    var FN = $("input[id*='NS_tbFirstName']").val().trim();
    var LN = $("input[id*='NS_tbLastName']").val().trim();
    var EM = $("input[id*='NS_tbEmail']").val().trim();
    var P = $("input[id*='NS_tbPassword']").val().trim();
    var S = $("input[id*='NS_tbStreet']").val().trim();
    var Ph = '';//$("input[id*='NS_tbPhone']").val().trim();
    var C = $("input[id*='NS_tbCity']").val().trim();
    var R = $("#NS_ddlRegion option:selected").val();
    if (R == '-1') {
        R = "";
    }
    var Gender = $("#NS_ddlGender option:selected").val();
    var Z = $("input[id*='NS_tbZip']").val().trim();
    var Mo = UN; 
    NS_UProfile.Email = EM;
    var _PicID = '-1';
    var oPicid=$("#NS_UserProPic").attr('uploadedfile');
    if (oPicid != undefined) {
       if (oPicid != ''){
            _PicID=oPicid;
        }
    }
    else { oPicid = -1;}
    var url = '/DesktopModules/NS_ClientRegistration/rh.asmx/RegisterUser';
    //UN, FN, LN, EM, P, PID
    var data = "{'UN':'" + UN + "','FN':'" + FN + "','LN':'" + LN + "','EM':'" + EM + "','P':'" + P + "','PID':'" + NSR_PID + "','S':'" + S + "','C':'" + C + "','R':'" + R + "','Z':'" + Z + "','Ph':'" + Ph + "','Mo':'" + Mo + "','PicFID':'" + oPicid + "','HN':'','DT':'','IsWeb':'1','GDR':'" + Gender + "'}";
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
    this.Email = '';
    this.Address = '';
    this.City = '';
    this.State = '';
    this.Zip = '';
    this.Phone = '';
    this.Name = '';
}
var NS_UProfile = new NS_CCProfile();

function CreateCCProfile(UID) {
    NS_UProfile.CCNumber = $("[id*='NS_txtClientCC']").val().trim();
    NS_UProfile.CVV = $("[id*='NS_txtCardCode']").val().trim();
    NS_UProfile.Expiry = $("[id*='ddlCCMonth']").val() + "/" + $("[id*='ddlCCYear']").val();
    NS_UProfile.UserID = UID;
    NS_UProfile.Address = $("[id*='NS_txtCCAddress']").val().trim();
    NS_UProfile.City = $("[id*='NS_txtCCCity']").val().trim();
    NS_UProfile.State = $("[id*='NS_txtCCState']").val().trim();
    NS_UProfile.Zip = $("[id*='NS_txtCCZip']").val().trim();
    NS_UProfile.Phone = $("[id*='NS_txtCCPhone']").val().trim();
    NS_UProfile.Name = $("[id*='NS_txtCCName']").val().trim();
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/CreateCustomerProfile";
    var _data = "{'UID':'" + UID + "','CCNumber':'" + NS_UProfile.CCNumber + "','Expiry':'" + NS_UProfile.Expiry + "','CVV':'" + NS_UProfile.CVV + "','Email':'" + NS_UProfile.Email + "','name':'" + NS_UProfile.Name + "','adrs':'" + NS_UProfile.Address + "','city':'" + NS_UProfile.City + "','state':'" + NS_UProfile.State + "','zip':'" + NS_UProfile.Zip + "','phone':'" + NS_UProfile.Phone + "'}";
    NSR_MakeRequest(_URL, _data, CreateCCProfile_SuCB);
}
function CreateCCProfile_SuCB(d) {
    if (d.messages.resultCode == 0) {
        _IsCardCreated = true;
        bootbox.alert('Thank you , your profile is created successfully', function () {
            window.location = NSR_HTBUrl;
        });
    }
    else if (d.messages.resultCode == 1) {
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

function NS_UploadProfilePic(file, fileCtrl, SuCB) {
    // Sachin > 15th May 2017,
    // This method is NOTINUSE anymore cause now the images are first cropped and then uploaded to the server
    var formData = new FormData();
    formData.append('file', $(fileCtrl)[0].files[0]);
    //formData.append('b64str',)
    $.ajax({
        type: 'post', data: formData,
        url: '/DesktopModules/NS_ClientRegistration/Script/jquery-uploadify/rhProfilePicX.ashx',
        success: function (status) {
            if (status == 'Already') {
                bootbox.alert("File already exists. Rename file and upload");
                return false;
            }
            if (status != 'error') {
                // if DNN FileID is returned by handler
                $(fileCtrl).attr('uploadedFile', status.split('|')[0]);
                $("#NS_imgUserProfilePic").attr('src', status.split('|')[1]);
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            bootbox.alert("Whoops something went wrong!");
        }
    });
}