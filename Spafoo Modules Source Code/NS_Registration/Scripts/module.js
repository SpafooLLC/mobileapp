var NSR_CurrentStep = 1;
var NSR_GlobalUserSelections = "";// QuestionID:OptionID1~OptionsID2|QuestionID2:OptionID1~OptionID2
var NSR_dialog = "";
// When document finished its loading
$(document).ready(function () {
    // Load dynamic questions on step 1
    NSR_LoadQuestions(1);
    NSR_ShowStepInfo();
    // On click of Next Button
    $("#btnNextStep").click(function () {
            if (NSR_ValidateForm() == true) {
                if (NSR_CurrentStep < NSR_TotalSteps) {
                    NSR_CurrentStep++;
                    NSR_ShowStepInfo();
                    NSR_LoadQuestions(NSR_CurrentStep);
                    $("#dvActionPanel").hide();
                }
                else {
                    if ($(this).val() == "SUBMIT MY APPLICATION") {
                        NSR_SaveUserResponse();
                    }
                }
            }
    });
    $("[id$='NS_tbUserName']").mask('000-000-0000');
    $("[id$='NS_tbVerifyUserName']").mask('000-000-0000');
    $("#txtUN").mask('000-000-0000');
    $("[id$='tbPostalCode']").mask('00000');
    $("#tb_3").mask('000-00-0000');// SSN
    NSR_dialog = $("#dialog-SaveFormUser").dialog({
        autoOpen: false, height: 300, width: 400, modal: true,
        buttons: { "Get Detail": SaveOrRetrieve, "Close": function () { $(this).dialog("close"); } }
    });
})
function NSR_ShowStepInfo() {
    $("#lblStepCaption").text("Step " + NSR_CurrentStep + " of " + NSR_TotalSteps);
    if (NSR_CurrentStep == NSR_TotalSteps)
        $("#btnNextStep").val("SUBMIT MY APPLICATION");
    else {
        $("#btnNextStep").val("NEXT STEP");
    }
}
function NSR_LoadQuestions(Step) {
    if (Step == 1) { $("#NSR_pnlFirst").show(); } else { $("#NSR_pnlFirst").hide(); }
    var url = '/DesktopModules/NS_Registration/rh.asmx/ListQuestions';
    var data = "{'Step':" + Step + "}"; 
    if (Step == 1) {
        NSR_MakeRequest(url, data, NSR_BindQuestions);
        NS_LoadServices();
    }
    else {
        $("#NSR_dvFixedStep1").hide();
        $("#NSR_dvFixedStepOuter").hide();
        for (var i = 1; i < NSR_TotalSteps; i++) {
            $("#NSR_UR_Step_" + i).hide();
        }
        $("#NSR_UR_Step_" + Step).show();
    }
}
function NS_LoadServices() {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetServicesIn"
    var _data = "{'SID':'-1'}";
    NSR_MakeRequest(_URL, _data, NS_LoadServices_SuCB);
}
function NS_LoadServices_SuCB(d) {
    $("#NSR_dvFixedStepOuter").show();
    $("#NSR_dvFixedStep1").setTemplateURL('/DesktopModules/NS_Registration/templates/tmpServiceTree.htm');
    $("#NSR_dvFixedStep1").processTemplate(d).show();
    $(".NSRAccor").accordion({
        heightStyle: "content", collapsible: true, event: "click hoverintent"
    });
    $("#NSR_dvFixedStep1 > DIV > DIV").addClass("ServiceTL");
}

