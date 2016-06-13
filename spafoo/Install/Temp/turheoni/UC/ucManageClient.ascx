<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucManageClient.ascx.cs" Inherits="Netsam.Modules.ManageScheduledServices.UC.ucManageClient" %>
<div class="bread">
    <a href="#" onclick="GoBack();return false;" class="pback"><i class="fa fa-angle-left fa-2x"></i></a>
    <div class="ptitle">
        <label id="lblTopHeader">My Schedule</label>
    </div>
</div>
<div class="inbody-simple">
    <div id="dbClientSchedule" class="myschedule">
    </div>
    <div id="dvProviderID" style="display: none;"></div>
    <div id="dvClientRating" style="display: none"></div>
</div><script src="/DesktopModules/NS_ManageScheduledServices/Scripts/mClient.js"></script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places"></script>