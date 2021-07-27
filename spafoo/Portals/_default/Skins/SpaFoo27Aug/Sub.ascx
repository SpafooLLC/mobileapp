<%@ Control language="vb" AutoEventWireup="false" Explicit="True" Inherits="DotNetNuke.UI.Skins.Skin" %>
<%@ Register TagPrefix="dnn" TagName="LOGO" Src="~/Admin/Skins/Logo.ascx" %>
<%@ Register TagPrefix="dnn" TagName="USER" Src="~/Admin/Skins/User.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LOGIN" Src="~/Admin/Skins/Login.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LANGUAGE" Src="~/Admin/Skins/Language.ascx" %>
<%@ Register TagPrefix="dnn" TagName="COPYRIGHT" Src="~/Admin/Skins/Copyright.ascx" %>
<%@ Register TagPrefix="dnn" TagName="PRIVACY" Src="~/Admin/Skins/Privacy.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LINKS" Src="~/Admin/Skins/Links.ascx" %>
<%@ Register TagPrefix="dnn" TagName="TERMS" Src="~/Admin/Skins/Terms.ascx" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.DDRMenu.TemplateEngine" Assembly="DotNetNuke.Web.DDRMenu" %>
<%@ Register TagPrefix="dnn" TagName="MENU" src="~/DesktopModules/DDRMenu/Menu.ascx" %>
<%@ Register TagPrefix="dnn" TagName="SEARCH" Src="~/Admin/Skins/Search.ascx" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.Client.ClientResourceManagement" Assembly="DotNetNuke.Web.Client" %>
<script type="text/javascript" language="javascript">
	$(document).ready(function() {
		$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0"/>');
	});	
</script>
<script type="text/javascript">
animatedcollapse.addDiv('pixmenu', 'fade=1,hide=0')
animatedcollapse.ontoggle=function($, divobj, state){}
animatedcollapse.init()
</script>
<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!-- [if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif] -->
<link href="Skin.css" rel="stylesheet" type="text/css" />
 

<div id="jmobileicos"><a href="<%= SkinPath %>#" rel="toggle[pixmenu]"><div id="jmenuico"></div></a></div>

<div class="container">
  <div class="header">
    <div class="hfleft">
      <a href="Customer-Login" class="reg_login">Provider Login</a> &nbsp;&nbsp;&nbsp;<a href="Client-Registration" class="reg_login">Become A Client</a>
      <div class="tagline">On site hair and body services from your phone.</div>
    </div>
    <div class="xs-logo"><dnn:LOGO runat="server" id="dnnLOGO2" BorderWidth="0" /></div>
    <div class="menuright">
      <div class="titre">
         <div class="arrow-img arotate2"></div>
      </div>
      <div class="image_trombi">
        <div class="nav-wrapper">
          <div class="container">
            <div class="rmenu">
              <dnn:Menu MenuStyle="DNNStandard" runat="server"></dnn:Menu>
              <div class="hardmenu">
                <ul>
                  <!--<li><a href="My-Profile" id="NavNotifiation" class="mhlink">My Account &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div  class="mnotification"><div class="ico"><i class="fa fa-bell fa-2x"></i></div><div class="notification">0</div></div></a></li>-->
                  <li><a href="About-Spafoo" class="mhlink">About Spafoo </a><img src="<%=SkinPath%>Images/mabout.png" /></li>
                  <!--<li><a href="#" class="mhlink">Share This App with Friends</a><img src="<%=SkinPath%>Images/mshare.png" /></li>-->
                  <li><dnn:LOGIN ID="dnnLogin" CssClass="mhlink" runat="server" LegacyMode="true" /><img src="<%=SkinPath%>Images/mlogin.png" /></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hfright">
      <ul class="tapps">
        <li><a href="https://itunes.apple.com/us/app/spafoo/id1182959231?mt=8"><img class="appbadge" src="<%=SkinPath%>Images/apple-badge.svg" /></a></li>
        <li><a href='https://play.google.com/store/apps/details?id=com.spafoollc '><img class="gbadge" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a></li>
      </ul> 
      <div class="downapp">Download the Spafoo app</div>
    </div>
  </div>
  <div class="main-body-sub" id="reg">
    <div class="hcp" id="ContentPane" runat="server"></div>
    <div class="clearfix"></div>
    <div class="col-md-7 hlp" id="LeftPane" runat="server"></div>
    <div class="col-md-5 hrp" id="RightPane" runat="server"></div>
    <div class="clearfix"></div>
    <div class="col-md-7 hlp" id="MLeftPane" runat="server"></div>
    <div class="col-md-4 col-md-offset-1 hrp" id="MRightPane" runat="server"></div>
    <div class="clearfix"></div>
    <div class="col-md-3 chlp" id="ContentLeft" runat="server"></div>
    <div class="col-md-9 chrp" id="ContentRight" runat="server"></div>
  </div>
  
