<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Netsam.Modules.NS_UserProfile.View" %>
<%@ Register src="/desktopmodules/NS_ClientRegistration/ucCropImage.ascx" tagname="ucCropImage" tagprefix="uc1" %>
<asp:Panel ID="pnlOuter" runat="server"></asp:Panel>
<style>
    .NS_Caption{min-width:10%;overflow:visible;}
    .NS_Input{width:100%;}
    .NS_InputRow{float: left;height: 80px;padding: 10px;width:50%;float:left;}
    .NS_NotiRow{width: 100%; margin-top: 10px; margin-bottom: 10px; height: 30px;}
</style>
<link href="/DesktopModules/NS_UserProfile/Scripts/pace/dataurl.css" rel="stylesheet" />
<link rel="stylesheet" href="http://cdn.jtsage.com/jtsage-datebox/4.0.0/jtsage-datebox-4.0.0.bootstrap.min.css" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" />
<link href="/DesktopModules/NS_ServiceDashBoard/Styles/style.css" rel="stylesheet" />
<link href="/DesktopModules/NS_UserProfile/Scripts/tooltip/tooltipster.bundle.css" rel="stylesheet" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.css" rel="stylesheet" />
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery.cookie/jquery.cookie.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false&libraries=places"></script>
<script src="/DesktopModules/NS_UserProfile/Scripts/pace/pace.min.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-jtemplates/jquery-jtemplates.js"></script>
<script src="/DesktopModules/NS_MakeAppointment/Scripts/bootstrap.js"></script>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/bootbox.min.js"></script>
<script src="/DesktopModules/NS_Registration/Scripts/jquery.mask.min.js"></script>
<script src="/DesktopModules/NS_UserProfile/Scripts/tooltip/tooltipster.bundle.min.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/NS_Common.js"></script>
<style>
    table.NS_tblReport td, .NS_tblReport th {
    padding: 3px;
}
</style>
<div id="dialog-changePassword" title="Change Password" style="display:none;" >
    <table style="width:100%;" class="NS_tblReport">
        <tr>
            <td>
                <label for="name">Current Password</label></td>
        </tr>
        <tr>
            <td>
                <input type="password" id="txtCPassword" placeholder="specify your current password" class="dnnFormRequired form-control" style="width:100%;" /></td>
        </tr>
        <tr>
            <td>
                <label for="email">New Password</label></td>
        </tr>
        <tr>
            <td>
                <input type="password" id="txtNPassword" placeholder="specify new password" class="dnnFormRequired form-control" style="width:100%;"/></td>
        </tr>
        <tr>
            <td>
                <label for="password">Re-type Password</label></td>
        </tr>
        <tr>
            <td>
                <input type="password" id="txtRePwd" placeholder="re-type the new password" class="dnnFormRequired form-control" style="width:100%;" /></td>
        </tr>
    </table>
</div>
<div id="dialog-changeSRVC" title="Manage Services" style="display:none;" >
   <div id="NSUP_dvSRVC"></div>
