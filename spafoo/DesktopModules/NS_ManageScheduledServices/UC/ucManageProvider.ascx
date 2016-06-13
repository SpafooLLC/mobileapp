<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucManageProvider.ascx.cs" Inherits="Netsam.Modules.ManageScheduledServices.UC.ucManageProvider" %>
<div class="bread">
  <a href="#" onClick="NS_GoBack();return false;" class="pback"><i class="fa fa-angle-left fa-2x"></i></a>
  <div class="ptitle"><label id="lblTopHeader">My Schedule</label></div>
</div>
<div id="dvMyScheduleMain" class="NS_On">
    <div class="inbody">
        <a href="#" onclick="ShowMySchedule();return false;">
            <div class="gbox">
                <img src="/DesktopModules/NS_MakeAppointment/Images/Site/ico-app.png">
                <h2>Appointments</h2>
            </div>
        </a>
        <a href="#" onclick="ShowMyAvailability();return false;">
            <div class="gbox">
                <img src="/DesktopModules/NS_MakeAppointment/Images/Site/ico-ava.png">
                <h2>Availability</h2>
            </div>
        </a>
    </div>
</div>
<div id="dvMySchedule" class="NS_Off"></div>
<div id="dvAppointmentID" class="NS_Off"></div>
<div id="dvCompleteAppoint" class="NS_Off"></div>
<div id="dvProviderRating" class="NS_Off"></div>
<div id="dvProAvailability" class="NS_Off"></div>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/mProvider.js"></script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places"></script>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/pickmeup/jquery.pickmeup.min.js"></script>
<link href="/DesktopModules/NS_ManageScheduledServices/Scripts/pickmeup/pickmeup.css" rel="stylesheet" />