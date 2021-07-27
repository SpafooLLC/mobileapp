function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value){
    return $('<div/>').html(value).text();
}
function NS_ParseString(v) {
   return unescape(htmlDecode(htmlEncode(v)));
}
function NS_OpenImage(o){
var src = $(o).attr("src");
    window.open(
        'https://www.spafoo.com/' + src, //change this to your relative path + src
        '_blank' // <- This is what makes it open in a new window.
    );
}
function NS_ParseHTML(v) {
    var s='<div>'+v+'</div>';
    return $('<div/>').html(unescape(v));
}
function NS_IntialLetter(s) {
    if (s!=null)
	return s.charAt(0) + ".";
    else
	return '';
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
           //try{ bootbox.hideAll();}catch(e){}
            if (SuccessCB != undefined) { SuccessCB(data.d, resp); }
        },
        error: function (a, b) { if (FailedCB != undefined) { FailedCB(a, b); } }
    });
}
function NS_MakeRequestP(WBurl, WBData, SuccessCB, FailedCB, vAsync) {
    var pAsync = true;
    if (vAsync != undefined) { pAsync = vAsync; }
    $.ajax({
        type: "POST", dataType: "json", contentType: "application/json; charset=utf-8",
        url: WBurl, async: pAsync, data: WBData, crossDomain: true,
        success: function (data, resp) {
            try { bootbox.hideAll(); } catch (e) { }
            if (SuccessCB != undefined) { SuccessCB(data.d, resp); }
        },
        error: function (a, b) { if (FailedCB != undefined) { FailedCB(a, b); } }
    });
}
function NS_FormatDate(d, f) {
    var SCB_Date = new Date(d);
    return $.datepicker.formatDate(f, SCB_Date);
}
function NS_FormatJSONDate(d, f) {
    debugger;
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
function NS_ToZeroDec(d)
{
return "$"+d.toFixed(2)
}
var NS_Waiting = "<img src='/images/dnnanim.gif' />";

function textCounter(field, field2, maxlimit) {
	var countfield = document.getElementById(field2);
	if (field.value.length > maxlimit) {
		field.value = field.value.substring(0, maxlimit);
		return false;
	} else {
		$("#" + field2).text('Remaining characters : ' + (maxlimit - field.value.length));
	}
}

function BindRegions(ddlID,SelectByVal,SelectByText) {
    var _URL = "/DesktopModules/NS_UserProfile/rh.asmx/GetRegions";
    NS_MakeRequest(_URL, "", function (d) {
        $.each(d, function (key, o) {
            $("#" + ddlID).append($("<option></option>").attr("value", o.Value).text(o.Text));
        });
        if (SelectByVal != undefined) {
            $("#" + ddlID).val(SelectByVal);
        }
        if (SelectByText != undefined) {
            var valofText = $("#"+ddlID + " option").filter(function () {
                return this.text == SelectByText
            }).val();
            $("#" + ddlID).val(valofText);
        }
    });
}
function NS_ParseDateStr(H,M){
	var hour = H;
    var minute = parseInt(M);
	var _rVal = "";
	if (hour > 12) {
	    hour = (hour - 12);
	    _rVal = "" + (hour) + ":" + ((minute < 10) ? "0" + minute : ((minute == 0) ? "00" : minute)) + " PM";
	} else {
	    if (hour == 12) {
	        _rVal = "" + 12 + ":" + ((minute < 10) ? "0" + minute : ((minute == 0) ? "00" : minute)) + " PM";
	    }
	    if (hour < 12) {
	        _rVal = "" + hour + ":" + ((minute < 10) ? "0" + minute : ((minute == 0) ? "00" : minute)) + " AM";
	    }
	}
	return _rVal;
}
function getLocaleShortDateString(d) {
    var f = { "ar-SA": "dd/MM/yy", "bg-BG": "dd.M.yyyy", "ca-ES": "dd/MM/yyyy", "zh-TW": "yyyy/M/d", "cs-CZ": "d.M.yyyy", "da-DK": "dd-MM-yyyy", "de-DE": "dd.MM.yyyy", "el-GR": "d/M/yyyy", "en-US": "M/d/yyyy", "fi-FI": "d.M.yyyy", "fr-FR": "dd/MM/yyyy", "he-IL": "dd/MM/yyyy", "hu-HU": "yyyy. MM. dd.", "is-IS": "d.M.yyyy", "it-IT": "dd/MM/yyyy", "ja-JP": "yyyy/MM/dd", "ko-KR": "yyyy-MM-dd", "nl-NL": "d-M-yyyy", "nb-NO": "dd.MM.yyyy", "pl-PL": "yyyy-MM-dd", "pt-BR": "d/M/yyyy", "ro-RO": "dd.MM.yyyy", "ru-RU": "dd.MM.yyyy", "hr-HR": "d.M.yyyy", "sk-SK": "d. M. yyyy", "sq-AL": "yyyy-MM-dd", "sv-SE": "yyyy-MM-dd", "th-TH": "d/M/yyyy", "tr-TR": "dd.MM.yyyy", "ur-PK": "dd/MM/yyyy", "id-ID": "dd/MM/yyyy", "uk-UA": "dd.MM.yyyy", "be-BY": "dd.MM.yyyy", "sl-SI": "d.M.yyyy", "et-EE": "d.MM.yyyy", "lv-LV": "yyyy.MM.dd.", "lt-LT": "yyyy.MM.dd", "fa-IR": "MM/dd/yyyy", "vi-VN": "dd/MM/yyyy", "hy-AM": "dd.MM.yyyy", "az-Latn-AZ": "dd.MM.yyyy", "eu-ES": "yyyy/MM/dd", "mk-MK": "dd.MM.yyyy", "af-ZA": "yyyy/MM/dd", "ka-GE": "dd.MM.yyyy", "fo-FO": "dd-MM-yyyy", "hi-IN": "dd-MM-yyyy", "ms-MY": "dd/MM/yyyy", "kk-KZ": "dd.MM.yyyy", "ky-KG": "dd.MM.yy", "sw-KE": "M/d/yyyy", "uz-Latn-UZ": "dd/MM yyyy", "tt-RU": "dd.MM.yyyy", "pa-IN": "dd-MM-yy", "gu-IN": "dd-MM-yy", "ta-IN": "dd-MM-yyyy", "te-IN": "dd-MM-yy", "kn-IN": "dd-MM-yy", "mr-IN": "dd-MM-yyyy", "sa-IN": "dd-MM-yyyy", "mn-MN": "yy.MM.dd", "gl-ES": "dd/MM/yy", "kok-IN": "dd-MM-yyyy", "syr-SY": "dd/MM/yyyy", "dv-MV": "dd/MM/yy", "ar-IQ": "dd/MM/yyyy", "zh-CN": "yyyy/M/d", "de-CH": "dd.MM.yyyy", "en-GB": "dd/MM/yyyy", "es-MX": "dd/MM/yyyy", "fr-BE": "d/MM/yyyy", "it-CH": "dd.MM.yyyy", "nl-BE": "d/MM/yyyy", "nn-NO": "dd.MM.yyyy", "pt-PT": "dd-MM-yyyy", "sr-Latn-CS": "d.M.yyyy", "sv-FI": "d.M.yyyy", "az-Cyrl-AZ": "dd.MM.yyyy", "ms-BN": "dd/MM/yyyy", "uz-Cyrl-UZ": "dd.MM.yyyy", "ar-EG": "dd/MM/yyyy", "zh-HK": "d/M/yyyy", "de-AT": "dd.MM.yyyy", "en-AU": "d/MM/yyyy", "es-ES": "dd/MM/yyyy", "fr-CA": "yyyy-MM-dd", "sr-Cyrl-CS": "d.M.yyyy", "ar-LY": "dd/MM/yyyy", "zh-SG": "d/M/yyyy", "de-LU": "dd.MM.yyyy", "en-CA": "dd/MM/yyyy", "es-GT": "dd/MM/yyyy", "fr-CH": "dd.MM.yyyy", "ar-DZ": "dd-MM-yyyy", "zh-MO": "d/M/yyyy", "de-LI": "dd.MM.yyyy", "en-NZ": "d/MM/yyyy", "es-CR": "dd/MM/yyyy", "fr-LU": "dd/MM/yyyy", "ar-MA": "dd-MM-yyyy", "en-IE": "dd/MM/yyyy", "es-PA": "MM/dd/yyyy", "fr-MC": "dd/MM/yyyy", "ar-TN": "dd-MM-yyyy", "en-ZA": "yyyy/MM/dd", "es-DO": "dd/MM/yyyy", "ar-OM": "dd/MM/yyyy", "en-JM": "dd/MM/yyyy", "es-VE": "dd/MM/yyyy", "ar-YE": "dd/MM/yyyy", "en-029": "MM/dd/yyyy", "es-CO": "dd/MM/yyyy", "ar-SY": "dd/MM/yyyy", "en-BZ": "dd/MM/yyyy", "es-PE": "dd/MM/yyyy", "ar-JO": "dd/MM/yyyy", "en-TT": "dd/MM/yyyy", "es-AR": "dd/MM/yyyy", "ar-LB": "dd/MM/yyyy", "en-ZW": "M/d/yyyy", "es-EC": "dd/MM/yyyy", "ar-KW": "dd/MM/yyyy", "en-PH": "M/d/yyyy", "es-CL": "dd-MM-yyyy", "ar-AE": "dd/MM/yyyy", "es-UY": "dd/MM/yyyy", "ar-BH": "dd/MM/yyyy", "es-PY": "dd/MM/yyyy", "ar-QA": "dd/MM/yyyy", "es-BO": "dd/MM/yyyy", "es-SV": "dd/MM/yyyy", "es-HN": "dd/MM/yyyy", "es-NI": "dd/MM/yyyy", "es-PR": "dd/MM/yyyy", "am-ET": "d/M/yyyy", "tzm-Latn-DZ": "dd-MM-yyyy", "iu-Latn-CA": "d/MM/yyyy", "sma-NO": "dd.MM.yyyy", "mn-Mong-CN": "yyyy/M/d", "gd-GB": "dd/MM/yyyy", "en-MY": "d/M/yyyy", "prs-AF": "dd/MM/yy", "bn-BD": "dd-MM-yy", "wo-SN": "dd/MM/yyyy", "rw-RW": "M/d/yyyy", "qut-GT": "dd/MM/yyyy", "sah-RU": "MM.dd.yyyy", "gsw-FR": "dd/MM/yyyy", "co-FR": "dd/MM/yyyy", "oc-FR": "dd/MM/yyyy", "mi-NZ": "dd/MM/yyyy", "ga-IE": "dd/MM/yyyy", "se-SE": "yyyy-MM-dd", "br-FR": "dd/MM/yyyy", "smn-FI": "d.M.yyyy", "moh-CA": "M/d/yyyy", "arn-CL": "dd-MM-yyyy", "ii-CN": "yyyy/M/d", "dsb-DE": "d. M. yyyy", "ig-NG": "d/M/yyyy", "kl-GL": "dd-MM-yyyy", "lb-LU": "dd/MM/yyyy", "ba-RU": "dd.MM.yy", "nso-ZA": "yyyy/MM/dd", "quz-BO": "dd/MM/yyyy", "yo-NG": "d/M/yyyy", "ha-Latn-NG": "d/M/yyyy", "fil-PH": "M/d/yyyy", "ps-AF": "dd/MM/yy", "fy-NL": "d-M-yyyy", "ne-NP": "M/d/yyyy", "se-NO": "dd.MM.yyyy", "iu-Cans-CA": "d/M/yyyy", "sr-Latn-RS": "d.M.yyyy", "si-LK": "yyyy-MM-dd", "sr-Cyrl-RS": "d.M.yyyy", "lo-LA": "dd/MM/yyyy", "km-KH": "yyyy-MM-dd", "cy-GB": "dd/MM/yyyy", "bo-CN": "yyyy/M/d", "sms-FI": "d.M.yyyy", "as-IN": "dd-MM-yyyy", "ml-IN": "dd-MM-yy", "en-IN": "dd-MM-yyyy", "or-IN": "dd-MM-yy", "bn-IN": "dd-MM-yy", "tk-TM": "dd.MM.yy", "bs-Latn-BA": "d.M.yyyy", "mt-MT": "dd/MM/yyyy", "sr-Cyrl-ME": "d.M.yyyy", "se-FI": "d.M.yyyy", "zu-ZA": "yyyy/MM/dd", "xh-ZA": "yyyy/MM/dd", "tn-ZA": "yyyy/MM/dd", "hsb-DE": "d. M. yyyy", "bs-Cyrl-BA": "d.M.yyyy", "tg-Cyrl-TJ": "dd.MM.yy", "sr-Latn-BA": "d.M.yyyy", "smj-NO": "dd.MM.yyyy", "rm-CH": "dd/MM/yyyy", "smj-SE": "yyyy-MM-dd", "quz-EC": "dd/MM/yyyy", "quz-PE": "dd/MM/yyyy", "hr-BA": "d.M.yyyy.", "sr-Latn-ME": "d.M.yyyy", "sma-SE": "yyyy-MM-dd", "en-SG": "d/M/yyyy", "ug-CN": "yyyy-M-d", "sr-Cyrl-BA": "d.M.yyyy", "es-US": "M/d/yyyy" };

    var l = navigator.language ? navigator.language : navigator['userLanguage'], y = d.getFullYear(), m = (((d.getMonth() + 1) < 10) ? '0' : '') + (d.getMonth() + 1), d = (((d.getDate()) < 10) ? '0' : '') + d.getDate();
    f = (l in f) ? f[l] : "MM/dd/yyyy";
    function z(s) { s = '' + s; return s.length > 1 ? s : '0' + s; }
    f = f.replace(/yyyy/, y); f = f.replace(/yy/, String(y).substr(2));
    f = f.replace(/MM/, z(m)); f = f.replace(/M/, m);
    f = f.replace(/dd/, z(d)); f = f.replace(/d/, d);
    return f;
}
function GetInAmPm(value) {
    var hour = value.getHours();
    var minute = value.getMinutes();
    var _rVal = "";
   if (hour > 12) {
        hour = (hour - 12);
        _rVal = "" + (hour) + ":" + (minute < 10 ? "0" + minute : minute) + " PM";
    } else {
        if (hour == 12) {
            _rVal = "" + 12 + ":" + (minute < 10 ? "0" + minute : minute) + " PM";
        }
        if (hour==0) {
            _rVal = "" + 12 + ":" + (minute < 10 ? "0" + minute : minute) + " AM";
        }
        else if (hour<12) {
            _rVal = "" + hour + ":" + (minute < 10 ? "0" + minute : minute) + " AM";
        }
    }
    return _rVal;
}
function ApplyAmPm(value) {
    if ((value.indexOf('am') == -1) && (value.indexOf('pm') == -1) && (value.indexOf('PM') == -1) && (value.indexOf('AM') == -1)) {
        var H = value.split(":")[0];
        var M = value.split(":")[1];
        if (M == "00") { M = "0";}
        return NS_ParseDateStr(H, M);
    }
    else 
    { return value;}
}

function NS_ShowInProcess() {
    bootbox.dialog({
        closeButton: false,title: "Processing...",
        message: "Please wait while we are processing..." + NS_Waiting,
        buttons: null
    });
}
function isEmailValid(e) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(e);
};
var loadingTimeout;
$(document).ajaxStart(function () {
   // loadingTimeout = setTimeout(function () {
    //    NS_ShowInProcess();
   // }, 3000);
})
$(document).ajaxStop(function () {
  //  clearTimeout(loadingTimeout);
});
