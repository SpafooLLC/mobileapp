/*
    Script to handle all the ManageDashboard.ascx related user control features
     NSR_SDB_MakeRequest(WBurl,WBData,SuccessCB,FailedCB);
*/
var NS_SDB_CurrentServiceID = -1;
var NS_SDN_CurrentUser = "";
var CNode = "";
var NS_SDB_LID = -1;
var NS_SDB_SaveStatus = -1;
var NS_SDB_CLevel = 1;
var NS_SDB_lstServices = "";
var NSD_lstUsers = "";
var NSD_SourceAddress="";
// On Document Ready
    $(document).ready(function () {
        NS_LoadServices(-1);
        NSD_GetMyPosition();
    });

function NS_LoadServices(SID) {
    $("#NS_dvDBProviderBar").hide(); $("#NS_dvDBProProfile").hide();
    $("#NS_dvDBServiceBar").show().text('Just a min...');
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetServicesIn"
    var _data = "{'SID':'" + SID + "'}";
    NSR_SDB_MakeRequest(_URL, _data, NS_LoadServices_SuCB);
}
function NS_GetService(SID) {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetService"
    var _data = "{'SID':'" + SID + "'}";
    var oReturn = "";
    NSR_SDB_MakeRequest(_URL, _data, function (d) {
        oReturn = d[0];
    }, undefined, false);
    return oReturn;
}
function NS_LoadServices_SuCB(d) {
    $("#NS_dvDBServiceBar").setTemplateURL('/DesktopModules/NS_ServiceDashBoard/templates/tmpDashB.htm');
    $("#NS_dvDBServiceBar").show().processTemplate(d);
    if (NS_SDB_lstServices == "") { NS_SDB_lstServices = d; }
}
function NS_GetSerficeInfo(ID) {
    var oService = NS_GetService(ID);
}
function NS_OnServiceClick(id) {
   NS_SDB_LID = id;
    //CNode = NS_GetService(NS_SDB_lstServices, id);
   CNode = NS_GetService(id);
    if (CNode.Children.length>0) {
    NS_SDB_CurrentServiceID = id;
// change the header text with the currently selected Service name
    var ServiceName = $("#NSD_SName_" + id).text();
    $("#NS_TopBarlblHeader").text(ServiceName);
    NS_SDB_CLevel++; // Increment the Level counter
    NS_LoadServices(id); // now load the services under the selecte ID
}
else {// Show Provider list which deal with the choosen service , if user click on level 3
    NS_LoadProviders(CNode.ServiceID);
    $("#NS_TopBarlblHeader").text('Select Provider');
}
    return false;
}
function NS_OnPreviousClick() {
    // if user is on first level, no need to do anything 
    if (NS_SDB_CLevel == 1) { return false; }

    // var oPreviousService = NS_GetService(NS_SDB_lstServices, CNode.ParentID);
    var oPreviousService = NS_GetService(CNode.ParentID);
    if (NS_SDB_CLevel > 2) {
        NS_LoadServices(CNode.ParentID);
        // CNode = NS_GetService(NS_SDB_lstServices, CNode.ParentID);
        CNode = NS_GetService(CNode.ParentID);
        $("#NS_TopBarlblHeader").text(oPreviousService.ServiceName); // change the header
    }
    if (NS_SDB_CLevel == 2) { NS_LoadServices(-1); $("#NS_TopBarlblHeader").text('Select Service'); }
    if ($("#NS_dvDBServiceBar").is(":visible")) {
        //decrement the level counter
        NS_SDB_CLevel--;
    }
    return false;
}
function NS_IntialLetter(s) {
    return s.charAt(0)+".";
}
function NS_ServiceOnError(o) {
    $(o).attr('src', '/DesktopModules/NS_ServiceDashBoard/imgs/NA.jpg');
}

function NS_OnProviderLoaded_SuCB(d) {
    NS_ClearForm();
    NS_LoadServices(-1);
    alert('The provided information has been updated successfully');
}
function NS_LoadProviders(id) {// get all the providers who deal with the given service ID
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/ListProvidersByServices";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'SID':'" + id + "'}";
    $("#NS_dvDBServiceBar").hide();
    $("#NS_dvDBProviderBar").show().text("Just a min...")
    NSR_SDB_MakeRequest(_URL, _data, NS_LoadProviders_SuCB);
}

