/*
NS_MakeRequest : WBurl, WBData, SuccessCB, FailedCB, vAsync
*/

$(document).ready(function () {
    if ($("#dvServicePL").length > 0) {
        // if price list is rendered
        NS_LoadPriceList();
    }
    if ($("#NS_dvStatReport").length > 0) {
        var date = new Date();
        date.setMonth(date.getMonth(), 1);
        // if Statistical Report is rendered
        $("#NS_txtFrom").datepicker({
            dateFormat: "mm/dd/yy",
            onSelect: function (s) {
               // $("#NS_txtTo").datepicker("option", "minDate", s)
            }
        });
        $("#NS_txtFrom").datepicker('setDate', date);
        $("#NS_txtTo").datepicker({
            dateFormat: "mm/dd/yy",
            onSelect: function (s) {
               // $("#NS_txtFrom").datepicker("option", "maxDate", s)
            }
        });
        date.setMonth(date.getMonth()+1, 0);
        $("#NS_txtTo").datepicker('setDate', date);
        // Load report for current Month Range
        NS_LoadReportByService();
    }
});

function NS_LoadPriceList() {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetServicesIn"
    var _data = "{'SID':'" + -1 + "'}";
    NS_MakeRequest(_URL, _data, NS_BindPrices);
}

var _HeaderHTML = "<div class='col-md-4'><div class='plist'>";
var _EndHTML = "</table></div></div>";
var _HTML = _HeaderHTML;
function NS_BindPrices(d) {
    //var _ParentTemp = 0; debugger;
   // NS_ReadPriceData(d);
    $("#dvServicePL").setTemplateURL('/DesktopModules/NS_PriceList/Template/prcList.htm');
    $("#dvServicePL").processTemplate(d);
}
function NS_ReadPriceData(d) {
    var LocalHTML = "";
    for (var i = 0; i < d.length; i++) {
        var o = d[i];
        if (o.ParentID == -1) {
            if (i == 0)
                _HTML += "<h3>" + o.ServiceName + "</h3><table><tr>";
            else
                _HTML += (_EndHTML + _HeaderHTML + "<h3>" + o.ServiceName + "</h3><table><tr>");
            if (o.Children.length > 0)
                _HTML+= NS_ReadPriceData(o.Children);
        }
        else {
            if (o.Children.length == 0)
                _HTML += '<td>' + o.ServiceName + '</td><td class="price"> from $' + o.Price + '</td></tr>';
            else {
                _HTML += NS_ReadPriceData(o.Children);
            }
        }
    }
    return _HTML;
}

function NS_LoadReportByService() {
    var _URL = "/DesktopModules/NS_PriceList/rh.asmx/ReportByService"
    var _data = "{'F':'" + $("#NS_txtFrom").val() + "','T':'" + $("#NS_txtTo").val() + "'}";
    $("#NS_dvReports").html('<p style="color:blue;">Please wait, while we are processing.</p>');
    NS_MakeRequest(_URL, _data, NS_BindReport);
}
function NS_LoadReportByPro() {
    var _URL = "/DesktopModules/NS_PriceList/rh.asmx/ReportByProvider"
    var _data = "{'F':'" + $("#NS_txtFrom").val() + "','T':'" + $("#NS_txtTo").val() + "'}";
    $("#NS_dvReports").html('<p style="color:blue;">Please wait, while we are processing.</p>');
    NS_MakeRequest(_URL, _data, NS_BindReport);
}

function NS_BindReport(d) {
    $("#NS_dvReports").setTemplateURL('/DesktopModules/NS_PriceList/Template/rptList.htm?d='+$.now());
    if (d.length > 0) {
        $("#NS_dvReports").processTemplate(d);
    }
    else {
        $("#NS_dvReports").html('<p style="color:red;">Sorry, could not found anything for the given criteria.</p>');
    }
}
function NS_LoadReport() {
    if ($("#rdbByService").is(":checked")) {
        NS_LoadReportByService();
    }
    else {
        NS_LoadReportByPro();
    }
}