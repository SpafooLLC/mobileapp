var NS_City_StateIDDocument = '';
var NS_City_LicenseDocument = '';
var NS_City_CancelCheckDocument = '';
var NS_City_POADocument = '';
var NS_City_SSNDocument = ''
var FN = ""; var LN = "";
var NS_City_ContactPhone = "";
var NS_City_ConnectDate = "";
var NS_City_SSN = "";
var NS_City_DOB = "";
var NS_City_IDState = "Texas";
var TID = "";
var SID = "";
var DL = "";
var HavEmail = false;
var IsCommercial=false;
var TaxID='';
var BusinessName = '';
var PersonReqServicve = '';
var NS_City_KeepConfidential = false;
var EmailAddress = "";
var SStreet = '';
var SCity = "";
var SState = "";
var SZip = "";
var SameBilling = false;
var BStreet = '';
var BCity = "";
var BState = "";
var BZip = "";
var EBilling = false;
var EBillingEmail = "";
var EnrolBankDraft = false;
var BRN = "";
var BAN = "";
var BN = "";
var NOA = "";
var ADAgree = false;
var NS_City_UName = "";
var NS_City_UPass = "";
var NS_City_UID = -1;

$(document).ready(function () {
    $(".NS_City_InputAreaNoHTML").cleditor({ controls: '' });
    $(".NS_City_InputArea").cleditor();
    $("#NS_City_EditAccor").accordion();
    // On Tab Click
    $(".NS_CityTabs").click(function () {
        $('.NS_City_TabsSel').addClass('NS_CityTabs').removeClass('NS_City_TabsSel');
        $(this).addClass('NS_City_TabsSel').removeClass('NS_CityTabs');
        $(".NS_TabOn").addClass("NS_TabOff").removeClass("NS_TabOn");
        NS_City_LoadTabContent(this.id);
    });
    NS_City_LoadTabContent('NS_City_FormIntro');
    $(".NS_City_NextText").click(function () {
        var _NextId = this.id.split("_")[2];
        NS_City_ShowNextTab(_NextId);
    });
    $("#NS_City_ContactPhone").mask("999-999-9999");
    $("#NS_City_SSN").mask("999-99-9999");
    $("#NS_City_DOB").mask("99/99/99");
    $('#NS_CityTypeOfIDState').click(function () {//$('.TypeOfID').click(function () {
        var _choosen = $(this).val();
        if (_choosen == 'S') {
            $("#NS_City_trState").show();
            $("#NS_City_trStateIDDocument").show();
            $("#NS_City_trStateIDState").show();

            $("#NS_City_trLicense").hide();
            $("#NS_City_trLicenseDocument").hide();
            $("#NS_City_trLicenseState").hide();
        }
        else {
            $("#NS_City_trState").hide();
            $("#NS_City_trStateIDDocument").hide();
            $("#NS_City_trStateIDState").hide();
            SID = '';

            $("#NS_City_trLicense").show();
            $("#NS_City_trLicenseDocument").show();
            $("#NS_City_trLicenseState").show();
        }
        if (_choosen == 'D') {
            $("#NS_City_trLicense").show();
            $("#NS_City_trLicenseDocument").show();
            $("#NS_City_trLicenseState").show();
            alert(_choosen);
        }
        else {
            $("#NS_City_trLicense").hide();
            $("#NS_City_trLicenseDocument").hide();
            $("#NS_City_trLicenseState").hide();
            DL = '';
        }
    });

    $('#NS_CityTypeOfIDLicense').click(function () {//$('.TypeOfID').click(function () {
        var _choosen = $(this).val();
        if (_choosen == 'S') {
            $("#NS_City_trState").show();
            $("#NS_City_trStateIDDocument").show();
            $("#NS_City_trStateIDState").show();

            $("#NS_City_trLicense").hide();
            $("#NS_City_trLicenseDocument").hide();
            $("#NS_City_trLicenseState").hide();
        }
        else {
            $("#NS_City_trState").hide();
            $("#NS_City_trStateIDDocument").hide();
            $("#NS_City_trStateIDState").hide();
            SID = '';

            $("#NS_City_trLicense").show();
            $("#NS_City_trLicenseDocument").show();
            $("#NS_City_trLicenseState").show();
        }
        if (_choosen == 'D') {
            $("#NS_City_trLicense").show();
            $("#NS_City_trLicenseDocument").show();
            $("#NS_City_trLicenseState").show();
        }
        else {
            $("#NS_City_trLicense").hide();
            $("#NS_City_trLicenseDocument").hide();
            $("#NS_City_trLicenseState").hide();
            DL = '';
        }
    });
    $('.NS_City_HaveEmail').click(function () {
        var _choosen = $(this).val();
        if (_choosen == 'Y') {
            $("#NS_City_trEmail").show();
            $("#NS_City_trEmailConfirm").show();
        } else {
            $("#NS_City_trEmail").hide();
            $("#NS_City_trEmailConfirm").hide();
            EmailAddress = '';
        }
    });
    $('.NS_City_IsCommercial').click(function () {
        var _choosen = $(this).val();
        if (_choosen == 'Y') {
            $("#NS_City_trDBA").show();
            $("#NS_City_trPersonReqService").show();
            $("#NS_CitylblSSN").text("Tax ID Number:");
             $("#NS_City_lblSSNDocument").text("Tax ID Document:");
        } else {
            $("#NS_City_trDBA").hide();
            $("#NS_City_trPersonReqService").hide();
            $("#NS_CitylblSSN").text("Social Security #");
            $("#NS_City_lblSSNDocument").text("Social Security Document:");
        }
    });
    $('.NS_City_EBilling').click(function () {
        var _choosen = $(this).val();
        if (_choosen == 'Y') {
            $("#NS_City_trEBilling").show();
            $("#NS_City_trEBillingConfirm").show();
            $("#NS_City_trEBillingNote").show();
        }
        else {
            $("#NS_City_trEBilling").hide(); $("#NS_City_trEBillingConfirm").hide(); $("#NS_City_trEBillingNote").hide();
            EBilling = false;
        }
    });
    $('.NS_City_BankDraft').click(function () {
        var _choosen = $(this).val();
        if (_choosen == 'Y') {
            $("#NS_City_trBankDraft").show();
            $("#NS_City_trCancelledCheck").show();
        }
        else {
            $("#NS_City_trBankDraft").hide();
            $("#NS_City_trCancelledCheck").hide();
            EnrolBankDraft = false;
        }
    });
    $('.NS_City_IsBilling').click(function () {
        var _choosen = $(this).val();
        if (_choosen == 'Y') {
            $("#NS_City_Billing_Street").val($("#NS_City_SRV_Street").val());
            $("#NS_City_Billing_City").val($("#NS_City_SRV_City").val());
            $("#NS_City_Billing_State").val($("#NS_City_SRV_State").val());
            $("#NS_City_Billing_Zip").val($("#NS_City_SRV_Zip").val());
        }
        else {
            $("#NS_City_Billing_Street").val('');
            $("#NS_City_Billing_City").val('');
            $("#NS_City_Billing_State").val('');
            $("#NS_City_Billing_Zip").val('');
            SameBilling = false;
        }
    });
    $('#NS_City_StateIDDocument').uploadify({
        height: 30,
        swf: '/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify.swf',
        uploader: '/DesktopModules/NS_CityUserInfo/DocumentHandler.ashx',
        width: 130,
        buttonText: 'Click here to upload',
        folder: "/DesktopModules/NS_CityUserInfo/UserUploads",
        fileTypeDesc: 'Only .jpg, .bmp, .png, .gif, .doc, .docx, .pdf ',
        fileTypeExts: '*.jpg;*.jpeg;*.gif;*.png;*.bmp;*.doc;*.docx;*.pdf',
        'multi': false,
        'auto': true,
        cancelImg: '/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify-cancel.png',
        onUploadError: function (f, e, eMsg, eStr) { },
        onUploadSuccess: function (f, d, r) {
            NS_City_StateIDDocument = d;
            $('#NS_City_StateIDDocument').uploadify('settings', 'buttonText', 'DONE');
            $('#NS_City_StateIDDocument').uploadify('disable', true);
            $('#NS_City_StateIDDocumentFileName').val(f.name);
            //$('#NS_City_StateIDDocumentFileName').text(f.name);
        }
    });

    $('#NS_City_LicenseDocument').uploadify({
        height: 30,
        swf: '/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify.swf',
        uploader: '/DesktopModules/NS_CityUserInfo/DocumentHandler.ashx',
        width: 130,
        buttonText: 'Click here to upload',
        folder: "/DesktopModules/NS_CityUserInfo/UserUploads",
        fileTypeDesc: 'Only .jpg, .bmp, .png, .gif, .doc, .docx, .pdf ',
        fileTypeExts: '*.jpg;*.jpeg;*.gif;*.png;*.bmp;*.doc;*.docx;*.pdf',
        'multi': false,
        'auto': true,
        cancelImg: '/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify-cancel.png',
        onUploadError: function (f, e, eMsg, eStr) { },
        onUploadSuccess: function (f, d, r) {
            NS_City_LicenseDocument = d;
            $('#NS_City_LicenseDocument').uploadify('settings', 'buttonText', 'DONE');
            $('#NS_City_LicenseDocument').uploadify('disable', true);
            $('#NS_City_LicenseDocumentFileName').val(f.name);
        }
    });
    $('#NS_City_CancelledCheckDocument').uploadify({
        height: 30,
        swf: '/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify.swf',
        uploader: '/DesktopModules/NS_CityUserInfo/DocumentHandler.ashx',
        width: 130,
        buttonText: 'Click here to upload',
        folder: "/DesktopModules/NS_CityUserInfo/UserUploads",
        fileTypeDesc: 'Only .jpg, .bmp, .png, .gif, .doc, .docx, .pdf ',
        fileTypeExts: '*.jpg;*.jpeg;*.gif;*.png;*.bmp;*.doc;*.docx;*.pdf',
        'multi': false,
        'auto': true,
        cancelImg: '/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify-cancel.png',
        onUploadError: function (f, e, eMsg, eStr) { },
        onUploadSuccess: function (f, d, r) {
            NS_City_CancelCheckDocument = d;
            $('#NS_City_CancelledCheckDocument').uploadify('settings', 'buttonText', 'DONE');
            $('#NS_City_CancelledCheckDocument').uploadify('disable', true);
            $('#NS_City_CancelledCheckDocumentFileName').val(f.name);
        }
    });
    $('#NS_City_POADocument').uploadify({
        height: 30,
        swf: '/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify.swf',
        uploader: '/DesktopModules/NS_CityUserInfo/DocumentHandler.ashx',
        width: 130,
        buttonText: 'Click here to upload',
        folder: "/DesktopModules/NS_CityUserInfo/UserUploads",
        fileTypeDesc: 'Only .jpg, .bmp, .png, .gif, .doc, .docx, .pdf ',
        fileTypeExts: '*.jpg;*.jpeg;*.gif;*.png;*.bmp;*.doc;*.docx;*.pdf',
        'multi': false,
        'auto': true,
        cancelImg: '/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify-cancel.png',
        onUploadError: function (f, e, eMsg, eStr) { },
        onUploadSuccess: function (f, d, r) {
            NS_City_POADocument = d;
            $('#NS_City_POADocument').uploadify('settings', 'buttonText', 'DONE');
            $('#NS_City_POADocument').uploadify('disable', true);
            $('#NS_City_POADocumentFileName').val(f.name);
        }
    });
    $('#NS_City_SSNDocument').uploadify({
        height: 30,
        swf: '/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify.swf',
        uploader: '/DesktopModules/NS_CityUserInfo/DocumentHandler.ashx',
        width: 130,
        buttonText: 'Click here to upload',
        folder: "/DesktopModules/NS_CityUserInfo/UserUploads",
        fileTypeDesc: 'Only .jpg, .bmp, .png, .gif, .doc, .docx, .pdf ',
        fileTypeExts: '*.jpg;*.jpeg;*.gif;*.png;*.bmp;*.doc;*.docx;*.pdf',
        'multi': false,
        'auto': true,
        cancelImg: '/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify-cancel.png',
        onUploadError: function (f, e, eMsg, eStr) { },
        onUploadSuccess: function (f, d, r) {
            NS_City_SSNDocument = d;
            $('#NS_City_SSNDocument').uploadify('settings', 'buttonText', 'DONE');
            $('#NS_City_SSNDocument').uploadify('disable', true);
            $('#NS_City_SSNDocumentFileName').val(f.name);
        }
    });
    // Connect Date
    $("#NS_City_ConnectDate").datepicker({
        beforeShow: function (input) {
            $(input).css({
                "position": "relative",
                "z-index": 999999
            });
        }
    });
    // Save Now
    $("#NS_City_SubmitForm").click(function () {
        if (NS_City_ValidateForm()) {
            $(this).val("Saving...").attr("disabled", "disabled");
            NS_City_SaveForm("Y");
        }
    });
    // Save for Later on
    $("#NS_City_SaveForLater").click(function () {
        if (NS_City_UID == -1) {
            $("#NS_City_UserRegistration").removeClass('NS_TabOff').slideDown();
            $("#NS_City_CreateUser").show();
            $("#NS_City_LoadForm").hide();
            $("#NS_City_trConfirmUserPassword").show();
        }
        else {
            NS_City_SaveForm("N");
        }
    });
    // Create User
    $("#NS_City_CreateUser").click(function () {
        var UN = $.trim($("#NS_City_txtUName").val());
        var Pwd = $.trim($("#NS_City_txtPassword").val());
        var CPwd = $.trim($("#NS_City_txtConfirmPassword").val());
        if (UN == "") {
            alert('Please provide E-mail Address');
            $("#NS_City_txtUName").focus(); return false;
        }
        if (NS_City_IsValidEmail(UN) == false) {
            alert('Please provide E-mail Address in valid format');
            $("#NS_City_txtUName").focus();
            return false;
        }
        if (Pwd == "") {
            alert("Please provide password");
            $("#NS_City_txtPassword").focus(); return false;
        }
        if (CPwd == "") {
            alert("Please providve confirm password");
            $("#NS_City_txtConfirmPassword").focus(); return false;
        }
        if (CPwd != Pwd) {
            alert("Your passwords do not match. Please try again.");
            $("#NS_City_txtPassword").focus();
            return false;
        }
        $(this).val('Saving...').attr('disabled', "disabled");
        NS_City_CreateUser(UN, Pwd);
    });
    // Show Load Form
    $("#NS_City_ResumeForm").click(function () {
        $("#NS_City_UserRegistration").removeClass('NS_TabOff').slideDown();
        $("#NS_City_CreateUser").hide();
        $("#NS_City_LoadForm").show();
        $("#NS_City_trConfirmUserPassword").hide();
    });
    // Now Load Form
    $("#NS_City_LoadForm").click(function () {
        if ($.trim($("#NS_City_txtUName").val()) == '') {
            alert("Please specify your username");
            $("#NS_City_txtUName").focus();
            return false;
        }
        if ($.trim($("#NS_City_txtPassword").val()) == '') {
            alert("Please specify your password");
            $("#NS_City_txtPassword").focus();
            return false;
        }
        var UN = $.trim($("#NS_City_txtUName").val());
        var pwd = $.trim($("#NS_City_txtPassword").val());
        NS_City_VeriifyUser(UN, pwd);
    });
    // close login
    $("#NS_City_CancelCreate").click(function () {
        $("#NS_City_UserRegistration").hide();
    });
    $("#NS_City_ModuleOuter :input").keypress(function (e) {
        var charCode = e.charCode || e.keyCode;
        if (charCode == 13) {
            return false;
        }
    });
    $("#NS_City_UserRegistration :input").keypress(function (e) {
        var charCode = e.charCode || e.keyCode;
        if (charCode == 13) {
            return false;
        }
    });
});

