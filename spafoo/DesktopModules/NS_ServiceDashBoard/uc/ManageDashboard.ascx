<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ManageDashboard.ascx.cs" Inherits="Netsam.Modules.ServiceDashBoard.uc.ManageDashboard" %>
<div id="NS_dvDashboardOuter" style="width:100%;">
    <div class="bread">
        <div class="pback" onclick="NS_OnPreviousClick(event); return false;"><i class="fa fa-angle-left fa-2x"></i></div>
        <div class="ptitle">
            <label id="NS_TopBarlblHeader" class="NS_TopHeader">Select Service</label>
        </div>
    </div>
    <div id="NS_dvDBBottomBar">
        <div id="NS_dvDBServiceBar" class="inbody-simple"></div>
        <div id="NS_dvDBProviderBar" class="inbody-simple" style="display: none;"></div>
        <div id="NS_dvDBProProfile" class="inbody pprofile" style="display: none;"></div>
    </div>
</div>
<link rel="stylesheet" href="/DesktopModules/NS_ServiceDashBoard/css/fontawesome-stars.css">
<link href="/DesktopModules/NS_ServiceDashBoard/Styles/Styles/jquery.fancybox.css" rel="stylesheet" />
<link href="/DesktopModules/NS_ServiceDashBoard/Styles/style.css" rel="stylesheet" />
<style>
.NS_TopHeader {color: darkblue;font-size: 20px;text-transform: uppercase;}
#NS_dvDBTopBar{background-color: lightgray;height: 60px;line-height:60px;}
.NS_BottomBar {background-color:white;padding:10px;}
.NSD_SName {font-size: 20px !important;width:100%;color:darkblue !important;}
.NSD_SDesc {font-size: 15px !important;font-weight: normal;width: 100%;color:green !important;}
.NSD_SInfo {font-size: 15px !important;font-weight: normal;width: 100%;color:black !important;}
.NSD_SRows {height:25px;width:100%;margin-top:10px !important;}
.NSD_EachRow {cursor:pointer;margin-bottom:25px;width:100%;}
</style>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-jtemplates/jquery-jtemplates.js"></script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-barrating/jquery.barrating.min.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-fancybox/jquery.fancybox.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery.cookie/jquery.cookie.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/UC/MDashboard.js"></script>

