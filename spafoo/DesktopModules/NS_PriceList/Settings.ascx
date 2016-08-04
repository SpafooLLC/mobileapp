<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Settings.ascx.cs" Inherits="Netsam.Modules.NS_PriceList.Settings" %>
<fieldset>
    <div class="dnnFormItem">
        <asp:Label ID="lblSetting1" runat="server" Text="Render As :"></asp:Label>
        <asp:DropDownList ID="ddlRenderAs" runat="server" >
            <asp:ListItem Text="Price List" Value="PriceList" Selected="True"></asp:ListItem>
            <asp:ListItem Text="Statisitical Report" Value="StatReport" ></asp:ListItem>
        </asp:DropDownList>
    </div>
</fieldset>