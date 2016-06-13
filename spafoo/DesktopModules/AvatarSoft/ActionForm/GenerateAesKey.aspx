<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GenerateAesKey.aspx.cs" Inherits="avt.ActionForm.GenerateAesKey" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Label ID="lbl_key"  Text="Key: " runat="server"></asp:Label>
        <br />
        <asp:TextBox ID="txt_key" runat="server" Width="920px" Height="120px"></asp:TextBox>
        <br />
        <br />
        <br />
        <asp:Label ID="lbl_iv" Text="IV:" runat="server"></asp:Label> 
        <br />        
        <asp:TextBox ID="txt_iv" runat="server" Width="922px" Height="120px"></asp:TextBox>
        <br />
    </div>
    </form>
</body>
</html>
