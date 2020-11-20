<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Netsam.Modules.NS_Registration.View" %>
<%@ Register src="/desktopmodules/NS_ClientRegistration/ucCropImage.ascx" tagname="ucCropImage" tagprefix="uc1" %>
<asp:Panel ID="pnlAdmin" runat="server" Visible="false">
    <div id="NSR_Admin" style="width: 100%;" class="dnnForm">
        <ul class="dnnAdminTabNav">
            <li><a href="#NSR_ManageResponse">Manage User Response</a></li>
            <li><a href="#NSR_ManageQuestion">Manage Questions</a></li>
        </ul>
        <div id="NSR_ManageResponse" class="dnnClear">
            <div style="width: 100%;">
                <div style="width: 60%; float: left;">
                    <input type="radio" id="rblStatusS" name="rblStatus" onclick="NSR_SetStatus('Started');" value="Started" /> <label for="rblStatusS">Started</label>
                    <input type="radio" id="rblStatusP" name="rblStatus" checked="checked" onclick="NSR_SetStatus('Pending')" value="Pending" /><label for="rblStatusP">Pending</label>
                    <input type="radio" id="rblStatusA" name="rblStatus" onclick="NSR_SetStatus('Approved')" value="Approved" /><label for="rblStatusA">Approved</label>
                    <input type="radio" id="rblStatusR" name="rblStatus" onclick="NSR_SetStatus('Rejected')" value="Rejected" /><label for="rblStatusR">Rejected</label>
                    <input type="radio" id="rblStatusAL" name="rblStatus" onclick="NSR_SetStatus('All')" value="All" /><label for="rblStatusAL">All</label>
                </div>
                <div style="width: 40%; float: left;">
                    <input type="text" id="NSR_txtKeyword" placeholder="user first name / last name" style="width: 70%;" />
                    <input type="button" id="NSR_btnSearchUser" value="Search" onclick="NSR_GetUsers();" />
                </div>
            </div>
            <div style="width: 100%;" id="NSR_dvUserList">
            </div>
        </div>
        <div id="NSR_ManageQuestion" class="dnnClear">
            <div id="NSR_C1" style="width: 15%; border-bottom: solid double dashed red; height: auto; float: left;">
                <input type="button" id="nsrAddNewStep" value="Add New Steps" class="dnnPrimaryAction" />
                <ul id="ulSteps"></ul>
            </div>
            <div id="NSR_AdminSteps" style="width: 83%; min-height: 250px; float: left; border: solid 1px lightgray;">
                <div style="height: 50px; border-bottom: solid 1px lightgray">
                    <div style="float: right; line-height: 50px; margin: 4px 10px 0px 0px;">
                        <label id="lblCurrentStep" style="font-weight: bold;"></label>
                        &nbsp;
                    <input type="button" value="Add Question Header" id="btnAddSection" onclick="NSR_OpenQuestionHeader()" class="dnnPrimaryAction" />
                    </div>
                </div>
                <div id="NSR_dvStepCategories" style="width: 100%;">
                </div>
            </div>
        </div>
        
    </div>
    <div id="dlgNewQuestion" title="Add New Question" style="width: 400px; height: 350px">
        <div style="width: 100%; margin-top: 20px;" class="dnnFormItem">
            <div style="width: 25%; float: left; height: 40px;">
                <label>Question Text</label>
            </div>
            <div style="width: 75%; float: left;">
                <input type="text" id="txtQuestionText" style="width: 92%;" />
            </div>
            <div style="width: 25%; float: left; height: 70px;">&nbsp;</div>
            <div style="width: 75%; float: left; height: 70px;">
                <input type="checkbox" id="chkRequired" />&nbsp;<label for="chkRequired">Required ?</label>&nbsp;&nbsp;
                <input type="checkbox" id="chkVisible" checked="checked" />&nbsp;<label for="chkVisible">Visible ?</label>
                <br />
                <input type="checkbox" id="chkIsFullWidth" />&nbsp;<label for="chkIsFullWidth">Full Width ?</label>
            </div>
            <div style="width: 25%; float: left; height: 40px; clear: both;">
                <label>Hint Text/ Link URL</label>
            </div>
            <div style="width: 75%; float: left;">
                <input type="text" id="txtHintText" style="width: 92%;" />
            </div>
            <div style="width: 25%; float: left; height: 40px;">
                <label>Question Type</label>
            </div>
            <div style="width: 75%; float: left;">
                <div style="width: 40%; float: left;">
                    <select id="ddlQuestionType" onchange="NSR_ShowSubOptions();" style="width: 100%;">
                        <option value="TextBox">TextBox</option>
                        <option value="Multiline">Multiline</option>
                        <option value="Radio">Radio</option>
                        <option value="Date">Date</option>
                        <option value="CheckBox">CheckBox</option>
                        <option value="File">File</option>
                        <option value="Images">Images</option>
                        <option value="IAgree">I Agree</option>
                        <option value="LinkedDoc">Linked Document</option>
                    </select>
                    <br />
                    <input id="btnAddOption" type="button" value="Add Options" onclick="return NSR_OpenGetOptions();" style="display: none;" />
                </div>
                <div style="width: 55%; padding-left: 10px; float: right; display: none;">
                    <select id="ddlSubOption" size="5" style="width: 100%;"></select>
                </div>
            </div>
        </div>
    </div>
    <div id="dlgEditQuestion" title="Edit Question" style="width: 400px; height: 350px">
        <div style="width: 100%; margin-top: 20px;" class="dnnFormItem">
            <div style="width: 25%; float: left; height: 40px;">
                <label>Question Text</label>
            </div>
            <div style="width: 75%; float: left;">
                <input type="text" id="txtEQuestionText" style="width: 92%;" />
            </div>
            <div style="width: 25%; float: left; height: 70px;">&nbsp;</div>
            <div style="width: 75%; float: left; height: 70px;">
                <div style="float: left; width: 69%;">
                    <input type="checkbox" id="chkERequired" />&nbsp;<label for="chkERequired">Required ?</label>&nbsp;&nbsp;
                <input type="checkbox" id="chkEVisible" checked="checked" />&nbsp;<label for="chkEVisible">Visible ?</label>
                    <br />
                    <input type="checkbox" id="chkEisFullWidth" />&nbsp;<label for="chkEisFullWidth">Full Width ?</label>
                </div>
                <div style="width: 27%; float: left; text-align: left;">
                    <label>Order </label>
                    <input type="text" id="txtEOrder" maxlength="2" style="width: 50px;" />
                </div>
            </div>
            <div style="width: 25%; float: left; height: 40px; clear: both;">
                <label>Hint Text/ Link URL</label>
            </div>
            <div style="width: 75%; float: left;">
                <input type="text" id="txtEHintText" style="width: 92%;" />
            </div>
            <div style="width: 25%; float: left; height: 40px;">
                <label>Question Type</label>
            </div>
            <div style="width: 75%; float: left;">
                <div style="width: 40%; float: left;">
                    <select id="ddlEQuestionType" onchange="NSR_ShowSubOptions();" style="width: 100%;">
                        <option value="TextBox">TextBox</option>
                        <option value="Multiline">Multiline</option>
                        <option value="Radio">Radio</option>
                        <option value="Date">Date</option>
                        <option value="CheckBox">CheckBox</option>
                        <option value="File">File</option>
                        <option value="Images">Images</option>
                        <option value="IAgree">I Agree</option>
                        <option value="LinkedDoc">Linked Document</option>
                    </select>
                    <br />
                    <input id="btnEAddOption" type="button" value="Add Options" onclick="return NSR_OpenEGetOptions();" style="display: none;" />
                </div>
                <div style="width: 55%; padding-left: 10px; float: right; display: none;">
                    <select id="ddlESubOption" size="5" style="margin: 0px; width: 100%;"></select><br />
                    <br />
                    <input id="btnEDeleteOption" type="button" value="Remove Option" onclick="NSR_DeleteOption();" />
                </div>
            </div>
        </div>
    </div>
    <div id="dlgNewQHeader" title="Add Question Header">
        <div style="width: 100%; margin-top: 20px;" class="dnnFormItem">
            <div style="width: 25%; float: left; line-height: 30px;">
                <label>Header Text :</label>
            </div>
            <div style="width: 75%; float: left;">
                <input type="text" id="txtHeaderText" style="width: 92%;" />
            </div>

        </div>
    </div>
    <div id="dlEditQHeader" title="Edit Question Header">
        <div style="width: 100%; margin-top: 20px;" class="dnnFormItem">
            <div style="width: 25%; float: left; line-height: 30px;">
                <label>Header Text :</label>
            </div>
            <div style="width: 75%; float: left;">
                <input type="text" id="txtEHeaderText" style="width: 92%;" />
            </div>
            <div style="width: 25%; float: left; line-height: 30px;">
                <label>Order :</label>
            </div>
            <div style="width: 75%; float: left;">
                <input type="text" id="txtQCatOrder" style="width: 50px" maxlength="2" />
            </div>
        </div>
    </div>
    <div id="dlgRejectReason" title="Rejection Reason">
        <div style="width: 100%; margin-top: 20px;" class="dnnFormItem">
            <div style="width: 25%; float: left; line-height: 30px;">
                <label>Reason :</label>
            </div>
            <div style="width: 75%; float: left;">
                <input type="text" id="txtRejectReason" style="width: 92%;" />
            </div>
        </div>
    </div>
    <div id="dlgAddOption" title="Add Option">
        <div style="width: 100%; margin-top: 20px;" class="dnnFormItem">
            <div style="width: 25%; float: left;">
                <label>Option Text</label><br />
                <span class="NSR_ALink">(max :1000 character)</span>
            </div>
            <div style="width: 75%; float: left;">
                <textarea id="txtOptionText" maxlength="1000" cols="40" rows="4" style="width: auto;"></textarea>
            </div>
            <div style="width: 25%; float: left;">
                <label>
                    On Selection
                </label>
                <br />
                <span class="NSR_ALink">(add user to role)</span>
            </div>
            <div style="width: 75%; float: left;">
                <asp:DropDownList runat="server" ID="ddlOnSelectRole"></asp:DropDownList>
            </div>
        </div>
    </div>
    <div id="dlgEditOption" title="Add Option">
        <div style="width: 100%; margin-top: 20px;" class="dnnFormItem">
            <div style="width: 25%; float: left;">
                <label>Option Text</label><br />
                <span class="NSR_ALink">(max :1000 character)</span>
            </div>
            <div style="width: 75%; float: left;">
                <textarea id="txtEOptionText" maxlength="1000" cols="40" rows="4" style="width: auto;"></textarea>
            </div>
            <div style="width: 25%; float: left;">
                <label>
                    On Selection
                </label>
                <br />
                <span class="NSR_ALink">(add user to role)</span>
            </div>
            <div style="width: 75%; float: left;">
                <asp:DropDownList runat="server" ID="ddlEOnSelectRole"></asp:DropDownList>
            </div>
        </div>
    </div>
    <div id="dlgUserNotes" title="Take Notes">
        <div style="width: 100%; margin-top: 20px;" class="dnnFormItem">
            <div style="width: 15%; float: left; line-height: 30px;">
                <label>Notes :</label>
            </div>
            <div style="width: 85%; float: left;">
                <textarea id="txtUserText" rows="12" style="padding: 0px; margin: 0px; width: 100%; max-width: 100%"></textarea>
            </div>
        </div>
    </div>
