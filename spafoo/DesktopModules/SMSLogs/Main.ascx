<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Main.ascx.cs" Inherits="SMSLogs.Main" %>

<asp:GridView ID="gvSMSLogs" runat="server" CssClass="gridtab table-bordered resfull table-striped" AutoGenerateColumns="false">
  <Columns>
     
  <asp:TemplateField HeaderText="SMSLog">
    <ItemTemplate><%# Eval("SMSLog")%></ItemTemplate>
  </asp:TemplateField>
  </Columns>
</asp:GridView>
