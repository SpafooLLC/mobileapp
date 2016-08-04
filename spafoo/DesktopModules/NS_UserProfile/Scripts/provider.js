var NS_UserInfo = "";
$(document).ready(function () {
    NS_IsProvider = true;
    ShowMyProfile();
});

function ShowMyProfile() {
    if (NS_UP_UID == -1) { bootbox.alert('You need to login to access this area.'); return false; }
    $("#lblTopHeader").text('My Profile');
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetUser";
    var _data = "{'UID':'" + NS_UP_UID + "'}";
    $("#dvProviderInfo").show().text("Just a min...")
    NSR_UP_MakeRequest(_URL, _data, ShowMyProfile_SuCB);
}

function ShowMyProfile_SuCB(d) {
    NS_UserInfo = d;
    $("#dvProviderInfo").setTemplateURL('/DesktopModules/NS_UserProfile/temp/userPro.htm?q=' + $.now());
    $("#dvProviderInfo").show().processTemplate(d);
    var UserRoles = ""; 
    for (i = 0; i < NS_UserInfo.Roles.length; i++) {
        if ((NS_UserInfo.Roles[i] != 'Providers') && (NS_UserInfo.Roles[i] != 'Subscribers') &&(NS_UserInfo.Roles[i] != 'Registered Users')) {
            UserRoles += NS_UserInfo.Roles[i] + ', ';
        }
    }
   $("#lblUPos").text(UserRoles.replace( /([a-z])([A-Z])/g, "$1 $2"));
}

function GetUserTagLine() {
    var _URL = "/DesktopModules/NS_UserProfile/rh.asmx/GetProTagLine";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + NS_UP_UID + "'}";
    $("#lblUserTagLine").show().text("Loading...");
    NSR_UP_MakeRequest(_URL, _data, function (d) {
        d = NS_ParseString(d);
        $("#lblUserTagLine").text(d);
        $("#txtTagLine").val(d);
    });
}
function GetUserWorkSample(isEdit) {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetWorkSamples";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'PID':'" + NS_UP_UID + "'}";
    $("#dvProWorkSample").show().text("Just a min...")
    NSR_UP_MakeRequest(_URL, _data, GetUserWorkSample_SuCB);
}
function GetUserWorkSample_SuCB(d) {
    if (d.length > 0) {
        $("#dvProWorkSample").setTemplateURL('/DesktopModules/NS_UserProfile/temp/tmpProWorkSample.htm?q=' + $.now());
        $("#dvProWorkSample").show().processTemplate(d);
        $("#dvProEditWorkSample").setTemplateURL('/DesktopModules/NS_UserProfile/temp/tmpEditProWorkSample.htm?q=' + $.now());
        $("#dvProEditWorkSample").show().processTemplate(d);
        $(".NSR_FileControl").on('change', function () {
            var file;
            if ((file = this.files[0])) {
                NSR_sendFile(file, this, NS_SDB_OnFileUpload);
            }
        });
    }
    else {
        $("#dvProWorkSample").show().text('No sample(s) found.');
    }
}

function NS_GoBack() {
    $(".dvEditClientInfo").hide();
    $("#dvProviderInfo").show();
    $("#lblTopHeader").text("My Profile");
}
function RemoveMySample(FP) {
    var _URL = "/DesktopModules/NS_UserProfile/rh.asmx/RemoveMySample";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UserID':'" + NS_UP_UID + "','FilePath':'" + FP + "'}";
    bootbox.confirm("Are you sure to remove this media ?", function (result) {
        if (result) {
            NSR_UP_MakeRequest(_URL, _data, GetUserWorkSample);
        }
    })
}

//function ShowMyProfile_SuCB(d) {
//    $("#dvProviderInfo").setTemplateURL('/DesktopModules/NS_UserProfile/temp/userPro.htm?q=' + $.now());
//    $("#dvProviderInfo").show().processTemplate(d);
//}
