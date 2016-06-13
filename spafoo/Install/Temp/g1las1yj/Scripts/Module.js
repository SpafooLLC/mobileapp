var map = "";
var NSD_SourceAddress = "";
var NS_ChoosenProvider = "";
$(document).ready(function () {
   // $("#ddlServices").multiselect();
    NSD_GetMyPosition();
    NS_GetUserDetail();
    NS_ListServices();
});
function NS_ListServices()
{
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
    if (id==-1) return false
    $(".fpbottom").hide();
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/ListProvidersByServices";
    var _data = "{'SID':'" + id + "'}";
    NSR_FP_MakeRequest(_URL, _data, NS_ListProvidersByServices_SuCB);
}
function NS_ListProvidersByServices_SuCB(d) {
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
    });
}
function plotmap(coords, address) {
   var mapCanvas = document.getElementById('mapcanvas');
    var geocoder = new google.maps.Geocoder(); $("#mapcanvas").show();
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
var locations = [];
function AddMarker(UA) {
    var mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(32.7357, -97.1081)
    };
    map = new google.maps.Map(document.getElementById('mapcanvas'),
        mapOptions);

    $.each(UA, function (i, o) {
        var coords = [];
        var geocoder = new google.maps.Geocoder();
        var address = o.Profile.Street + "," + o.Profile.City + "," + o.Profile.Region;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                // use D I R E C T I O N   S E R V I C E  to calcualte the duration from current position of the user
                    var destination = address;
                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix({
                        origins: [NSD_SourceAddress],destinations: [destination],avoidHighways: false,avoidTolls: false,
                        travelMode: google.maps.TravelMode.DRIVING,unitSystem: google.maps.UnitSystem.METRIC
                   }, function (response, status) {
                        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                            try {
                                var duration = response.rows[0].elements[0].duration.text;
                                var _content = '<div>' + o.DisplayName + '<br/>' + duration + " away" + '</div>';
                                var SingleRow = [_content, results[0].geometry.location.lat(), results[0].geometry.location.lng(), o.UserID];
                                locations.push(SingleRow)
                            } catch (e) {}
                        }
                    });
            }
        });
    });
    var marker, i;
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });
        
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                var infowindow = new google.maps.InfoWindow({
                    content: locations[i][0]
                });
                ShowUserInfo(locations[i][3]);
               // infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}
function ShowUserInfo(id) {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetUser";
    var _data = "{'UID':'" + id + "'}";
    NSR_FP_MakeRequest(_URL, _data, ShowUserInfo_SuCB);

}
function ShowUserInfo_SuCB(d) {
    NS_ChoosenProvider = d;
    $(".fpbottom").show();
    $("#lblUserName").text(d.DisplayName);
    $("#imgUser").attr('src', d.Profile.PhotoURL);
}
function PlotAnnoyMap() {
    var mapCanvas = document.getElementById('mapcanvas');
    var geocoder = new google.maps.Geocoder(); $("#mapcanvas").show();
    var _Lati = 32.7357; _longi = -97.1081; // Lati and Longi for USA
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(_Lati, _longi)
    };
    var map = new google.maps.Map(document.getElementById('mapcanvas'),
        mapOptions);
    google.maps.event.addDomListener(window, 'load', initialize);
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