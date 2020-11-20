var NS_UserInfo = "";
var NS_UserSRVC = "";
var NS_MaxFileUploads = 0;
$(document).ready(function () {
    NS_IsProvider = true;
    ShowMyProfile();
});

function ShowMyProfile() {
    if (NS_UP_UID == -1) { bootbox.alert('You need to login to access this area.'); return false; }
    $("#lblTopHeader").text('My Profile');
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetUser";
    var _data = "{'UID':'" + NS_UP_UID + "'}";
    $("#dvProviderInfo").show().html(NS_Waiting)
    NS_MakeRequest(_URL, _data, ShowMyProfile_SuCB);
}

function ShowMyProfile_SuCB(d) {
    NS_UserInfo = d;
    $("#dvProviderInfo").setTemplateURL('/DesktopModules/NS_UserProfile/temp/userPro.htm?q=' + $.now());
    $("#dvProviderInfo").show().processTemplate(d);
    var UserRoles = "";
    for (i = 0; i < NS_UserInfo.Roles.length; i++) {
        if ((NS_UserInfo.Roles[i] != 'Providers') && (NS_UserInfo.Roles[i] != 'Subscribers') && (NS_UserInfo.Roles[i] != 'Registered Users')) {
            UserRoles += NS_UserInfo.Roles[i] + ', ';
        }
    }
    $("#lblUPos").text(UserRoles.replace(/([a-z])([A-Z])/g, "$1 $2"));
}

function GetUserTagLine() {
    var _URL = "/DesktopModules/NS_UserProfile/rh.asmx/GetProTagLine";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + NS_UP_UID + "'}";
    $("#lblUserTagLine").show().text("Loading...");
    NS_MakeRequest(_URL, _data, function (d) {
        d = NS_ParseString(d);
        $("#lblUserTagLine").text(d);
        $("#txtTagLine").val(d);
    });
}
function GetUserWorkSample(isEdit) {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetWorkSamples";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'PID':'" + NS_UP_UID + "'}";
    $("#dvProWorkSample").show().html(NS_Waiting)
    NS_MakeRequest(_URL, _data, GetUserWorkSample_SuCB);
}
function GetUserWorkSample_SuCB(d) {
    NS_MaxFileUploads = d.length;
    if (d.length > 0) {
        $("#dvProWorkSample").setTemplateURL('/DesktopModules/NS_UserProfile/temp/tmpProWorkSample.htm?q=' + $.now());
        $("#dvProWorkSample").show().processTemplate(d);
        $("#dvProEditWorkSample").setTemplateURL('/DesktopModules/NS_UserProfile/temp/tmpEditProWorkSample.htm?q=' + $.now());
        $("#dvProEditWorkSample").show().processTemplate(d);
        $(".NSR_FileControl").on('change', function () {
            if (NS_MaxFileUploads >= 9) {
                bootbox.alert("You can upload only 8 files");
                return;
            }
            var file;
            if ((file = this.files[0])) {
                // NSR_sendFile(file, this, NS_SDB_OnFileUpload);
                NS_CropImageProcessorURL = '/DesktopModules/NS_UserProfile/Scripts/jquery-uploadify/HandlerX.ashx';
                NS_viewWidth = 530;
                NS_viewHeight = 530;
                NS_BoundWidth = 530;
                NS_BoundHeight = 530;
                NS_ViewPort = 'square';
                readFile(this);
            }
        });
    }
    else {
        $("#dvProWorkSample").show().text('No sample(s) found.');
    }
}
function NS_OnAfterSampleUpload() {
    GetUserWorkSample();
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
            NS_MakeRequest(_URL, _data, GetUserWorkSample);
        }
    })
}

function NSD_GetProviderServices() {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetProviderServices";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + NS_UP_UID + "'}";
    $("#lblSRVCOffered").text("Loading...")
    NS_MakeRequest(_URL, _data, NSD_GetProviderServices_SuCB);
}
function NSD_GetProviderServices_SuCB(d) {
    NS_UserSRVC = d;
    var _SRVC = "<ul>";
    if (d.length > 0) {
        for (i = 0; i < d.length; i++) {
            _SRVC += "<li>" + d[i].ServiceName + '</li> ';
        }
    }
    $("#lblSRVCOffered").html(_SRVC);
}
function NS_UpdateProSRVC() {
    var lst = $("#NSUP_dvSRVC [type='checkbox']:checked");
    if (lst.length == 0) {
        bootbox.alert("Please select at-least one service to offer");
        return;
    }
    else {
        var _SRVC = "";
        $.each(lst, function (i, o) {
            var id = o.id.split("_")[1];
            _SRVC += NS_UP_UID + ":" + id + "|";
        });
        if (_SRVC != "") {
            var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/AssignService";
            var _data = "{'CSV':'" + _SRVC + "'}";
            NS_MakeRequest(_URL, _data, function (d) {
                bootbox.alert("Updated successfully", function () {
                    NSD_GetProviderServices();
                    dialogSRVC.dialog("close");
                });
            });
        }

        var lsttxt = $("#NSUP_dvSRVC :input[type='text']");
        var _SRVCtxt = "";
        var minval = 0;
        var rangeToval = 0;
        $.each(lsttxt, function (i, o) {
            var id = o.id.split("_")[1];
            //alert(o.id);
            if (o.id.includes("txtSRVCMin_")) {
                minval = $("#" + o.id).val();
            } else {
                rangeToval = $("#" + o.id).val();

                $.each(lst, function (ic, oc) {
                    var idc = oc.id.split("_")[1];
                    if (idc == id) {
                        _SRVCtxt += NS_UP_UID + ":" + id + ":" + minval + ":" + rangeToval + "|";
                    }
                });

            }
        });
        if (_SRVCtxt != "") {
            var _URLtxt = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/UpdateServicePriceRange";
            var _datatxt = "{'CSV':'" + _SRVCtxt + "'}";
            NS_MakeRequest(_URLtxt, _datatxt, function (d) {

            });
        }
    }
}
