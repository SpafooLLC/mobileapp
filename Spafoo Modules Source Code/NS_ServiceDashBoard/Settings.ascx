<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Settings.ascx.cs" Inherits="Netsam.Modules.ServiceDashBoard.Settings" %>
<!-- uncomment the code below to start using the DNN Form pattern to create and update settings -->
<%--  --%>
<%@ Register TagName="label" TagPrefix="dnn" Src="~/controls/labelcontrol.ascx" %>
<div style="width:100%;">
    <div style="width:30%;float:left;">
        <label>Show Providers with-in the mile(s) of :</label>
    </div>
    <div style="width:70%;float:left;">
         <asp:TextBox ID="txtWithInMile" runat="server" Text="30"></asp:TextBox><br />
          <asp:RequiredFieldValidator ID="reqWithInMile" runat="server" ErrorMessage="Please specify value" ControlToValidate="txtWithInMile" Display="Dynamic" SetFocusOnError="True" ForeColor="Red"></asp:RequiredFieldValidator>
    </div>
    <div style="clear:both"></div>
    <div style="width:30%;float:left;">
        <label>Show Providers with-in the mile(s) of :</label>
    </div>
    <div style="width: 70%; float: left;">
        <dnn:Label ID="lblMakeAppointmentTab" runat="server" />
        <asp:DropDownList ID="ddlMakeAppointmentTab" runat="server"></asp:DropDownList>
    </div>
</div>

