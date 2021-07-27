<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucSendNotification.ascx.cs" Inherits="Netsam.Modules.NS_Admin.UC.ucSendNotification" %>
<link href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet">
<script src="/DesktopModules/NS_MakeAppointment\Scripts/bootstrap.js"></script>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/bootbox.min.js" type="text/javascript"></script>
<script src="/DesktopModules/NS_Admin/js/MngNotifications.js"></script>
 <%-- <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">--%>
<div id="NS_Admin_mngApp" style="width:100%;">
<style>
  .ucsn td { padding:10px; }
  .ucsn .blue-btn-sm { margin-left:0; }
</style>
<table border="0" cellpadding="0" cellspacing="0" style="width:100%;" class="ucsn">
    <tr>
        <td>
            <strong>
                <asp:Label ID="Label1" runat="server" Text="Send Notification"></asp:Label></strong>
        </td>
        <td>&nbsp;
               
        </td>
    </tr>
    <tr>
        <td>
            <label>
                <input type="radio" name="rblSendOption" value="OptionRoles" id="rblOptionRole" checked="checked" />&nbsp;To All Users In Role</label>
        </td>
        <td>

            <input type="radio" name="rblSendOption" value="OptionRoles" id="rblOptionUsers" />&nbsp;
            <label for="rblOptionUsers" id="lblOptionUsers">To User(s)</label>
        </td>
    </tr>
    <tr>
        <td>
            <asp:DropDownList ID="ddlRoles" runat="server" CssClass="form-control"></asp:DropDownList></td>
        <td>
            <%--   <select id="ddlUsers" disabled="disabled" class="form-control" ></select>--%>
            <input type="text" id="txtUsers" class="form-control" disabled="disabled" NSA_UID="-1" />
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <textarea id="txtMessage" class="form-control" onkeyup="countChar(this)" style="width:100%;height:100px;" maxlength="255" placeholder="Type in your message." Columns="4" ></textarea>
            <label id="lblMaxChar">(Maximum characters: 255)</label>
        </td>
    </tr>
    <tr>
        <td>
            <asp:Button ID="btnSendNotification" runat="server" Text="Send Message" CssClass="blue-btn-sm" />
        </td>
        <td>&nbsp;
        </td>
    </tr>
    </table>
</div>