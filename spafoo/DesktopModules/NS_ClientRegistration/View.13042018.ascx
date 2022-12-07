﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Netsam.Modules.NS_ClientRegistration.View" %>
<%@ Register Src="~/controls/texteditor.ascx" TagPrefix="dnn" TagName="texteditor" %>
<%@ Register Src="/desktopmodules/NS_ClientRegistration/ucCropImage.ascx" TagPrefix="uc1" TagName="ucCropImage" %>
<div class="bread">
    <a href="#" onclick="NS_GoBack(); return false;" class="pback">
        <i class="fa fa-angle-left fa-2x"></i>
        &nbsp;
        <asp:LinkButton ID="btnShowEmailManager" Visible="false" runat="server" Style="cursor: pointer;" ToolTip="Manage client's e-mail content">
            Manage e-mail content</asp:LinkButton>
    </a>
    <div class="ptitle">
        <label id="lblHeader">Basic Profile Information</label>
    </div>
</div>
<div id="dvClientStep1">
  <div class="center">
    <p class="blue bold">Profile Picture</p>
    <div class="profile-pic">
       <div id="NS_imgUserProfilePic" style="background-image:url(/DesktopModules/NS_MakeAppointment/Images/Site/register-default.png);border-radius: 50%;background-color:gray;height:400px;width:400px;margin:auto;" ></div>
       <div class="cfileup">
		  <input type="file" id="NS_UserProPic" class="inputfile inputfile-1" style="display:none;"  />
		 <label for="NS_UserProPic"><img src="/portals/0/images/ico-upload.png"  />&nbsp;&nbsp; <span>Choose a file&hellip;</span></label>
	  </div>  
      <div style="text-align: center; padding-top:10px; "><label>Profile picture is required to ensure the safety of Spafoo providers. Thank you.</label></div>
    </div>
  </div>
  <div class="fcell2 form800 mcenter">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="cregtab">
  <tr>
    <td class="lft">
    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Display="Dynamic" ErrorMessage="" CssClass="hureq" SetFocusOnError="True" ControlToValidate="NS_tbFirstName" ValidationGroup="NSR"></asp:RequiredFieldValidator>
    <asp:TextBox ID="NS_tbFirstName" placeholder="First Name" runat="server" CssClass="dnnFormRequired form-control fireq"></asp:TextBox>
    <asp:RequiredFieldValidator ID="RequiredFieldValidator11" runat="server" Display="Dynamic" ErrorMessage="" CssClass="hureq" SetFocusOnError="True" ControlToValidate="NS_tbLastName" ValidationGroup="NSR"></asp:RequiredFieldValidator>
    <asp:TextBox ID="NS_tbLastName" placeholder="Last Name" runat="server" CssClass="dnnFormRequired form-control fireq"></asp:TextBox>
    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" Display="Dynamic" ErrorMessage="" CssClass="hureq" SetFocusOnError="True" ControlToValidate="NS_tbUserName" ValidationGroup="NSR"></asp:RequiredFieldValidator>
    <asp:RegularExpressionValidator ID="RegularExpressionValidator7" runat="server" ControlToValidate="NS_tbUserName" Display="Dynamic" ErrorMessage="<br/>10 digits please" ForeColor="Red" SetFocusOnError="True" ValidationExpression="^[\s\S]{10,}$" ValidationGroup="NSR"></asp:RegularExpressionValidator>
    <asp:TextBox ID="NS_tbUserName" placeholder="Phone #" runat="server" CssClass="dnnFormRequired form-control fireq"></asp:TextBox>
    <select id="NS_ddlGender" class="dnnFormRequired form-control">
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
    <div class="pwd-block">
      <div class="left">
        <asp:RequiredFieldValidator ID="RequiredFieldValidator14" runat="server" Display="Dynamic" ErrorMessage="" CssClass="hureq" SetFocusOnError="True" ControlToValidate="NS_tbPassword" ValidationGroup="NSR"></asp:RequiredFieldValidator>
        <asp:TextBox ID="NS_tbPassword" placeholder="Password" runat="server" CssClass="dnnFormRequired form-control fireq" TextMode="Password"></asp:TextBox>
        <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="NS_tbPassword" Display="Dynamic" ErrorMessage="8 character atleast" ForeColor="Red" SetFocusOnError="True" ValidationExpression="^[\s\S]{8,}$" ValidationGroup="NSR"></asp:RegularExpressionValidator>
      </div>
      <div class="right">
        <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" Display="Dynamic" ErrorMessage="" CssClass="hureq" SetFocusOnError="True" ControlToValidate="NS_tbConfirmPassword" ValidationGroup="NSR"></asp:RequiredFieldValidator>
        <asp:TextBox ID="NS_tbConfirmPassword" placeholder="Confirm password" runat="server" CssClass="dnnFormRequired form-control fireq" TextMode="Password"></asp:TextBox>
        <asp:CompareValidator ID="CompareValidator1" runat="server" CssClass="informat" ControlToCompare="NS_tbPassword" ControlToValidate="NS_tbConfirmPassword" Display="Dynamic" ErrorMessage="Password does not match" ValidationGroup="NSR" ForeColor="Red"></asp:CompareValidator>
      </div>
      <p>8 Character minimum</p>
    </div>
    </td>
    <td class="rgt">
    <asp:RequiredFieldValidator ID="RequiredFieldValidator12" runat="server" Display="Dynamic" ErrorMessage="" CssClass="hureq" SetFocusOnError="True" ControlToValidate="NS_tbEmail" ValidationGroup="NSR"></asp:RequiredFieldValidator>
    <asp:TextBox ID="NS_tbEmail" placeholder="Email Address" runat="server" CssClass="dnnFormRequired form-control fireq"></asp:TextBox>
    <asp:RegularExpressionValidator ID="RegularExpressionValidator2" runat="server" CssClass="informat" ControlToValidate="NS_tbEmail" Display="Dynamic" ErrorMessage="Invalid email format" ForeColor="Red" SetFocusOnError="True" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ValidationGroup="NSR"></asp:RegularExpressionValidator>
    <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" Display="Dynamic" ErrorMessage="" CssClass="hureq" SetFocusOnError="True" ControlToValidate="NS_tbStreet" ValidationGroup="NSR"></asp:RequiredFieldValidator>
    <asp:TextBox ID="NS_tbStreet" runat="server" placeholder="Street" CssClass="dnnFormRequired form-control fireq"></asp:TextBox>
    <asp:RequiredFieldValidator ID="RequiredFieldValidator19" runat="server" Display="Dynamic" ErrorMessage="" CssClass="hureq" SetFocusOnError="True" ControlToValidate="NS_tbVerifyUserName" ValidationGroup="NSR"></asp:RequiredFieldValidator>
    <asp:CompareValidator ID="CompareValidator2" runat="server" CssClass="informat" ControlToCompare="NS_tbUserName" ControlToValidate="NS_tbVerifyUserName" Display="Dynamic" ErrorMessage="<br/>Phone # does not match" ValidationGroup="NSR" ForeColor="Red"></asp:CompareValidator>    
    <asp:TextBox ID="NS_tbVerifyUserName" placeholder="Verify Phone #" runat="server" CssClass="dnnFormRequired form-control"></asp:TextBox>
    <asp:RequiredFieldValidator ID="RequiredFieldValidator7" runat="server" Display="Dynamic" ErrorMessage="" CssClass="hureq" SetFocusOnError="True" ControlToValidate="NS_tbCity" ValidationGroup="NSR"></asp:RequiredFieldValidator>
        <asp:TextBox ID="NS_tbCity" runat="server" placeholder="City" CssClass="dnnFormRequired form-control fireq"></asp:TextBox>
    <select id="NS_ddlRegion" class="dnnFormRequired form-control">
      <option value="-1">Select Region</option>
      <option value="Alabama">Alabama</option>
      <option value="Alaska">Alaska</option>
      <option value="Arizona">Arizona</option>
      <option value="Arkansas">Arkansas</option>
      <option value="California">California</option>
      <option value="Colorado">Colorado</option>
      <option value="Connecticut">Connecticut</option>
      <option value="Delaware">Delaware</option>
      <option value="District of Columbia">District of Columbia</option>
      <option value="Florida">Florida</option>
      <option value="Georgia">Georgia</option>
      <option value="Hawaii">Hawaii</option>
      <option value="Idaho">Idaho</option>
      <option value="Illinois">Illinois</option>
      <option value="Indiana">Indiana</option>
      <option value="Iowa">Iowa</option>
      <option value="Kansas">Kansas</option>
      <option value="Kentucky">Kentucky</option>
      <option value="Louisiana">Louisiana</option>
      <option value="Maine">Maine</option>
      <option value="Maryland">Maryland</option>
      <option value="Massachusetts">Massachusetts</option>
      <option value="Michigan">Michigan</option>
      <option value="Minnesota">Minnesota</option>
      <option value="Mississippi">Mississippi</option>
      <option value="Missouri">Missouri</option>
      <option value="Montana">Montana</option>
      <option value="Nebraska">Nebraska</option>
      <option value="Nevada">Nevada</option>
      <option value="New Hampshire">New Hampshire</option>
      <option value="New Jersey">New Jersey</option>
      <option value="New Mexico">New Mexico</option>
      <option value="New York">New York</option>
      <option value="North Carolina">North Carolina</option>
      <option value="North Dakota">North Dakota</option>
      <option value="Ohio">Ohio</option>
      <option value="Oklahoma">Oklahoma</option>
      <option value="Oregon">Oregon</option>
      <option value="Pennsylvania">Pennsylvania</option>
      <option value="Rhode Island">Rhode Island</option>
      <option value="South Carolina">South Carolina</option>
      <option value="South Dakota">South Dakota</option>
      <option value="Tennessee">Tennessee</option>
      <option value="Texas">Texas</option>
      <option value="Utah">Utah</option>
      <option value="Vermont">Vermont</option>
      <option value="Virginia">Virginia</option>
      <option value="Washington">Washington</option>
      <option value="West Virginia">West Virginia</option>
      <option value="Wisconsin">Wisconsin</option>
      <option value="Wyoming">Wyoming</option>
    </select>
    <asp:RequiredFieldValidator ID="RequiredFieldValidator9" runat="server" Display="Dynamic" ErrorMessage="" CssClass="hureq" SetFocusOnError="True" ControlToValidate="NS_tbZip" ValidationGroup="NSR"></asp:RequiredFieldValidator>
    <asp:TextBox ID="NS_tbZip" runat="server" placeholder="Zip" CssClass="dnnFormRequired form-control fireq"></asp:TextBox>
    </td>
  </tr>
