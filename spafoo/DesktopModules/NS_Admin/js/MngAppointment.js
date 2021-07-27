$(document).ready(function () {
    NSR_LoadsAllPendingApps();
});

function NSR_LoadsAllPendingApps() {

    var url = '/DesktopModules/NS_MakeAppointment/rh.asmx/ListAllAppointmentByAny';
    var data = "";
    var o = $("#NS_Admin_mngApp");
    $(o).html('Please wait, while we are processing...');
    NS_MakeRequest(url, data, NSR_OnLoadsAllPendingApps,NSR_OnFailedAllPendingApps);
}

function NSR_OnLoadsAllPendingApps(d) {
    var o = $("#NS_Admin_mngApp");
    $(o).html('just a moment...');
    debugger;
    if (d.length > 0) {
        o.setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpAppointmentAny.htm?v=' + $.now());
        o.processTemplate(d);
    }
    else {
        $(o).html('Sorry, no appointment(s) found.');
    }
}

function NSR_OnFailedAllPendingApps(a,b){
debugger;
}

function NS_React2Response(AID, Status) {
    if (Status == 1) {
        bootbox.confirm('Are you sure to accept ??', function (r) {
            if (r) {
                var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppStatus";
                var _data = "{'AppID':'" + AID + "','Status':'0'}";
                NS_MakeRequest(
                    _URL, _data,
                    function (d) {
                        bootbox.alert('Appointment updated successfully', function () {
                            window.location.reload();
                        });
                    }
                )
            }
        });
    }
    if (Status == 0) {
        bootbox.confirm('Are you sure to deny ??', function (r) {
            if (r) {
                var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppStatus";
                var _data = "{'AppID':'" + AID + "','Status':'6'}";
                NS_MakeRequest(
                    _URL, _data,
                    function (d) {
                        bootbox.alert('Appointment updated successfully', function () {
                            window.location.reload();
                        });
                    }
                );
            }
        });
    }
}

function NS_GetPhoneNumber(d) {
    if (d!= null) {
        return '- #' + d.Cell;
    }
    else
        return '';
}

function NS_GetUserName(d){
if (d!=null)
{
	return d.FirstName +' '+NS_IntialLetter(d.LastName);
}
else
return '';
}
function NS_convertToJSONDate(strDate){

    var dt = new Date(strDate);
    var newDate = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
    return '/Date(' + newDate.getTime() + ')/';
}

function NS_GetOrderDate(d){
//    var options = {
//        weekday: "long", year: "numeric", month: "short",
//        day: "numeric", hour: "2-digit", minute: "2-digit"
//    };
//    var date = new Date(d);
//    return date.toLocaleTimeString("en-us", options);
    // parse JSON formatted date to javascript date object
    var date = new Date(parseInt(d.replace(/\/Date\((\d+)\)\//, '$1')));
    var options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    return date.toLocaleDateString("en-US", options);
    //return date;
   // return moment(d.substr(6).replace(")/", ""), "YYYYMMDD");  //  moment(d.substr(6), "YYYYMMDD");
//    var date = new Date(parseInt(d.substr(6)));
//    // format display date (e.g. 04/10/2012)
//    var _r = $.datepicker.formatDate(f, date);
//    if (_r != '01 Jan 1') {
//        return _r
//    }
//    else { return ''; }
}
