<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ManageServices.ascx.cs" Inherits="Netsam.Modules.ServiceDashBoard.uc.ManageServices" %>
<link href="/DesktopModules/NS_ServiceDashBoard/module.css" rel="stylesheet" />
<script src="/DesktopModules/NS_ServiceDashBoard/UC/MServices.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-jtemplates/jquery-jtemplates.js"></script>
<div id="dvServiceOuterHandle" style="width: 100%;">
    <div id="dvServiceTree" class="NS_ServiceTree tree"></div>
    <div id="dvServiceInfo" class="NS_ServiceInfo">
        <div style="margin-bottom: 10px; border-bottom: solid 1px gray;">
            <input type="button" class="dnnSecondaryAction" value="Add New Service at Top" onclick="NS_ClearForm(true)" />&nbsp;&nbsp;
        <input id="NS_SDB_AddNewWithin" type="button" class="dnnSecondaryAction" onclick="NS_ClearForm(false)"  style="display: none;" value="Add new Within" />&nbsp;&nbsp;
        </div>
        <div id="NS_dvServiceInfo" style="width: 100%; height: 100%;"></div>
    </div>
</div>
