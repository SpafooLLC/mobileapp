<%@ Control Language="C#" Inherits="NS.Modules.NS_CityUserInfo.ViewNS_CityUserInfo"
    AutoEventWireup="True" CodeBehind="ViewNS_CityUserInfo.ascx.cs" %>
<link href="/DesktopModules/NS_CityUserInfo/Scripts/CLEditor1_3_0/jquery.cleditor.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
<link href="/DesktopModules/NS_CityUserInfo/Scripts/DatePicker/css/ui-lightness/jquery-ui-1.10.3.custom.min.css"
    rel="stylesheet" type="text/css" />
<script src="/DesktopModules/NS_CityUserInfo/Scripts/CLEditor1_3_0/jquery.cleditor.min.js" type="text/javascript"></script>    
<script src="/DesktopModules/NS_CityUserInfo/Scripts/DatePicker/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<script src="/DesktopModules/NS_CityUserInfo/Scripts/Module/Module.js" type="text/javascript"></script>
<script src="/DesktopModules/NS_CityUserInfo/Scripts/Mask/jquery.maskedinput.min.js" type="text/javascript"></script>
<script src="/DesktopModules/NS_CityUserInfo/Scripts/jqPrint/jquery.jqprint.0.3.js" type="text/javascript"></script>
<link href="/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" lang="javascript">var NS_City_ModuleId=<%=this.ModuleId %>;</script>
<div class="cityui">
<asp:Panel ID="NS_City_SuperPanel" runat="server" style="border:dashed 2px maroon;padding:6px;min-height:500px;margin-bottom:15px;">
    <table width="100%;" border="0" cellpadding="6" cellspacing="6">
        <tr>
            <td colspan="2"><label style="background-color: Maroon; color: #FFF; padding: 3px;">SuperUser Panel</label></td>
        </tr>
        <tr>
            <td class="NS_ColCaption">Submit Form to Email :</td>
            <td class="NS_ColInput"><asp:TextBox ID="txtSubmitFormEmail" runat="server" CssClass="form-control"></asp:TextBox></td>
        </tr>
        <tr>
            <td class="NS_ColCaption">Customer Service Request Role :</td>
            <td class="NS_ColInput"><asp:DropDownList runat="server" ID="ddlUserRole"></asp:DropDownList></td>
        </tr>
        <tr>
            <td class="NS_ColCaption" valign="top">Introduction HTML:</td>
            <td class="NS_ColInput"><asp:TextBox TextMode="MultiLine" Rows="10" Columns="60" ID="txtIntroduction" runat="server" CssClass="NS_City_InputArea"></asp:TextBox></td>
        </tr>
        <tr>
            <td class="NS_ColCaption" valign="top">Confirmation Notice:</td>
            <td class="NS_ColInput"><asp:TextBox TextMode="MultiLine" Rows="10" Columns="60" ID="txtConfirmationNotice" runat="server" CssClass="NS_City_InputAreaNoHTML"></asp:TextBox></td>
        </tr>
        <tr>
            <td class="NS_ColCaption" valign="top">Personal Info Description:</td>
            <td class="NS_ColInput"><asp:TextBox TextMode="MultiLine" Rows="10" Columns="60" ID="NS_City_PIDescription" runat="server" CssClass="NS_City_InputArea"></asp:TextBox></td>
        </tr>
        <tr>
            <td class="NS_ColCaption" valign="top">Service & Billing Description:</td>
            <td class="NS_ColInput"><asp:TextBox TextMode="MultiLine" Rows="10" Columns="60" ID="NS_City_SBDescription" runat="server" CssClass="NS_City_InputArea"></asp:TextBox></td>
        </tr>
        <tr>
            <td class="NS_ColCaption" valign="top">Service Options Description:</td>
            <td class="NS_ColInput"><asp:TextBox TextMode="MultiLine" Rows="10" Columns="60" ID="NS_City_SODescription" runat="server" CssClass="NS_City_InputArea"></asp:TextBox></td>
        </tr>
        <tr>
            <td class="NS_ColCaption" valign="top">Required Documents Description :</td>
            <td class="NS_ColInput"><asp:TextBox TextMode="MultiLine" Rows="10" Columns="60" ID="NS_City_RDDescription" runat="server" CssClass="NS_City_InputArea"></asp:TextBox></td>
        </tr>
        <tr>
            <td class="NS_ColCaption" valign="top"> Admin E-mail Content :<br /><label style="font-size:10px;">Tokens : [FirstName] [LastName] [ContactPhone] [ConnectDate] [Street] [City] [State] [Zip]</label> </td>
            <td class="NS_ColInput"><asp:TextBox TextMode="MultiLine" Rows="10" Columns="60" ID="NS_City_AdminEmail" runat="server" CssClass="NS_City_InputArea"></asp:TextBox></td>
        </tr>
        <tr>
            <td class="NS_ColCaption"></td>
            <td class="NS_ColInput"><asp:Button runat="server" ID="btnSaveSettings" Text="Save Settings" CssClass="NS_City_Buttons" OnClick="btnSaveSettings_Click" /></td>
        </tr>
    </table>
