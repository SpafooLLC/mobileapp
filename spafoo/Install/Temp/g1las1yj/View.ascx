<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Netsam.Modules.NS_FindProvider.View" %>
<div class="bread">
  <a href="" onClick="window.history.go(-1); return false;" class="pback"><i class="fa fa-angle-left fa-2x"></i></a>
  <div class="ptitle">Find Provider</div>
</div>
<div class="fpselect">
  <p class="bmar-sm blue bold">Select Service For</p>
  <select id="ddlServices">
  </select>
</div>
<div class="provermap">
  <div id="mapcanvas" style="width:100%;height:300px;"></div>
</div>
<div class="fpbottom" style="display:none;padding-top:10px;">
    <div class="proinfo">
      <img id="imgUser"  alt=""/>
      <h3><label id="lblUserName"></label></h3>
      <p>Have a great hair day!</p>
    </div>
    <div class="action">
      <div class="col-xs-6 nopad"><a href="#" class="green-btn block mr1px" onclick="NS_GotoMakeAppointment();">ASAP - I'm Ready Now!</a></div>
      <div class="col-xs-6 nopad"><a href="#" class="green-btn block ml1px" onclick="NS_GotoMakeAppointment();">Schedule Appointment</a></div>
    </div>
  </div>
<link href="/DesktopModules/NS_ServiceDashBoard/Styles/style.css" rel="stylesheet" />
<link href="/DesktopModules/NS_MakeAppointment/Styles/bootstrap.min.css" rel="stylesheet" />
<link href="/DesktopModules/NS_FindProvider/Scripts/multiselect/bootstrap-multiselect.css" rel="stylesheet" />
<script src="/DesktopModules/NS_MakeAppointment/Scripts/bootstrap.js"></script>
<script src="/DesktopModules/NS_FindProvider/Scripts/multiselect/bootstrap-multiselect.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery.cookie/jquery.cookie.js"></script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places"></script>
<script src="/DesktopModules/NS_FindProvider/Scripts/Module.js"></script>
<script>
    var NS_FP_UID=<%=this.UserId%>;
    var NSR_SEID='<%=this.Session.SessionID%>';
    var NSR_FP_AppointmentTab='<%=this.AppointmentTab%>';
</script>