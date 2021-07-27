<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Settings.ascx.cs" Inherits="Netsam.Modules.NS_GiftCertificates.Settings" %>
<%@ Register Src="~/controls/texteditor.ascx" TagPrefix="dnn" TagName="texteditor" %>
<%@ Register TagName="label" TagPrefix="dnn" Src="~/controls/labelcontrol.ascx" %>
<table style="width: 100%;">
    <tr>
        <td>
            <label  style="font-size: medium; font-weight: bold">Coupon Email for Sender:</label>
        </td>
    </tr>
    <tr>
        <td>
            <label><strong>Token: </strong>[ReceiverFirstName] [ReceiverLastName] [ReceiverEmail] [SenderFirstName] [SenderLastName] [SenderEmail] [SenderPhone] [CouponCode] [$Amount] [Message]</label><br />
            <dnn:texteditor runat="server" ID="txtSenderEditor" DefaultMode="Html" Width="99%" HtmlEncode="true" ChooseMode="false" />
        </td>
    </tr>
    <tr>
        <td>
            <label  style="font-size: medium; font-weight: bold">Coupon Email for Receiver:</label>
        </td>
    </tr>
    <tr>
        <td>
            <label><strong>Token: </strong>[ReceiverFirstName] [ReceiverLastName] [ReceiverEmail] [SenderFirstName] [SenderLastName] [SenderEmail] [SenderPhone] [CouponCode] [$Amount] [Message]</label><br />
            <dnn:texteditor runat="server" ID="txtReceiverEditor" DefaultMode="Html" Width="99%" HtmlEncode="true" ChooseMode="false" />
        </td>
    </tr>
</table>

<table style="width: 100%;">
    <tr>
        <td>
            <label  style="font-size: medium; font-weight: bold">List Of Coupon:</label>
        </td>
    </tr>
    <tr>
        <td>
            <asp:GridView ID="gvCoupon" runat="server">
                

            </asp:GridView>
        </td>
    </tr>
</table>