</asp:Panel>
<asp:Panel ID="pnlUser" runat="server" Visible="true">
    <div id="NSR_ModuleOuter" style="width: 100%;">
        <div class="form-group">
            <div class="col-sm-2">&nbsp;</div>
            <div id="NSR_dvPreviouslySaved" class="col-sm-4" style="background-color: rgb(33, 153, 98); color: white; text-transform: uppercase;text-align:center; width: 300px; float: right; margin-top: -50px;margin-right:195px;" >
                <label  onclick="return NSR_PrevSaved();"  class="txtbutn" style="color:white;">Continue Saved Application</label>
            </div>
            <div id="NSR_dvSaveMyDetail" class="col-sm-4" style="background-color: rgb(33, 153, 98); color: white; text-transform: uppercase; width: 180px; float: right; margin-top: -50px;" >
                <label onclick="return NSR_SaveMyDetail();" class="txtbutn" style="color:white;">Save for Later</label>
            </div>
            <div style="clear:both;"></div>
        </div>
        <div id="NSR_pnlFirst" style="width: 100%;" class="dnnFormItem proapp">
            <div class="form-group">
                <div class="label-right col-sm-2">
                    <label>
                        Phone#
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_tbUserName" ValidationGroup="NSR"></asp:RequiredFieldValidator></label>
                </div>
                <div class="col-sm-4">
                    <asp:TextBox ID="NS_tbUserName" title="please specify unique username" runat="server" CssClass="dnnFormRequired form-control"></asp:TextBox>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidator7" runat="server" ControlToValidate="NS_tbUserName" Display="Dynamic" ErrorMessage="10 digits please" ForeColor="Red" SetFocusOnError="True" ValidationExpression="^[\s\S]{10,}$" ValidationGroup="NSR"></asp:RegularExpressionValidator>
                </div>
                <div class="label-right col-sm-2">
                    <label>
                        Verify Phone#
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_tbVerifyUserName" ValidationGroup="NSR"></asp:RequiredFieldValidator></label>
                </div>
                <div class="col-sm-4">
                   <asp:TextBox ID="NS_tbVerifyUserName" runat="server" CssClass="dnnFormRequired form-control"></asp:TextBox>
                     <asp:CompareValidator ID="CompareValidator2" runat="server" CssClass="informat" ControlToCompare="NS_tbUserName" ControlToValidate="NS_tbVerifyUserName" Display="Dynamic" ErrorMessage="Phone # does not match" ValidationGroup="NSR" ForeColor="Red"></asp:CompareValidator>
                </div>
            </div>
            <div class="form-group">
                <div class="label-right col-sm-2">
                    <label>Password<asp:RequiredFieldValidator ID="RequiredFieldValidator14" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_tbPassword" ValidationGroup="NSR"></asp:RequiredFieldValidator></label>
                </div>
                <div class="col-sm-4">
                    <asp:TextBox ID="NS_tbPassword" title="please specify password in atleast 7 characters" runat="server" CssClass="dnnFormRequired form-control" TextMode="Password"></asp:TextBox>
                </div>
                <div class="label-right col-sm-2">
                    <label>Confirm Password</label><asp:RequiredFieldValidator ID="RequiredFieldValidator10" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_tbConfirmPassword" ValidationGroup="NSR"></asp:RequiredFieldValidator>
                </div>
                <div class="col-sm-4">
                    <asp:TextBox ID="NS_tbConfirmPassword" title="please re-enter the password" runat="server" CssClass="dnnFormRequired form-control" TextMode="Password"></asp:TextBox>
                    <asp:CompareValidator ID="CompareValidator1" runat="server" CssClass="informat" ControlToCompare="NS_tbPassword" ControlToValidate="NS_tbConfirmPassword" Display="Dynamic" ErrorMessage="Password does not match" ValidationGroup="NSR" ForeColor="Red"></asp:CompareValidator>
                </div>
            </div>

            <div class="form-group">
                <div class="label-right col-sm-2">
                    <label>
                        First Name
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator8" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_tbFirstName" ValidationGroup="NSR"></asp:RequiredFieldValidator></label>
                </div>
                <div class="col-sm-4">
                    <asp:TextBox ID="NS_tbFirstName" title="please specify your first name" runat="server" CssClass="dnnFormRequired form-control"></asp:TextBox>
                </div>
                <div class="label-right col-sm-2">
                    <label>Last Name</label><asp:RequiredFieldValidator ID="RequiredFieldValidator11" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_tbLastName" ValidationGroup="NSR"></asp:RequiredFieldValidator>
                </div>
                <div class="col-sm-4">
                    <asp:TextBox ID="NS_tbLastName" title="please specify your last name" runat="server" CssClass="dnnFormRequired form-control"></asp:TextBox>
                </div>
            </div>



            <div class="form-group">
                <div class="label-right col-sm-2">
                    <label>Street</label></div>
                <div class="col-sm-4">
                    <asp:TextBox title="please specify street detail" ID="tbStreet" runat="server" CssClass="form-control"></asp:TextBox></div>
                <div class="label-right col-sm-2">
                    <label>City</label><asp:RequiredFieldValidator ID="RequiredFieldValidator9" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_tbCity" ValidationGroup="NSR"></asp:RequiredFieldValidator></div>
                <div class="col-sm-4">
                    <asp:TextBox title="please specify your city" ID="NS_tbCity" runat="server" CssClass="dnnFormRequired form-control"></asp:TextBox></div>
            </div>

            <div class="form-group">
                <div class="label-right col-sm-2">
                    <label>State</label><asp:RequiredFieldValidator ID="RequiredFieldValidator13" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="ddlState" ValidationGroup="NSR"></asp:RequiredFieldValidator>
                </div>
                <div class="col-sm-4">
                    <asp:DropDownList ID="ddlState" title="please choose your state or region" runat="server" CssClass="form-control"></asp:DropDownList>
                </div>
                <div class="label-right col-sm-2">
                    <label>Zip</label>
                </div>
                <div class="col-sm-4">
                    <asp:TextBox title="please specify your postal code" ID="tbPostalCode" runat="server" CssClass="form-control"></asp:TextBox>
                </div>
            </div>

            <div class="form-group">
                <div class="label-right col-sm-2">
                    <label>
                       Gender
                    </label>
                </div>
                <div class="col-sm-4">
                    <asp:DropDownList ID="ddlGender" runat="server" CssClass="form-control">
                        <asp:ListItem Text="Male" Value="Male" Selected="True"></asp:ListItem>
                        <asp:ListItem Text="Female" Value="Female"></asp:ListItem>
                    </asp:DropDownList>
                </div>
                <div class="label-right col-sm-2">
                    <label>Email</label><asp:RequiredFieldValidator ID="RequiredFieldValidator12" runat="server" Display="Dynamic" ErrorMessage="&nbsp;*" ForeColor="Red" SetFocusOnError="True" ControlToValidate="NS_tbEmail" ValidationGroup="NSR"></asp:RequiredFieldValidator>
                </div>
                <div class="col-sm-4">
                    <asp:TextBox ID="NS_tbEmail" title="please specify your e-mail id" runat="server" CssClass="dnnFormRequired form-control"></asp:TextBox>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" CssClass="informat" ControlToValidate="NS_tbEmail" Display="Dynamic" ErrorMessage="Invalid email format" ForeColor="Red" SetFocusOnError="True" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ValidationGroup="NSR"></asp:RegularExpressionValidator>
                </div>
            </div>
        </div>
        <div id="NSR_dvDynamicStep1" style="clear: both; display: block; width: 100%;" class="dnnFormItem">
        </div>
        <div id="NSR_dvFixedStepOuter" class="form-group" style="clear: both;">
            <div class="label-right col-sm-2" style="width: 14%; float: left; text-align: right;">
                <label>
                    Services Offered
                </label>
            </div>
            <div id="NSR_dvFixedStep1" class="col-sm-10 NS_Required dnnFormItem" style="display: block; width: 86%;">
            </div>
        </div>

        <div style="clear: both; display: block; overflow: hidden">
            <table align="center">
                <tr>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>
                        <div style="width: 300px; margin: 10px 0;">
                            <input type="button" id="btnNextStep" value="NEXT STEP" style="width: 300px;" class="btn submit form-button btn-info  btn-block " />
                        </div>
                        <div style="width: 300px; float: left; text-align: center;clear:both;">
                            <label id="lblStepCaption" class="txtbutn">Step 1 of 4</label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</asp:Panel>