function NS_LoadProviders_SuCB(d) {
    NSD_lstUsers = d;
    $("#NS_dvDBServiceBar").hide();
    if (d.length > 0) {
        $("#NS_dvDBProProfile").hide();
        $("#NS_dvDBProviderBar").setTemplateURL('/DesktopModules/NS_ServiceDashBoard/templates/tmpProviders.htm?q=' + $.now());
        $("#NS_dvDBProviderBar").show().processTemplate(d);
        $('.NSD_starRating').barrating({
            theme: 'fontawesome-stars'
        });
    }
    else {
        $("#NS_dvDBProviderBar").show().text("Sorry, no provider found for the selected service")
    }
}

function NSD_GetUser(UID) { 
    for (var i = 0; i < NSD_lstUsers.length; i++) {
        var oUser = NSD_lstUsers[i];
        if (oUser.UserID == UID)
            return oUser;
    }
}
function NSD_ShowProviderDetail(UID) {
    var oUser = NSD_GetUser(UID);
    if (oUser != "") {
        NS_SDN_CurrentUser = oUser;
        $("#NS_dvDBProviderBar").hide();
        $("#NS_dvDBProProfile").setTemplateURL('/DesktopModules/NS_ServiceDashBoard/templates/tmpProvider.htm?q=' + $.now());
        $("#NS_dvDBProProfile").show().processTemplate(oUser);
        $('.NSD_starRating').barrating({
            theme: 'fontawesome-stars'
        });
    }
}

function NSD_GetDistance(Street, City,Region, Country, elementID) {
    var destination = Street + ", " + City + ", " + Region + ", " + Country;
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [NSD_SourceAddress],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            try {
                var distance = response.rows[0].elements[0].distance.text.split(' ')[0];
                var duration = response.rows[0].elements[0].duration;
                $("#NSD_dvUserDistance_" + elementID).html(distance);
                $("#NSD_lblUserDistance_" + elementID).html(distance+ " miles from you");
            } catch (e) {
               // $("#NSD_dvUserDistance_" + elementID).text("");
            }
        }
        else {
            $("#NSD_dvUserDistance_" + elementID).text("");

        }
    });
}

function NSD_GetMyPosition() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        },
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                NSD_SourceAddress = (results[0].formatted_address);
            }
        });
    },function (positionError) {
        //$("#error").text("Error: " + positionError.message);
    },
    {
        enableHighAccuracy: true,
        timeout: 10 * 1000 // 10 seconds
    });
}

function NSD_GetProviderServices(UID) {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetProviderServices";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + UID + "'}";
    $("#NSD_dvProviderService").show().text("Just a min...")
    NSR_SDB_MakeRequest(_URL, _data, NSD_GetProviderServices_SuCB);
}
function NSD_GetProviderServices_SuCB(d) {
    if (d.length > 0) {
        $("#NSD_dvProviderService").setTemplateURL('/DesktopModules/NS_ServiceDashBoard/templates/tmpProService.htm?q=' + $.now());
        $("#NSD_dvProviderService").show().processTemplate(d);
    }
}
function NSD_GetProviderSamples(UID) {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetWorkSamples";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'PID':'" + UID + "'}";
    $("#NSD_dvProviderService").show().text("Just a min...")
    NSR_SDB_MakeRequest(_URL, _data, NSD_GetProviderSamples_SuCB);
}
function NSD_GetProviderSamples_SuCB(d) {
    if (d.length > 0) {
        $("#NSD_dvProviderWorkSamples").setTemplateURL('/DesktopModules/NS_ServiceDashBoard/templates/tmpProWorkSample.htm?q=' + $.now());
        $("#NSD_dvProviderWorkSamples").show().processTemplate(d);
        $('.fancybox').fancybox();
    }
}
function NS_GotoMakeAppointment() {
    $.cookie('NSD_CurrentUser', NS_SDN_CurrentUser.UserID + ":" + $("#NSD_UName_"+NS_SDN_CurrentUser.UserID).text());
    window.location = NSR_SDB_AppointmentTab;
}