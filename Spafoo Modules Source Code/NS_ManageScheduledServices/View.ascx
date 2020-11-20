<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Netsam.Modules.ManageScheduledServices.View" %>
<asp:Panel ID="pnlOuter" runat="server"></asp:Panel>
<link rel="stylesheet" href="http://cdn.jtsage.com/jtsage-datebox/4.0.0/jtsage-datebox-4.0.0.bootstrap.min.css" />
<link href="/DesktopModules/NS_ServiceDashBoard/Styles/style.css" rel="stylesheet" />
<script type="text/javascript" src="http://cdn.jtsage.com/jtsage-datebox/4.0.0/jtsage-datebox-4.0.0.bootstrap.min.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-jtemplates/jquery-jtemplates.js"></script>
<script src="/DesktopModules/NS_MakeAppointment/Scripts/bootstrap.js"></script>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/bootbox.min.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery.cookie/jquery.cookie.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/ns_Common.js"></script>

<script>
    var NSD_CurrentLocation= "";
    var NS_MSS_UID=<%=this.UserId%>;
    var NSR_SEID='<%=this.Session.SessionID%>';
    var NS_MSS_HomeTab='<%=this.AppHomeTab%>';
    var NS_MSS_AppointmentTab='<%=this.AppointmentTab%>';
    function NS_GotoMakeAppointment(e) {
        e.preventDefault();
        $.cookie('NSD_CurrentUser', oAppointment.ProviderInfo.UserID + ":" + oAppointment.ProviderInfo.LastName + " " + oAppointment.ProviderInfo.FirstName);
        window.location = NS_MSS_AppointmentTab;
    }
    function GotoHome(){
        window.location='<%=this.AppHomeTab%>';
    }
    function NSR_MSS_MakeRequest_NIU(WBurl, WBData, SuccessCB, FailedCB, vAsync) {
        var pAsync = true;
        if (vAsync != undefined) { pAsync = vAsync; }
        $.ajax({
            type: "POST", dataType: "json", contentType: "application/json; charset=utf-8", url: WBurl, async: pAsync, data: WBData,
            success: function (data, resp) {
                if (SuccessCB != undefined) { SuccessCB(data.d, resp); }
            },
            error: function (a, b) { if (FailedCB != undefined) { FailedCB(a, b); } }
        });
    }
    function NSR_sendFile(file, fileCtrl,SB) {
        var formData = new FormData();
        formData.append('file', $(fileCtrl)[0].files[0]);
        formData.append('UID',NS_MSS_UID);
        formData.append('AID',_CurrentAppointmentID)
        $(fileCtrl).after('<div class="NSR_UplNotify" style="font-weight:bold">Uploading...</div>')
        $.ajax({
            type: 'post',data: formData,processData: false, contentType: false,
            url: '/DesktopModules/NS_ManageScheduledServices/Scripts/jquery-uploadify/Handler.ashx',
            success: function (status) {
                if (status != 'error') {
                    var _BasePath="/Images/NS_Appointments/";
                    var _FilePath=NSR_SEID + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~');
                    var _FinalPath=_BasePath+_FilePath;
                    $(fileCtrl).attr('uploadedFile', _FinalPath);
                    $(fileCtrl).prev().attr('src',_FinalPath);
                    $(".NSR_UplNotify").hide();
                    if (SB!=undefined){
                        SB(_FinalPath);
                    }
                }
            },
            error: function () {
                bootbox.alert("Whoops something went wrong!");
            }
        });
    }
    function NS_FormatDate(d,f) {
        var SCB_Date = new Date(d);
        return $.datepicker.formatDate(f, SCB_Date);
    }
    function NS_FormatJSONDate(d,f) {
        // parse JSON formatted date to javascript date object
        var date = new Date(parseInt(d.substr(6)));
        // format display date (e.g. 04/10/2012)
        return $.datepicker.formatDate(f, date);
    }
    function NS_FormatTime(d){
        var s= '';//d.Hours+':'+d.Minutes;
        if (d.Hours>12)
        { 
            s=(d.Hours-12)+":"+d.Minutes+((d.Minutes<=9)?"0":"")+" PM";
        }
        else {
            s=d.Hours+":"+d.Minutes+((d.Minutes<=9)?"0":"")+" AM";
        }
        return s;
    }
    function DidIRated(AppID) {
        var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/DidIRated";
        //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
        var _data = "{'ByUserID':'" + NS_MSS_UID + "','AppID':'" + AppID + "'}";
        NS_MakeRequest(_URL, _data, function(d){
            if (d == true) {
                $("#NS_pRateLabel_" + AppID).text("Already Rated!");
            }
            $("#NS_aRateLink_" + AppID).attr('rated', d);
        });
    }
    function HideApp4Me(AID,UT) {
        bootbox.confirm('Are you sure to remove ?',function(r){
        if(r==true){
            var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/HideApp4Me";
            var _data = "{'AID':'" + AID + "','UserType':'" + UT + "'}";
            NS_MakeRequest(_URL, _data, function(d){
                bootbox.alert("Removed successfully",function() {
                    $("#dvAcomApp_"+AID).slideUp();
        }); }); } });
    }
    
    function NS_React2Response(AID, Status) {
        if (Status == 1) {
            bootbox.confirm('Are you sure to accept ??', function (r) {
                if (r) {
                    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppStatus";
                    var _data = "{'AppID':'" + AID + "','Status':'0'}";
                    NS_MakeRequest(
                        _URL, _data,
                        function (d) {
                            bootbox.alert('Appointment updated successfully', function () {
                                window.location.reload();
                            });
                        }
                    )
                }
            });
        }
        if (Status == 0) {
            bootbox.confirm('Are you sure to deny ??', function (r) {
                if (r) {
                    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppStatus";
                    var _data = "{'AppID':'" + AID + "','Status':'6'}";
                    NS_MakeRequest(
                        _URL, _data,
                        function (d) {
                            bootbox.alert('Appointment updated successfully', function () {
                                window.location.reload();
                            });
                        }
                    );
                }
            });
        }
    }
</script>
<style>
.highlight:not(.pmu-today) {
    background-color:#219962 !important;
}
.highlight:not(.pmu-today):hover {
    background-color:#219962 !important;
}
.NS_On{display:block;}
.NS_Off{display:none;}
</style>