</table>
    <div class="checkbox center checkbox-primary">
      <input id="chkUserAcceptance" type="checkbox" checked="checked" />
      <label for="chkUserAcceptance">By creating a Spafoo account, you agree to our <a href="#" onclick="ShowTermsNPolicy();return false;">Terms & Conditions and Payment Policy</a></label>
    </div>
    <div class="h30"></div>
  </div>
</div>
<div id="dvClientStep2" style="display:none;">
  <div class="fcell">
    <div class="col-md-6">
      <div class="nsrow" style="font-weight:bold;">Card Info</div>
      <div class="nsrow">
        <div class="NS_Caption">Name as on Card</div>
        <div class="NS_Input">
          <asp:RequiredFieldValidator ID="RequiredFieldValidator8" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_txtCCName" ValidationGroup="NSR_CC"></asp:RequiredFieldValidator>
          <asp:TextBox ID="NS_txtCCName" runat="server" CssClass="dnnFormRequired form-control"></asp:TextBox>
        </div>
      </div>
      <div class="nsrow">
        <div class="NS_Caption">Credit Card Number</div>
        <div class="NS_Input">
          <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" Display="Dynamic" ErrorMessage="" CssClass="hureq" SetFocusOnError="True" ControlToValidate="NS_txtClientCC" ValidationGroup="NSR_CC"></asp:RequiredFieldValidator>
          <asp:TextBox ID="NS_txtClientCC" placeholder="Credit Card Number" runat="server" data-mask="0000000000000000" CssClass="dnnFormRequired form-control fireq"></asp:TextBox>
          <asp:RegularExpressionValidator ID="RegularExpressionValidator6" runat="server" ControlToValidate="NS_txtClientCC" Display="Dynamic" ErrorMessage="it is a invalid credit card number" ForeColor="Red" SetFocusOnError="True" ValidationExpression="^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$" ValidationGroup="NSR_CC"></asp:RegularExpressionValidator>
          <asp:RegularExpressionValidator ID="RegularExpressionValidator5" ControlToValidate="NS_txtClientCC" ValidationExpression="\d+" Display="Dynamic" EnableClientScript="true" ValidationGroup="NSR_CC" ErrorMessage="Please enter numbers only" runat="server"></asp:RegularExpressionValidator>
        </div>
      </div>
      <div class="nsrow">
        <div class="NS_Caption">Expiry :</div>
        <div class="NS_Input">
          <div class="col-xs-6 nopadl">
            <select id="ddlCCMonth" class="form-control w100">
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div class="col-xs-6 nopadr">
            <select id="ddlCCYear" class="form-control w100">
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2023">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>
      </div>
      <div class="nsrow">
        <div class="h15"></div>
        <div class="NS_Caption">Card Code :</div>
        <div class="NS_Input">
          <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" Display="Dynamic" ErrorMessage="" CssClass="hureq" SetFocusOnError="True" ControlToValidate="NS_txtCardCode" ValidationGroup="NSR_CC"></asp:RequiredFieldValidator>
          <asp:TextBox ID="NS_txtCardCode" runat="server" placeholder="3 or 4 digit number on back of a credit card" data-mask="0000" CssClass="form-control fireq" style="width:100%; " />
          <asp:RegularExpressionValidator ID="RegularExpressionValidator3" runat="server" ControlToValidate="NS_txtCardCode" Display="Dynamic" ErrorMessage="3 character atleast" ForeColor="Red" SetFocusOnError="True" ValidationExpression="^[\s\S]{3,}$" ValidationGroup="NSR_CC"></asp:RegularExpressionValidator>
          <asp:RegularExpressionValidator id="RegularExpressionValidator4" ControlToValidate="NS_txtCardCode" ValidationExpression="\d+" Display="Dynamic" EnableClientScript="true" ErrorMessage="Please enter numbers only" ValidationGroup="NSR_CC" runat="server"></asp:RegularExpressionValidator>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="nsrow" style="font-weight:bold;">Billing Address</div>
      <div class="nsrow">
        <div class="NS_Caption">Address :</div>
        <div class="NS_Input">
          <asp:RequiredFieldValidator ID="RequiredFieldValidator10" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_txtCCAddress" ValidationGroup="NSR_CC"></asp:RequiredFieldValidator>
          <asp:TextBox ID="NS_txtCCAddress" runat="server" placeholder="Address associated with card" CssClass="dnnFormRequired form-control"></asp:TextBox>
        </div>
      </div>
      <div class="nsrow">
        <div class="NS_Caption">City :</div>
        <div class="NS_Input">
          <asp:RequiredFieldValidator ID="RequiredFieldValidator15" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_txtCCCity" ValidationGroup="NSR_CC"></asp:RequiredFieldValidator>
          <asp:TextBox ID="NS_txtCCCity" runat="server" placeholder="City associated with card" CssClass="dnnFormRequired form-control"></asp:TextBox>
        </div>
      </div>
      <div class="nsrow">
        <div class="NS_Caption">Sate/Province :</div>
        <div class="NS_Input">
          <asp:RequiredFieldValidator ID="RequiredFieldValidator16" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_txtCCState" ValidationGroup="NSR_CC"></asp:RequiredFieldValidator>
          <asp:TextBox ID="NS_txtCCState" runat="server" placeholder="State/Province associated with card" CssClass="dnnFormRequired form-control"></asp:TextBox>
        </div>
      </div>
      <div class="nsrow">
        <div class="NS_Caption">Zip/Postal Code :</div>
        <div class="NS_Input">
          <asp:RequiredFieldValidator ID="RequiredFieldValidator17" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_txtCCZip" ValidationGroup="NSR_CC"></asp:RequiredFieldValidator>
          <asp:TextBox ID="NS_txtCCZip" runat="server" data-mask="00000" placeholder="Zip/Postal Code associated with card" CssClass="dnnFormRequired form-control"></asp:TextBox>
        </div>
      </div>
      <div class="nsrow">
        <div class="NS_Caption">Phone :</div>
        <div class="NS_Input">
          <asp:RequiredFieldValidator ID="RequiredFieldValidator18" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_txtCCPhone" ValidationGroup="NSR_CC"></asp:RequiredFieldValidator>
          <asp:TextBox ID="NS_txtCCPhone" runat="server" data-mask="000-000-0000" placeholder="Phone number" CssClass="dnnFormRequired form-control"></asp:TextBox>
        </div>
      </div>
    </div>
  </div>
  <div class="nsrow" style="margin: 0 0 15px 10px !important; padding-top: 20px;">
    <input type="checkbox" id="chkAddPaymentLater"/>&nbsp;
    <label for="chkAddPaymentLater">Add Payment Later</label>
  </div>
