<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Netsam.Modules.NS_GiftCertificates.View" %>
<script src="/DesktopModules/NS_GiftCertificates/jquery.mask.min.js"></script>
<style>
    .NS_SectionHeader{font-size:18px;text-transform:uppercase;}
    .NS_Section {margin-bottom: 15px;margin-top: 15px;text-align: left;background-color: #369;color: white;padding:5px;}
    .NS_Button{text-transform:uppercase;font-weight:bold;padding:5px;}
    .NS_Col1{width:25%;}
    .NS_Col2{width:auto;}
    .NS_Req{font-weight:bold;color:red;font-size:16px;}
</style>
<asp:Panel ID="pnlFirst" runat="server" Visible="true">
    <div style="width: 100%;">
        <div class="NS_Section">
            <label class="NS_SectionHeader">Purchase Gift Certificates</label>
        </div>
        <div>
            <table style="width: 100%;">
                <tr>
                    <td class="NS_Col1">
                        <label>Purchase Value:<asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="ddlGiftValue" Display="Dynamic" ErrorMessage="*" InitialValue="-1" SetFocusOnError="True" CssClass="NS_Req"></asp:RequiredFieldValidator>
                        </label></td>
                    <td class="NS_Col2">
                        <asp:DropDownList runat="server" ID="ddlGiftValue">
                            <asp:ListItem Text="Select Amount" Value="-1"></asp:ListItem>
                            <asp:ListItem Text="$25" Value="25"  Selected="True"></asp:ListItem>
                            <asp:ListItem Text="$50" Value="50"></asp:ListItem>
                            <asp:ListItem Text="$100" Value="100"></asp:ListItem>
                            <asp:ListItem Text="$250" Value="250"></asp:ListItem>
                            <asp:ListItem Text="$500" Value="500"></asp:ListItem>
                            <asp:ListItem Text="$1000" Value="1000"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
            </table>
        </div>
        <div class="NS_Section">
            <label class="NS_SectionHeader">Gift For ?</label>
        </div>
        <div>
            <table style="width: 100%;">
                <tr>
                    <td class="NS_Col1">
                        <label>First Name:</label><asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtFirstName" Display="Dynamic" ErrorMessage="*" SetFocusOnError="True" CssClass="NS_Req"></asp:RequiredFieldValidator>
                    </td>
                    <td class="NS_Col2">
                        <asp:TextBox ID="txtFirstName" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="NS_Col1">
                        <label>Last Name:</label></td>
                    <td class="NS_Col2">
                        <asp:TextBox ID="txtLastName" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="NS_Col1">
                        <label>Email Address:</label><asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtEmail" Display="Dynamic" ErrorMessage="*" SetFocusOnError="True" CssClass="NS_Req"></asp:RequiredFieldValidator>
                        <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txtEmail" Display="Dynamic" ErrorMessage="*" CssClass="NS_Req" SetFocusOnError="True" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
                    </td>
                    <td class="NS_Col2">
                        <asp:TextBox ID="txtEmail" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="NS_Col1">
                        <label>Phone:</label></td>
                    <td class="NS_Col2">
                        <asp:TextBox ID="txtPhone" runat="server" MaxLength="10" TextMode="Phone"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="NS_Col1" style="vertical-align:top;">
                        <label>Message:</label>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="txtMessage" Display="Dynamic" ErrorMessage="*" SetFocusOnError="True" CssClass="NS_Req"></asp:RequiredFieldValidator>

                    </td>
                    <td class="NS_Col2">
                        <asp:TextBox ID="txtMessage" runat="server" placeholder="(max 1000 characters)" MaxLength="1000" Columns="60" Rows="8" TextMode="MultiLine"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="NS_Col1">&nbsp;</td>
                    <td class="NS_Col2">
                        <asp:Button ID="btnNext" runat="server"  Text="Continue" CssClass="NS_Button" OnClick="btnNext_Click"    ></asp:Button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</asp:Panel>
<asp:Panel ID="pnlPay" runat="server" Visible="false">
<div class="inbody-simple">
    <div id="dvNewCardInfo">
        <div class="col-md-6">
            <div class="NS_Section" >            
                <div class="NS_SectionHeader" >Card Info</div>        
            </div>
            <table>
                <tr id="trError" runat="server" visible="true"> 
                    <td colspan="2">
                        <asp:Label ID="lblError" runat="server" CssClass="NS_Req"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td class="NS_Col1">
                        <label>Name on Card:</label>
                    </td>
                    <td class="NS_Col2">
                        <asp:TextBox ID="txtNameOnCard" runat="server" CssClass="form-control"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="NS_Col1">
                        <label>Card Number:</label>
                    </td>
                    <td class="NS_Col2">
                        <asp:TextBox ID="txtCCCardNumber" runat="server"  CssClass="form-control" MaxLength="16"></asp:TextBox>
                    </td>
                </tr>
                <tr style="display:none;">
                    <td class="NS_Col1"></td>
                    <td class="NS_Col2">
                        <div class="ccradio">
                            <div class="radio radio-info radio-inline" style="float:left;">
                                <asp:RadioButton GroupName="radioInLine" ID="rbUserCardTypeV" runat="server" />
                                <asp:Label runat="server" AssociatedControlID="rbUserCardTypeV"><img src="/DesktopModules/NS_MakeAppointment/Images/Site/cc-v.png" /></asp:Label>
                            </div>
                            <div class="radio radio-info radio-inline" style="float:left;">
                                <input type="radio" name="radioInline" value="2" id="inlineRadio2">
                                <label for="inlineRadio2">
                                    <img src="/DesktopModules/NS_MakeAppointment/Images/Site/cc-ae.png" /></label>
                            </div>
                            <div class="radio radio-info radio-inline" style="float:left;">
                                <input type="radio" name="radioInline" value="3" id="inlineRadio3">
                                <label for="inlineRadio3">
                                    <img src="/DesktopModules/NS_MakeAppointment/Images/Site/cc-mc.png" /></label>
                            </div>
                            <div class="radio radio-info radio-inline" style="float:left;">
                                <input type="radio" name="radioInline" value="4" id="inlineRadio4">
                                <label for="inlineRadio4">
                                    <img src="/DesktopModules/NS_MakeAppointment/Images/Site/cc-d.png" /></label>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="NS_Col1">
                        <label>Expiry Date</label>
                    </td>
                    <td class="NS_Col2">
                        <div style="float: left;">
                            <asp:DropDownList ID="ddlMonth" runat="server">
                                <asp:ListItem Text="January" Value="01"></asp:ListItem>
                                <asp:ListItem Text="February" Value="01"></asp:ListItem>
                                <asp:ListItem Text="March" Value="01"></asp:ListItem>
                                <asp:ListItem Text="April" Value="01"></asp:ListItem>
                                <asp:ListItem Text="May" Value="01"></asp:ListItem>
                                <asp:ListItem Text="June" Value="01"></asp:ListItem>
                                <asp:ListItem Text="July" Value="01"></asp:ListItem>
                                <asp:ListItem Text="August" Value="01"></asp:ListItem>
                                <asp:ListItem Text="September" Value="01"></asp:ListItem>
                                <asp:ListItem Text="October" Value="01"></asp:ListItem>
                                <asp:ListItem Text="November" Value="01"></asp:ListItem>
                                <asp:ListItem Text="December" Value="01"></asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div style="float: left;margin-left:10px;">
                            <asp:DropDownList ID="ddlYear" runat="server">
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="NS_Col1"><label>CVV</label></td>
                    <td class="NS_Col2">
                        <asp:TextBox runat="server" ID="txtCardCode" CssClass="form-control" ></asp:TextBox>
                        <br />
                        <label>The last 3 digits displyed on the back of  your card</label>
                    </td>
                </tr>
            </table>
        </div>
        <div class="col-md-6" style="display:none;">
            <div class="checkbox checkbox-primary">
                <input id="chkBilling" type="checkbox" onclick="HandleCCAddresUI(this);">
                <label for="chkBilling">Billing address same as specified in your profile ?</label>
            </div>
            <div id="NS_dvCCAddress">
                <div class="has-feedback fgap">
                    <label class="control-label">Address</label>
                    <input id="NS_txtCCAddress" type="text" class="form-control"  />
                </div>
                <div class="has-feedback fgap">
                    <label class="control-label">City</label>
                    <input id="NS_txtCCCity" type="text" class="form-control"  />
                </div>
                <div class="has-feedback fgap">
                    <label class="control-label">State/Province</label>
                    <input id="NS_txtCCState" type="text" class="form-control"  />
                </div>
                <div class="has-feedback fgap">
                    <label class="control-label">Zip/Postal Code</label>
                    <input id="NS_txtCCZip" type="text" class="form-control"  />
                </div>
                <div class="has-feedback fgap">
                    <label class="control-label">Phone</label>
                    <input id="NS_txtCCPhone" type="text" class="form-control"  />
                </div>
            </div>
        </div>
    </div>
    <div id="dvProfilePayment" class="NS_Off">
        <label id="lblProfileInfo"></label>
    </div>
    <div class="clearfix"></div>
    <div class="tpad-xs checkbox checkbox-primary" style="display:none;">
        <input id="NS_chkAccept" type="checkbox">
        <label for="NS_chkAccept">With payment, I accept the <a class="modals" data-toggle="modal" data-target="#PTerms">payment terms</a>.</label>
        <div style="display:none">
            <br />
            <input type="checkbox" id="NS_chkSaveToProfile" />
            <label for="NS_chkSaveToProfile">Securely save card on file for future payments</label>
        </div>
    </div>
</div>
<asp:Button ID="btnMakePayment" runat="server" Text="Submit" OnClick="btnMakePayment_Click" CssClass="NS_Button" />
</asp:Panel>
<asp:Panel ID="pnlConfirm" runat="server" Visible="false">
    <asp:Label ID="lblConfirm" runat="server"></asp:Label>
</asp:Panel>
<!-- Modal Payment Terms -->
<div class="modal fade" id="PTerms" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="sp-close" data-dismiss="modal" aria-label="Close"></button>
                <h4 class="modal-title" id="myModalLabel">Payment Terms</h4>
            </div>
            <div class="modal-body">
                A credit card is required to request an appointment. You will be charged $25 for a cancellation within 12 hours of the start of your requested appointment time. You will be charged at the completion of the service. It is the responsibility of the credit card processing agents/companies and the clients to maintain secure financial information and private credit card number documentation. SpaFoo.com accepts no liability for the failure of VISA/MasterCard/American Express/Discover to protect their clients from fraudulent activities and theft of private information. The above mentioned entities are contracted by SpaFoo.com to provide secure transactions.
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
function fnOnUpdateValidators(){
   for (var i = 0; i < Page_Validators.length; i++){
      var val = Page_Validators[i];
      var ctrl = document.getElementById(val.controltovalidate);
      if (ctrl != null && ctrl.style != null){
         if (!val.isvalid)
             $(ctrl).css('border', 'solid 1px red');
         else
            $(ctrl).css('border', 'solid 1px black');
      }
   }
}

    $(document).ready(function () {
        $('[id*="txtPhone"]').mask('000-000-0000');
    });
</script>