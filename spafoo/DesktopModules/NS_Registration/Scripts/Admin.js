var _CurrentStep = 1;
var _CurrentQCategory = -1;
var _CurrentQID;
var NSR_CUID = -1;
var _HaveOptions = false;
var NSR_IsUpdated=false;
var _CurrStatus = 'Pending';
// When document finished its loading
$(document).ready(function () {
    $('#NSR_Admin').tabs({
        select: 0, activate: function (event, ui) {
            var panelName = $(ui.newPanel).attr('id');//NSR_ManageResponse
            if (panelName == 'NSR_ManageResponse') {
                NSR_GetUsers();
            }
            if (panelName == 'NSR_ManageQuestion') {
                NSR_InitLI();
            }
        }
    });
    NSR_GetUsers();
    $("#nsrAddNewStep").click(function () {
        NSR_AddNewStepLI();
    });
    $("#dlgNewQuestion").dialog({
        autoOpen: false,buttons: [
    {
        text: "Create",
        click: function () {
            NSR_CreateQuestion();
        }
    }, {
        text: 'Close',
        click: function () { $(this).dialog("close");}
    }
        ], width: 600, height: 400,
    close: function (e, u) {if (NSR_IsUpdated) NSR_LoadCategories(); }
    });
    $("#dlgEditQuestion").dialog({
        autoOpen: false, buttons: [
    {
        text: "Update",
        click: function () {
            NSR_UpdateQuestion();
        }
    }, {
        text: 'Close',
        click: function () { $(this).dialog("close"); }
    }
        ], width: 600, height: 475,
        close: function (e, u) {if (NSR_IsUpdated) NSR_LoadCategories(); }
    });
    $("#dlgNewQHeader").dialog({
        autoOpen: false, buttons: [
    {
        text: "Create",
        click: function () {
            NSR_CreateCategory();
        }
    }, {
        text: 'Close',
        click: function () { $(this).dialog("close");}
    }
        ], width: 450, height: 200,
        close: function (e, u) { if (NSR_IsUpdated) NSR_LoadCategories(); }
    });
    
    $("#dlEditQHeader").dialog({
        autoOpen: false, buttons: [
    {
        text: "Update",
        click: function () {
            NSR_UpdateCategory();
        }
    }, {
        text: 'Close',
        click: function () { $(this).dialog("close"); }
    }
        ], width: 450, height: 250,
        close: function (e, u) { if (NSR_IsUpdated) NSR_LoadCategories(); }
    });

    $("#dlgRejectReason").dialog({
        autoOpen: false, buttons: [
    {
        text: "Update",
        click: function () {
            NSR_UpdateStatus(NSR_CUID,0,'');
        }
    }, {
        text: 'Close',
        click: function () { $(this).dialog("close"); }
    }
        ], width: 450, height: 200,
        close: function (e, u) { if (NSR_IsUpdated) NSR_GetUsers(); }
    });

    $("#dlgAddOption").dialog({
        autoOpen: false, buttons: [
    {
        text: "Update",
        click: function () {
            /// NSR_UpdateStatus(NSR_CUID, 0, '');
            NSR_GetOptions();// $(this).dialog("close");
        }
    }, {
        text: 'Close',
        click: function () { $(this).dialog("close"); }
    }
        ], width: 600, height: 350,
        close: function (e, u) {  }
    });
    $("#dlgEditOption").dialog({
        autoOpen: false, buttons: [
    {
        text: "Update",
        click: function () {
            NSR_GetEditOptions();
            $//(this).dialog("close");
        }
    }, {
        text: 'Close',
        click: function () { $(this).dialog("close"); }
    }
        ], width: 600, height: 350,
        close: function (e, u) { }
    });
    $("#dlgUserNotes").dialog({
        autoOpen: false, buttons: [
    {
        text: "Update",
        click: function () {
            NSR_UpdateUserNotes();
        }
    }, {
        text: 'Close',
        click: function () { $(this).dialog("close"); }
    }
        ], width: 700, height: 450,
        close: function (e, u) { }
    });

})

