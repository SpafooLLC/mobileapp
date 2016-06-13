<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GenerateRsaKey.aspx.cs" Inherits="avt.ActionForm.GenerateRsaKey" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>     
        <asp:Label ID="lbl_pubKey" Text="Public Key:" runat="server"></asp:Label>
        <br />
        <asp:TextBox ID="txt_pubKey" runat="server" Width="922px" Height="180px"></asp:TextBox>
        <br />
        <br />
         <asp:Label ID="lbl_privKey" Text="Private Key: " runat="server"></asp:Label>
        <br />
        <asp:TextBox ID="txt_privKey" runat="server" Width="920px" Height="180px"></asp:TextBox>
        <br />
    </div>
    </form>
</body>
</html>
