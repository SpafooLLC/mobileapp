function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}
function NS_ParseString(v) {
    return unescape(htmlDecode(htmlEncode(v)));
}
function NS_IntialLetter(s) {
    return s.charAt(0) + ".";
}
function calcDistance(p1, p2) {
    return ((google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000)*0.621).toFixed(0);
}
function NS_AddNotification(ByID, ToID, NotiTypeID, RelatedEntityID,SuCB) {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/AddNotification";
    var _data = "{'ByID':'" + ByID + "','ToID':'" + ToID + "','NotTypeID':'" + NotiTypeID + "','RelatedEntityID':'" + RelatedEntityID + "'}";
    NS_MakeRequest(_URL, _data, SuCB);
}

function NS_MakeRequest(WBurl, WBData, SuccessCB, FailedCB, vAsync) {
    var pAsync = true;
    if (vAsync != undefined) { pAsync = vAsync; }
    $.ajax({
        type: "POST", dataType: "json", contentType: "application/json; charset=utf-8",
        url: WBurl, async: pAsync, data: WBData,
        success: function (data, resp) {
            if (SuccessCB != undefined) { SuccessCB(data.d, resp); }
        },
        error: function (a, b) { if (FailedCB != undefined) { FailedCB(a, b); } }
    });
}

function NS_ToZeroDec(d)
{
return "$"+d.toFixed(2)
}