function NS_City_LoadTabContent(TabID) {
    $(".NS_TabOn").removeClass(".NS_TabOn");
    $(".NS_TabSegment").removeClass("NS_TabOn").addClass("NS_TabOff");

    if (TabID == 'NS_City_FormIntro') {
        $("#NS_TabSegment1").removeClass("NS_TabOff").addClass("NS_TabOn");
        NS_City_ActiveTabIndex = 1;
        return;
    }
    if (TabID == 'NS_City_FormPersonal') {
        $("#NS_TabSegment2").removeClass("NS_TabOff").addClass("NS_TabOn");
        NS_City_ActiveTabIndex = 2;
        return;
    }
    if (TabID == "NS_City_FormBilling") {
        $("#NS_TabSegment3").removeClass("NS_TabOff").addClass("NS_TabOn");
        NS_City_ActiveTabIndex = 3;
        return;
    }
    if (TabID == "NS_City_FormServiceOptions") {
        $("#NS_TabSegment4").removeClass("NS_TabOff").addClass("NS_TabOn");
        NS_City_ActiveTabIndex = 4;
    }
    if (TabID == 'NS_City_FormDocument') {
        $("#NS_TabSegment5").removeClass("NS_TabOff").addClass("NS_TabOn");
        NS_City_ActiveTabIndex = 5;
        return;
    }
}