</asp:Panel>
<asp:Panel ID="pnlMainUserView" runat="server">
    <div id="NS_City_FormTabs">
        <div id="NS_City_FormIntro" class="NS_CityTabs NS_City_TabsSel">Introduction</div>
        <div id="NS_City_FormPersonal" class="NS_CityTabs">Personal Info</div>
        <div id="NS_City_FormBilling" class="NS_CityTabs">Service & Billing</div>
        <div id="NS_City_FormServiceOptions" class="NS_CityTabs">Service Options</div>
        <div id="NS_City_FormDocument" class="NS_CityTabs">Required Documents</div>
        <div style="clear: both;"></div>
    </div>
    <div id="NS_City_ModuleOuter">
        <div id="NS_TabSegment1" class="NS_TabSegment NS_TabOn"><asp:Label ID="NS_City_lblIntro" runat="server"></asp:Label><div>
        <label id="ShopCity_NextText_FormPersonal" class="NS_City_NextText">Continue ></label>
        </div>
        </div>
        <div id="NS_TabSegment2" class="NS_TabSegment" style="border-bottom: solid 1px #BCBCBC; padding-bottom: 15px;">
            <div id="NS_Segment_Personal">
                <div class="segleft">
                    <table width="100%;" border="0" cellpadding="6" cellspacing="6" class="res-table">
                        <tr>
                            <td class="NS_ColCaption">Is this for a commercial account:</td>
                            <td class="NS_ColInput">
                                <input type="radio" name="NS_City_IsCommercial" id="NS_City_IsCommercialYes" class="NS_City_IsCommercial" value="Y" />
                                <label for="NS_City_IsCommercialYes">Yes</label>&nbsp;
                                <input type="radio" name="NS_City_IsCommercial" id="NS_City_IsCommercialNo" class="NS_City_IsCommercial" value="N" checked="checked" />
                                <label for="NS_City_IsCommercialNo">No</label>
                            </td>
                        </tr>
                        <tr id="NS_City_trTaxID" style="display: none;">
                            <td class="NS_ColCaption">Tax ID#:</td>
                            <td class="NS_ColInput">
                                <input id="NS_City_txtTaxID" type="text" class="form-control" /></td>
                        </tr>
                        <tr id="NS_City_trDBA" style="display: none;">
                            <td class="NS_ColCaption">Business Name:</td>
                            <td class="NS_ColInput">
                                <input id="NS_City_txtDBA" type="text" class="form-control" /></td>
                        </tr>
                        <tr id="NS_City_trPersonReqService" style="display:none;">
                            <td class="NS_ColCaption">Person Requesting Service:</td>
                            <td class="NS_ColInput">
                                <input type="text" id="NS_City_txtPersonReqService" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaption">First Name:</td>
                            <td class="NS_ColInput"><input id="NS_City_FirstName" type="text" class="form-control" maxlength="50" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaption">Last Name:</td>
                            <td class="NS_ColInput"><input id="NS_City_LastName" type="text" class="form-control" maxlength="50" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaption">Contact Phone #</td>
                            <td class="NS_ColInput"><input id="NS_City_ContactPhone" type="text" class="form-control" maxlength="20" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaption"><label id="NS_CitylblSSN" style="font-weight:normal;">Social Security #</label></td>
                            <td class="NS_ColInput"><input id="NS_City_SSN" type="text" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaption">DOB: (MM/DD/YY)</td>
                            <td class="NS_ColInput"><input id="NS_City_DOB" type="text" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaption">Type Of ID:</td>
                            <td class="NS_ColInput">
                                <input type="radio" name="TypeOfID" class="TypeOfID" id="NS_CityTypeOfIDState" value="S" checked="checked" />
                                <label for="NS_CityTypeOfIDState"> State ID</label>&nbsp;
                                <label for="NS_CityTypeOfIDLicense">
                                <input type="radio" name="TypeOfID" class="TypeOfID" id="NS_CityTypeOfIDLicense" value="D" />
								Driver's License</label>
                            </td>
                        </tr>
                        <tr id="NS_City_trState"><td class="NS_ColCaption">State ID#:</td>
                            <td class="NS_ColInput"><input id="NS_City_StateID" type="text" class="form-control" /></td>
                        </tr>
                        <tr id="NS_City_trStateIDState">
                            <td class="NS_ColCaption">ID State:</td>
                            <td class="NS_ColInput"><input id="NS_City_StateIDState" type="text" class="form-control" value="Texas" /></td>
                        </tr>
                        <tr id="NS_City_trLicense" style="display: none;">
                            <td class="NS_ColCaption">Driver's License:</td>
                            <td class="NS_ColInput"><input id="NS_City_DriverLicense" type="text" class="form-control" /></td>
                        </tr>
                        <tr id="NS_City_trLicenseState" style="display: none;">
                            <td class="NS_ColCaption">ID State:</td>
                            <td class="NS_ColInput"><input id="NS_City_DLState" type="text" class="form-control" value="Texas" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaption">Do you have e-mail address:</td>
                            <td class="NS_ColInput"><input type="radio" name="NS_City_HaveEmail" id="NS_CityEmailYes" class="NS_City_HaveEmail" value="Y" />
                                <label for="NS_CityEmailYes">Yes</label>&nbsp;
                                <input type="radio" name="NS_City_HaveEmail" id="NS_CityEmailNo" class="NS_City_HaveEmail" value="N" checked="checked" />
                                <label for="NS_CityEmailNo"> No</label>
                            </td>
                        </tr>
                        <tr id="NS_City_trEmail" style="display: none;">
                            <td class="NS_ColCaption">E-mail address:</td>
                            <td class="NS_ColInput"><input id="NS_City_Email" type="text" class="form-control" /></td>
                        </tr>
                        <tr id="NS_City_trEmailConfirm" style="display: none;">
                            <td class="NS_ColCaption">Confirm E-mail Address:</td>
                            <td class="NS_ColInput"><input id="NS_City_ConfirmEmail" type="text" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaption">Keep Information Confidential:</td>
                            <td class="NS_ColInput"><input type="radio" name="NS_City_Confidential" id="NS_City_ConfidentialYes" class="NS_City_Confidential" value="Y" />
                                <label for="NS_City_ConfidentialYes"> Yes</label>&nbsp;
                                <input type="radio" name="NS_City_Confidential" id="NS_City_ConfidentialNo" class="NS_City_Confidential" value="N" />
                                <label for="NS_City_ConfidentialNo"> No</label>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="segright"><asp:Label ID="lblPIDescription" runat="server" Text=""></asp:Label></div>
                <div style="clear: both;"></div>
            </div>
            <div>
                <label id="ShopCity_NextText_FormBilling" class="NS_City_NextText">Continue ></label>
            </div>
        </div>
        <div id="NS_TabSegment3" class="NS_TabSegment " style="border-bottom: solid 1px #BCBCBC; padding-bottom: 15px;">
            <div class="segleft">
                <div id="NS_City_ServiceInfo">
                    <table width="100%;" border="0" cellpadding="6" cellspacing="6" class="res-table">
                        <tr>
                            <td class="NS_ColCaption"><label style="font-weight: bold;">Connect Date</label></td>
                            <td class="NS_ColInput"><input id="NS_City_ConnectDate" type="text" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaption"><label style="font-weight: bold;">Service Address</label></td>
                            <td class="NS_ColInput"></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaptionIndent">Street:</td>
                            <td class="NS_ColInput"><input type="text" id="NS_City_SRV_Street" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaptionIndent">City:</td>
                            <td class="NS_ColInput"><input type="text" id="NS_City_SRV_City" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaptionIndent">State:</td>
                            <td class="NS_ColInput"><input type="text" id="NS_City_SRV_State" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaptionIndent">Zip:</td>
                            <td class="NS_ColInput"><input type="text" id="NS_City_SRV_Zip" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaption">Is Mailing Address same as Service Address?</td>
                            <td class="NS_ColInput">
                                <input type="radio" name="NS_City_BillingSame" id="NS_City_IsBillingYes" class="NS_City_IsBilling" value="Y" />
                                <label for="NS_City_IsBillingYes"> Yes</label> &nbsp;
                                <input type="radio" name="NS_City_BillingSame" id="NS_City_IsBillingNo" class="NS_City_IsBilling" value="N" checked="checked" />
                                <label for="NS_City_IsBillingNo"> No</label>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="NS_City_BillingInfo">
                    <table width="100%;" border="0" cellpadding="6" cellspacing="6" class="res-table">
                        <tr>
                            <td class="NS_ColCaption"><label style="font-weight: bold;">Mailing Address</label></td>
                            <td class="NS_ColInput"></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaptionIndent">Street:</td>
                            <td class="NS_ColInput"><input type="text" id="NS_City_Billing_Street" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaptionIndent">City:</td>
                            <td class="NS_ColInput"><input type="text" id="NS_City_Billing_City" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaptionIndent">State:</td>
                            <td class="NS_ColInput"><input type="text" id="NS_City_Billing_State" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaptionIndent">Zip:</td>
                            <td class="NS_ColInput"><input type="text" id="NS_City_Billing_Zip" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td class="NS_ColCaptionIndent" valign="top">Address Verification:</td>
                            <td class="NS_ColInput"><input type="checkbox" id="NS_City_AddressVerification" checked="checked" />
                            <label for="NS_City_AddressVerification">I understand that if the above address is not the correct address, my account will be billed an additional $50.00.</label></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="segright"><asp:Label ID="lblSBDescription" runat="server" Text=""></asp:Label></div>
            <div style="clear: both;"></div>
            <div><label id="ShopCity_NextText_FormServiceOptions" class="NS_City_NextText">Continue ></label></div>
        </div>
        <div id="NS_TabSegment4" class="NS_TabSegment" style="border-bottom: solid 1px #BCBCBC; padding-bottom: 15px;">
            <div class="segleft">
                <table width="100%;" border="0" cellpadding="6" cellspacing="6" class="res-table">
                    <tr>
                        <td class="NS_ColCaption">Enroll in E-Bill?</td>
                        <td class="NS_ColInput">
                            <input type="radio" name="NS_City_EBilling" id="NS_City_EBillingYes" class="NS_City_EBilling" value="Y" />
                            <label for="NS_City_EBillingYes"> Yes</label>&nbsp;
                            <input type="radio" name="NS_City_EBilling" id="NS_City_EBillingNo" class="NS_City_EBilling" value="N" checked="checked" />
                            <label for="NS_City_EBillingNo"> No</label>
                        </td>
                    </tr>
                    <tr id="NS_City_trEBilling" style="display: none;">
                        <td class="NS_ColCaption">E-mail address to send e-bill:</td>
                        <td class="NS_ColInput"><input type="text" id="NS_City_EBillingEmail" class="form-control" /></td>
                    </tr>
                    <tr id="NS_City_trEBillingConfirm" style="display: none;">
                        <td class="NS_ColCaption">Confirm E-mail:</td>
                        <td class="NS_ColInput"><input type="text" id="NS_City_EBillingConfirm" class="form-control" /></td>
                    </tr>
                    <tr>
                        <td class="NS_ColCaption">Enroll in bank draft (auto pay)?</td>
                        <td class="NS_ColInput">
                            <input type="radio" name="NS_City_BankDraft" id="NS_City_BankDraftYes" class="NS_City_BankDraft" value="Y" />
                            <label for="NS_City_BankDraftYes"> Yes</label> &nbsp;
                            <input type="radio" name="NS_City_BankDraft" id="NS_City_BankDraftNo" class="NS_City_BankDraft" value="N" checked="checked" />
                            <label for="NS_City_BankDraftNo"> No</label>
                        </td>
                    </tr>
                    <tr id="NS_City_trBankDraft" style="display: none;">
                        <td colspan="2">
                            <table width="100%;" border="0" cellpadding="6" cellspacing="6" class="res-table">
                                <tr>
                                    <td class="NS_ColCaption">Bank Routing number:</td>
                                    <td class='NS_ColInput'><input type="text" id="NS_City_BankRoutingNumber" class="form-control" /></td>
                                </tr>
                                <tr>
                                    <td class="NS_ColCaption">Bank Account number:</td>
                                    <td class='NS_ColInput'><input type="text" id="NS_City_BankAccountNumber" class="form-control" /></td>
                                </tr>
                                <tr>
                                    <td class="NS_ColCaption">Name on Account:</td>
                                    <td class='NS_ColInput'><input type="text" id="NS_City_NameOnAccount" class="form-control" /></td>
                                </tr>
                                <tr>
                                    <td class="NS_ColCaption">Bank Name:</td>
                                    <td class='NS_ColInput'><input type="text" id="NS_City_BankName" class="form-control" /></td>
                                </tr>
                                <tr>
                                    <td class="NS_ColCaption">Statement of Approval:</td>
                                    <td class='NS_ColInput'><input type="checkbox" id="NS_City_AutoDraft" /><label for="NS_City_AutoDraft">I agree to auto draft my account</label></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="segright"><asp:Label ID="lblSODescription" runat="server" Text=""></asp:Label></div>
            <div style="clear: both;"></div>
            <div><label id="ShopCity_NextText_FormDocument" class="NS_City_NextText">Continue ></label>
            </div>
        </div>
        <div id="NS_TabSegment5" class="NS_TabSegment NS_TabOff" style="border-bottom: solid 1px #BCBCBC; padding-bottom: 15px;">
            <div class="segleft">
                <table width="100%;" border="0" cellpadding="6" cellspacing="6" class="res-table-center">
                    <tr>
                        <td colspan="2" class="NS_ColCaption">Please scan the following required documents and upload:
                        </td>
                    </tr>
                    <tr>
                        <td class="NS_ColCaptionIndent xsptop"><label id="NS_City_lblSSNDocument" style="font-weight:normal;">Social Security Document:</label></td>
                        <td><input type="file" id="NS_City_SSNDocument"  data-val="true" data-val-required=".jpg, .bmp, .png, .gif, .doc, .docx, .pdf are the only extensions allowed" accept="jpg|jpeg|bmp|png|gif|doc|docx|pdf" data-val-accept=".jpg, .bmp, .png, .gif, .doc, .docx, .pdf are the only extensions allowed"  />
                              <input type="hidden" id="NS_City_SSNDocumentFileName"   />
                        </td>
                    </tr>
                    <tr id="NS_City_trStateIDDocument">
                        <td class="NS_ColCaptionIndent xsptop">StateID Document:</td>
                        <td><input type="file" id="NS_City_StateIDDocument" />
                             <input type="hidden"   id="NS_City_StateIDDocumentFileName"   />
                        </td>
                    </tr>
                    <tr id="NS_City_trLicenseDocument" class="NS_City_trLicenseDocument xsptop" style="display: none;">
                        <td class="NS_ColCaptionIndent">Driver's License Document:</td>
                        <td><input type="file" id="NS_City_LicenseDocument" style="width: 130px;" />
                            <input type="hidden"   id="NS_City_LicenseDocumentFileName" runat="server"   />
                        </td>
                    </tr>
                    <tr id="NS_City_trCancelledCheck" class="NS_City_trCancelledCheck xsptop" style="display: none;">
                        <td class="NS_ColCaptionIndent">Cancelled Check Document:</td>
                        <td><input type="file" id="NS_City_CancelledCheckDocument" />
                             <input type="hidden"   id="NS_City_CancelledCheckDocumentFileName" runat="server"   />
                        </td>
                    </tr>
                    <tr>
                        <td class="NS_ColCaptionIndent xsptop">Proof of Address Document:</td>
                        <td><input type="file" id="NS_City_POADocument" />
                              <input type="hidden"   id="NS_City_POADocumentFileName" runat="server"  />
                        </td>
                    </tr>
                    <tr>
