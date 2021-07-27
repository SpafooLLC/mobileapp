<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucExportEmail.ascx.cs" Inherits="Netsam.Modules.NS_Admin.UC.ucExportEmail" %>
<div style="width:100%;" align="center">
    <input type="radio" name="rdUserType" value="C" id="rdClient"  checked="checked" onclick="NS_LoadUsers('Clients')"/><label for="rdClient">&nbsp;Clients</label> 
    <input type="radio" name="rdUserType" value="C" id="rdPro" onclick="NS_LoadUsers('Providers')"/><label for="rdPro">&nbsp;Providers</label> 
    <input class="blue-btn-sm" type="button" value="Download XL" onclick="NS_ExportList();" />
</div>
<div id="NS_dvUserList" style="width:100%;margin-top:20px;">

</div>
<script src="/DesktopModules/NS_Admin/js/ExportEmail.js"></script>
