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

<div class="wrapper">
  <div class="header">
    <div class="xs-logo"><a href="/Home"><img src="<%=SkinPath%>Images/Spafoo-Logo.png" /></a><!--<dnn:LOGO runat="server" id="dnnLOGO2" BorderWidth="0" />--></div>
  </div>
  <div class="main-body">
    <div class="hcp" id="ContentPane" runat="server"></div>
  </div>
</div>