<td>&nbsp;</td>
                        <td>
 <object data="/scripts/uploadify/uploadify.swf" type="application/x-shockwave-flash" width="200" height="200">
                <param name="allowScriptAccess" value="sameDomain">
                <param name="quality" value="best">
                <param name="wmode" value="transparent">
                <embed src="" quality="high" wmode="transparent" pluginspage="http://www.adobe.com/go/getflash" type="application/x-shockwave-flash" width="930" height="170"></embed>
                <param name="bgcolor" value="#ffffff" />
                <param name="movie" value="/scripts/uploadify/uploadify.swf" />

            <!--[if !IE]>-->
            <object type="application/x-shockwave-flash" data="/scripts/uploadify/uploadify.swf" width="200" height="200">
            <!--<![endif]-->
            <p></p>
            <!--[if !IE]>-->
            </object>
            <!--<![endif]-->
            </object>
            </td>
                        
                    </tr>
                </table>
            </div>
            <div class="segright"><asp:Label ID="lblRDDescription" runat="server" Text=""></asp:Label></div>
            <div style="clear: both;"></div>
        </div>
    </div>
    <div id="NS_City_UserRegistration" class="NS_TabSegment">
        <table width="100%;" border="0" cellpadding="6" cellspacing="6" class="res-table">
            <tr>
                <td class="NS_ColCaption" colspan="2"> Please provide your e-mail address and password. You can resume the form later on by clicking on 'Resume Application'</td>
            </tr>
            <tr>
                <td class="NS_ColCaption">E-mail Address:</td>
                <td class="NS_ColInput"><input type="text" id="NS_City_txtUName" class="form-control" /></td>
            </tr>
            <tr>
                <td class="NS_ColCaption">Password:</td>
                <td class="NS_ColInput"><input type="password" id="NS_City_txtPassword" class="form-control" /></td>
            </tr>
            <tr id="NS_City_trConfirmUserPassword">
                <td class="NS_ColCaption">Confirm Password:</td>
                <td class="NS_ColInput"><input type="password" id="NS_City_txtConfirmPassword" class="form-control" /></td>
            </tr>
            <tr>
                <td class="NS_ColCaption">&nbsp;</td>
                <td class="NS_ColInput">
                    <input type="button" id="NS_City_CreateUser" class="NS_City_Buttons" value="Save Application" />
                    <input type="button" id="NS_City_LoadForm" class="NS_City_Buttons" value="Load Application" style="display: none;" />
                    <input type="button" id="NS_City_CancelCreate" class="NS_City_Buttons" value="Cancel" />
                </td>
            </tr>
        </table>
    </div>
    <div id="NS_City_TabFooter">
        <input type="button" id="NS_City_SubmitForm" class="NS_City_Buttons" value="Submit" />
        <input type="button" id="NS_City_SaveForLater" class="NS_City_Buttons" value="Save for Later" />
        <input type="button" id="NS_City_ResumeForm" class="NS_City_Buttons" value="Resume Application" />
    </div>
