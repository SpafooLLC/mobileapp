<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Default.ascx.cs" Inherits="DNNspot.BecomeUser.Default" %>

<div class="BecomeUser">
    <asp:Literal ID="ltLicenseTop" runat="server"></asp:Literal>
    <asp:Panel ID="pnlSearchUser" runat="server">
        <span id="searchforuser">Search for a user</span>
        <asp:TextBox ID="txtSearchText" runat="server"></asp:TextBox>
        <asp:Button ID="btnSearchButton" runat="server" Text="Search" OnClick="btnSearchButton_Click" />
        <asp:LinkButton ID="lnkClearSearch" Text="Show All" runat="server" OnClick="lnkClearSearch_Click" CssClass="clearlinkbutton"></asp:LinkButton>
    </asp:Panel>
    
    <asp:Panel ID="dropsearch" runat="server">
        <p>
            <asp:Literal ID="ltHowManyUsers" runat="server"></asp:Literal>
        </p>
        <asp:DropDownList ID="drpUserList" runat="server" CssClass="BecomeUserDropDown">
        </asp:DropDownList>
        <asp:Button ID="btnBecomeUser" runat="server" Text="Become User" OnClick="btnBecomeUser_Click" CssClass="BecomeUserButton" />

    </asp:Panel>
            <p class="BecomeUserInfo">
            <asp:Literal ID="mainContent" runat="server"></asp:Literal>
        </p>
    
    <asp:Literal ID="ltLicenseBot" runat="server"></asp:Literal>
    <asp:Literal ID="ltDebugData" runat="server"></asp:Literal>
</div>
