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
                <h2>My Appointments<br />(Scheduled and Requested)</h2>
            </div>
        </a>
        <a href="#" onclick="ShowMyAvailability();return false;">
            <div class="gbox">
                <img src="/DesktopModules/NS_MakeAppointment/Images/Site/ico-ava.png">
                <h2>My Calendar<br />(See Calendar and Set Availability)</h2>
            </div>
        </a>
    </div>
</div>
<div id="dvMySchedule" class="NS_Off"></div>
<div id="dvAppointmentID" class="NS_Off"></div>
<div id="dvCompleteAppoint" class="NS_Off"></div>
<div id="dvProviderRating" class="NS_Off"></div>
<div id="dvProAvailability" class="NS_Off"></div>
<div id="dvProViewClient" class="NS_Off"></div>
<div id="dvdirmap"></div>
<div id="NS_dvSliderOuter" style="padding:10px 20px;display:none;">
        <div class="times-header">
             Availability slot for date: <span><label id="lblSlotDate"></label></span>
        </div>
        <div class="chosens">Chosen slot: [<label id="NS_lblStartHour"></label> &nbsp;-&nbsp;<label id="NS_lblEndHour"></label>]</div>
        <div id="NS_dvTimeSlider"></div>
        <div class="tsinfo">(move the blue handle, to specify your availability time frame)</div>
        <div class="tsbottom">
            
            
            <span id="lblAvailability">Availability:</span>
            <label id="lblAvail"></label><br />
            <img style="display:none;" id="imgAvail" />
        </div>
    </div>
<style>
    .fc-time {
        display: none !important;
    }

    .fc-content {
        text-align: center !important;
    }
</style>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/mProvider.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAaMEqVj82GZtDuCqOrf6OwYnMYR_yE0HY"></script>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/pickmeup/jquery.pickmeup.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.css" rel="stylesheet" />
<link href="/DesktopModules/NS_MakeAppointment/Scripts/jqRangeSlider/iThing-min.css" rel="stylesheet" />
<link href="/DesktopModules/NS_MakeAppointment/Scripts/fullcalendar/fullcalendar.min.css" rel="stylesheet" />
<script src="/DesktopModules/NS_MakeAppointment/Scripts/fullCalendar/moment.min.js"></script>
<script src="/DesktopModules/NS_MakeAppointment/Scripts/fullCalendar/fullcalendar.min.js"></script>
<script src="/DesktopModules/NS_MakeAppointment/Scripts/jqRangeSlider/jQDateRangeSlider-withRuler-min.js"></script>
<link href="/DesktopModules/NS_ManageScheduledServices/Scripts/pickmeup/pickmeup.css" rel="stylesheet" />
