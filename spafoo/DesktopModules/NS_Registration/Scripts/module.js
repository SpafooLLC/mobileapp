var NSR_CurrentStep = 1;
var NSR_GlobalUserSelections = "";// QuestionID:OptionID1~OptionsID2|QuestionID2:OptionID1~OptionID2
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
                }
                else {
                    if ($(this).val() == "SUBMIT MY APPLICATION") {
                        NSR_SaveUserResponse();
                    }
                }
            }
    });
    $("[id$='NS_Phone']").mask('000-000-0000');
    $("[id$='tbPostalCode']").mask('00000');
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

}
function NSR_BindQuestions(data) {
    var o = $("#NSR_dvDynamicStep1");
    o.setTemplateURL('/DesktopModules/NS_Registration/Templates/UserQuestions.htm?v='+$.now());
    o.processTemplate(data);
    $("#NSR_ModuleOuter").restoreForm();
        $(".NSR_FileControl").on('change', function () {
            var file;
            if ((file = this.files[0])) {
                NSR_sendFile(file, this);
            }
        });
    // Initialize Date control
        $(".NSR_Date").datepicker({
            dateFormat: "dd/mm/yy"
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
    $(fileCtrl).after('<div class="NSR_UplNotify" style="font-weight:bold">Uploading...</div>')
    $.ajax({
        type: 'post',
        url: '/DesktopModules/NS_Registration/Scripts/jquery-uploadify/Handler.ashx',
        data: formData,
        success: function (status) {
            if (status != 'error') {
                $(fileCtrl).attr('uploadedFile', NSR_SID + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~'));
                $(".NSR_UplNotify").hide();
                alert('File uplaoded successfully');
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            alert("Whoops something went wrong!");
        }
    });
}

function NSR_ValidateForm() {
    var NSR_DNNProfileIsValid = Page_ClientValidate('NSR');
    if (NSR_DNNProfileIsValid) {
        if ($("[id$='NS_tbPassword']").val().length < 7) {
            alert('Password should be minimum of 7 character in length')
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
                alert('Please specify what service(s) do you offer');
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
                NSR_GlobalUserSelections += "|" + ID + "_" + OptID;
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
    var FN = $("input[id*='NS_tbFirstName']").val().trim();
    var LN = $("input[id*='NS_tbLastName']").val().trim();
    var EM = $("input[id*='NS_tbEmail']").val().trim();
    var P = $("input[id*='NS_tbPassword']").val().trim();
    var PH = $("input[id*='NS_Phone']").val().trim();
    var MB = $("input[id*='NS_Phone']").val().trim();
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
        alert('Thank you , your information has been recorded successfully.');
        window.location = NSR_HTBUrl;
    }
    else {
        var aryR = r.split(":");
        var _info = "Unable to register you cause of following reason\n\n- " + aryR[1];
        NSR_CurrentStep = 1;
        $("#NSR_UR_Step_1").show(); $("#NSR_UR_Step_4").hide();
        $("#NSR_pnlFirst").show();
        NSR_ShowStepInfo();
        alert(_info.replace(/([A-Z])/g, ' $1').trim());//insert spaces before Capital letters
    }
}

function NSR_SaveMyDetail() {
    $("#NSR_ModuleOuter").saveForm();
    alert("Your detail is saved successfully");
}