</asp:Panel>
<div style="clear:both;"></div>
<asp:Panel ID="pnlManageApplication" runat="server" Visible="true">
    <asp:GridView ID="gvApplications" runat="server" AutoGenerateColumns="False" CellPadding="4" ForeColor="#333333" GridLines="None" Width="100%" onrowcommand="gvApplications_RowCommand">
        <RowStyle BackColor="#F7F6F3" ForeColor="#333333" />
        <Columns>
            <asp:TemplateField>
                <ItemTemplate>
                    <asp:Button OnClientClick="return confirm('Are you sure to delete this item?');" ID="btnDelete" Text="Remove" CommandName="Remove" CommandArgument='<%#Eval("UserFormID")%>' runat="server" />
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField>
            <HeaderStyle HorizontalAlign="Left" Font-Bold="true" />
                <HeaderTemplate >First Name</HeaderTemplate>
                <ItemTemplate><label><%#Eval("FirstName")%></label></ItemTemplate>
            </asp:TemplateField>
           
            <asp:TemplateField>
                <HeaderTemplate>Last Name</HeaderTemplate>
                <ItemTemplate><label><%#Eval("LastName")%></label></ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField>
                <HeaderTemplate>Phone Number</HeaderTemplate>
                <ItemTemplate><label><%#Eval("ContactPhone")%></label></ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField>
                <HeaderTemplate>Connect Date</HeaderTemplate>
                <ItemTemplate><label><%#Eval("ConnectDate")%></label></ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField>
                <ItemTemplate>
                    <input type="button" onclick='return NS_City_OpenDetail(<%#Eval("UserFormID")%>);' value="View Details"/>
                    <div id='dvViewDetails_<%#Eval("UserFormID")%>' style="display: none; overflow:auto" title="Service Request Detail">
                        <table>
                            <tr>
                                <td><label style="font-weight: bold">Personal Information</label></td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Is this for a commercial account?</td>
                                <td><%#BoolText(Eval("IsCommercial").ToString())%>&nbsp;</td>
                            </tr>
                            <tr style='display:<%#(Eval("IsCommercial").ToString()=="True")?"":"none"%>'>
                                <td>Business Name:</td><td><%#Eval("DBA")%>&nbsp;</td>
                            </tr>
                            <tr style='display:<%#(Eval("IsCommercial").ToString()=="True")?"":"none"%>'>
                                <td>Person Requesting Service:</td>
                                <td><%#Eval("PersonReqService")%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>First Name:</td>
                                <td><%#Eval("FirstName")%></td>
                            </tr>
                            <tr>
                                <td>Last Name :</td>
                                <td><%#Eval("LastName")%></td>
                            </tr>
                            <tr>
                                <td>Contact Phone #</td>
                                <td><%#Eval("ContactPhone")%></td>
                            </tr>
                            <tr>
                                <td><%#(Eval("IsCommercial").ToString()=="True")?"Tax ID Number":"Social Security #"%></td>
                                <td><%#Eval("SSN")%></td>
                            </tr>
                            <tr>
                                <td>DOB: (MM/DD/YY)</td>
                                <td><%#Eval("DOB")%></td>
                            </tr>
                            <tr>
                                <td>Type Of ID:</td>
                                <td><%#StateText(Eval("TypeOfID").ToString())%></td>
                            </tr>
                            <tr style='display:<%#(Eval("StateID").ToString()=="S")?"":"none"%>'>
                                <td>State ID#:</td>
                                <td><%#Eval("StateID")%></td>
                            </tr>
                            <tr style='display:<%#(Eval("StateID").ToString()=="S")?"none":""%>'>
                                <td>Driver's License:</td>
                                <td><%#Eval("DriverLicense")%></td>
                            </tr>
                            <tr>
                                <td>ID State:</td>
                                <td><%#Eval("IDState")%></td>
                            </tr>
                            <tr>
                                <td>Do you have e-mail address:</td>
                                <td><%#BoolText(Eval("HaveEmail").ToString())%></td>
                            </tr>
                            <tr style='display:<%#CheckDisplay(Eval("HaveEmail").ToString())%>'>
                                <td>E-mail Address:</td>
                                <td><%#Eval("EmailAddress")%></td>
                            </tr>
                            <tr>
                                <td>Keep Information Confidential:</td>
                                <td><%#BoolText(Eval("KeepConfidential").ToString())%></td>
                            </tr>
                            <tr>
                                <td><label style="font-weight: bold">Service &amp; Billing Detail</label></td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Connect Date:</td>
                                <td><%#Eval("ConnectDate")%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Service Address :</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Street:</td>
                                <td><%#Eval("ServiceStreet")%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>City:</td>
                                <td><%#Eval("ServiceCity")%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>State:</td>
                                <td><%#Eval("ServiceState")%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Zip:</td>
                                <td><%#Eval("ServiceZip")%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Is Mailing Address same as Service Address?</td>
                                <td><%#BoolText(Eval("BillingAddressSame").ToString())%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Mailing Address</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Street:</td>
                                <td><%#Eval("BillingStreet")%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>City:</td>
                                <td><%#Eval("BillingCity")%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>State:</td>
                                <td><%#Eval("BillingState")%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Zip:</td>
                                <td><%#Eval("BilliingZip")%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <label style="font-weight: bold">Service Option</label></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Do you plan on enrolling in paperless billing?</td>
                                <td><%#BoolText(Eval("EBilling").ToString())%>&nbsp;</td>
                            </tr>
                            <tr style='display:<%#CheckDisplay(Eval("EBilling").ToString())%>'>
                                <td>E-mail address to send e-bill:</td>
                                <td><%#Eval("EBillingEmail")%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Do you plan on bank draft?</td>
                                <td><%#BoolText(Eval("EnrolBankDraft").ToString())%>&nbsp;</td>
                            </tr>
                            <tr style='display:<%#CheckDisplay(Eval("EnrolBankDraft").ToString())%>'>
                                <td>Bank Routing number:</td>
                                <td><%#Eval("BankRoutingNumber")%>&nbsp;</td>
                            </tr>
                            <tr style='display:<%#CheckDisplay(Eval("EnrolBankDraft").ToString())%>'>
                                <td>Bank Account number:</td>
                                <td><%#Eval("BankAccountNumber")%>&nbsp;</td>
                            </tr>
                            <tr style='display:<%#CheckDisplay(Eval("EnrolBankDraft").ToString())%>'>
                                <td>Name on Account:</td>
                                <td><%#Eval("NameOnAccount")%>&nbsp;</td>
                            </tr>
                            <tr style='display:<%#CheckDisplay(Eval("EnrolBankDraft").ToString())%>'>
                                <td>Bank Name:</td>
                                <td><%#Eval("BankName")%>&nbsp;</td>
                            </tr>
                            <tr  style='display:<%#CheckDisplay(Eval("EnrolBankDraft").ToString())%>'>
                                <td>Statement of Approval:</td>
                                <td><%#BoolText(Eval("AutoDraftAccount").ToString())%>&nbsp;</td>
                            </tr>
                            <tr>
                                <td><label style="font-weight: bold">Required Documents</label></td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr style='display:<%#(Eval("SSNFile").ToString()=="")?"none":""%>'>
                                <td><%#(Eval("IsCommercial").ToString()=="True")?"Tax ID":"Social Security"%> Document:</td>
                                <td><a href='<%#GetUrl(Eval("SSNFile").ToString())%>' target="_blank">Click Here</a></td>
                            </tr>
                            <tr style='display:<%#(Eval("StateIDFile").ToString()=="")?"none":""%>'>
                                <td>StateID Document:</td>
                                <td><a href='<%#GetUrl(Eval("StateIDFile").ToString())%>' target="_blank">Click Here</a></td>
                            </tr>
                            <tr style='display:<%#(Eval("DriverLicenseFile").ToString()=="")?"none":""%>'>
                                <td>Driver's License Document:</td>
                                <td><a href='<%#GetUrl(Eval("DriverLicenseFile").ToString())%>' target="_blank">Click Here</a></td>
                            </tr>
                            <tr style='display:<%#(Eval("CancelledCheckFile").ToString()=="")?"none":""%>'>
                                <td>Cancelled Check Document:</td>
                                <td><a href='<%#GetUrl(Eval("CancelledCheckFile").ToString())%>' target="_blank">ClickHere</a></td>
                            </tr>
                            <tr style='display:<%#(Eval("POAFile").ToString()=="")?"none":""%>'>
                                <td>Proof of Address Document:</td>
                                <td><a href='<%#GetUrl(Eval("POAFile").ToString())%>' target="_blank">Click Here</a></td>
                            </tr>
                        </table>
                    </div>
                </ItemTemplate>
            </asp:TemplateField>
        </Columns>
        <FooterStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#284775" ForeColor="White" HorizontalAlign="Center" />
        <EmptyDataTemplate> No Records Found...</EmptyDataTemplate>
        <SelectedRowStyle BackColor="#E2DED6" Font-Bold="True" ForeColor="#333333" />
        <HeaderStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" Font-Size="12px" HorizontalAlign="Left" />
        <EditRowStyle BackColor="#999999" />
        <AlternatingRowStyle BackColor="White" ForeColor="#284775" />
    </asp:GridView>
</asp:Panel>
<div id="NS_City_dvCofirmationMessage" style="display: none;" title="Confirmation"><asp:Label ID="NS_City_ShowConfirmationMessage" runat="server"></asp:Label></div>
<div id='dvViewDetails_<%#Eval("UserFormID")%>' style="" title="Service Request Detail"></div>
</div>
