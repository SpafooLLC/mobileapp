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
    NSD_GetMyPosition();
    if ($.cookie('NSProID') != null) {
        var ID = $.cookie('NSProID');
        $.cookie('NSProID',null); //read and remove cookie
        NSD_GetUserInfo(ID);
        return false;
    }
    NS_LoadServices(-1);
});

function NS_LoadServices(SID) {
    $("#NS_dvDBProviderBar").hide(); $("#NS_dvDBProProfile").hide();
    $("#NS_dvDBServiceBar").show().html(NS_Waiting);
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
function NS_OnServiceClick(id,e) {
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
    e.preventDefault();
    return false;
}
function NS_OnPreviousClick(e) {
    // if user is on first level, no need to do anything 
    if (NS_SDB_CLevel == 1) { return false; }

    // var oPreviousService = NS_GetService(NS_SDB_lstServices, CNode.ParentID);
    var oPreviousService = NS_GetService(CNode.ParentID);
    if (NS_SDB_CLevel > 2) {
        if ($("#NS_dvDBProProfile").is(":visible")) {
            // if user is provider In-Depth view, go back to provider's list
            NS_LoadProviders(CNode.ServiceID);
            $("#NS_TopBarlblHeader").text('Select Provider');
        }
        else {
            NS_LoadServices(CNode.ParentID);
            // CNode = NS_GetService(NS_SDB_lstServices, CNode.ParentID);
            CNode = NS_GetService(CNode.ParentID);
            $("#NS_TopBarlblHeader").text(oPreviousService.ServiceName); // change the header
        }
    }
    if (NS_SDB_CLevel == 2) { NS_LoadServices(-1); $("#NS_TopBarlblHeader").text('Select Service'); }
    if ($("#NS_dvDBServiceBar").is(":visible")) {
        //decrement the level counter
        NS_SDB_CLevel--;
    }
    e.preventDefault();
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
    $("#NS_dvDBProviderBar").show().html(NS_Waiting)
    NSR_SDB_MakeRequest(_URL, _data, NS_LoadProviders_SuCB);
}

function NS_LoadProviders_SuCB(d) {
  // d= NSD_ProcessProviderDistance(d); // Uncomment this line before posting on www.spafoo.com site
   NSD_lstUsers = d;
    $("#NS_dvDBServiceBar").hide();
    if (d.length > 0) {
        $("#NS_dvDBProProfile").hide();
        $("#NS_dvDBProviderBar").setTemplateURL('/DesktopModules/NS_ServiceDashBoard/templates/tmpProviders.htm?q=' + $.now());
        $("#NS_dvDBProviderBar").show().processTemplate(d);
        if ($(".prolist").html().trim().length == 0) {
            $("#NS_dvDBProviderBar").show().text("Sorry, no provider found for the selected service");
            return;
        }
        $('.NSD_starRating').barrating({
            theme: 'fontawesome-stars',readonly :true
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
function NSD_GetUserInfo(ID) {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetUser";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + ID + "'}";
    NSR_SDB_MakeRequest(_URL, _data, function (d) {
        NSD_ShowProInDetail(d);
    }, undefined, false);
}
function NSD_ShowProviderDetail(UID,e) {
    var oUser = NSD_GetUser(UID);
    if (oUser != "") {
        NS_SDN_CurrentUser = oUser;
        $("#NS_dvDBProviderBar").hide();
        $("#NS_TopBarlblHeader").text('Provider');
        $("#NS_dvDBProProfile").setTemplateURL('/DesktopModules/NS_ServiceDashBoard/templates/tmpProvider.htm?q=' + $.now());
        $("#NS_dvDBProProfile").show().processTemplate(oUser);
        $('.NSD_starRating').barrating({
            theme: 'fontawesome-stars'
        });
    }
    if (e != undefined) {
        e.preventDefault();
    }
}
function NSD_ShowProInDetail(oUser) {
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
function GetUserTagLine(id) {
    var _URL = "/DesktopModules/NS_UserProfile/rh.asmx/GetProTagLine";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + id + "'}";
    var _ID = '#lblUserTagLine_' + id;
    $(_ID).text("Loading...");
    NSR_SDB_MakeRequest(_URL, _data, function (d) {
        d = NS_ParseString(d);
        $(_ID).text(d);
        $("#lblUserTagLineID_" + id).text(d);
    });
}
function NSD_GetDistance(Street, City, Region, Country, elementID) {
    var destination = Street + ", " + City + ", " + Region + ", " + Country;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': destination }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // use D I R E C T I O N   S E R V I C E  to calcualte the duration from current position of the user
          //  var destination = address;
            var p1 = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            var distance = calcDistance(p2, p1);
            $("#NSD_dvUserDistance_" + elementID).html(distance);
            $("#NSD_lblUserDistance_" + elementID).html(distance + " miles from you");
        }
    });
}

var p2 = "";
function NSD_GetMyPosition() {
    navigator.geolocation.getCurrentPosition(function (position) {
        p2 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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

function NSD_ProcessProviderDistance(lstUsers) {
    var tmpUsers = JSON.parse(JSON.stringify(lstUsers));;
    $.each(lstUsers, function (i, o) {
        var Lat = o.VanityUrl.split(":")[0];
        var Lng = o.VanityUrl.split(":")[1];
        if (Lat != -1) {// if not invalid Lat:Lng
            var p1 = new google.maps.LatLng(Lat, Lng);
            // to check the distance between Client's & Provider's Lat Lang
            var distance = calcDistance(p2, p1);
            if ((distance > 50) ||(distance == 'NaN')){
                o.VanityUrl = "D:0";
                tmpUsers[i] = o;
            }
            else {
                o.VanityUrl = "A:" + distance;
            }
        }
        else {
            o.VanityUrl = "D:0";
            tmpUsers[i] = o;
        }
    });
    return tmpUsers;
}
function NSD_InRange(v,i) {
    var ary = v.split(':');
    return ary[i];
}

function NSD_GetProviderServices(UID) {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetProviderServices";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + UID + "'}";
    $("#NSD_dvProviderService").show().html(NS_Waiting)
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
    $("#NSD_dvProviderService").show().html(NS_Waiting)
    NSR_SDB_MakeRequest(_URL, _data, NSD_GetProviderSamples_SuCB);
}
function NSD_GetProviderSamples_SuCB(d) {
    if (d.length > 0) {
        $("#NSD_dvProviderWorkSamples").setTemplateURL('/DesktopModules/NS_ServiceDashBoard/templates/tmpProWorkSample.htm?q=' + $.now());
        $("#NSD_dvProviderWorkSamples").show().processTemplate(d);
        $('.fancybox').fancybox();
    }
}
function NS_GotoMakeAppointment(e) {
    e.preventDefault();
    if (!NSR_SDB_IsProvider) {
        $.cookie('NSD_CurrentUser', NS_SDN_CurrentUser.UserID + ":" + $("#NSD_UName_" + NS_SDN_CurrentUser.UserID).text() + ":" + CNode.ServiceID);
        window.location = NSR_SDB_AppointmentTab;
    }
    else {
        bootbox.alert('Being a provider, you do not have a permission for this.');
    }
}

function NS_GetMyRating(ProID,CB) {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetMyRating";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UserID':'" + ProID + "'}";
    NSR_SDB_MakeRequest(_URL, _data, function (d) {
        if (d != null) {
            if (CB != undefined) CB(ProID, d.Rating, d.ByPeople);
        }
   });
}
function NS_GetProRating(ID,R, P) {
    if (R > 0) {
        $("#NSD_starRating_" + ID).addClass('ratting-' + R).removeClass('ratting-0');
    }
}
function NS_GetIDRating(ID,R, P) {
    if (R > 0) {
        $("#NSD_starRatingID_" + ID).addClass('ratting-' + R).removeClass('ratting-0');
        $("#NSD_lblRatingID_" + ID).text("from " + P + " users");
    }
}
function NS_GotoASAP(e) {
    e.preventDefault();
    if (!NSR_SDB_IsProvider) {
        $.cookie('NSD_Soonest', "1");
        $.cookie('NSD_CurrentUser', NS_SDN_CurrentUser.UserID + ":" + $("#NSD_UName_" + NS_SDN_CurrentUser.UserID).text());
        window.location = NSR_SDB_AppointmentTab;
    }
    else {
        bootbox.alert('Being a provider, you do not have a permission for this.');
    }
}

function NS_OpenUserReview() {
    // lblUserView
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetMyReview";
    var _data = "{'UserID':'" + NS_SDN_CurrentUser.UserID + "'}";
    NSR_SDB_MakeRequest(_URL, _data, function (d) {
        $("#dlgUserReview").setTemplateURL('/DesktopModules/NS_ServiceDashBoard/templates/tmpUserReview.htm?q=' + $.now());
        $("#dlgUserReview").show().processTemplate(d);
    });
    var _title="Past Client Reviews for " + NS_SDN_CurrentUser.FirstName + " " + NS_SDN_CurrentUser.LastName;
    bootbox.dialog({
        message: '<div id="dlgUserReview">Please wait while we are loading information.</div>',
        title: _title
    });
    
    
}