function NS_City_ValidateForm() {

    // Is Commercial Account
    if ($("#NS_City_IsCommercialYes").is(":checked")) {
        // TaxID    
        if ($.trim($("#NS_City_SSN").val()) == '') {
            alert('Please provide information for Tax ID Number');
            $("#NS_City_SSN").focus();
            return false;
        }
        /*Sachin: on 12/Nov/2017
             DBA is changed to "Business Name" 
             SSN is termed TaxID if IsCommercial=true or if individual then it is termed as SSN
         */
        if ($.trim($("#NS_City_txtDBA").val()) == '') {
            alert('Please provide information for Business name');
            $("#NS_City_txtDBA").focus();
            return false;
        }
        if ($.trim($("#NS_City_txtPersonReqService").val()) == '') {
            alert('Please provide information for person requesting service');
            $("#NS_City_txtPersonReqService").focus();
            return false;
        }
        PersonReqServicve = $("#NS_City_txtPersonReqService").val();
        BusinessName = $.trim($("#NS_City_txtDBA").val());
        IsCommercial = true;
    }
    else {
        // SSN    
        if ($.trim($("#NS_City_SSN").val()) == '') {
            alert('Please provide information for Social Security #');
            $("#NS_City_SSN").focus();
            return false;
        }
        TaxID = "";
        PersonReqServicve = "";
        BusinessName = "";
        IsCommercial = false;
    }
    // TaxID or SSN
    NS_City_SSN = $.trim($("#NS_City_SSN").val());

//First Name
    if ($.trim($("#NS_City_FirstName").val()) == '') {
        alert('Please provide information for First Name');
        $("#NS_City_FirstName").focus();
        return false;
    }
    else
        FN = $.trim($("#NS_City_FirstName").val());
//Last Name
    if ($.trim($("#NS_City_LastName").val()) == '') {
        alert('Please provide information for Last Name');
        $("#NS_City_LastName").focus();
        return false;
    }
    else
        LN = $.trim($("#NS_City_LastName").val());
// Contact Phone
    if ($.trim($("#NS_City_ContactPhone").val()) == '') {
        alert('Please provide information for Contact Phone #');
        $("#NS_City_ContactPhone").focus();
        return false;
    }
    else
        NS_City_ContactPhone = $.trim($("#NS_City_ContactPhone").val());
//DOB
    if ($.trim($("#NS_City_DOB").val()) == '') {
        alert('Please provide information for Date Of Birth');
        $("#NS_City_DOB").focus();
        return false;
    }
    else {
        if (NS_City_IsValidDateFormat($.trim($("#NS_City_DOB").val())) == false) {
            alert("Please provide Date of Birth in correct date format");
            $("#NS_City_DOB").focus();
            return false;
        }
    }
// StateID
    if ($("#NS_CityTypeOfIDState").is(":checked")) {
        if ($.trim($("#NS_City_StateID").val()) == '') {
            alert('Please provide information for StateID');
            $("#NS_City_StateID").focus();
            return false;
        }
        else {
            SID = $.trim($("#NS_City_StateID").val());
            TID = "S";
        }
// ID State
        if ($.trim($("#NS_City_StateID").val()) == '') {
            alert('Please provide information for State');
            $("#NS_City_StateID").focus();
            return false;
        }
    }
    else {
        SID = ""; TID = "D";
    }
// Drivers License
    if ($("#NS_CityTypeOfIDLicense").is(":checked")) {
        if ($.trim($("#NS_City_DriverLicense").val()) == '') {
            alert('Please provide information for Drivers License');
            $("#NS_City_DriverLicense").focus();
            return false;
        }
        else {
            DL = $.trim($("#NS_City_DriverLicense").val());
            TID = "D";
        }
// ID State
        if ($.trim($("#NS_City_DLState").val()) == '') {
            alert('Please provide information for State');
            $("#NS_City_DLState").focus();
            return false;
        }
    }
    else {
        DL = ""; TID = "S";
    }

// Have Email ?
    if ($("#NS_CityEmailYes").is(":checked")) {
// Email Address    
        if ($.trim($("#NS_City_Email").val()) == '') {
            alert('Please provide information for Email Address');
            $("#NS_City_Email").focus();
            return false;
        }
        else {
            if (!NS_City_IsValidEmail($.trim($("#NS_City_Email").val()))) {
                alert('Email address found to be in Invalid format');
                $("#NS_City_Email").focus();
                return false;
            }
            else {
                EmailAddress = $.trim($("#NS_City_Email").val());
                HavEmail = true;
            }
        }
    }
    else {
        EmailAddress = "";
        HavEmail = false;
    }
// COnnect Date
    if ($.trim($("#NS_City_ConnectDate").val()) == '') {
        alert('Please provide information for Connect Date');
        $("#NS_City_ConnectDate").focus();
        return false;
    }
    else {
        NS_City_ConnectDate = $("#NS_City_ConnectDate").datepicker("getDate");
    }

// Service Street
    if ($.trim($("#NS_City_SRV_Street").val()) == '') {
        alert('Please provide information for Service Street');
        $("#NS_City_SRV_Street").focus();
        return false;
    }
    else {
        SStreet = $.trim($("#NS_City_SRV_Street").val());
    }
// Service City
    if ($.trim($("#NS_City_SRV_City").val()) == '') {
        alert('Please provide information for Service City');
        $("#NS_City_SRV_City").focus();
        return false;
    }
    else {
        SCity = $.trim($("#NS_City_SRV_City").val());
    }
// Service state
    if ($.trim($("#NS_City_SRV_State").val()) == '') {
        alert('Please provide information for Service State');
        $("#NS_City_SRV_State").focus();
        return false;
    }
    else {
        SState = $.trim($("#NS_City_SRV_State").val());
    }
// Service Zip
    if ($.trim($("#NS_City_SRV_Zip").val()) == '') {
        alert('Please provide information for Service Zip');
        $("#NS_City_SRV_Zip").focus();
        return false;
    }
    else {
        SZip = $.trim($("#NS_City_SRV_Zip").val());
    }
// Is billing same as service
    if ($("#NS_City_IsBillingYes").is(":checked")) {
        SameBilling = true;
    }
    else {
        SameBilling = false;
    }
// Billing Street
    if ($.trim($("#NS_City_Billing_Street").val()) == '') {
        alert('Please provide information for Service Street');
        $("#NS_City_Billing_Street").focus();
        return false;
    }
    else {
        BStreet = $.trim($("#NS_City_Billing_Street").val());
    }
// Billing City
    if ($.trim($("#NS_City_Billing_City").val()) == '') {
        alert('Please provide information for Billing City');
        $("#NS_City_Billing_City").focus();
        return false;
    }
    else {
        BCity = $.trim($("#NS_City_Billing_City").val());
    }
// Billing State
    if ($.trim($("#NS_City_Billing_State").val()) == '') {
        alert('Please provide information for Billing State');
        $("#NS_City_Billing_State").focus();
        return false;
    }
    else {
        BState = $.trim($("#NS_City_Billing_State").val());
    }
// Billing Zip
    if ($.trim($("#NS_City_Billing_Zip").val()) == '') {
        alert('Please provide information for Billing Zip');
        $("#NS_City_Billing_Zip").focus();
        return false;
    }
    else {
        BZip = $.trim($("#NS_City_Billing_Zip").val());
    }
// Check Address Verification 
    if ($("#NS_City_AddressVerification").is(":checked") == false) {
        alert('Please tick box for Address Verfication');
        $("#NS_City_AddressVerification").focus();
        return false;
    }
// Enroll for EBilling ?
    if ($("#NS_City_EBillingYes").is(":checked")) {
// Ebilling Email Address
        if ($.trim($("#NS_City_EBillingEmail").val()) == '') {
            alert('Please provide information for Email Address for E-Billing');
            $("#NS_City_EBillingEmail").focus();
            return false;
        }
        else {
            if (!NS_City_IsValidEmail($.trim($("#NS_City_EBillingEmail").val()))) {
                alert('Email for E-Billing found to be in Invalid format');
                $("#NS_City_EBillingEmail").focus();
                return false;
            }
            else {
                EBilling = true;
                EBillingEmail = $.trim($("#NS_City_EBillingEmail").val());
            }
        }
// Confirm EBilling Email Address
        if ($.trim($("#NS_City_EBillingConfirm").val()) == '') {
            alert('Please provide information for Confirm Email Address for E-Billing');
            $("#NS_City_EBillingConfirm").focus();
            return false;
        }
        else {
            if (!NS_City_IsValidEmail($.trim($("#NS_City_EBillingConfirm").val()))) {
                alert('Confirm Email for E-Billing found to be in Invalid format');
                $("#NS_City_EBillingConfirm").focus();
                return false;
            }
        }
// E-mail address Match
        if ($.trim($("#NS_City_EBillingEmail").val()) != $.trim($("#NS_City_EBillingConfirm").val())) {
            alert('Your E-mail Address for E-Billing do not match. Please try again.');
            $("#NS_City_EBillingEmail").focus();
            return false;
        }
    }
    else {
        EBilling = false;
        EBillingEmail = "";
    }
    // Bank Overdraft
    if ($("#NS_City_BankDraftYes").is(":checked")) {
        EnrolBankDraft = true;
        if ($.trim($("#NS_City_BankRoutingNumber").val()) == '') {
            alert('Please provide information for Bank Routing Number');
            $("#NS_City_BankRoutingNumber").focus();
            return false;
        }
        else
            BRN = $.trim($("#NS_City_BankRoutingNumber").val());

        if ($.trim($("#NS_City_BankAccountNumber").val()) == '') {
            alert('Please provide information for Bank Account Number');
            $("#NS_City_BankAccountNumber").focus();
            return false;
        }
        else
            BAN = $.trim($("#NS_City_BankAccountNumber").val());

        if ($.trim($("#NS_City_NameOnAccount").val()) == '') {
            alert('Please provide information for Name On Account');
            $("#NS_City_NameOnAccount").focus();
            return false;
        }
        else
            NOA = $.trim($("#NS_City_NameOnAccount").val());

        if ($.trim($("#NS_City_BankName").val()) == '') {
            alert('Please provide information for Bank Name');
            $("#NS_City_BankName").focus();
            return false;
        }
        else
            BN = $.trim($("#NS_City_BankName").val());

        if ($("#NS_City_AutoDraft").is(":checked") == false) {
            alert('Please tick chekbox for Statement of Approval');
            $("#NS_City_AutoDraft").focus();
            return false;
        }
        else
            ADAgree = true;
    }
    else {
        EnrolBankDraft = false;
        ADAgree = false;
        NOA = "";
        BAN = "";
        BRN = "";
    }
    
    // SSN Document
    if ($("#NS_City_SSNDocumentFileName").val() == '') {//if (NS_City_SSNDocument==""){
        DocumentType = "Social Security";
        if (IsCommercial) DocumentType = "Tax ID";
        alert("Please upload related document for " + DocumentType);
        return false;
    }
    // State Document
    if ($("#NS_CityTypeOfIDState").is(":checked")) {
        if ($("#NS_City_StateIDDocumentFileName").val() == '') {
            alert("Please upload related document for StateID");
            return false;
        }
    }

    // Drivers License Document
    if ($("#NS_CityTypeOfIDLicense").is(":checked")) {
        if ($("[attr='']#NS_City_LicenseDocumentFileName").val() == '') {// if (NS_City_LicenseDocument == "") {
            alert("Please upload related document for Drivers License");
            return false;
        }
    }
// Proof of Address Document
if ($("#NS_City_POADocumentFileName").val() == '') // if (NS_City_POADocument=="")
{
    alert('Please upload related document for Proof of Address');
    return false;
}
return true;
}

