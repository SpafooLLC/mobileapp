<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Netsam.Modules.NS_UserProfile.View" %>
<asp:Panel ID="pnlOuter" runat="server"></asp:Panel>
<style>
    .NS_Caption{min-width:10%;overflow:visible;}
    .NS_Input{width:100%;}
    .NS_InputRow{float: left;height: 80px;padding: 10px;width:50%;float:left;}
</style>
<link href="/DesktopModules/NS_UserProfile/Scripts/pace/dataurl.css" rel="stylesheet" />
<link rel="stylesheet" href="http://cdn.jtsage.com/jtsage-datebox/4.0.0/jtsage-datebox-4.0.0.bootstrap.min.css" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" />
<link href="/DesktopModules/NS_ServiceDashBoard/Styles/style.css" rel="stylesheet" />


<script src="/DesktopModules/NS_UserProfile/Scripts/pace/pace.min.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-jtemplates/jquery-jtemplates.js"></script>
<script src="/DesktopModules/NS_MakeAppointment/Scripts/bootstrap.js"></script>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/bootbox.min.js"></script>
<script src="/DesktopModules/NS_Registration/Scripts/jquery.mask.min.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/NS_Common.js"></script>
<script>
    var NS_IsProvider=false;
    var NS_UP_UID=<%=this.UserId%>;
    var NSR_UploadPath='<%=this.UploadWorkSamplePath%>';
    var NSR_UploadProfilePicPath='<%=this.UploadProfilePicPath%>';
    var NS_UP_HomeTab='<%=this.AppHomeTab%>';

    function NSR_UP_MakeRequest(WBurl, WBData, SuccessCB, FailedCB, vAsync) {
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
        var FileID=$(fileCtrl).attr('FileID');
        formData.append('FileId',FileID);
        $(fileCtrl).after('<div class="NSR_UplNotify" style="font-weight:bold">Uploading...</div>')
        $.ajax({
            type: 'post',data: formData,processData: false, contentType: false,
            url: '/DesktopModules/NS_UserProfile/Scripts/jquery-uploadify/Handler.ashx',
            success: function (status) {
                if (status != 'error') {
                    $(fileCtrl).attr('uploadedFile', NSR_UploadPath + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~'));
                    $(fileCtrl).prev().attr('src',NSR_UploadPath + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~'));
                    $(".NSR_UplNotify").hide();
                     GetUserWorkSample();
                }
            },
            error: function () {
                bootbox.alert("Whoops something went wrong!");
            }
        });
    }

    function NSR_UpdateProfilePic(file, fileCtrl) {
        var formData = new FormData();
        formData.append('file', $(fileCtrl)[0].files[0]);
        $(fileCtrl).after('<div class="NSR_UplNotify" style="font-weight:bold">Uploading...</div>')
        $.ajax({
            type: 'post',data: formData,processData: false, contentType: false,
            url: '/DesktopModules/NS_UserProfile/Scripts/jquery-uploadify/ProfileHandler.ashx',
            success: function (status) {
                $(fileCtrl).attr('uploadedFile', NSR_UploadProfilePicPath + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~'));
                $(fileCtrl).prev().children().attr('src',NSR_UploadProfilePicPath + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~'));
                $(".NSR_UplNotify").hide();
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
    function NS_EditUser(){
        if (NS_UP_UID == -1) { bootbox.alert('You need to login to access this area.'); return false;}
        
        $("#lblTopHeader").text('Edit Profile');
        var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetUser";
        var _data = "{'UID':'" + NS_UP_UID + "'}";
        $(".mainouter").hide();
        $(".dvEditClientInfo").show().text("Just a min...")
        NSR_UP_MakeRequest(_URL, _data, NS_EditUser_SuCB);
    }

    function NS_EditUser_SuCB(d) {
        if (NS_IsProvider==false)
            $(".dvEditClientInfo").setTemplateURL('/DesktopModules/NS_UserProfile/temp/editClientUser.htm?q=' + $.now());
        else
            $(".dvEditClientInfo").setTemplateURL('/DesktopModules/NS_UserProfile/temp/editProUser.htm?q=' + $.now());
        $(".dvEditClientInfo").show().processTemplate(d);
        $(".NSR_ProfilePicControl").on('change', function () {
            var file;
            if ((file = this.files[0])) {
                NSR_UpdateProfilePic(file, this, NS_SDB_OnFileUpload);
            }
        });
    }

    function NS_SDB_OnFileUpload(d){
        bootbox.alert('File uploaded successfully');
    }
    function NS_CancelEdit(){
        $(".dvEditClientInfo").hide();
        $(".mainouter").show();
        $("#lblTopHeader").text('My Profile');
    }
    function NS_UpdateUser(){
        if (NS_UP_UID==-1){return false;}
        //UpdateUser(int UserID,string FN,string LN,string E,string P,string Str,string City,string Region,string PC,string DN,string Bio)
        var _URL = "/DesktopModules/NS_UserProfile/rh.asmx/UpdateUser";
        var FN=$("#txtFN").val().trim();
        var LN=$("#txtLN").val().trim();
        var E=$("#txtE").val().trim();
        var str=$("#txtStr").val().trim();
        var City=$("#txtCity").val().trim();
        var Region=$("#txtRegion").val().trim();
        var Postal=$("#txtPC").val().trim();
        var Phone=$("#txtP").val().trim();
        var DN=$("#txtDN").val().trim();
        
        var TagLine='';
        if ($("#txtTagLine").length>0){
            TagLine= $("#txtTagLine").val().trim();
             TagLine=escape(htmlEncode(TagLine));
        }
            
        var Bio='';
        if ($("#txtBio").length>0){
            Bio=$("#txtBio").val().trim();
            Bio=escape(htmlEncode(Bio));
        }
        var _data = "{'UserID':'" + NS_UP_UID + "','FN':'"+FN+"','LN':'"+LN+"','E':'"+E+"','P':'"+Phone+"','Str':'"+str+"','City':'"+City+"','Region':'"+Region+"','PC':'"+Postal+"','DN':'"+DN+"','Bio':'"+Bio+"','TagLine':'"+TagLine+"'}";
        
        NSR_UP_MakeRequest(_URL, _data, NS_UpdateUser_SuCB);
    }
    function NS_UpdateUser_SuCB(d){
        if (d=='Success'){
            bootbox.alert('Information is updated successfully',function(){
                window.location.reload();
            });
        }
    }
</script>