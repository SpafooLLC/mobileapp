var _CurrRoleID = -1;
var _CurrUserID = -1;
var NSA_UserList = [];
$(document).ready(function () {

    NSA_GetFirstRoleName();

    // When role drop down option changes
        $("[id*='ddlRoles']").on('change', function () {
            NSA_GetFirstRoleName();
        });

    // on Send button click
    $("[id*='btnSendNotification']").click(function () {
        NSA_SendNotification();
        return false;
    });

    $("#rblOptionRole").click(function (a) {
        $("#txtUsers").attr('disabled', 'disabled').val('');
        _CurrRoleID = $("[id*='ddlRoles']").val();
        _CurrUserID = -1;
    });
    $("#rblOptionUsers").click(function () {
        $("#txtUsers").removeAttr('disabled');
        $("#txtUsers").attr("NSA_UID", "-1");
        _CurrRoleID = -1;
    });
   
});

function NSA_GetFirstRoleName() {
    var RoleName = $("[id*='ddlRoles'] option:selected").text();
    $("#lblOptionUsers").text("To User in role '" + RoleName+"'");
    NSA_LoadUsersInRole(RoleName);
}

function NSA_LoadUsersInRole(RoleName){
    var url = '/DesktopModules/NS_MakeAppointment/rh.asmx/GetUsersByRole';
    var data = "{'RoleName':'" + RoleName + "'}"; //"','CP':'1','RPP':'2000'}";
    NS_MakeRequest(url, data, NSA_OnLoadUsersInRole, NSA_OnLoadErrorUsersInRole);
}

function NSA_OnLoadUsersInRole(d) {
    NSA_UserList = [];
    for (var i = 0; i < d.length; i++) {
        var item = {};
        if (d[i].FirstName != "") {
            item["label"] = d[i].FirstName + " " + d[i].LastName + " - " + d[i].PhoneNumber;
            item["value"] = d[i].UserID;
            NSA_UserList.push(item);
        }
    }
    $("#txtUsers").autocomplete({
        minLength: 0,
        source: NSA_UserList,
        focus: function (event, ui) {
            $("#txtUsers").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            $("#txtUsers").val(ui.item.label);
            $("#txtUsers").attr("NSA_UID", ui.item.value);
            return false;
        }
    });
}

function NSA_OnLoadErrorUsersInRole(a, b) {
   
}

function NSA_SendNotification() {
    if (IsSendValid()) {
        $("[id*='btnSendNotification']").val("Please wait, processing...").attr("disabled", "disabled");
        var _Message = $.trim($("[id*='txtMessage']").val());
        var url = '/DesktopModules/NS_MakeAppointment/rh.asmx/SendNotification';
        _CurrUserID = $("#txtUsers").attr('NSA_UID');
        if (_CurrRoleID > -1) { _CurrUserID = -1;}
        var data = "{'UserID':'" + _CurrUserID + "','RoleID':'" + _CurrRoleID + "','Message':'" + _Message + "'}";
        NS_MakeRequest(url, data, NSA_OnLoadSendNotification, NSA_OnErrorSendNotification);
    }
    return false;
}

function NSA_OnLoadSendNotification(d) {
    $("[id*='txtMessage']").val('');
    $("[id*='btnSendNotification']").removeAttr('disabled').val("Send Message");
    alert(d);
}

function NSA_OnErrorSendNotification() {
    $("[id*='btnSendNotification']").removeAttr('disabled').val("Send Message");
}

function IsSendValid() {
    var _Message = $.trim($("[id*='txtMessage']").val());
    if (_Message == "") { alert('Please specify message to send'); $("[id*='txtMessage']").focus(); return false; }

    if ($("#rblOptionUsers").is(":checked")) {
        if ($("#txtUsers").attr('NSA_UID') == -1) {
            alert('Please select a User to send message.'); return false;
        }
    }
    return true;
}

function countChar(val) {
    var MaxLength = 255;
    var len = val.value.length;
    if (len >= MaxLength) {
        val.value = val.value.substring(0, MaxLength);
    } else {
        $('#lblMaxChar').text("(Remaining characters: " + (MaxLength - len)+")");
    }
};