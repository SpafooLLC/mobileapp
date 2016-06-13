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
      <a href="#reg" class="reg_login">Register to become a new client</a>
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
                  <li><a href="#" class="mhlink">About Spafoo </a><img src="<%=SkinPath%>Images/mabout.png" /></li>
                  <li><a href="#" class="mhlink">Share This App with Friends</a><img src="<%=SkinPath%>Images/mshare.png" /></li>
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
        <li><a href="#"><img src="<%=SkinPath%>Images/app-apple.png" /></a></li>
        <li><a href="#"><img src="<%=SkinPath%>Images/app-google.png" /></a></li>
      </ul> 
      <div class="downapp">Download the Spafoo app</div>
    </div>
  </div>
  <div class="banner-wrapper">
    <div class="hbp" id="BannerPane" runat="server"></div>
  </div>
  <div class="main-body">
    <div class="hcp" id="ContentPane" runat="server"></div>
    <div class="clearfix"></div>
    <div class="wbox" id="reg">
      <div class="col-md-7 hlp" id="LeftPane" runat="server"></div>
      <div class="col-md-5 hrp" id="RightPane" runat="server"></div>
    </div>
  </div>
  
</div>
<div class="footer">
  <div class="container terms_privacy">
     <p><dnn:LINKS runat="server" id="dnnLINKS" CssClass="bottomlinks" Level="Root" Separator="&nbsp;&nbsp; &#8226; &nbsp;&nbsp;" />&nbsp;&nbsp; &#8226; &nbsp;&nbsp;<dnn:USER CssClass="bottomlinks" ID="dnnUser" runat="server" LegacyMode="true" /></p>
     <dnn:COPYRIGHT runat="server" id="dnnCOPYRIGHT" CssClass="Copyright" /> | <a href="/Terms-Of-Use" class="terms_privacy">Terms Of Use</a> | <a href="/Privacy-Statement" class="terms_privacy">Privacy Statement</a>
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



