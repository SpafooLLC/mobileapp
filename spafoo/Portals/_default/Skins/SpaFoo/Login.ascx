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
<dnn:DnnCssInclude runat="server" FilePath="DNNStandard/StandardMenu.css" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="DNNStandard/StandardMenu.js" PathNameAlias="SkinPath" />
<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!-- [if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif] -->
<header class="header" id="main_header">
  <div class="container">
    <div class="hfleft"><a href="/About-Spafoo" class="qlink">About SpaFoo</a> <span class="hmd">|</span> <a href="/Service-Provider" class="qlink">Become a provider</a></div>
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
                  <li class="mhlink"><a href="/Customer-Login" class="mhlink">Register</a> / <dnn:LOGIN ID="dnnLogin" CssClass="mhlink" runat="server" LegacyMode="true" /></li>
                </ul>
                <ul class="xspps visible-xs">
                  <li><a href="https://itunes.apple.com/us/app/spafoo/id1182959231?mt=8"><img class="appbadge" src="<%=SkinPath%>Images/apple-badge.svg" /></a></li>
                  <li><a href='https://play.google.com/store/apps/details?id=com.spafoollc '><img class="gbadge" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a></li>
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
    </div>
  </div>
</header>
<div class="subbar">
  <div class="incontainer">
    <div class="ptit" id="PageTitle" runat="server"></div>
  </div>
</div>

<div class="incontainer">
  <div class="main-body-sub" id="reg">
    <div class="hcp" id="ContentPane" runat="server"></div>
    <div class="clearfix"></div>
    <div class="col-md-5 hlp fixlog" id="LeftPane" runat="server"></div>
    <div class="col-md-7 hrp" id="RightPane" runat="server"></div>
  </div>
</div>
<div class="gbottom">
  <div class="container">
    <div class="prefoot">
      <div class="left">
        <h3>Download Spafoo today to bring beauty to your door!</h3>
      </div>
      <div class="right">
        <div class="fdload">
         <ul>
           <li><a href="https://itunes.apple.com/us/app/spafoo/id1182959231?mt=8"><img alt="" class="appbadge" src="/portals/0/Images/apple-badge.svg" /></a></li>
           <li><a href="https://play.google.com/store/apps/details?id=com.spafoollc "><img class="gbadge" alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" /></a></li>
         </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="efooter">
  <div class="flogo"><img src="<%=SkinPath%>Images/flogo.png" /></div>
  <ul class="list social-icons">
    <li><a target="_blank" title="Facebook" class="facebook" href="https://www.facebook.com/SpaFoo-386817744860145/"></a> </li>
    <li><a target="_blank" title="Twitter" class="twitter" href="https://twitter.com/spafoo "></a> </li>
    <li><a target="_blank" title="Instagram" class="instagram" href="http://instagram.com/spafoo/"></a> </li>
  </ul>
  <div class="fin">
    <dnn:COPYRIGHT runat="server" id="dnnCOPYRIGHT" CssClass="Copyright" /> <span class="msepb"></span><span class="hidden-xs">|</span> <a href="/Terms-Of-Use" class="terms_privacy">Terms Of Use</a> | <a href="/Privacy-Statement" class="terms_privacy">Privacy Statement</a>
  </div>
</div>


<dnn:DnnJsInclude runat="server" FilePath="Scripts/animatedcollapse.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="~/Resources/Shared/Scripts/jquery/jquery.hoverIntent.min.js" />
<dnn:DnnJsInclude runat="server" FilePath="Scripts/jquery.cycle.all.js" PathNameAlias="SkinPath" />
<script type="text/javascript" src="<%=SkinPath%>Scripts/jquery.flexslider.js"></script>
<script type="text/javascript">
$(window).load(function(){
  $('.flexslider').flexslider({ 
	animation: "fade",
	start: function(slider){
	  $('body').removeClass('loading');
	}
  });
});
</script>
  <script type="text/javascript">
$('.flexslider .slides').hide();
$('.flexslider').append('<img src="<%=SkinPath%>Images/Balls-line.gif" id="loading" />')
$(window).bind('load', function() {
    $('.flexslider #loading').hide();
    $('.flexslider .slides').fadeIn('slow');
});
</script>
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
document.getElementsByName('dnn$ctr447$Login$Login_DNN$txtUsername')[0].placeholder='User Name';
document.getElementsByName('dnn$ctr447$Login$Login_DNN$txtPassword')[0].placeholder='Password';
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