</div>
<div class="footer">
  <div class="container">
    <div class="terms_privacy fleft">
     <p class="bottomlinks"><a class="bottomlinks" href="/Home">Home</a>&nbsp;&nbsp; &#8226; &nbsp;&nbsp;<a class="bottomlinks" href="/Services1">Professional Services</a>&nbsp;&nbsp; &#8226; &nbsp;&nbsp;<a class="bottomlinks" href="/Find-Provider">Find Provider</a>&nbsp;&nbsp; &#8226; &nbsp;&nbsp;<a class="bottomlinks" href="/Service-Provider">Service Provider</a>&nbsp;&nbsp; &#8226; &nbsp;&nbsp;<a class="bottomlinks" href="/Price-List">Price List</a>&nbsp;&nbsp; &#8226; &nbsp;&nbsp;<a class="bottomlinks" href="/AvailableCities">Available Cities</a>&nbsp;&nbsp; &#8226; &nbsp;&nbsp;
       <dnn:LOGIN ID="dnnLogin2" CssClass="bottomlinks" runat="server" LegacyMode="true" /></p>
     <dnn:COPYRIGHT runat="server" id="dnnCOPYRIGHT" CssClass="Copyright" /> | <a href="/Terms-Of-Use" class="terms_privacy">Terms Of Use</a> | <a href="/Privacy-Statement" class="terms_privacy">Privacy Statement</a>
    </div>
    <div class="fright">
      <div id="socialico">
        <ul class="social-networks">
           <li><a href="https://www.facebook.com/SpaFoo-386817744860145/" class="facebook" target="_blank">Facebook</a>
           <div class="popup"><div class="holder"><p>Facebook</p></div></div></li>
           <li><a href="http://instagram.com/spafoo/ " class="instagram" target="_blank">Instagram</a>
           <div class="popup"><div class="holder"><p>Instagram</p></div></div></li>
           <li><a href="https://twitter.com/spafoo " class="twitter" target="_blank">Twitter</a>
           <div class="popup"><div class="holder"><p>Twitter</p></div></div></li>
        </ul>    
        </div>
    </div>
  </div>
</div>


<dnn:DnnCssInclude runat="server" FilePath="DNNStandard/StandardMenu.css" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="DNNStandard/StandardMenu.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="Scripts/animatedcollapse.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="~/Resources/Shared/Scripts/jquery/jquery.hoverIntent.min.js" />
<dnn:DnnJsInclude runat="server" FilePath="Scripts/jquery.cycle.all.js" PathNameAlias="SkinPath" />
<script type="text/javascript">
$(document).ready(function() {
    $('.image_trombi').hide();
    $('.titre').click(function() {     
          $(this).next().slideToggle();
          return false;
    });
	$('.titre').on("click", function (event) {
    $('.arrow-img').toggleClass('arotate');
    $('.arrow-img').toggleClass('arotate2');
});
});
</script>
<script type="text/javascript">
function NS_GetUserNotification() {
    var WBurl = '/DesktopModules/NS_MakeAppointment/rh.asmx/GetUserNotification';
    $.ajax({
        type: "POST", dataType: "json", contentType: "application/json; charset=utf-8", url: WBurl,
        success: function (d, resp) {
            $(".notification").text(d.d);
        }
    });
}
$(document).ready(function () {
    NS_GetUserNotification();
});
</script>