<div id="dialog-SaveFormUser" title="User detail" style="display:none;" >
    <table style="width:100%;" class="NS_tblReport">
        <tr>
            <td>
                <label for="Username">Phone#</label></td>
        </tr>
        <tr>
            <td>
                <input type="text" id="txtUN" placeholder="specify your phone#" class="dnnFormRequired form-control" style="width:100%;" /></td>
        </tr>
        <tr>
            <td>
                <label for="email">Password</label></td>
        </tr>
        <tr>
            <td>
                <input type="password" id="txtNPwd" placeholder="specify your password" class="dnnFormRequired form-control" style="width:100%;"/></td>
        </tr>
    </table>
</div>
<uc1:ucCropImage ID="ucCropImage1" runat="server" />
<style>
    .NS_RequiredCap {
        font-size: 12px;
        font-weight: bold;
        line-height: 12px;
        margin: 7px 0 0 4px;
        position: absolute;
    }

    .NS_On {
        display: block;
    }

    .NS_Off {
        display: none;
    }

    .NSR_ALink {
        font-size: 11px;
        font-weight: bold;
        color: blue !important;
    }

        .NSR_ALink:hover {
            font-size: 11px;
            font-weight: bold;
            color: blue !important;
            text-decoration: underline !important;
        }

    textarea.blur {
        color: Gray;
        font-size: 11px;
    }

    input.blur {
        color: Gray;
        font-size: 11px;
    }
