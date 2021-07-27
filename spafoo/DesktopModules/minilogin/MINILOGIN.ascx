<%@ Control Language="C#" AutoEventWireup="true" Inherits="MINILOGIN.MINILOGIN" %>
<asp:Panel ID="plIsNewVersion" runat="server">
    <asp:Panel ID="plLogin" runat="server">
        <table>
            <tr>
                <td valign="top">
                    <asp:UpdatePanel ID="upMessage" runat="server">
                        <ContentTemplate>
                            <asp:Literal ID="litMessage" runat="server" Visible="false"></asp:Literal>
                        </ContentTemplate>
                        <Triggers>
                          <asp:AsyncPostBackTrigger ControlID="btnLogin" EventName="Click" />
                        </Triggers>
                    </asp:UpdatePanel>
                </td>
                <td nowrap="nowrap">
                    <asp:Label ID="lblUserName" runat="server" CssClass="subhead"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtUserName" runat="server" TabIndex="200" ValidationGroup="login"
                        Width="60"></asp:TextBox>
                </td>
                <td>
                    <asp:Label ID="lblPassword" runat="server" CssClass="subhead"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtPassword" runat="server" TabIndex="201" TextMode="Password" ValidationGroup="login"
                        Width="50"></asp:TextBox>
                </td>
                <td>
                    <asp:Button ID="btnLogin" runat="server" OnClick="btnLogin_Click" CssClass="subhead" />
                </td>
                <td>
                </td>
                <td>
                    <asp:LinkButton ID="lbRegister" runat="server" CssClass="subhead" OnClick="lbRegister_Click"
                        TabIndex="203"></asp:LinkButton>
                </td>
                <td>
                </td>
                <td>
                    <asp:CheckBox ID="cbAutoLogin" runat="server" CssClass="subhead" />
                </td>
            </tr>
        </table>
    </asp:Panel>
    <asp:Panel ID="plHasLogin" runat="server">
        <table>
            <tr>
                <td>
                    <asp:LinkButton ID="lbUserInfo" runat="server" CssClass="subhead" OnClick="lbUserInfo_Click"></asp:LinkButton>
                </td>
                <td>
                </td>
                <td>
                    <asp:LinkButton ID="lbLogout" runat="server" CssClass="subhead" OnClick="lbLogout_Click"></asp:LinkButton>
                </td>
            </tr>
        </table>
    </asp:Panel>
</asp:Panel>
<asp:PlaceHolder ID="phNewVersion" runat="server"></asp:PlaceHolder>

<script language="javascript" type="text/javascript">
<!--
function UnVisible(sd)
{
document.getElementById(sd).style.visibility='hidden';
}

-->
</script>

