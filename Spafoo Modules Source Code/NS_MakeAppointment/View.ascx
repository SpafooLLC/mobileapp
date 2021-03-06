﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Netsam.Modules.MakeAppointment.View" %>
<div class="bread">
    <div class="pback" onclick="NS_GoBack(event); return false;"><i class="fa fa-angle-left fa-2x"></i></div>
    <div class="ptitle">
        <label id="NS_TopBarlblHeader" class="NS_TopHeader">Make Appointment With</label>
    </div>
</div>
<div id="dvMakeAppointment" class="inbody NS_On" title="Make Appointment With">
    <div class="makeapp" style="margin-bottom:10px;"><a href="#" onclick="ShowProID();return false;" title="View Profile" id="NS_lblProName"></a></div>
    <select class="nsmasa maddcont" id="NS_MA_SelectAddress" onchange="NS_MA_GetUserAddress(this);" >
        <option class="fa fa-location-arrow" value="MyCurrent">&nbsp;&nbsp; My Current Location</option>
        <option class="fa fa-map-marker" selected value="MyProfile">&nbsp;&nbsp; My Profile Address</option>
        <option class="fa fa-cog" value="Custom">&nbsp;&nbsp; My Custom Address</option>
    </select>
    
    <div id="NS_MA_dvSelectAddress" style="width: 100%; margin-top: 15px; background-color: rgb(255, 255, 255); padding: 5px; margin-bottom: 10px; border-radius: 5px;">
        <div><a class="deleteadd" title="Delete this address" onclick="$(this).parent().parent().hide();"><i class="fa fa-trash-o fa-lg"></i></a></div>
        <div class="nsrow">
            <input type="text" id="NS_MA_txtAddress" class="form-control" placeholder="Address" style="width: 100%; display: inline;" />
        </div>
        <div class="nsrow">
            <div class="col-md-6 nopadl"><input type="text" id="NS_MA_txtCity" class="form-control" placeholder="City" /></div>
            <div class="col-md-4">
                <select id="NS_MA_txtState" class="form-control"></select>
            </div>
            <div class="col-md-2 nopadr"><input type="text" id="NS_MA_txtZip" class="form-control" placeholder="Zip"/></div>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="fcell" style="margin-top:30px;" >
        <div class="col-md-6 nopadl NS_Soon" style="display:none;">
             <input type="text" id="txtOrderDate" placeholder="Select Date" class="form-control" data-role="datebox" data-options='{"mode":"flipbox","overrideDateFormat": "%m/%d/%Y"}' />
        </div>
        <div class="col-md-6 nopadr NS_Soon" style="display:none;">
            <input type="text" id="txtOrderTime" placeholder="Select Time" data-options='{"mode":"timeflipbox"}' data-role="datebox" class="form-control" readonly="readonly">
        </div>
        <div class="clear h30"></div>
        <p class="bmar-sm">Select Service(s)</p>
        <div id="dvProviderServices"></div>
        <div class="bmar-md"></div>
        <textarea name="txtComment" id="txtComment" class="form-control" rows="5" placeholder="Optional Comment" onkeyup="textCounter(this, 'remainingMA', 500);"></textarea>
        <span id="remainingMA"></span>
        <p class="bmar-xs" style="display:none;">Soonest appointment available?</p>
        <a href="#" class="green-rounded" style="display:none;">ASAP</a>
    </div>
    <div class="clear h30"></div>
    <a class="block-btn" id="btnAppUpdate" onclick="NSD_MA_SaveNOrderSummary(event);">Continue</a>
</div>
<div id="dvOrderSummary" class="inbody NS_Off" title="Order Summary"></div>
<div id="dvTimeSlot" class="inbody NS_Off" title="Select Date & Time slot">
    <div class="pctip">
      <ul>
        <li class="pava">Provider Not Available </li>
        <li class="pres">Already Reserved</li>
      </ul>
    </div>
    <div id="NS_dvCaldendar"></div>
    <div id="NS_dvSliderOuter" style="padding:10px 20px;display:none;">
        <div class="times-header">
             Time slot for date: <span><label id="lblSlotDate"></label></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total Service Session: <span><label id="lblServiceSession"></label></span>
        </div>
        <div class="chosens">Chosen slot: [<label id="NS_lblStartHour"></label> &nbsp;-&nbsp;<label id="NS_lblEndHour"></label>]</div>
        <div id="NS_dvTimeSlider"></div>
        <div class="tsinfo">(move the blue handle, to select the slot of your preference)</div>
        <div class="tsbottom">
            
            
            <span id="lblAvailability">Availability:</span>
            <label id="lblAvail"></label><br />
            <img style="display:none;" id="imgAvail" />
        </div>
    </div>
</div>
<div id="dvPaymentMethod" class="inbody NS_Off" title="Payment Method"></div>
<div id="dvCreditCard" class="inbody NS_Off" title="Payment Information"></div>
<style>
.NS_close {
    float: right;
    display: inline-block;
    padding: 2px 5px;
    background: #ccc;
    font-size:12px;
}
.NS_On{display:block;}
.NS_Off{display:none;}
.fc-time{display:none !important;}
.fc-content{text-align:center !important;}
</style>
<link href="/DesktopModules/NS_UserProfile/Scripts/pace/dataurl.css" rel="stylesheet" />
<script src="/DesktopModules/NS_UserProfile/Scripts/pace/pace.min.js"></script>
<link href="/DesktopModules/NS_MakeAppointment/Styles/checkbox.css" rel="stylesheet" />
<link href="/DesktopModules/NS_MakeAppointment/Scripts/fullcalendar/fullcalendar.min.css" rel="stylesheet" />
<link href="/DesktopModules/NS_Registration/bootstrap.css" rel="stylesheet" />
<link rel="stylesheet" href="http://cdn.jtsage.com/jtsage-datebox/4.0.0/jtsage-datebox-4.0.0.bootstrap.min.css" />
<link href="/DesktopModules/NS_ServiceDashBoard/Styles/style.css" rel="stylesheet" />
<link href="/DesktopModules/NS_ServiceDashBoard/Styles/bootstrap-select.css" rel="stylesheet" type="text/css" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.css" rel="stylesheet" />
<link href="/DesktopModules/NS_MakeAppointment/Scripts/jqRangeSlider/iThing-min.css" rel="stylesheet" />
<script src="/DesktopModules/NS_MakeAppointment/Scripts/fullCalendar/moment.min.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/NS_Common.js" ></script>
<script src="/DesktopModules/NS_MakeAppointment/Scripts/bootstrap.js"></script>
<script type="text/javascript" src="http://cdn.jtsage.com/jtsage-datebox/4.0.0/jtsage-datebox-4.0.0.bootstrap.min.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false&libraries=places"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-jtemplates/jquery-jtemplates.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-fancybox/bootstrap-select.js"></script>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/bootbox.min.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery.cookie/jquery.cookie.js"></script>
<script src="/DesktopModules/NS_MakeAppointment/Scripts/Module_v2.0.js"></script>
<script src="/DesktopModules/NS_Registration/Scripts/jquery.mask.min.js"></script>
<script src="/DesktopModules/NS_MakeAppointment/Scripts/fullCalendar/fullcalendar.min.js"></script>
<script src="/DesktopModules/NS_MakeAppointment/Scripts/jqRangeSlider/jQDateRangeSlider-withRuler-min.js"></script>
<script >
    var NS_MA_ClientID=<%=this.UserId%>;
    var NS_MyScheduleTab='<%=this.MyScheduleTab%>';
    var NSR_DashboardTab='<%=this.DashboardTab%>';
    var NSR_MyProfile='<%=this.MyProfileTab%>';
</script>