function NSR_OpenGetOptions() {
    $("#dlgAddOption").dialog("open");
    return false;
}
function NSR_OpenEGetOptions() {
    $("#dlgEditOption").dialog("open");
    return false;
}
function NSR_OpenAddNew(QCatID) {
    _CurrentQCategory = QCatID;
    NSR_IsUpdated = false;
    $("#dlgNewQuestion").dialog("open");
    return false;
}
function NSR_OpenEditQuestion(QCatID,ID) {
    _CurrentQID = ID;
    _CurrentQCategory = QCatID;
    NSR_GetQuestion(ID);
    NSR_IsUpdated = false;
    $("#dlgEditQuestion").dialog("open", "height", 475);
    return false;
}
function NSR_GetQuestion(ID) {
    var _URL = NSR_WSUrl + 'GetQuestion';
    var _Data = "{'QID':" + ID + "}"; _HaveOptions = false;
    NSR_MakeRequest(_URL, _Data, NSR_BindEditQuestion);
}
function NSR_BindEditQuestion(r) {//Function.r.QuestionText
    $("#txtEQuestionText").val(NS_ParseString(r.QuestionText));
    $("#ddlEQuestionType").val(r.QType);
    $("#chkEVisible").attr('checked', r.IsVisible);
    $("#chkERequired").attr('checked', r.IsRequired);
    $("#chkEisFullWidth").attr('checked', r.IsFullWidth);
    $("#txtEOrder").val(r.OrderID);
    if ((r.QType == 'Radio') || (r.QType == 'CheckBox') || (r.QType == 'IAgree')) {
        ddlESubOption.options.length = 0;
        $("#ddlESubOption").parent().show();
        $("#btnEAddOption").show();
        for (var i = 0; i < r.Options.length; i++) {
            var o = new Option(r.Options[i].OptionText, r.Options[i].OptionID);
            $(o).attr("RoleID", r.Options[i].OnSelect);
            $("#ddlESubOption").append(o);
        }
    }
    else {
        $("#ddlESubOption").parent().hide();
        $("#btnEAddOption").hide();
    }
}
function NSR_OpenQuestionHeader(o) {
    NSR_IsUpdated = false;
    $("#dlgNewQHeader").dialog("open");
    return false;
}
function NSR_OpenEditHeader(ID) {
    _CurrentQCategory = ID; NSR_IsUpdated = false;
    NSR_GetHeader(ID);
    $("#dlEditQHeader").dialog("open");
    return false;
}
function NSR_GetHeader(ID){
    var _URL = NSR_WSUrl + 'GetCategory';
        var _Data = "{'CatID':" + ID + "}";
        NSR_MakeRequest(_URL, _Data, NSR_OnCategoryGet);
    return false;
}
function NSR_OnCategoryGet(r) {
    $("#txtEHeaderText").val(r.QCategoryDesc);
    $("#txtQCatOrder").val(r.OrderID);
}
function NSR_RemoveHeader(ID) {
    _CurrentQCategory = ID;
}
function NSR_AddNewStepLI(){
    var Total = $("#ulSteps li").length + 1;
    $("#ulSteps").append('<li><a id="ulStep_' + Total + '" onclick="NSR_ChangeStep(' + Total + ')" style="font-weight:bold;cursor:pointer;">Step ' + Total + '</a></li>');
}
function NSR_InitLI() {
    $("#ulSteps").html('');
    for (var i = 1; i <= NSR_TotalSteps; i++) {
        $("#ulSteps").append('<li><a style="font-weight:bold;cursor:pointer;" onclick="NSR_ChangeStep('+i+')">Step ' + i + '</a></li>');
    }
    var Total = $("#ulSteps li").length;
    if (Total == 0) {
        $("#ulSteps").append('<li><a style="font-weight:bold;cursor:pointer;"  onclick="NSR_ChangeStep(1)">Step 1</a></li>');
    }
    _CurrentStep = 1;
    $("#lblCurrentStep").text('Step 1 >');
    NSR_LoadCategories();
}
function NSR_ChangeStep(Step) {
    _CurrentStep = Step;
    $("#lblCurrentStep").text('Step ' + Step + ' >');
    NSR_LoadCategories();
}
function NSR_CreateCategory() {
    //AddCategory(int StepID, string QDesc)
    var _URL = NSR_WSUrl + 'AddCategory';
    var _Desc = $("#txtHeaderText").val().trim();
    if (_Desc != '') {
        var _Data = "{'StepID':" + _CurrentStep + ",'QDesc':'" + _Desc + "'}";
        NSR_MakeRequest(_URL, _Data, NSR_OnCategoryAdded);
    }
    else {
        bootbox.alert('Please specify the Header Text');
    }
    return false;
}
function NSR_OnCategoryAdded() {
    $("#txtHeaderText").val('');
    NSR_IsUpdated = true;
    bootbox.alert('Created successfully');
}
function NSR_UpdateCategory() {
    var _URL = NSR_WSUrl + 'UpdateCategory';
    var _Desc = $("#txtEHeaderText").val().trim();
    var _OrderID = $("#txtQCatOrder").val().trim();
    if (_OrderID == '') { alert('Please specify Order'); return false; }
    if (_Desc == '') {
        bootbox.alert('Please specify the Header Text'); return false;
    }
    var _Data = "{'CatID':" + _CurrentQCategory + ",'Desc':'" + _Desc + "','OrderID':'"+_OrderID+"'}";
    NSR_MakeRequest(_URL, _Data, NSR_OnCategoryUpdated);
    return false;
}
function NSR_OnCategoryUpdated(e) {
    NSR_IsUpdated = true;
    bootbox.alert('Updated successfully');
}
function NSR_CreateQuestion() {
    var _URL = NSR_WSUrl + 'AddQuestion';
    var _QT = $("#txtQuestionText").val().trim();
    if (_QT == '') { alert('Please specify question text'); return false; }
    var _QType = $("#ddlQuestionType").val();
    var _HText = $("#txtHintText").val().trim();
    if (_HaveOptions) {
        if (ddlSubOption.options.length == 0) {
            bootbox.alert("Please add options for this question.");
            return false;
        }
    }
    //QuestionText, QType, QCategoryID, IsRequired, IsVisible, HintText, OrderID
    var _Data = "{'QuestionText':'" + escape(_QT) + "','QType':'" + _QType + "','QCategoryID':'" + _CurrentQCategory + "','IsRequired':'" + $("#chkRequired").is(":checked") + "','IsVisible':'" + $("#chkVisible").is(":checked") + "','IsFullWidth':'" + $("#chkIsFullWidth").is(":checked") + "','HintText':'" + _HText + "','OrderID':'1'}";
    NSR_MakeRequest(_URL, _Data, NSR_OnQuestionAdded);
}
function NSR_OnQuestionAdded(r) {
    $("#txtHeaderText").val('');
    NSR_AddOptions(r);

    NSR_IsUpdated = true;
    bootbox.alert('Question created successfully');
}
function NSR_ShowSubOptions() {
    var OptionVal=$("#ddlQuestionType").val();
    if ((OptionVal == 'IAgree') || (OptionVal == 'CheckBox') || (OptionVal == 'Radio')) {
        _HaveOptions = true;
        $("#btnAddOption").show();
    }
    else {
        _HaveOptions = false;
        $("#btnAddOption").hide();
        $("ddlSubOption").parent().hide();
    }
}
function NSR_GetOptions() {
    var _OptionText = $("#txtOptionText").val().trim();//prompt("Please specify option text","");
    var _OptionID = $('select#ddlSubOption option').length;
    if (_OptionID == 0) { _OptionID = 1; } else { _OptionID = _OptionID + 1;}
    if ($.trim(_OptionText) !== "") {
        var o = new Option(_OptionText, _OptionID);
        var _RoleID=$("select[id$='ddlOnSelectRole']").val();
        $(o).attr('RoleID', _RoleID);
        $("#ddlSubOption").append(o).parent().show();
        $("#txtOptionText").val('');
    }
    else {
        bootbox.alert("Please specify value for 'Option Text'");
        return false;
    }
}
function NSR_GetEditOptions() {
    var _OptionText = $("#txtEOptionText").val().trim();
    var _OptionID = $('select#ddlESubOption option').length;
    if (_OptionID == 0) { _OptionID = 1; } else { _OptionID = _OptionID + 1; }
    if ($.trim(_OptionText) !== "") {
        // Add item to dropdown on UI
        var o = new Option(_OptionText, _OptionID);
        var _RoleID = $("select[id$='ddlEOnSelectRole']").val();
        $(o).attr('RoleID', _RoleID);
        $("#ddlESubOption").append(o).parent().show();
        NSR_IsUpdated = true;
        // Add item to database
        var _URL = NSR_WSUrl + 'AddOption';
        var _Data = "{'QID':'" + _CurrentQID + "','OptionText':'" + escape(_OptionText) + "','OnSelect':'" + _RoleID + "'}";
        NSR_MakeRequest(_URL, _Data);
        bootbox.alert('Option added successfully');
    }
}
function NSR_AddOptions(ID) {
    var _URL = NSR_WSUrl + 'AddOption';
    for (var i = 0; i < ddlSubOption.length; i++) {
        var _Data = "{'QID':'" + ID + "','OptionText':'" + ddlSubOption.options[i].text + "','OnSelect':'" + $(ddlSubOption.options[i]).attr('RoleID') + "'}";
        NSR_MakeRequest(_URL, _Data);
        NSR_IsUpdated = true;
    }
    $("#txtQuestionText").val('');
        ddlSubOption.options.length=0;
}
function NSR_DeleteOption() {
    var ID = ddlESubOption.value;
    if (ID != "") {
        var _URL = NSR_WSUrl + 'RemoveOption';
        var _Data = "{'OID':'" + ID + "'}";
        NSR_MakeRequest(_URL, _Data, NSR_OnOptionRemoval);
    }
}

