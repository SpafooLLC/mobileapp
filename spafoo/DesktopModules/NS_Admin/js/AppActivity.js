var CP = 1;
var RPP = 25;
$(document).ready(function () {
    NS_LoadNotifications();
});

function NS_LoadNotifications(o) {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAdminNotification";
    var _data = "{'PN':'" + (CP++) + "','RPP':'" + RPP + "'}";
    if (o == undefined) {
        $("#NS_dvAdminNoti").text('Please wait while we are retrieving data...');
    }
    else {
        $("#NS_dvAdminNoti .newContent:last-child").last().text('Please wait while we are retrieving data...');
    }
    NS_MakeRequest(_URL, _data,
        function (d) {
           
            if (d.length > 0) {
               
                if (o==undefined){
                    $("#NS_dvAdminNoti").append().setTemplateURL('/DesktopModules/NS_Admin/temp/tmpAppActivity.htm?q=' + $.now());
                    $("#NS_dvAdminNoti").show().processTemplate(d);
                }
                else {
                    $("#NS_dvAdminNoti .newContent:last-child").last().setTemplateURL('/DesktopModules/NS_Admin/temp/tmpAppActivity.htm?q=' + $.now());
                    $("#NS_dvAdminNoti .newContent:last-child").last().show().processTemplate(d);
                }
             //   if (o==undefined){ 
                    $('.NS_AppTooltip').tooltipster({
                        content: '<span class="tprload">Loading...</span>', contentAsHTML: true,
                        // 'instance' is basically the tooltip. More details in the "Object-oriented Tooltipster" section.
                        functionBefore: function (instance, helper) {
                            var $origin = $(helper.origin);
                            // we set a variable so the data is only loaded once via Ajax, not every time the tooltip opens
                            if ($origin.data('loaded') !== true) {
                              // var URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointment";
                                var URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetBasicAppointment";
                                var data = "{'ID':'" + helper.origin.id.split('_')[1] + "'}";
                                NS_MakeRequest(URL, data, function (d) {
                                    var _Header = "";
                                    if (d == null) {
                                        instance.content('<label style="color:red">Sorry, no information found for this appointment</label>');
                                        // to remember that the data has been loaded
                                        $origin.data('loaded', true);
                                        return;
                                    }
                                    if (d.ForDate != "") {
                                        _Header = "<h2>" + NS_FormatDate(d.ForDate, 'DD dd MM yy') + "</h2>";
                                    }
                                    var _Services = "";
                                    for (var i = 0; i < d.Services.length; i++) {
                                        _Services += d.Services[i].ServiceName + ",";
                                    }
                                    var WithName = '';
                                    //if (NS_IsProvider) {
                                    //    WithName = d.ClientInfo.FirstName + ' ' + NS_IntialLetter(d.ClientInfo.LastName);
                                    //}
                                    //else {
                                    //    WithName = d.ProviderInfo.FirstName + ' ' + NS_IntialLetter(d.ProviderInfo.LastName);
                                    //}
                                    // call the 'content' method to update the content of our tooltip with the returned data
                                    var _HTML = '<div class="tp"> <div class="sce"><div class="left"> ' +
                                '<div class="date">' + ((d.ForDate == '') ? '&nbsp;' : NS_FormatDate(d.ForDate, 'dd')) + ' <span>' + ((d.ForDate == '') ? '&nbsp;' : NS_FormatDate(d.ForDate, 'MM')) + '</span></div>' +
                                '<div class="time">' + d.AtTime + '</div>' +
                            '</div><div class="right">' + _Header +
                                '<p>At: <span class="blue">' + d.Location.City + ',' + d.Location.State + '</span></p>' +
                                '<p>With: <span class="blue">' + WithName + '</span></p>' +
                                '<p>Service(s): <span class="blue">' + _Services + '</span></p>' +
                '</div></div> </div>';
                                    instance.content(_HTML);
                                    // to remember that the data has been loaded
                                    $origin.data('loaded', true);
                                });
                            }
                        }
                    });
                    $('.NSUserTip').tooltipster({
                        content: 'Loading...', contentAsHTML: true, interactive: true,
                        // 'instance' is basically the tooltip. More details in the "Object-oriented Tooltipster" section.
                        functionBefore: function (instance, helper) {
                            var $origin = $(helper.origin);
                            // we set a variable so the data is only loaded once via Ajax, not every time the tooltip opens
                            if ($origin.data('loaded') !== true) {
                                var URL = "/DesktopModules/NS_ServiceDashboard/rh.asmx/GetUserPic";
                                var data = "{'UID':'" + helper.origin.id.split('_')[1] + "'}";
                                var _HTML = "";
                                NS_MakeRequest(URL, data, function (d) {
                                    _HTML = "<img style='height:75px;width:75px;' src='" + d + "'/>";
                                    instance.content(_HTML);
                                    // to remember that the data has been loaded
                                    $origin.data('loaded', true);
                                });
                            }
                        }
                    });
               // }
            }
            else {
                if (o == undefined) {
                    $("#NS_dvAdminNoti").text('Sorry, no activity found at the moment.');
                }
                else {
                    $("#NS_dvAdminNoti .newContent:last-child").last().text('Thats it, no more activity found');
                }
            }
        });
}