</style>
<link href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet">
<link href="/DesktopModules/NS_Registration/bootstrap.css" rel="stylesheet" />

<script src="/DesktopModules/NS_Registration/Scripts/jquery-jtemplates/jquery-jtemplates.js"></script>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/bootbox.min.js" type="text/javascript"></script>
<script src="/DesktopModules/NS_MakeAppointment\Scripts/bootstrap.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/NS_Common.js"></script>
<asp:Literal ID="ltUserScripts" runat="server">
<script src="/DesktopModules/NS_Registration/Scripts/jquery-hint.js"></script>
<script src="/DesktopModules/NS_Registration/Scripts/module.js"></script>
<script src="/DesktopModules/NS_Registration/Scripts/jquery.formsaver.js"></script>
<script src="/DesktopModules/NS_Registration/Scripts/jquery.mask.min.js"></script>
</asp:Literal>
<asp:Literal ID="ltAdminScripts" runat="server" Visible="false">
    <script src="/resources/shared/scripts/dnn.jquery.js"></script>
    <script src="/DesktopModules/NS_Registration/Scripts/Admin.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <link href="/DesktopModules/NS_Registration/module.css" rel="stylesheet" />
</asp:Literal>

<script type="text/javascript" lang="java">
    var NSR_TotalSteps=<%=this.TotalSteps%>;
    var NSR_WSUrl='/DesktopModules/NS_Registration/rh.asmx/';
    var NSR_PID=<%=this.PortalId%>;
    var NSR_HTBUrl='<%=this.HomeTabUrl%>';
    var NSR_SID='<%=this.Session.SessionID%>';
    var NSR_UID=-1;
    function NSR_MakeRequest(WBurl,WBData,SuccessCB,FailedCB) {
        $.ajax({
            type: "POST", dataType: "json", contentType: "application/json; charset=utf-8",
            url: WBurl,
            data: WBData,
            success: function (data, resp) {
                if (SuccessCB!=undefined){SuccessCB(data.d, resp);}
            },
            error: function (a, b) { if (FailedCB != undefined) { FailedCB(a, b); }}
        });
    }
    function NSR_isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
    function NSR_isPhoneKey(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode == 40 || charCode == 41 || charCode==45) { return true;}
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
    function NSR_ValidateDate(dtValue) {
        var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2}\b/);
        return dtRegex.test(dtValue);
    }

    function NSR_IsDateValid(p) {
        var o = $(p).val();
        var rValue=NSR_isDate(o);
        if ($(p).next().hasClass("NSR_after")){
            $(p).next().remove();
        }
        if (rValue=='') {
            return true;
        }
        else {
            $(p).after('<label class="NSR_after" style="color:red;"><br/>'+rValue+"</label>");
            return false;
        }
    }
    var dtCh = "/";
    var NSR_minYear = 1900;
    var NSR_maxYear = 2100;

    function NSR_isInteger(s) {
        var i;
        for (i = 0; i < s.length; i++) {
            // Check that current character is number.
            var c = s.charAt(i);
            if (((c < "0") || (c > "9"))) return false;
        }
        // All characters are numbers.
        return true;
    }

    function NSR_stripCharsInBag(s, bag) {
        var i;
        var returnString = "";
        // Search through string's characters one by one.
        // If character is not in bag, append to returnString.
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (bag.indexOf(c) == -1) returnString += c;
        }
        return returnString;
    }

    function NSR_daysInFebruary(year) {
        // February has 29 days in any year evenly divisible by four,
        // EXCEPT for centurial years which are not also divisible by 400.
        return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
    }
    function NSR_DaysArray(n) {
        for (var i = 1; i <= n; i++) {
            this[i] = 31
            if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
            if (i == 2) { this[i] = 29 }
        }
        return this
    }

    function NSR_isDate(dtStr) {
        var rValue='';
        var daysInMonth = NSR_DaysArray(12)
        var pos1 = dtStr.indexOf(dtCh)
        var pos2 = dtStr.indexOf(dtCh, pos1 + 1)
        var strMonth = dtStr.substring(0, pos1)
        var strDay = dtStr.substring(pos1 + 1, pos2)
        var strYear = dtStr.substring(pos2 + 1)
        strYr = strYear
        if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
        if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1)
        for (var i = 1; i <= 3; i++) {
            if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
        }
        month = parseInt(strMonth)
        day = parseInt(strDay)
        year = parseInt(strYr)
        if (pos1 == -1 || pos2 == -1) {
            rValue="The date format should be : mm/dd/yyyy";
        }
        if (strMonth.length < 1 || month < 1 || month > 12) {
            rValue="Please enter a valid month";
        }
        try{
            if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > NSR_daysInFebruary(year)) || day > daysInMonth[month]) {
                rValue="Please enter a valid day";
            }}catch(e){}
        if (strYear.length != 4 || year == 0 || year < NSR_minYear || year > NSR_maxYear) {
            rValue="Please enter a valid 4 digit year between " + NSR_minYear + " and " + NSR_maxYear;
        }
        if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || NSR_isInteger(NSR_stripCharsInBag(dtStr, dtCh)) == false) {
            rValue="Please enter a valid date";
        }
        return rValue
    }
    function NSR_CheckFileExt(t,d) {
        if (t=='File'){
            var S=d.lastIndexOf('.');
            var C=d.length;
            var _ext=d.substr(S,10);
            
            if (_ext=='.gif' || (_ext=='.png') || (_ext=='.jpeg') || (_ext.toLowerCase()=='.jpg'))
            {return 'Image';}
            if ((_ext=='.doc') || (_ext=='.docx') || (_ext=='.pdf'))
            {return 'Doc';}
        }
    }
</script>
