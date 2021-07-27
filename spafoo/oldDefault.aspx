<%@ Page Language="C#" AutoEventWireup="false" Inherits="DotNetNuke.Framework.DefaultPage" CodeFile="Default.aspx.cs" %>
<%@ Register TagPrefix="dnncrm" Namespace="DotNetNuke.Web.Client.ClientResourceManagement" Assembly="DotNetNuke.Web.Client" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Common.Controls" Assembly="DotNetNuke" %>
<asp:literal id="skinDocType" runat="server" ViewStateMode="Disabled"/>
<html <asp:literal id="attributeList" runat="server" ViewStateMode="Disabled"></asp:literal>>
<head id="Head" runat="server" ViewStateMode="Disabled">
    <asp:PlaceHolder runat="server" ID="metaPanel"></asp:PlaceHolder>
    <title />
    <meta id="MetaRefresh" runat="Server" http-equiv="Refresh" name="Refresh" Visible="False" />
    <meta id="MetaDescription" runat="Server" name="DESCRIPTION" Visible="False"/>
    <meta id="MetaKeywords" runat="Server" name="KEYWORDS" Visible="False"/>
    <meta id="MetaCopyright" runat="Server" name="COPYRIGHT" Visible="False"/>
    <meta id="MetaGenerator" runat="Server" name="GENERATOR" Visible="False"/>
    <meta id="MetaAuthor" runat="Server" name="AUTHOR" Visible="False"/>
    <meta id="MetaRobots" runat="server" name="ROBOTS" Visible="False" /> 
<!-- Google Tag Manager -->
<script>    (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({ 'gtm.start':
new Date().getTime(), event: 'gtm.js'
        }); var f = d.getElementsByTagName(s)[0],
j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-PT5Q22Z');</script>
<!-- End Google Tag Manager -->

   
    <asp:PlaceHolder runat="server" ID="ClientDependencyHeadCss"></asp:PlaceHolder>
    <asp:PlaceHolder runat="server" ID="ClientDependencyHeadJs"></asp:PlaceHolder>
    <asp:placeholder id="CSS" runat="server" />
    <asp:placeholder id="SCRIPTS" runat="server" />
    <script language="JavaScript" type="text/javascript">
		
// defining flags
var isCtrl = false;
var isShift = false;

// the magic :)
$(document).ready(function() {
	
	
	// action on key up
	$(document).keyup(function(e) {

		if(e.which == 17) {
			isCtrl = false;
		}
		if(e.which == 16) {
			isShift = false;
		}
	});
	// action on key down
	$(document).keydown(function(e) {
		if(e.which == 17) {
			isCtrl = true; 
		}
		if(e.which == 16) {
			isShift = true; 
		}
		if(e.which == 65 && isCtrl && isShift) { 
			
var url =$(location).attr('href')+"?ctl=login";   
$(location).attr('href',url);
		} 
if(e.which == 90 && isCtrl && isShift) { 
		
var url ="/admin/ctl/logoff.aspx";    
$(location).attr('href',url);
		} 
	});
	
});		
		
</script>

<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '139757323233151'); 
fbq('track', 'PageView');
</script>

<noscript>
<img height="1" width="1" src="https://www.facebook.com/tr?id=139757323233151&ev=PageView &noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->

</head>
<body id="Body" runat="server">
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PT5Q22Z"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->


    <dnn:Form ID="Form" runat="server" ENCTYPE="multipart/form-data">
        <asp:PlaceHolder ID="BodySCRIPTS" runat="server" />
        <asp:Label ID="SkinError" runat="server" CssClass="NormalRed" Visible="False"></asp:Label>
        <asp:PlaceHolder ID="SkinPlaceHolder" runat="server" />
        <input id="ScrollTop" runat="server" name="ScrollTop" type="hidden" />
        <input id="__dnnVariable" runat="server" name="__dnnVariable" type="hidden" autocomplete="off" />
        <asp:placeholder runat="server" ID="ClientResourcesFormBottom" />
    </dnn:Form>
    <asp:placeholder runat="server" id="ClientResourceIncludes" />
    <dnncrm:ClientResourceLoader runat="server" id="ClientResourceLoader">
        <Paths>
            <dnncrm:ClientResourcePath Name="SkinPath" Path="<%# CurrentSkinPath %>" />
            <dnncrm:ClientResourcePath Name="SharedScripts" Path="~/Resources/Shared/Scripts/" />
        </Paths>
    </dnncrm:ClientResourceLoader><a href="https://ww1.123moviesfree.net"><span style="font-size: 0.01px;">123movies</span></a>
</body>
</html>