function NSR_BindQuestions(data) {
    var o = $("#NSR_dvDynamicStep1");
    o.setTemplateURL('/DesktopModules/NS_Registration/Templates/UserQuestions.htm?v='+$.now());
    o.processTemplate(data);
    $("#NSR_ModuleOuter").restoreForm();
    $(".NSR_FileControl").on('change', function () {
        var ext = $(this).val().split('.').pop().toLowerCase();
        var QType = $(this).attr('qtype');
        var aryFile = "";
        var validExt = "*.gif, *.png, *.jpg, *.jpeg, *.doc, *.docx, *.pdf";
        if (QType == 'File') {
            aryFile = ['gif', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'pdf'];        }
        else
        {
            var validExt = "*.gif, *.png, *.jpg, *.jpeg";
            aryFile = ['gif', 'png', 'jpg', 'jpeg'];
        }
        
        if ($.inArray(ext, aryFile) == -1) {
            bootbox.alert('Invalid file extension found, could NOT upload.<br/><br/> You can upload file(s) having extension of ' + validExt);
            return false;
        }
        else {
            var file;
            if ((file = this.files[0])) {
                NSR_sendFile(file, this);
            }
        }
    });
    // Croppabe Images
    $(".NSR_Croppable").on('change', function () {
        var ext = $(this).val().split('.').pop().toLowerCase();
        var QType = $(this).attr('qtype');
        var aryFile = "";
        var validExt = "*.gif, *.png, *.jpg, *.jpeg, *.doc, *.docx, *.pdf";
        if (QType == 'File') {
            aryFile = ['gif', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'pdf'];
        }
        else {
            var validExt = "*.gif, *.png, *.jpg, *.jpeg";
            aryFile = ['gif', 'png', 'jpg', 'jpeg'];
        }

        if ($.inArray(ext, aryFile) == -1) {
            bootbox.alert('Invalid file extension found, could NOT upload.<br/><br/> You can upload file(s) having extension of ' + validExt);
            return false;
        }
        else {
            NS_CropImageProcessorURL = '/DesktopModules/NS_Registration/Scripts/jquery-uploadify/HandlerX.ashx';
            if ($(this).attr('id').split("_")[1] == 14) { // for Selfie Profile pic
                 NS_viewWidth = 400;
                 NS_viewHeight = 400;
                 NS_BoundWidth = 400;
                 NS_BoundHeight = 400;
                 NS_ViewPort = 'circle';
            }
            else {// work sample
                NS_viewWidth = 380;
                NS_viewHeight = 380;
                NS_BoundWidth = 380;
                NS_BoundHeight = 380;
                NS_ActualFileSize = { width: 530, height: 530 };
                NS_ViewPort = 'square';
            }
            readFile(this);
        }
    });

    // Initialize Date control
        $(".NSR_Date").datepicker({
            dateFormat: "mm/dd/yy"
        });

        $("#NSR_ModuleOuter").tooltip({
            position: {
                my: "center bottom-20",
                at: "center top",
                using: function (position, feedback) {
                    $(this).css(position);
                    $("<div>")
                      .addClass("arrow")
                      .addClass(feedback.vertical)
                      .addClass(feedback.horizontal)
                      .appendTo(this);
                }
            }
        });
}
function NSR_sendFile(file, fileCtrl) {
    var formData = new FormData();
    formData.append('file', $(fileCtrl)[0].files[0]);
    $(fileCtrl).after('<div class="NSR_UplNotify"><img src="/images/dnnanim.gif"/></div>')
    var QID = $(fileCtrl).attr('qid');
    formData.append('QuestionID', QID);
    $.ajax({
        type: 'post',data: formData,
        url: '/DesktopModules/NS_Registration/Scripts/jquery-uploadify/Handler.ashx',
        success: function (status) {
            if (status == 'Already') {
                $(fileCtrl).next().children("img").attr('src', '/images/red-error_16px.gif');
                bootbox.alert('File already exists. Rename file & upload');
                return false;
            }
            if (status != 'error') {
                if (status == "") {
                    $(fileCtrl).attr('uploadedFile', NSR_SID + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~'));
                }
                else {// if DNN FileID is returned by handler
                    $(fileCtrl).attr('uploadedFile', status);
                }
                //$(".NSR_UplNotify").hide();
                $(fileCtrl).next().children("img").attr('src', '/images/grant.gif');
                bootbox.alert('File uplaoded successfully');
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            $(fileCtrl).next().children("img").attr('src', '/images/red-error_16px.gif');
            bootbox.alert("Whoops something went wrong!");
        }
    });
}

function NSR_ValidateForm() {
    var NSR_DNNProfileIsValid = Page_ClientValidate('NSR');
    if (NSR_DNNProfileIsValid) {
        if ($("[id$='NS_tbPassword']").val().length < 7) {
            bootbox.alert('Password should be minimum of 7 character in length')
            return false;
        }
    }
    var NSR_IsValid = true;
    $("#NSR_UR_Step_"+NSR_CurrentStep+" .NS_Required").each(function (k, v) {
        var _IsAnswered=false;
        var _ID = this.id.split('_')[2];
        
        // if checkbox found
        $("#NSR_QContainer_" + _ID + " input[type='checkbox'] ").each(function (x, y) {
            if ($(this).is(":checked")) { _IsAnswered = true; return false; }
        });

        // if textbox found
        $("#NSR_QContainer_" + _ID + " input[type='text'] ").each(function (x, y) {
            if ($(this).val().trim() != "") {
                if ($(this).hasClass('NSR_Date')) {// check if it is a date , then validate its date format
                    _IsAnswered = NSR_IsDateValid(this);
                } else {
                    _IsAnswered = true;
                    return false;
                }
            }
            
            if (!_IsAnswered) {// break the each loop
                return false;
            }
            else { _IsAnswered = true; return false; }
        });
        // if textarea found
        $("#NSR_QContainer_" + _ID + " textarea ").each(function (x, y) {
            if ($(this).val().trim() != "" ) {
                _IsAnswered = true;
            }

            if (!_IsAnswered) {// break the each loop
                return false;
            }
            else { _IsAnswered = true; return false; }
        });
        // if radiobutton found
        $("#NSR_QContainer_" + _ID + " input[type='radio'] ").each(function (x, y) {
            if ($(this).is(":checked")) { _IsAnswered = true; return false;}
        });
        //if Fileupload is required
        $("#NSR_QContainer_" + _ID + " input[type='file'] ").each(function (x, y) {
            if (($(this).attr('uploadedfile')!=undefined) || ($(this).attr('uploadedfile')!=null)) { _IsAnswered = true; return false; }
        });
        if (!_IsAnswered) {
            $("#NSR_lblRequired_" + _ID).show();
            NSR_IsValid=false;
        }
        else 
            $("#NSR_lblRequired_" + _ID).hide();
    });
    // validate service
    if (NSR_CurrentStep == 1) {
        if ($('#NSR_dvFixedStep1 input:checked').length == 0) {
            if (NSR_IsValid) {
                NSR_IsValid = false;
                bootbox.alert('Please specify what service(s) do you offer');
            }
        }
    }
    
    if (!NSR_DNNProfileIsValid) { NSR_IsValid = false;}
    return NSR_IsValid;
}
function NSR_SaveUserResponse() {
    // FORMAT : QuestionID_OptionID1~OptionsID2|QuestionID2_OptionID1~OptionID2
    NSR_GlobalUserSelections = "";
    var lstInputs = $(".NSR_Questions input, textarea");
    $.each(lstInputs, function (i, v) {
        var ID = v.id.split('_')[1];
        if ((v.type == 'radio' || v.type == 'checkbox') && (v.checked)) {
            var OptID = v.id.split('_')[2];
            if (v.type == 'checkbox') {
                if ($(v).is('[selectid]') == false) {
                    NSR_GlobalUserSelections += "|" + ID + "_" + OptID;
                }
                else {
                    if (($(v).attr('selectid') != '-1') && ($(v).attr('selectid') != '')) {
                        NSR_GlobalUserSelections += "|" + ID + "_" + OptID + "_" + $(v).attr('selectid');
                    }
                    else {
                        NSR_GlobalUserSelections += "|" + ID + "_" + OptID;
                    }
                }
            }
            else {
                NSR_GlobalUserSelections += "|" + ID + "_" + OptID;
            }
        }
        else if (((v.type == 'text' || v.type == 'textarea')) && (v.value.trim() != '')) {
                NSR_GlobalUserSelections += "|" + ID + "_-1_" + escape(v.value);
        }
    });
    var lstFileInputs = $(".NSR_Questions [type='file']"); 
    $.each(lstFileInputs, function (i, v) {
        var ID = v.id.split('_')[1];
        var _FileName = $(v).attr('uploadedFile');
        if (_FileName != null || _FileName != undefined) {
               NSR_GlobalUserSelections += "|" + ID + "_-1_" + _FileName;
        }
    });
    var _SRVCInputs = $('#NSR_dvFixedStep1 input:checked');
    var _SRVC = "";
    $.each(_SRVCInputs, function (i, v) {
        var ID = v.id.split('_')[1];
        if (ID != null || ID != undefined) {
                _SRVC += "|" + ID;
        }
    });
   //$('div[id*="mpeEmpresa"]')
    var UN = $("input[id*='NS_tbUserName']").val().replace(/-/g,'');
    var FN = $("input[id*='NS_tbFirstName']").val().trim();
    var LN = $("input[id*='NS_tbLastName']").val().trim();
    var EM = $("input[id*='NS_tbEmail']").val().trim();
    var P = $("input[id*='NS_tbPassword']").val().trim();
    var PH = UN;
    var MB = "";
    var STR = $("input[id*='tbStreet']").val().trim();
    var City = $("input[id*='NS_tbCity']").val().trim();
    var State = $("select[id*='ddlState']").val().trim();
    var Zip = $("input[id*='tbPostalCode']").val().trim();
    var Gender = $("select[id*='ddlGender']").val().trim();
    var url = '/DesktopModules/NS_Registration/rh.asmx/RegisterUser';
    //string UN, string FN, string LN, string EM, string P, string PH, string STR, string City, string State, string Zip, string PID,string UR
    var data = "{'UN':'" + UN + "','FN':'" + FN + "','LN':'" + LN + "','EM':'" + EM + "','P':'" + P + "','PH':'" + PH + "','MB':'" + MB + "','STR':'" + STR + "','City':'" + City + "','State':'" + State + "','Zip':'" + Zip + "','PID':'" + NSR_PID + "','GDR':'" + Gender + "','UR':'" + NSR_GlobalUserSelections + "','SRVC':'"+_SRVC+"'}";
    NSR_MakeRequest(url, data, NSR_OnRegistration);
}

function NSR_OnRegistration(r) {
    if (r == '1') {
        bootbox.alert('Thank you , your information has been recorded successfully.', function (r) {
                window.location = NSR_HTBUrl;
        });
    }
    else {
        var aryR = r.split(":");
        var _info = "Unable to register you cause of following reason\n\n- " + aryR[1];
        NSR_CurrentStep = 1;
        $("#NSR_UR_Step_1").show(); $("#NSR_UR_Step_4").hide();
        $("#NSR_pnlFirst").show();
        NSR_ShowStepInfo();
        bootbox.alert(_info.replace(/([A-Z])/g, ' $1').trim());//insert spaces before Capital letters
    }
}
var NSR_Action=""
function NSR_SaveMyDetail() {
    NSR_Action = "S";
    //  NSR_dialog.dialog("open");
    NSR_SaveForLater();
    return false;
    $("#NSR_ModuleOuter").saveForm();
    bootbox.alert("Your detail is saved successfully");
}
function NSR_PrevSaved() {
    NSR_Action = "P";
    NSR_dialog.dialog("open");
}
function NSR_IsFormUserValid(SuCB) {
    var UN = $("#txtUN").val();
    if (UN.trim() == '') { bootbox.alert('Please specify username');return false;}
    var pwd = $("#txtNPwd").val();
    if (pwd.trim() == '') { bootbox.alert('Please specify password'); return false; }
    var url = '/DesktopModules/NS_Registration/rh.asmx/IsFormUserValidated';
    var data = "{'un':'" + UN + "','p':'" + pwd + "'}";
    NSR_MakeRequest(url, data, function (d) { SuCB(d); });
}
function NSR_RemoveResponse() {
    var url = '/DesktopModules/NS_Registration/rh.asmx/RemoveResponse';
    var data = "{'un':'" + UN + "'}";
    NSR_MakeRequest(url, data, NSR_RemoveResponse_On);
}
function NSR_RemoveResponse_On(d) {
}
function SaveOrRetrieve() {
    if (NSR_Action == "P") {//Previosly Saved
        NSR_IsFormUserValid(NSR_GetPreviouslySaved)
    }
}
function NSR_GetPreviouslySaved(d) {
    if (d == 3) {
        bootbox.alert('Username not found'); return false;
    }
    if (d == 0) {
        bootbox.alert('Password found to be incorrect'); return false;
    }
    if (d == 1) {
        $("#NSR_dvPreviouslySaved").hide();
        var UN = $("#txtUN").val();
        NSR_GetFormUserResponse(UN)
    }
}
function NSR_SaveForLater() {
    // FORMAT : QuestionID_OptionID1~OptionsID2|QuestionID2_OptionID1~OptionID2
    NSR_GlobalUserSelections = "";
    var lstInputs = $(".NSR_Questions input, textarea");
    $.each(lstInputs, function (i, v) {
        var ID = v.id.split('_')[1];
        if ((v.type == 'radio' || v.type == 'checkbox') && (v.checked)) {
            var OptID = v.id.split('_')[2];
            if (v.type == 'checkbox') {
                if ($(v).is('[selectid]') == false) {
                    NSR_GlobalUserSelections += "|" + ID + "_" + OptID;
                }
                else {
                    if (($(v).attr('selectid') != '-1') && ($(v).attr('selectid') != '')) {
                        NSR_GlobalUserSelections += "|" + ID + "_" + OptID + "_" + $(v).attr('selectid');
                    }
                    else {
                        NSR_GlobalUserSelections += "|" + ID + "_" + OptID;
                    }
                }
            }
            else {
                NSR_GlobalUserSelections += "|" + ID + "_" + OptID;
            }
        }
        else if (((v.type == 'text' || v.type == 'textarea')) && (v.value.trim() != '')) {
            NSR_GlobalUserSelections += "|" + ID + "_-1_" + escape(v.value);
        }
    });
    var lstFileInputs = $(".NSR_Questions [type='file']");
    $.each(lstFileInputs, function (i, v) {
        var ID = v.id.split('_')[1];
        var _FileName = $(v).attr('uploadedFile');
        if (_FileName != null || _FileName != undefined) {
            NSR_GlobalUserSelections += "|" + ID + "_-1_" + _FileName;
        }
    });
    var _SRVCInputs = $('#NSR_dvFixedStep1 input:checked');
    var _SRVC = "";
    $.each(_SRVCInputs, function (i, v) {
        var ID = v.id.split('_')[1];
        if (ID != null || ID != undefined) {
            _SRVC += "|" + ID;
        }
    });
    //$('div[id*="mpeEmpresa"]')
    var UN = $("input[id*='NS_tbUserName']").val().trim();
    if (UN.trim() == '') { bootbox.alert('Please specify the username'); return false;}
    var P = $("input[id*='NS_tbPassword']").val().trim();
    if (P.trim() == '') { bootbox.alert('Please specify the password'); return false;}
    var FN = $("input[id*='NS_tbFirstName']").val().trim();
    var LN = $("input[id*='NS_tbLastName']").val().trim();
    var EM = $("input[id*='NS_tbEmail']").val().trim();
    
    var PH = UN; //$("input[id*='NS_Phone']").val().trim();
    var MB = PH; //$("input[id*='NS_txtMobilePhone']").val().trim();
    var STR = $("input[id*='tbStreet']").val().trim();
    var City = $("input[id*='NS_tbCity']").val().trim();
    var State = $("select[id*='ddlState']").val().trim();
    var Zip = $("input[id*='tbPostalCode']").val().trim();
    var Gender = $("select[id*='ddlGender']").val().trim();
    var url = '/DesktopModules/NS_Registration/rh.asmx/SaveFormUserResponse';
    var data = "{'UN':'" + UN + "','FN':'" + FN + "','LN':'" + LN + "','EM':'" + EM + "','P':'" + P + "','PH':'" + PH + "','MB':'" + MB + "','STR':'" + STR + "','City':'" + City + "','State':'" + State + "','Zip':'" + Zip + "','PID':'" + NSR_PID + "','GDR':'" + Gender + "','UR':'" + NSR_GlobalUserSelections + "','SRVC':'" + _SRVC + "'}";
    NSR_MakeRequest(url, data, function (d) {
        bootbox.alert('The form is saved now, you can use "' + UN + '"/**** to retrieve this form details later on.');
    });
}

function NSR_GetFormUserResponse(UN) {
    var url = '/DesktopModules/NS_Registration/rh.asmx/GetFormUserReponse';
    var data = "{'username':'" + UN + "'}";
    NSR_MakeRequest(url, data, NSR_GetFormUserResponse_On);
}
function NSR_GetFormUserResponse_On(d) {
    var oUserInfo = d[0].UserDetail;
    $("input[id*='NS_tbUserName']").val(oUserInfo.username);
    $("input[id*='NS_tbPassword']").val(oUserInfo.password);
    $("input[id*='NS_tbConfirmPassword']").val(oUserInfo.password);
    $("input[id*='NS_tbFirstName']").val(oUserInfo.FirstName);
    $("input[id*='NS_tbLastName']").val(oUserInfo.LastName);
    $("input[id*='NS_tbEmail']").val(oUserInfo.Email);
    $("input[id*='NS_Phone']").val(oUserInfo.Phone);
    $("input[id*='NS_txtMobilePhone']").val(oUserInfo.MobilePhone);
    $("input[id*='tbStreet']").val(oUserInfo.Street);
    $("input[id*='NS_tbCity']").val(oUserInfo.City);
    $("select[id*='ddlState']").val(oUserInfo.State);
    $("input[id*='tbPostalCode']").val(oUserInfo.Zip);
    $("select[id*='ddlGender'] option[value='" + oUserInfo.Gender + "']").attr('selected', true)
    $.each(d, function (i, o) {
        $.each(o.Categories, function (j, v) {
            $.each(v.Questions, function (l, m) {
                if (m.QType == 'Radio') {
                    $("#rbl_" + m.QuestionID + "_" + m.OptionID).attr('checked',true);
                }
                if (m.QType == 'File') {
                    m.OptionText = m.OptionText.replace(/_/g, '~');
                    $('#NSRFile_' + m.QuestionID).attr('uploadedfile', NS_ParseString(m.OptionText));
                }
                if (m.QType == 'Images') {
                    m.OptionText = m.OptionText.replace(/_/g, '~');
                    $('#NSRFile_' + m.QuestionID).attr('uploadedfile', NS_ParseString(m.OptionText));
                }
                if (m.QType == 'TextBox') {
                    $("#tb_" + m.QuestionID).val(NS_ParseString(m.OptionText));
                }
                if (m.QType == 'Multiline') {
                    $("#tb_" + m.QuestionID).val(NS_ParseString(m.OptionText));
                }
                if (m.QType == 'CheckBox') {
                    $("#chk_" + m.QuestionID + "_" + m.OptionID).attr("checked",true);
                }
                if (m.QType == 'IAgree') {
                    $("#chk_" + m.QuestionID + "_" + m.OptionID).attr("checked",true);
                }

                if (m.QType == 'Date') {
                    $("#tb_" + m.QuestionID).val(NS_ParseString(m.OptionText));
                }
            });
        })
    });
    // get the chosen services
    var url = '/DesktopModules/NS_Registration/rh.asmx/GetFormUserServices';
    var data = "{'un':'" + oUserInfo.username + "'}";
    NSR_MakeRequest(url, data, function(d){
        $.each(d, function (i, v) {
            $("#chkSRVC_" + v.ServiceID).attr('checked', true);
        });
    });
    NSR_dialog.dialog("close");
}