function NS_City_IsValidEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}
function NS_City_ReadFormsValue() {
    //First Name
    FN = $.trim($("#NS_City_FirstName").val());
    //Last Name
    LN = $.trim($("#NS_City_LastName").val());
    NS_City_ContactPhone = $.trim($("#NS_City_ContactPhone").val());
    NS_City_SSN = $.trim($("#NS_City_SSN").val());
    NS_City_DOB = $("#NS_City_DOB").val();

    // StateID
    if ($("#NS_CityTypeOfIDState").is(":checked")) {
        SID = $.trim($("#NS_City_StateID").val());
        TID = "S";
        NS_City_IDState = $("#NS_City_StateIDState").val();
    }
    else {
        SID = ""; TID = "D";
    }
    // Drivers License
    if ($("#NS_CityTypeOfIDLicense").is(":checked")) {
        DL = $.trim($("#NS_City_DriverLicense").val());
        TID = "D";
        NS_City_IDState = $("#NS_City_DLState").val();
    }
    else {
        DL = ""; TID = "S";
    }
    // Email Address
    EmailAddress = $.trim($("#NS_City_Email").val());
    HavEmail = $("#NS_CityEmailYes").is(":checked");
    NS_City_KeepConfidential = $("#NS_City_ConfidentialYes").is(":checked");
    SStreet = $("#NS_City_SRV_Street").val();
    // Service City
    SCity = $.trim($("#NS_City_SRV_City").val());
    // Service state
    SState = $.trim($("#NS_City_SRV_State").val());
    // Service Zip
    SZip = $.trim($("#NS_City_SRV_Zip").val());
    // Is billing same as service
    SameBilling = $("#NS_City_IsBillingYes").is(":checked");
    if ($("#NS_City_ConnectDate").val() != "")
        NS_City_ConnectDate = $("#NS_City_ConnectDate").datepicker("getDate").format("M/dd/yyyy");
    else
        NS_City_ConnectDate = "";
    BStreet = $("#NS_City_Billing_Street").val();
    // Billing City
    BCity = $.trim($("#NS_City_Billing_City").val());
    // Billing State
    BState = $.trim($("#NS_City_Billing_State").val());
    // Billing Zip
    BZip = $.trim($("#NS_City_Billing_Zip").val());
    // Ebilling Email Address
    EBilling = $("#NS_City_EBillingYes").is(":checked");
    EBillingEmail = $.trim($("#NS_City_EBillingEmail").val());
    // Bank Overdraft
    EnrolBankDraft = $("#NS_City_BankDraftYes").is(":checked");
    BRN = $.trim($("#NS_City_BankRoutingNumber").val());
    BAN = $.trim($("#NS_City_BankAccountNumber").val());
    NOA = $.trim($("#NS_City_NameOnAccount").val());
    BN = $.trim($("#NS_City_BankName").val());
    ADAgree = $("#NS_City_AutoDraft").is(":checked");
    if ($("#NS_City_IsCommercialYes").is(":checked")) {
        TaxID=$.trim($("#NS_City_txtTaxID").val());
        BusinessName=$.trim($("#NS_City_txtDBA").val());
        IsCommercial=true;
    }
    else {
        TaxID = "";
        BusinessName="";
        IsCommercial = false;
    }
    return true;
}
function NS_City_SaveForm(AsEmail) {
    //string AsEmail,string FN,string LN,string TID,string SID,string DL,string HavEmail,string EmailAddress,string SCity,string SState,string SZip,string SameBilling,string BCity,string BState,string BZip,string EBilling,string EBillingEmail,string EnrolBankDraft,string BRN,string BAN,string NOA,string ADAgree, string StateDocument,string DLDocument,string ChequeDcoument 
    NS_City_ReadFormsValue();

    var _Parameters = "{'MID':'" + NS_City_ModuleId + "','AsEmail':'" + AsEmail + "','UID':'" + NS_City_UID + "','FN':'" + FN + "','LN':'" + LN + "','Phone':'" + NS_City_ContactPhone + "','SSN':'" + NS_City_SSN + "','DOB':'" + NS_City_DOB + "','TID':'" + TID + "','SID':'" + SID + "','DL':'" + DL + "','IDState':'" + NS_City_IDState + "','HavEmail':'" + HavEmail + "','EmailAddress':'" + EmailAddress + "','KC':'" + NS_City_KeepConfidential + "','ConnectDate':'" + NS_City_ConnectDate + "','SStreet':'" + SStreet + "','SCity':'" + SCity + "','SState':'" + SState + "','SZip':'" + SZip + "','SameBilling':'" + SameBilling + "','BStreet':'" + BStreet + "','BCity':'" + BCity + "','BState':'" + BState + "','BZip':'" + BZip + "','EBilling':'" + EBilling + "','EBillingEmail':'" + EBillingEmail + "','EnrolBankDraft':'" + EnrolBankDraft + "','BRN':'" + BRN + "','BAN':'" + BAN + "','NOA':'" + NOA + "','BN':'" + BN + "','ADAgree':'" + ADAgree + "','StateDocument':'" + NS_City_StateIDDocument + "','DLDocument':'" + NS_City_LicenseDocument + "','ChequeDcoument':'" + NS_City_CancelCheckDocument + "','SSNFile':'" + NS_City_SSNDocument + "','POAFile':'" + NS_City_POADocument + "','IsCommercial':'" + IsCommercial + "','TaxID':'" + TaxID + "','DBA':'" + BusinessName + "','PersonReqService':'" + PersonReqServicve + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/DesktopModules/NS_CityUserInfo/RequestHandler.asmx/SaveFormData',
        data: _Parameters,
        dataType: "json",
        error: function (eMsg) {
            alert("Cause of some technical issue, unable to execute your request. Please contact to administration.");
            $("#NS_City_SubmitForm").removeAttr("disabled").val("Save");
        },
        success: function (r) {
            if (AsEmail == "Y") {
                $("#NS_City_dvCofirmationMessage").dialog({
                    width: 500, modal: true,
                    buttons: {
                        Ok: function () { $(this).dialog("close"); }
                    }
                });
            }
            else {
                alert("Your application has been saved. You can resume by using the given e-mail address & password");
            }
            $("#NS_City_SubmitForm").removeAttr("disabled").val("Submit");
            $("#NS_City_CreateUser").removeAttr("disabled").val("Save for Later");
            $("#NS_City_ModuleOuter input:text").val('');
            $("#NS_City_UserRegistration").hide();
            NS_City_CancelCheckDocument = "";
            NS_City_StateIDDocument = "";
            NS_City_LicenseDocument = "";
            NS_City_POADocument = "";
            NS_City_SSNDocument = "";
            $('#NS_City_StateIDDocument').uploadify('settings', 'buttonText', 'Click here to upload');
            $('#NS_City_StateIDDocument').uploadify('disable', false);
            $('#NS_City_LicenseDocument').uploadify('settings', 'buttonText', 'Click here to upload');
            $('#NS_City_LicenseDocument').uploadify('disable', false);
            $('#NS_City_CancelledCheckDocument').uploadify('settings', 'buttonText', 'Click here to upload');
            $('#NS_City_CancelledCheckDocument').uploadify('disable', false);
            $('#NS_City_POADocument').uploadify('settings', 'buttonText', 'Click here to upload');
            $('#NS_City_POADocument').uploadify('disable', false);
            $('#NS_City_SSNDocument').uploadify('settings', 'buttonText', 'Click here to upload');
            $('#NS_City_SSNDocument').uploadify('disable', false);
        }
    });
}
function NS_City_CreateUser(UN, Pwd) {
    var _Parameters = "{'UN':'" + UN + "','Pwd':'" + Pwd + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/DesktopModules/NS_CityUserInfo/RequestHandler.asmx/CreateUser',
        data: _Parameters,
        dataType: "json",
        error: function (eMsg) {
            alert("Cause of some technical issue, unable to execute your request. Please contact to administration.");
        },
        success: function (r) {
            if (r.d == "-1") {
                $("#NS_City_CreateUser").removeAttr("disabled").val("Create User");
                alert("Username you have given is already found, please specify unique Username");
            }
            else {
                NS_City_UName = UN;
                NS_City_UID = r.d;
                NS_City_SaveForm("N");
            }
        }
    });
}
function NS_City_VeriifyUser(UN, pwd) {
    var _Parameters = "{'UN':'" + UN + "','Pwd':'" + pwd + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/DesktopModules/NS_CityUserInfo/RequestHandler.asmx/GetUser',
        data: _Parameters,
        dataType: "json",
        error: function (eMsg) {
            alert("Cause of some technical issue, unable to execute your request. Please contact to administration.");
        },
        success: function (r) {
            NS_City_UID = r.d;
            if (NS_City_UID != -1) {
                NS_City_LoadFormValues();
            }
            else
                alert("Invalid Username or password found, please give corrrect combination of username & Password.");
        }
    });
}
function NS_City_LoadFormValues() {
    if (NS_City_UID == -1) return;
    var _Parameters = "{'UID':'" + NS_City_UID + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/DesktopModules/NS_CityUserInfo/RequestHandler.asmx/LoadUserForm',
        data: _Parameters,
        dataType: "json",
        error: function (eMsg) {
            alert("Cause of some technical issue, unable to execute your request. Please contact to administration.");
        },
        success: function (r) {
            $("#NS_City_UserRegistration").hide();
            // First Name
            $("#NS_City_FirstName").val(r.d.Firstname);
            // Last Name
            $("#NS_City_LastName").val(r.d.Lastname);
            // Contact Phone
            $("#NS_City_ContactPhone").val(r.d.ContactPhone);
            // SSN
            $("#NS_City_SSN").val(r.d.SSN);
            // DOB
            if (r.d.DOB != "")
                $("#NS_City_DOB").val(r.d.DOB);
            // StateID
            if (r.d.TypeOfID == 'S') {
                $("#NS_CityTypeOfIDState").attr("checked", "checked"); $("#NS_CityTypeOfIDState").click();
                $("#NS_City_StateIDState").val(r.d.IDState);
            } else {
                $("#NS_CityTypeOfIDLicense").attr("checked", "checked"); $("#NS_CityTypeOfIDLicense").click();
                $("#NS_City_DLState").val(r.d.IDState);
            }

            $("#NS_City_StateID").val(r.d.StateID);
            // Drivers License
            $("#NS_City_DriverLicense").val(r.d.DriverLicense);
            if (r.d.HaveEmail) {
                $("#NS_CityEmailYes").attr("checked", "checked");
                $("#NS_City_trEmail").show();
            } else {
                $("#NS_City_trEmail").hide();
            }
            // Email Address
            $("#NS_City_Email").val(r.d.EmailAddress);
            // Keep Confidential
            if (r.d.KeepConfidential) {
                $("#NS_City_ConfidentialYes").attr("checked", "checked");
            }
            else {
                $("#NS_City_ConfidentialNo").attr("checked", "checked");
            }
            // Connect DAte
            if (r.d.ConnectDate != "")
                $("#NS_City_ConnectDate").datepicker("setDate", r.d.ConnectDate);
            // Is Commercial Account
            if (r.d.IsCommercial) {
                $("#NS_City_IsCommercialYes").attr("checked", "checked");
                $("#NS_City_IsCommercialYes").click();
                // DBA is now "Business Name"
                $("#NS_City_txtDBA").val(r.d.DBA);
                //Person Requesting service
                $("#NS_City_txtPersonReqService").val(r.d.PersonReqService);
            }
            // TaxID or SSN : if IsCommercial then same SSN is considered as TaxID
            $("#NS_City_SSN").val(r.d.SSN);
            // Service Street
            $("#NS_City_SRV_Street").val(r.d.ServiceStreet);
            // Service City
            $("#NS_City_SRV_City").val(r.d.ServiceCity);
            // Service state
            $("#NS_City_SRV_State").val(r.d.ServiceState);
            // Service Zip
            $("#NS_City_SRV_Zip").val(r.d.ServiceZip);
            // Is billing same as service
            if (r.d.BillingAddressSame) {
                $("#NS_City_IsBillingYes").attr("checked", "checked");
                $("#NS_City_IsBillingYes").click();
            }
            // Billing Street
            $("#NS_City_Billing_Street").val(r.d.BillingStreet);
            // Billing City
            $("#NS_City_Billing_City").val(r.d.BillingCity);
            // Billing State
            $("#NS_City_Billing_State").val(r.d.BillingState);
            // Billing Zip
            $("#NS_City_Billing_Zip").val(r.d.BilliingZip);
            // Ebilling Email Address
            EBilling = $("#NS_City_EBillingYes").is(":checked"); //r.d.EBilling
            if (r.d.EBilling) {
                $("#NS_City_EBillingYes").attr("checked", "checked");
                $("#NS_City_EBillingYes").click();
            }
            $("#NS_City_EBillingEmail").val(r.d.EBillingEmail);
            // Bank Overdraft
            if (r.d.EnrolBankDraft) {
                $("#NS_City_BankDraftYes").attr("checked", "checked"); $("#NS_City_BankDraftYes").click();
            }
            $("#NS_City_BankRoutingNumber").val(r.d.BankRoutingNumber);
            $("#NS_City_BankAccountNumber").val(r.d.BankAccountNumber);
            $("#NS_City_NameOnAccount").val(r.d.NameOnAccount);
            $("#NS_City_BankName").val(r.d.BankName);
            if (r.d.AutoDraftAccount)
                $("#NS_City_AutoDraft").attr("checked", "checked");
            NS_City_StateIDDocument = r.d.StateIDDocument;
            NS_City_LicenseDocument = r.d.DriverLicenseFile;
            NS_City_CancelCheckDocument = r.d.CancelledCheckFile;
            NS_City_SSNDocument = r.d.SSNFile;
            NS_City_POADocument = r.d.POAFile;

            $('[id$=lblNS_City_SSNDocument]').val(NS_City_SSNDocument);
            $('[id$=lblNS_City_StateIDDocument]').val(NS_City_StateIDDocument);
            $('[id$=lblNS_City_POADocument]').val(NS_City_POADocument);

        }
    });
}
function NS_City_IsValidDateFormat(input) {
    var currVal = input;

    //Declare Regex  
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{2})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for mm/dd/yyyy format.
    dtMonth = dtArray[1];
    dtDay = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}
function NS_City_OpenDetail(ID) {
    $("#dvViewDetails_" + ID).dialog({
        width: 500, height: 500, modal: true,
        buttons:{
            Print: function () { $("#dvViewDetails_" + ID).jqprint(); },
            Close: function () { $(this).dialog("close"); }
        }
    });
}
function NS_City_ShowNextTab(NextTabID) {
    $('.NS_City_TabsSel').addClass('NS_CityTabs').removeClass('NS_City_TabsSel');
    $("#NS_City_" + NextTabID).addClass('NS_City_TabsSel').removeClass('NS_CityTabs');
    $(".NS_TabOn").addClass("NS_TabOff").removeClass("NS_TabOn");
    NS_City_LoadTabContent('NS_City_' + NextTabID);
}
