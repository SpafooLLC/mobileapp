var RPP = 20;
var CP = 1;
var CN = 'Clients';
var NS_httpAlias = 'https://www.spafoo.com';
$(document).ready(function () {
    NS_LoadUsers('Clients');
});

function NS_LoadUsers(RN, o) {
    var objDIV = '';
    if (o == undefined) {
        objDIV = $("#NS_dvUserList");
    }
    else {
        objDIV = $("#NS_dvUserList .newContent:last-child").last();
    }
    if (CN != RN) { CP = 1;}
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetUsersInRole";
    var _data = "{'RN':'" + RN + "','CP':'" + (CP) + "','RPP':'" + RPP + "'}";
    CN = RN;
    $(objDIV).text('Please wait while we are retrieving data...');
    NS_MakeRequest(_URL, _data,
        function (d) {
            if (d.length > 0) {
                $(objDIV).setTemplateURL('/DesktopModules/NS_Admin/temp/tmpUserList.htm?q=' + $.now());
                $(objDIV).setParam("CP", CP);
                $(objDIV).show().processTemplate(d);
                CP++;
            }
            else {
                $(objDIV).text('Thats it, no more data found.');
            }
        });
}

function NS_ExportList() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/WriteExcel";
    var _data = "{'RN':'" + CN + "'}";
    NS_MakeRequest(_URL, _data,
        function (d) {
            window.open(NS_httpAlias + "/images/userlist_" + CN + ".xls");
        });
}