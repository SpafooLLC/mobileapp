/*
    Script to handle all the ManageService.ascx related user control features
     NSR_SDB_MakeRequest(WBurl,WBData,SuccessCB,FailedCB);
*/
var NS_SDB_CurrentServiceID = -1;
var NS_SDB_CParentID = -1;
var NS_SDB_SaveStatus = -1;
// On Document Ready
    $(document).ready(function () {
        NS_LoadServices(-1);
        NS_GetSelectedNodeInfo();
    });

    function NS_LoadServices(SID) {
        var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetServicesIn"
        var _data = "{'SID':'" + SID + "'}";
        NSR_SDB_MakeRequest(_URL, _data, NS_LoadServices_SuCB);
    }

    function NS_LoadServices_SuCB(d){
        $("#dvServiceTree").setTemplateURL('/DesktopModules/NS_ServiceDashBoard/templates/tmpServiceTree.htm');
        $("#dvServiceTree").processTemplate(d);
    }

    function NS_OnNodeClick(o, e) {
        e.preventDefault();
        NS_SDB_CurrentServiceID = o.parentNode.id.split('_')[2];
        NS_SDB_CParentID=o.parentNode.id.split('_')[3];
        $("#NS_SDB_AddNewWithin").val('Add new Service for ' + o.text).show().attr("SID", NS_SDB_CurrentServiceID).attr('pid', NS_SDB_CParentID);
        $(o).parent().toggleClass('active');
        $(o).parent().children('ul').slideToggle('fast');
        NS_GetSelectedNodeInfo();
        return false;
    }

    function NS_GetSelectedNodeInfo() {
        var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetService"
        var _data = "{'SID':'" + NS_SDB_CurrentServiceID + "'}";
        NSR_SDB_MakeRequest(_URL, _data, NS_ShowServiceInfo_SuCB);
    }

    function NS_ShowServiceInfo_SuCB(d) {
        $("#NS_dvServiceInfo").setTemplateURL('/DesktopModules/NS_ServiceDashBoard/templates/tmpManageService.htm?q='+$.now());
        $("#NS_dvServiceInfo").show().processTemplate(d);
        $(".NSR_FileControl").on('change', function () {
            var file;
            if ((file = this.files[0])) {
                NSR_SDB_sendFile(file, this,NS_SDB_OnFileUpload);
            }
        });
    }
    function NS_SDB_OnFileUpload(f) {
        $("#NS_SDB_upldImage").attr('src', '/Images/NS_ServiceDB/' + f);
    }
    function NS_ServiceOnError(o) {
        $(o).attr('src', '/DesktopModules/NS_ServiceDashBoard/imgs/NA.jpg');
    }
    function NS_AddUpdateService(e) {
        e.preventDefault();
        var Pre = "#NS_SDB_";
        var _SN = $(Pre + "txtServiceName").val().trim();
        if (_SN == '') {
            bootbox.alert('Service name is a required field, please provide it');
            $(Pre + "txtServiceName").focus();
            return false;
        }
        var _SD = $(Pre + "txtShortDesc").val().trim();
        var _Img = "";
        if ($(Pre + "File").attr("uploadedFile") != undefined) {
            _Img = $(Pre + "File").attr("uploadedFile");
        }
        var _Price = $(Pre + "txtPrice").val().trim();
        var _Duration = $(Pre + "txtDuration").val().trim();
        if (_Price == '') { _Price = 0; }
        if (_Duration == '') { _Duration = 0; }
        var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/AddService";
        //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
        var _data = "{'SID':'" + NS_SDB_CurrentServiceID + "','SN':'" + _SN + "','SD':'" + _SD + "','Image':'" + _Img + "','PID':'" + NS_SDB_CParentID + "','Price':'" + _Price + "','Duration':'" + _Duration + "'}";
        NSR_SDB_MakeRequest(_URL, _data, NS_OnServiceAdded_SuCB);
    }

    function NS_OnServiceAdded_SuCB(d) {
        NS_ClearForm();
        NS_LoadServices(-1);
        bootbox.alert('The provided information has been updated successfully');
    }

    function NS_RemoveService(e) {
        e.preventDefault();
        var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/RemoveService";
        var _data = "{'SID':'" + NS_SDB_CurrentServiceID + "'}";
        bootbox.confirm('Are you sure to remove this information ?', function (r) {
            if (r) {
                NSR_SDB_MakeRequest(_URL, _data, function (d) {
                    bootbox.alert("Service removed successfully", function (d) {
                        NS_LoadServices(-1);
                        $("#NS_dvServiceInfo").hide();
                        $("#NS_SDB_AddNewWithin").hide();
                    });
                });
            }
        })
    }
    function NS_ClearForm(IsAtTop) {
        $("#NS_dvServiceInfo").show();
        if (IsAtTop == true) {
            NS_SDB_CurrentServiceID = -1; NS_SDB_CParentID = -1;
        }
        else if (IsAtTop == false) {
            NS_SDB_CurrentServiceID = -1;
            NS_SDB_CParentID = $("#NS_SDB_AddNewWithin").attr("sid");
        }
        var Pre = "#NS_SDB_";
        $(Pre + "File").removeAttr("uploadedFile");
        $(Pre + "upldImage").attr('src', '/DesktopModules/NS_ServiceDashBoard/imgs/NA.jpg');
        $('#dvServiceOuterHandle input[type="text"]').val('');
    }