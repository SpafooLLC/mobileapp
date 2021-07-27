<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Settings.ascx.cs" Inherits="DNNspot.BecomeUser.Settings" %>
<table class="DNNspotSitemapSettings" style="width: 100%">
    <tr>
        <td style="width: 150px">
            Show Search Option
        </td>
        <td>
            <asp:CheckBox ID="chkShowSearch" runat="server" /><br />
        </td>
    </tr>
    <tr>
        <td style="width: 150px">
            Hide Admin Users in List
        </td>
        <td>
            <asp:CheckBox ID="chkHideAdmin" runat="server" /><br />
        </td>
    </tr>
    <tr>
        <td>
            Load Users by Default<br />
            <br />
        </td>
        <td>
            <asp:CheckBox ID="chkDefaultLoad" runat="server" /><br />
            You may want to uncheck this option if you have thousands of users for better performance.
        </td>
    </tr>
    <tr>
        <td>Show Roles</td>
        <td><asp:CheckBoxList ID="cblHideRoles" runat="server"></asp:CheckBoxList></td>
    </tr>
</table>