function NSR_OnOptionRemoval() {
    $("#ddlESubOption option:selected").remove();
    NSR_IsUpdated = true;
    bootbox.alert('Removed successfull');
}

function NSR_RemoveQuestion(ID) {
    if (confirm('Are you sure to remove this question?') == true) {
        var _URL = NSR_WSUrl + 'RemoveQuestion';
        var _Data = "{'QID':'" + ID + "'}";
        NSR_MakeRequest(_URL, _Data, function () { NSR_IsUpdated = true; bootbox.alert("Question removed successfully"); NSR_LoadCategories(); });
    }
}
function NSR_UpdateQuestion() {
    var _URL = NSR_WSUrl + 'UpdateQuestion';
    var _QT = $("#txtEQuestionText").val().trim();
    if (_QT == '') { bootbox.alert('Please specify question text'); return false; }
    var _QType = $("#ddlEQuestionType").val();
    var _HText = $("#txtEHintText").val().trim();
    var _Order = $("#txtEOrder").val().trim();
    if (_Order == '') { bootbox.alert('Please specify the question order'); return false; }
    if (_HaveOptions) {
        if (ddlESubOption.options.length == 0) {
            bootbox.alert("Please add options for this question.");
            return false;
        }
    }
    var _Data = "{'QuestionID':'" + _CurrentQID + "','QuestionText':'" + escape(_QT) + "','QType':'" + _QType + "','QCategoryID':'" + _CurrentQCategory + "','IsRequired':'" + $("#chkERequired").is(":checked") + "','IsVisible':'" + $("#chkEVisible").is(":checked") + "','IsFullWidth':'" + $("#chkEisFullWidth").is(":checked") + "','HintText':'" + escape(_HText) + "','OrderID':'" + _Order + "'}";
    NSR_MakeRequest(_URL, _Data, NSR_OnQuestionUpdated);
}

