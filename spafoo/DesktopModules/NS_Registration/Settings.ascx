<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Settings.ascx.cs" Inherits="Netsam.Modules.NS_Registration.Settings" %>
<!-- uncomment the code below to start using the DNN Form pattern to create and update settings -->
<%@ Register TagName="label" TagPrefix="dnn" Src="~/controls/labelcontrol.ascx" %>
	<h2 id="dnnSitePanel-BasicSettings" class="dnnFormSectionHead">
        <a href="" class="dnnSectionExpanded"><%=LocalizeString("BasicSettings")%></a></h2>
	<fieldset>
        <div class="dnnFormItem">
            <dnn:Label ID="lblRole" runat="server" /> 
            <asp:DropDownList ID="ddlRoles" runat="server"></asp:DropDownList>
        </div>
    </fieldset>