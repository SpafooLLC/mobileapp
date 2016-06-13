<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Netsam.Modules.ManageScheduledServices.View" %>
<asp:Panel ID="pnlOuter" runat="server"></asp:Panel>
<link rel="stylesheet" href="http://cdn.jtsage.com/jtsage-datebox/4.0.0/jtsage-datebox-4.0.0.bootstrap.min.css" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" />
<link href="/DesktopModules/NS_MakeAppointment/Styles/bootstrap.min.css" rel="stylesheet" />
<link href="/DesktopModules/NS_ServiceDashBoard/Styles/style.css" rel="stylesheet" />
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
<script type="text/javascript" src="http://cdn.jtsage.com/jtsage-datebox/4.0.0/jtsage-datebox-4.0.0.bootstrap.min.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-jtemplates/jquery-jtemplates.js"></script>
<script src="/DesktopModules/NS_MakeAppointment/Scripts/bootstrap.js"></script>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/bootbox.min.js"></script>
<script>
    var NS_MSS_UID=<%=this.UserId%>;
    var NSR_SEID='<%=this.Session.SessionID%>';
    var NS_MSS_HomeTab='<%=this.AppHomeTab%>';
    var NS_MSS_AppointmentTab='<%=this.AppointmentTab%>';
    function GotoAppointment(){
        window.location=NS_MSS_AppointmentTab;
    }
    function GotoHome(){
        window.location='<%=this.AppHomeTab%>';
    }
    function NSR_MSS_MakeRequest(WBurl, WBData, SuccessCB, FailedCB, vAsync) {
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
    function NSR_sendFile(file, fileCtrl) {
        var formData = new FormData();
        formData.append('file', $(fileCtrl)[0].files[0]);
        $(fileCtrl).after('<div class="NSR_UplNotify" style="font-weight:bold">Uploading...</div>')
        $.ajax({
            type: 'post',data: formData,processData: false, contentType: false,
            url: '/DesktopModules/NS_ManageScheduledServices/Scripts/jquery-uploadify/Handler.ashx',
            success: function (status) {
                if (status != 'error') {
                    $(fileCtrl).attr('uploadedFile', NSR_SEID + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~'));
                    $(".NSR_UplNotify").hide();
                    bootbox.alert('File uplaoded successfully');
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
</script>
<style>
    .highlight:not(.pmu-today) {
    background-color:#219962 !important;
}
.highlight:not(.pmu-today):hover {
    background-color:#219962 !important;
}
</style>