function NSR_OnQuestionUpdated(d) {
    NSR_IsUpdated = true;
    bootbox.alert('Question updated successfully');
}

function NSR_LoadCategories() {
    var _URL = NSR_WSUrl + 'GetStepQuestions';
    var _Data = "{'StepID':" + _CurrentStep + "}";
    NSR_MakeRequest(_URL, _Data, NSR_BindCategories);
}
function NSR_BindCategories(data) {
    if (data.length > 0) {
        var o = $("#NSR_dvStepCategories").html('Please wait, while we are processing...');
        o.setTemplateURL('/DesktopModules/NS_Registration/Templates/ManageQuestions.htm?v=' + $.now());
        o.processTemplate(data);
    } else {
        $("#NSR_dvStepCategories").html('<label style="color:red;margin-left:10px;">No question header is created so far, you can create questions in a question header only.</label>');
    }
}

function NSR_GetUsers() {
    var _URL = NSR_WSUrl + 'ListOfUsers';
    var Keyword = $("#NSR_txtKeyword").val().trim();
    var _Data = "{'S':'" + _CurrStatus + "','K':'" + Keyword + "'}";
    NSR_MakeRequest(_URL, _Data, NSR_BindUsers);
}
function NSR_SetStatus(S) {
    _CurrStatus = S;
    NSR_GetUsers();
}

