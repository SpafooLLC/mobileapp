<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TestNotification.aspx.cs" Inherits="TestNotification" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    Device Token :
    <asp:TextBox ID="txttoken" runat="server" ></asp:TextBox>
    Message :
    <asp:TextBox ID="txtmessage" runat="server" ></asp:TextBox>
    <br />
    <asp:Button ID="btnsubmit" OnClick="btnsubmit_click" Text="submit" runat="server" ></asp:Button>
    
    </div>
    </form>
</body>
</html>
