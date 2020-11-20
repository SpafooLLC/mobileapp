var map = "";
var NSD_SourceAddress = "";
var NS_ChoosenProvider = "";
var NSD_MaxMile = 30;
$(document).ready(function () {
    // $("#ddlServices").multiselect();
    NS_GetMaxMile();
    NSD_GetMyPosition();
    NS_GetUserDetail();
    NS_ListServices();
});
function NS_ListServices() {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/ListRootBottomService";
    var _data = "";
    NSR_FP_MakeRequest(_URL, _data, NS_ListServices_SuCB);
}
function NS_ListServices_SuCB(d) {
    var _Final = ""

    $.each(d, function (i, o) {
        if (o.ParentID == -1) {
            if (_Final.trim() == '') {
                _Final = "<option value='-1'>Select Service</option><optgroup label='" + o.ServiceName + "'>";
            }
            else
                _Final += "</optgroup><optgroup label='" + o.ServiceName + "'>";
        }
        else {
            _Final += "<option value='" + o.ServiceID + "'>" + o.ServiceName + "</option>";
        }
    })
    $('#ddlServices').html(_Final).change(function (o) {

        NS_OnServiceSelect(this);
    });
}
function NS_OnServiceSelect(o) {
    var id = $(o).val();
    if (id == -1) return false
    $(".fpbottom").hide();
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/ListProvidersByServices";
    var _data = "{'SIDs':'" + id + "'}";
    NSR_FP_MakeRequest(_URL, _data, NS_ListProvidersByServices_SuCB);
}
function NS_ListProvidersByServices_SuCB(d) {
    deleteMarkers();
    AddMarker(d);
}
function NS_GetUserDetail() {
    if (NS_FP_UID > 1) {
        var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetUser";
        var _data = "{'UID':'" + NS_FP_UID + "'}";
        NSR_FP_MakeRequest(_URL, _data, NS_GetUserDetail_SuCB);
    }
    else {
        PlotAnnoyMap();
    }
}
function NS_GetUserDetail_SuCB(d) {
    NS_ChoosenProvider = d;
    initialize(d.Profile);
}
// Provider map plotting
function initialize(rows) {
    var coords = [];
    var geocoder = new google.maps.Geocoder();
    var address = rows.Street + "," + rows.City + "," + rows.Region;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            coords.push(results[0].geometry.location);
            plotmap(coords, address);
        }
        else {
            PlotAnnoyMap();
        }
    });
}
function plotmap(coords, address) {
    var mapCanvas = document.getElementById('mapcanvas');
    var geocoder = new google.maps.Geocoder();
    $("#mapcanvas").show();
    var _Lati = 0; _longi = 0;
    _Lati = coords[0].lat();
    _longi = coords[0].lng()
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(_Lati, _longi)
    };
    if (map == "") {
        map = new google.maps.Map(document.getElementById('mapcanvas'),
            mapOptions);
    }
}