function NSR_BindUsers(r) {
    if (r.length > 0) {
        var o = $("#NSR_dvUserList").html('Please wait, while we are processing...');
        o.setTemplateURL('/DesktopModules/NS_Registration/Templates/users.htm?v=' + $.now());
        o.processTemplate(r);
    }
    else {
        $("#NSR_dvUserList").html('No records found');
    }
}
function NSR_ShowReason(reason) {
    reason = NS_ParseString(reason);
    var $dialog = $('<div></div>').html(reason)
    .dialog({
        autoOpen: true,
        modal: true,
        buttons: [{ text: 'Ok',click: function () { $(this).dialog("close"); }}],
        height: 250,
        width: 400,
        title: "Rejection Reason"
    });
    return false;
}
function NSR_OpenReason(UID) {
    NSR_CUID = UID; NSR_IsUpdated = false;
    $("#dlgRejectReason").dialog("open");
}
function NSR_UpdateStatus(UID, Status, R) {
    NSR_CUID = UID;
    var _URL = NSR_WSUrl + 'UpdateUserStatus';
    if (Status == 0) {
        R = $("#txtRejectReason").val().trim();
        if (R == '') { bootbox.alert('Please specify reason for rejection'); return false; }
    } else { R = '';}
    var _Data = "{'PID':'" + NSR_PID + "','UID':'" + NSR_CUID + "','Status':'" + Status + "','R':'" + escape(R) + "'}";
    NSR_MakeRequest(_URL, _Data, function () {
        NSR_IsUpdated = true;
        bootbox.alert('Updated successfully');
        NSR_GetUsers();
    });
}

function NSR_GetUserResponse(UID) {
    NSR_UID = UID;
    var url = '/DesktopModules/NS_Registration/rh.asmx/GetUserReponse';
    var data = "{'ID':'" + UID + "'}";
    NSR_MakeRequest(url, data, NSR_BindUserResponse);
}
function NSR_BindUserResponse(data) {
    var $dialog = $('<div id="NSR_dvReadUserResponse">Please wait, while we are loadng details for you</div>').html(data)
   .dialog({
       autoOpen: true,
       modal: true,
       buttons: { "Notes": function () { NSR_OpenUserNotes(); }, "Close": function () { $(this).dialog("destroy").remove(); } },
       height: 600,
       width: '90%',
       title: "User Response"
   });

    var o = $("#NSR_dvReadUserResponse");
    o.setTemplateURL('/DesktopModules/NS_Registration/Templates/UserResponse.htm?v=' + $.now());
    o.processTemplate(data);
    // Initialize Date control
    $(".NSR_Date").datepicker({
        dateFormat: "dd/mm/yy"
    });
}

function NSR_ToComma(s) {
    return s.replace(/\|/g, ', ');
}
function NSR_ToBR(s) {
    return s.replace(/\|/g, '<BR/><BR/> ');
}

function NSR_UpdateUserNotes() {
    var N = $("#txtUserText").val().trim();
    if (N == '') { alert('Text is missing for notes'); return false; }
    var url = '/DesktopModules/NS_Registration/rh.asmx/UpdateUserNotes';
    var data = "{'UID':'" + NSR_UID + "','N':'" + N + "'}";
    NSR_MakeRequest(url, data, function () { alert('Updated successfully'); });
}
function NSR_OpenUserNotes() {
    $("#dlgUserNotes").dialog("open");
    var url = '/DesktopModules/NS_Registration/rh.asmx/GetUserNotes';
    var data = "{'UID':'" + NSR_UID + "'}";
    NSR_MakeRequest(url, data, NSR_BindUserNotes);
    return false;
}

function NSR_BindUserNotes(r) {
    $("#txtUserText").val(r);
}
function NSR_ConfirmChange(o,i) {
    bootbox.confirm('Are you sure to change the status ??', function (r) {
        if (r) {
            var _status = $("#" + o.id + " :selected").val();
            NSR_UpdateActiveStatus(i, _status);
        }
    })
}

function NSR_UpdateActiveStatus(ID,S) {
    var url = '/DesktopModules/NS_Registration/rh.asmx/UpdateActiveStatus';
    var data = "{'UID':'" + ID + "','Status':'" + S + "'}";
    NSR_MakeRequest(url, data, function () {
        bootbox.alert("Status updated successfully.");
    });
}

function NSR_btnSearchUser() {
    var url = '/DesktopModules/NS_Registration/rh.asmx/UpdateActiveStatus';
    var data = "{'UID':'" + ID + "','Status':'" + S + "'}";
    NSR_MakeRequest(url, data, function () {
        bootbox.alert("Status updated successfully.");
    });
}