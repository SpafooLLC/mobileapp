﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Netsam.Modules.ServiceDashBoard.View" %>
<asp:Panel ID="NS_SDB_Outer" runat="server"></asp:Panel>
<link href="/DesktopModules/NS_UserProfile/Scripts/pace/dataurl.css" rel="stylesheet" />
<link href="/DesktopModules/NS_ServiceDashBoard/Styles/jquery.fancybox.css" rel="stylesheet" />
<script src="/DesktopModules/NS_UserProfile/Scripts/pace/pace1.min.js"></script>
<script src="/DesktopModules/NS_MakeAppointment/Scripts/bootstrap.js"></script>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/bootbox.min.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/NS_Common.js"></script>
<script lang="javascript" >
    var NSR_SDB_SID = '<%=this.Session.SessionID%>';
    var NSR_SDB_WSUrl = '/DesktopModules/NS_ServiceDashBoard/rh.asmx/';
    var NSR_SDB_AppointmentTab = '<%=this.MakeAppointmenTab%>';
    var NSR_SDB_IsProvider=<%=this.IsProvider%>;
    function NSR_SDB_MakeRequest(WBurl, WBData, SuccessCB, FailedCB, vAsync) {
        var pAsync = true;
        if (vAsync != undefined) { pAsync = vAsync;}
        $.ajax({
            type: "POST", dataType: "json", contentType: "application/json; charset=utf-8",
            url: WBurl,
            async:pAsync,
            data: WBData,
            success: function (data, resp) {
                if (SuccessCB != undefined) { SuccessCB(data.d, resp); }
            },
            error: function (a, b) { if (FailedCB != undefined) { FailedCB(a, b); } }
        });
    }
    function NSR_SDB_sendFile(file, fileCtrl,SuCB) {
        var formData = new FormData();
        formData.append('file', $(fileCtrl)[0].files[0]);
        $(fileCtrl).after('<div class="NSR_UplNotify" style="font-weight:bold">Uploading...</div>')
        $.ajax({
            type: 'post',
            url: '/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-uploadify/Handler.ashx',
            data: formData,
            success: function (status) {
                if (status != 'error') {
                    _File= NSR_SDB_SID + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~');
                    $(fileCtrl).attr('uploadedFile', _File);
                    $(".NSR_UplNotify").hide();
                    if (SuCB != undefined) {
                        _File = _File.replace(/~/g, '_');
                        SuCB(_File);
                    }
                    bootbox.alert('File uplaoded successfully');
                }
            },
            processData: false,
            contentType: false,
            error: function () {
               bootbox.alert("Whoops something went wrong!");
            }
        });
    }
</script>
<script>
   $('.fancybox').fancybox({
            helpers: {
                overlay: {
                    locked: false
                }
            },
            beforeShow:function(){ 
                $('html').css('overflowX', 'visible'); 
                $('body').css('overflowY', 'hidden'); 
            },
            afterClose:function(){ 
                $('html').css('overflowX', 'hidden');
                $('body').css('overflowY', 'visible'); 
            }
        });
</script>