var markers = [];
function AddMarker(UA) {
    var locations = [];
    //var mapOptions = {
    //    zoom: 6,
    //    center: new google.maps.LatLng(32.7357, -97.1081)
    //};
    //map = new google.maps.Map(document.getElementById('mapcanvas'),
    //    mapOptions);

    $.each(UA, function (i, o) {
        var coords = [];
        var geocoder = new google.maps.Geocoder();
        var address = o.Profile.Street + "," + o.Profile.City + "," + o.Profile.Region + "," + o.Profile.PostalCode + ", USA";
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                // use D I R E C T I O N   S E R V I C E  to calcualte the duration from current position of the user
                var destination = address;
                var p1 = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                //  var p2 = new google.maps.LatLng(46.0438317, 9.75936230000002);
                var service = new google.maps.DistanceMatrixService();
                service.getDistanceMatrix({
                    origins: [NSD_SourceAddress], destinations: [destination], avoidHighways: false, avoidTolls: false,
                    travelMode: google.maps.TravelMode.DRIVING, unitSystem: google.maps.UnitSystem.METRIC
                }, function (response, status) {

                    if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                        try {
                            // if provider is within 50 miles only then show it to the client
                            if (response.rows[0].elements[0].distance.text.split(' ')[0] <= NSD_MaxMile) {
                                var duration = '';
                                if (response.rows[0].elements[0].duration != undefined) {
                                    duration = response.rows[0].elements[0].duration.text;
                                }

                                var _content = '<div class="map-info-window"><div class="mwl"><h3>' + o.DisplayName + '</h3><p>' + duration + " away" + '</p></div><div class="mwr"><a href="#" onclick="ShowProID(' + o.UserID + ')" class="mwm" title="More Information">More<br>Info</a></div></div>';
                                var SingleRow = [_content, results[0].geometry.location.lat(), results[0].geometry.location.lng(), o.UserID];
                                locations.push(SingleRow);
                            }
                        } catch (e) { }
                    }
                    //  else {

                    // var _content = '<div class="map-info-window"><div class="mwl"><h3>' + o.DisplayName + '</h3><p>&nbsp;</p></div><div class="mwr"><a href="#" onclick="ShowProID(' + o.UserID + ')" class="mwm" title="More Information">More<br>Info</a></div></div>';
                    // var SingleRow = [_content, results[0].geometry.location.lat(), results[0].geometry.location.lng(), o.UserID];
                    //  locations.push(SingleRow)
                    //   }
                });
            }
        });
    });
    deleteMarkers();


    var marker, i;
    setTimeout(function () {
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon: 'https://www.spafoo.com/images/MapSpafoo.png'
            });
            var infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                    var ID = locations[i][3];
                    if (ID != -1) {
                        ShowUserInfo(ID);
                    }
                }
            })(marker, i));
            markers.push(marker);
        }
        var bounds = new google.maps.LatLngBounds();
        for (i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }
        //center the map to the geometric center of all markers
        map.setCenter(bounds.getCenter());
        map.fitBounds(bounds);
        map.setZoom(map.getZoom() - 1);
        if (locations.length == 0) { bootbox.alert('Provider not found nearby.'); }
    }, 500);
}
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}
// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
function ShowProID(id) {
    $.cookie('NSProID', id);
    window.open(NSR_FP_DashboardTab, '_blank');
}
function ShowUserInfo(id) {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetUser";
    var _data = "{'UID':'" + id + "'}";
    NSR_FP_MakeRequest(_URL, _data, ShowUserInfo_SuCB);
}
function ShowUserInfo_SuCB(d) {
    NS_ChoosenProvider = d;
    $(".fpbottom").show();
    $("#lblUserName").text(d.LastName + ' ' + NS_IntialLetter(d.FirstName));
    $("#imgUser").attr('src', d.Profile.PhotoURL);
    GetUserTagLine(d.UserID);
}
function GetUserTagLine(ID) {
    var _URL = "/DesktopModules/NS_UserProfile/rh.asmx/GetProTagLine";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + ID + "'}";
    $("#lblUserTagLine").show().text("Loading...");
    NSR_FP_MakeRequest(_URL, _data, function (d) {
        d = NS_ParseString(d);
        $("#lblUserTagLine").text(d);
    });
}
function PlotAnnoyMap() {
    var mapCanvas = document.getElementById('mapcanvas');
    var geocoder = new google.maps.Geocoder(); $("#mapcanvas").show();
    var _Lati = 30.9843; _longi = -91.9623; // Lati and Longi for Louisiana, USA
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(_Lati, _longi)
    };
    map = new google.maps.Map(document.getElementById('mapcanvas'),
        mapOptions);
    //google.maps.event.addDomListener(window, 'load', initialize);
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
    }, function (positionError) {
        //$("#error").text("Error: " + positionError.message);
    },
    {
        enableHighAccuracy: true,
        timeout: 10 * 1000 // 10 seconds
    });
}

function NSR_FP_MakeRequest(WBurl, WBData, SuccessCB, FailedCB, vAsync) {
    var pAsync = true;
    if (vAsync != undefined) { pAsync = vAsync; }
    $.ajax({
        type: "POST", dataType: "json", contentType: "application/json; charset=utf-8", url: WBurl, async: pAsync, data: WBData,
        success: function (data, resp) {
            if (SuccessCB != undefined) { SuccessCB(data.d, resp); }
        },
        error: function (a, b) { if (FailedCB != undefined) { FailedCB(a, b); } }
    });
}

function NSR_sendFile(file, fileCtrl) {
    var formData = new FormData();
    formData.append('file', $(fileCtrl)[0].files[0]);
    $(fileCtrl).after('<div class="NSR_UplNotify" style="font-weight:bold">Uploading...</div>')
    $.ajax({
        type: 'post', data: formData, processData: false, contentType: false,
        url: '/DesktopModules/NS_UserProfile/Scripts/jquery-uploadify/Handler.ashx',
        success: function (status) {
            if (status != 'error') {
                $(fileCtrl).attr('uploadedFile', NSR_SEID + "/" + $(fileCtrl)[0].files[0].name.replace(/ /g, '~'));
                $(".NSR_UplNotify").hide();
                bootbox.alert('File uplaoded successfully');
            }
        },
        error: function () {
            bootbox.alert("Whoops something went wrong!");
        }
    });
}
function NS_GotoMakeAppointment() {
    $.cookie('NSD_CurrentUser', NS_ChoosenProvider.UserID + ":" + NS_ChoosenProvider.DisplayName);
    window.location = NSR_FP_AppointmentTab;
}
function NS_GotoASAP() {
    $.cookie('NSD_Soonest', "1");
    $.cookie('NSD_CurrentUser', NS_ChoosenProvider.UserID + ":" + NS_ChoosenProvider.DisplayName);
    window.location = NSR_FP_AppointmentTab;
}
function NS_GetMaxMile() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetWithInMile"
    NS_MakeRequest(_URL, _data, function (d) {
        NSD_MaxMile = d;
    }, undefined, false);
}