</div>
<uc1:ucCropImage ID="ucCropImage1" runat="server" />
<script>
    var NS_IsProvider = false;
    var NS_UP_UID =<%=this.UserId%>;
    var NSR_UploadPath ='<%=this.UploadWorkSamplePath%>';
    var NSR_UploadProfilePicPath ='<%=this.UploadProfilePicPath%>';
    var NS_UP_HomeTab='<%=this.AppHomeTab%>';
    var NS_UP_AppointmentTab = '/services1.aspx';//'<%=this.MakeAppointmenTab%>';

    NS_CropImageProcessorURL = '/DesktopModules/NS_UserProfile/Scripts/jquery-uploadify/ProfileHandlerX.ashx';

    function NS_MakeRequest(WBurl, WBData, SuccessCB, FailedCB, vAsync) {
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
    var dialog, dialogSRVC;
    $(document).ready(function () {
        if (NS_IsProvider == true) {
            NS_LoadServices();
            dialogSRVC = $("#dialog-changeSRVC").dialog({
                autoOpen: false, height: 600, width: 900, modal: true,
                buttons: { "Update": NS_UpdateProSRVC }
            });
        }
        dialog = $("#dialog-changePassword").dialog({
            autoOpen: false, height: 350, width: 400, modal: true,
            buttons: { "Update": NSR_doChangePwd }
        });
        $("#txtP").mask('000-000-0000');
        $("#txtCell").mask('0000000000');
        $("#txtPC").mask('00000');
        $("#txtSSN").mask('000-00-0000');
    });

    function NS_UP_OpenDlgChangePwd() {
        dialog.dialog("open");
    }
    function NS_UP_OpenDlgChangeSRVC() {
        dialogSRVC.dialog("open");
        if (NS_UserSRVC.length > 0) {
            for (i = 0; i < NS_UserSRVC.length; i++) {
                $("#chkSRVC_" + NS_UserSRVC[i].ServiceID).prop("checked", true)
            }
        }
    }
    function NSR_doChangePwd() {
        if (NSR_VerifyPwdInput() == true) {
            var _URL = '/DesktopModules/NS_UserProfile/rh.asmx/ChangePassword';
            var CP = $("#txtCPassword").val().trim();
            var NP = $("#txtNPassword").val().trim();
            var CNP = $("#txtRePwd").val().trim();
            var _data = "{'CP':'" + CP + "','NP':'" + NP + "','CNP':'" + CNP + "','UserId':'" + NS_UP_UID + "'}";
            //int UserId, string CP, string NP, string CNP
            NS_MakeRequest(_URL, _data, NSR_doChangePwd_SuCB);
        }
    }

    function NSR_doChangePwd_SuCB(d) {
        if (d != "") {
            bootbox.alert(d);
        }
    }

    function NSR_VerifyPwdInput() {
        if ($("#txtCPassword").val().trim().length == 0) {
            bootbox.alert('Please specify your current password');
            $("#txtCPassword").focus();
            return false;
        }
        if ($("#txtNPassword").val().trim().length == 0) {
            bootbox.alert('Please specify your new password');
            $("#txtNPassword").focus();
            return false;
        }
        if ($("#txtRePwd").val().trim().length == 0) {
            bootbox.alert('Please re-type your new password');
            $("#txtRePwd").focus();
            return false;
        }
        else {
            if ($("#txtRePwd").val().trim() != $("#txtNPassword").val().trim()) {
                bootbox.alert("Your password did not match.");
                return false;
            }
        }
        return true;
    }
    function NSR_sendFile(file, fileCtrl) {
        var formData = new FormData();
        formData.append('file', $(fileCtrl)[0].files[0]);
        var FileID = $(fileCtrl).attr('FileID');
        formData.append('FileId', FileID);
        $(fileCtrl).after('<div class="NSR_UplNotify" style="font-weight:bold">Uploading...</div>')
        $.ajax({
            type: 'post', data: formData, processData: false, contentType: false,
            url: '/DesktopModules/NS_UserProfile/Scripts/jquery-uploadify/Handler.ashx',
            success: function (status) {
                if (status != 'error') {
                    $(fileCtrl).attr('uploadedFile', NSR_UploadPath + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~'));
                    $(fileCtrl).prev().attr('src', NSR_UploadPath + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~'));
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
            type: 'post', data: formData, processData: false, contentType: false,
            url: '/DesktopModules/NS_UserProfile/Scripts/jquery-uploadify/ProfileHandler.ashx',
            success: function (status) {
                if (status == 'Already') {
                    bootbox.alert("File already exists. Rename file and upload");
                    return false;
                }
                $(fileCtrl).attr('uploadedFile', NSR_UploadProfilePicPath + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~'));
                $(fileCtrl).prev().children().attr('src', NSR_UploadProfilePicPath + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~'));
                $(".NSR_UplNotify").hide();
            },
            error: function () {
                bootbox.alert("Whoops something went wrong!");
            }
        });
    }

    function NS_EditUser() {
        if (NS_UP_UID == -1) { bootbox.alert('You need to login to access this area.'); return false; }

        $("#lblTopHeader").text('Edit Profile');
        var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetUser";
        var _data = "{'UID':'" + NS_UP_UID + "'}";
        $(".mainouter").hide();
        $(".dvEditClientInfo").show().html(NS_Waiting)
        NS_MakeRequest(_URL, _data, NS_EditUser_SuCB);
    }

    function NS_EditUser_SuCB(d) {
        NS_UserInfo = d;
        if (NS_IsProvider == false)
            $(".dvEditClientInfo").setTemplateURL('/DesktopModules/NS_UserProfile/temp/editClientUser.htm?q=' + $.now());
        else
            $(".dvEditClientInfo").setTemplateURL('/DesktopModules/NS_UserProfile/temp/editProUser.htm?q=' + $.now());
        $(".dvEditClientInfo").show().processTemplate(d);
        BindRegions('ddlRegion', d.Profile.Region);
        $(".EditInput").keyup(function (event) {
            showAddress();
        })
        if (NS_IsProvider) {
            NS_LoadUserPositions();
        }

        $(".NSR_ProfilePicControl").on('change', function () {
            //var file;
            //if ((file = this.files[0])) {
            //    NSR_UpdateProfilePic(file, this, NS_SDB_OnFileUpload);
            //}
            NS_CropImageProcessorURL = '/DesktopModules/NS_UserProfile/Scripts/jquery-uploadify/ProfileHandlerX.ashx';
            NS_ViewPort = 'circle';
            IsProfilePic = true;
            NS_viewWidth = 400;
            NS_viewHeight = 400;
            NS_BoundWidth = 400;
            NS_BoundHeight = 400;
            readFile(this);
        });
    }
    NS_OnAfterSampleUpload = function () { NS_UpdateUser_SuCB('Success'); }
    function NS_LoadUserPositions() {
        NS_MakeRequest("/DesktopModules/NS_Registration/rh.asmx/GetQuestion", "{'QID':'5'}", function (d) {
            $("#dvUserPositions").setTemplateURL('/DesktopModules/NS_UserProfile/temp/editUserPositions.htm?q=' + $.now());
            $("#dvUserPositions").processTemplate(d.Options);
            var aryProfileID = NS_UserInfo.Profile.ProfileProperties[1].PropertyValue.split("|");
            for (var i = 0; i < aryProfileID.length; i++) {
                $("#dvUserPositions input[selectid='" + aryProfileID[i] + "']").prop('checked', true);
            }
        });
    }
    function NS_SDB_OnFileUpload(d) {
        bootbox.alert('File uploaded successfully');
    }
    function NS_CancelEdit() {
        $(".dvEditClientInfo").hide();
        $(".mainouter").show();
        $("#lblTopHeader").text('My Profile');
        $('#dvActionPanel').hide();
    }
    function NS_UpdateUser() {
        if (NS_UP_UID == -1) { return false; }
        //UpdateUser(int UserID,string FN,string LN,string E,string P,string Str,string City,string Region,string PC,string DN,string Bio)
        var _URL = "/DesktopModules/NS_UserProfile/rh.asmx/UpdateUser";
        if ($(".profile-pic img").attr('src').indexOf('no_avatar.gif') > 0) {
            bootbox.alert('Please upload your profile picture');
            return false;
        }
        // if (imgName.last)
        var FN = $("#txtFN").val().trim();
        if (FN == '') {
            bootbox.alert('Please specify your first name');
            return false;
        }
        var LN = $("#txtLN").val().trim();
        var DN = $("#txtDN").val().trim();
        if (DN == '') {
            bootbox.alert('Please specify display name');
            return false
        }
        var E = $("#txtE").val().trim();
        if (E == '') {
            bootbox.alert('Please specify your email address');
            return false
        }
        if (!isEmailValid(E)) {
            bootbox.alert('Invalid email address found');
            return false
        }
        var str = $("#txtStr").val().trim();
        if (str == '') {
            bootbox.alert('Please specify street');
            return false
        }
        var City = $("#txtCity").val().trim();
        if (City == '') {
            bootbox.alert('Please specify city');
            return false
        }

        var Region = $("#ddlRegion").val();
        var Postal = $("#txtPC").val().trim();
        if (Postal == '') {
            bootbox.alert('Please specify postal code');
            return false
        }
        var Phone = ''; // empty for client
        var Cell = $("#txtCell").val().trim();
        if (Cell == '') {
            bootbox.alert('Please specify cell');
            return false
        }

        var Gender = $("#ddlGender :selected").val();
        var TOE = $("#ddlEntity :selected").val();
        if (TOE == undefined) TOE = ""; // empty for user of type Client
        var LIC = $("#txtLicense").val();
        if (LIC == undefined) LIC = "";// empty for user of type Client
        var SSN = $("#txtSSN").val();
        if (SSN == undefined) SSN = "";// empty for user of type Client
        var EIN = $("#txtEIN").val();
        if (EIN == undefined) EIN = "";// empty for user of type Client
        var uPOS = "";
        if (NS_IsProvider) {
            Phone = $("#txtP").val().trim();
            var aryChks = $("#dvUserPositions input[type='checkbox']");
            for (var i = 0; i < aryChks.length; i++) {
                var oChk = aryChks[i];
                var id = $(oChk).attr('selectid');//oChk.id.split('_')[1];
                var IsChecked = $(oChk).is(":checked");
                uPOS += id + "_" + ((IsChecked) ? 1 : 0) + '|';
            }
        }
        var TagLine = '';
        if ($("#txtTagLine").length > 0) {
            TagLine = $("#txtTagLine").val().trim();
            TagLine = escape(htmlEncode(TagLine));
        }

        var Bio = '';
        if ($("#txtBio").length > 0) {
            Bio = $("#txtBio").val().trim();
            Bio = escape(htmlEncode(Bio));
        }
        var _data = "{'UserID':'" + NS_UP_UID + "','FN':'" + FN + "','LN':'" + LN + "','E':'" + E + "','P':'" + Phone + "','Mo':'" + Cell + "','Str':'" + str + "','City':'" + City + "','Region':'" + Region + "','PC':'" + Postal + "','DN':'" + DN + "','Bio':'" + Bio + "','TagLine':'" + TagLine + "','Gender':'" + Gender + "','TOE':'" + TOE + "','Lic':'" + LIC + "','SSN':'" + SSN + "','EIN':'" + EIN + "','uPOS':'" + uPOS + "'}";

        NS_MakeRequest(_URL, _data, NS_UpdateUser_SuCB);
    }
    function NS_UpdateUser_SuCB(d) {
        if (d == 'Success') {
            bootbox.alert('Information is updated successfully', function () {
                window.location.reload();
            });
        }
    }
    function GetMyNotification() {
        var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetMyNotification";
        var _data = "{'MyID':'" + NS_UP_UID + "'}";
        $(".MyNotifications").text("Please wait, while we are loading notifications");
        NS_MakeRequest(_URL, _data, GetMyNotification_SuCB);
    }
    function GetMyNotification_SuCB(d) {
        if (NS_IsProvider) {
            $(".MyNotifications").setTemplateURL('/DesktopModules/NS_UserProfile/temp/NotificationsP.htm?q=' + $.now());
        }
        else {
            $(".MyNotifications").setTemplateURL('/DesktopModules/NS_UserProfile/temp/NotificationsC.htm?q=' + $.now());
        }
        $(".MyNotifications").setParam('CUser', NS_UP_UID);
        if (d.length > 0) {
            $(".MyNotifications").processTemplate(d);
        }
        else {
            $(".MyNotifications").text('You do not have any notification.');
        }
        $('.notiwrapper >ul>li').not('.ProDeny').click(function (event) {
            document.location.href = "/My-Schedule.aspx";
        }).css('cursor', 'pointer');
        if (d.length == 0) { $("#dvClearAll").hide(); $(".notiwrapper").hide(); }
        $('.NS_AppTooltip').tooltipster({
            content: '<span class="tprload">Loading...</span>', contentAsHTML: true,
            // 'instance' is basically the tooltip. More details in the "Object-oriented Tooltipster" section.
            functionBefore: function (instance, helper) {
                var $origin = $(helper.origin);
                // we set a variable so the data is only loaded once via Ajax, not every time the tooltip opens
                if ($origin.data('loaded') !== true) {
                    var URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointment";
                    var data = "{'ID':'" + helper.origin.id.split('_')[1] + "'}";
                    NS_MakeRequest(URL, data, function (d) {
                        var _Header = "";
                        if (d == null) {
                            instance.content('<label style="color:red">Sorry, no information found for this appointment</label>');
                            // to remember that the data has been loaded
                            $origin.data('loaded', true);
                            return;
                        }
                        if (d.ForDate != "") {
                            _Header = "<h2>" + NS_FormatDate(d.ForDate, 'DD dd MM yy') + "</h2>";
                        }
                        var _Services = "";
                        for (var i = 0; i < d.Services.length; i++) {
                            _Services += d.Services[i].ServiceName + ",";
                        }
                        var WithName = '';
                        if (NS_IsProvider) {
                            WithName = d.ClientInfo.FirstName + ' ' + NS_IntialLetter(d.ClientInfo.LastName);
                        }
                        else {
                            WithName = d.ProviderInfo.FirstName + ' ' + NS_IntialLetter(d.ProviderInfo.LastName);
                        }
                        // call the 'content' method to update the content of our tooltip with the returned data
                        var _HTML = '<div class="tp"> <div class="sce"><div class="left"> ' +
                            '<div class="date">' + ((d.ForDate == '') ? '&nbsp;' : NS_FormatDate(d.ForDate, 'dd')) + ' <span>' + ((d.ForDate == '') ? '&nbsp;' : NS_FormatDate(d.ForDate, 'MM')) + '</span></div>' +
                            '<div class="time">' + d.AtTime + '</div>' +
                            '</div><div class="right">' + _Header +
                            '<p>At: <span class="blue">' + d.Location.City + ',' + d.Location.State + '</span></p>' +
                            '<p>With: <span class="blue">' + WithName + '</span></p>' +
                            '<p>Service(s): <span class="blue">' + _Services + '</span></p>' +
                            '</div></div> </div>';
                        instance.content(_HTML);
                        // to remember that the data has been loaded
                        $origin.data('loaded', true);
                    });
                }
            }
        });
        $('.NSUserTip').tooltipster({
            content: 'Loading...', contentAsHTML: true, interactive: true,
            // 'instance' is basically the tooltip. More details in the "Object-oriented Tooltipster" section.
            functionBefore: function (instance, helper) {
                var $origin = $(helper.origin);
                // we set a variable so the data is only loaded once via Ajax, not every time the tooltip opens
                if ($origin.data('loaded') !== true) {
                    var URL = "/DesktopModules/NS_ServiceDashboard/rh.asmx/GetUserPic";
                    var data = "{'UID':'" + helper.origin.id.split('_')[1] + "'}";
                    var _HTML = "";
                    NS_MakeRequest(URL, data, function (d) {
                        _HTML = "<img style='height:75px;width:75px;' src='" + d + "'/>";
                        instance.content(_HTML);
                        // to remember that the data has been loaded
                        $origin.data('loaded', true);
                    });
                }
            }
        });
    }
    function NS_ScrollToNoti() {
        $('html, body').animate({
            scrollTop: $("#dvNotificationSec").offset().top
        }, 500);
    }
    function RemoveMyNotification(ID, event) {
        event.stopPropagation();
        bootbox.confirm('Are you sure to remove this information ?', function (r) {
            if (r) {
                var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/RemoveNotification";
                var _data = "{'ID':'" + ID + "'}";
                NS_MakeRequest(_URL, _data, function () {
                    bootbox.alert('Notification removed successfully', function () {
                        $("#dvNotiRow_" + ID).fadeOut(500, function () { $(this).remove(); });
                        if ($(".notiwrapper ul>li").length == 0) {
                            $("#dvClearAll").hide();
                        }
                    });
                });
            }
        });
    }

    function NS_ClearAll() {
        bootbox.confirm('Are you sure to remove ALL notifications ?', function (r) {
            if (r) {
                var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/RemoveUserNotification";
                var _data = "{'UID':'" + NS_UP_UID + "'}";
                NS_MakeRequest(_URL, _data, function () {
                    bootbox.alert('Notification removed successfully', function () {
                        GetMyNotification();
                    });
                });
            }
        });
    }

    function NS_LoadServices() {
        var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetServicesIn2"
        var _data = "{'SID':'-1',UID:" + NS_UP_UID+"}";
        NS_MakeRequest(_URL, _data, NS_LoadServices_SuCB);
    }
    function NS_LoadServices_SuCB(d) {
        // $("#NSUP_dvSRVC").show();
        $("#NSUP_dvSRVC").setTemplateURL('/DesktopModules/NS_Registration/templates/tmpServiceTree2.htm');
        $("#NSUP_dvSRVC").processTemplate(d).show();
        $(".NSRAccor").accordion({
            heightStyle: "content", collapsible: true, event: "click hoverintent"
        });
        $("#NSUP_dvSRVC > DIV > DIV").addClass("ServiceTL");
    }

    function NS_InitMap(rows) {
        var coords = [];
        var geocoder = new google.maps.Geocoder();
        var address = rows.Street + ", " + rows.City + ", " + rows.Region + " " + rows.PostalCode;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                coords.push(results[0].geometry.location);
                plotmap(coords, address);
            }
        });
    }
    var marker; var infoWindow; var map;
    var geocoder = new google.maps.Geocoder();
    var addressConfirmed = false;
    function plotmap(coords, address) {
        var MapID = "NS_ContactMap"
        var mapCanvas = document.getElementById(MapID);
        var geocoder = new google.maps.Geocoder(); $("#" + MapID).show();
        var _Lati = 0; _longi = 0;
        _Lati = coords[0].lat();
        _longi = coords[0].lng()
        var mapOptions = {
            zoom: 14,
            center: new google.maps.LatLng(_Lati, _longi),
            fullscreenControl: false,
            panControl: false,
            zoomControl: false, scaleControl: false, streetViewControl: false
        };
        map = new google.maps.Map(document.getElementById(MapID),
            mapOptions);
        // Adding marker and infobox
        var LatLng = { lat: _Lati, lng: _longi };
        var _Content = '<div id="iw" style="max-width:240px">' + address + '<br/><br/>Note: Please drag this red marker to set address</div>';
        infoWindow = new google.maps.InfoWindow({
            content: _Content
        });
        marker = new google.maps.Marker({
            position: LatLng, animation: google.maps.Animation.DROP,
            map: map, draggable: true
        });
        map.setCenter(coords);
        infoWindow.open(map, marker);
        google.maps.event.addListener(marker, 'dragend', function (evt) {
            //document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
            geocode(evt.latLng);
        });
        google.maps.event.addListener(marker, 'dragstart', function (e) {
            infoWindow.close();
        });
    }

    function geocode(position) {
        geocoder.geocode({
            latLng: position
        }, function (responses) {
            var html = '';
            if (responses && responses.length > 0) {
                html += 'Postal Address:<br/>' + responses[0].formatted_address + "<br/><br/><a href='#' onclick='addressConfirmed=true;return false;'>Verify This</a>";
                $("#txtStr").attr('Lati', marker.getPosition().lat().toFixed(3));
                $("#txtStr").attr('Long', marker.getPosition().lng().toFixed(3));
            } else {
                html += 'Sorry but Google Maps could not determine the approximate postal address of this location.';
                $("#txtStr").attr('Lati', -1);
                $("#txtStr").attr('Long', -1);
                addressConfirmed = false;
            }
            map.panTo(marker.getPosition());
            infoWindow.setContent("<div id='iw' style='max-width:250px;color:#000'>" + html + "</div>");
            infoWindow.open(map, marker);
        });
    }
    function showAddress() {
        var val = $("#txtStr").val().trim() + ", " + $("#txtCity").val().trim() + ", " + $("#ddlRegion").val() + " " + $("#txtPC").val();
        infoWindow.close();
        geocoder.geocode({
            'address': decodeURI(val)
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                marker.setPosition(results[0].geometry.location);
                geocode(results[0].geometry.location);
            } else {
                infoWindow.setContent("<div id='iw' style='max-width:250px;color:#000'>Sorry but Google Maps could not find this location.</div>");
                infoWindow.open(map, marker);
                addressConfirmed = false;
            }
        });
    }
    function UpdateInputBoxes() {

    }
</script>