</div>
<asp:Panel ID="pnlEmailContent" runat="server" Visible="false" style="display:none;">
    <div id="dvEmailContent" style="display: block;">
        <label>Available Token:&nbsp;[UserName] [FirstName] [LastName] [ResetLink]</label>
        <dnn:texteditor runat="server" ID="txteditor" DefaultMode="Html" Width="99%" HtmlEncode="true" ChooseMode="false" />
        <asp:Button ID="btnSaveEmailContent" runat="server" Text="Update e-mail content" OnClick="btnSaveEmailContent_Click" />
    </div>
</asp:Panel>
<div class="clearfix"></div>
<div class="btnend">
  <a href="#" onclick="NSR_CheckUserInput1();return false; " class="block-btn" id="btnRegContinue">Continue</a>
  <a href="#" onclick="NSR_CheckUserInput2();return false;" class="block-btn" id="btnRegSave" style="display:none;">Update</a>
</div>
<uc1:ucCropImage ID="ucCropImage1" runat="server" />
<link href="/DesktopModules/NS_ServiceDashBoard/Styles/style.css"  rel="stylesheet" type="text/css"/>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/bootbox.min.js" type="text/javascript"></script>
<script src="/DesktopModules/NS_Registration/Scripts/jquery.mask.min.js"></script>
<script src="/DesktopModules/NS_MakeAppointment\Scripts/bootstrap.js"></script>
<script src="/desktopmodules/NS_ClientRegistration/Script/Module.js"></script>
<script>
  var NSR_HTBUrl = '<%=this.HomeTabUrl%>';
  var NSR_PID=<%=this.PortalId%>;
    var NSR_PName = '<%=this.PortalSettings.PortalName%>';
    var NSR_MID = <%=this.ModuleId%>;
  NS_CropImageProcessorURL='/DesktopModules/NS_ClientRegistration/Script/jquery-uploadify/rhProfilePicX.ashx';
</script>
