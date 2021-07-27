<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Netsam.Modules.NS_PriceList.View" %>
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<link href="/DesktopModules/NS_Registration/bootstrap.css" rel="stylesheet" />
<asp:Panel ID="pnlPricing" runat="server" Visible="true">
<div id="dvServicePL"></div>
</asp:Panel>
<asp:Panel ID="pnlStatisticalReport" runat="server" Visible="false">
    <div id="NS_dvStatReport">
        <div id="NS_dvSTRContent">
            <div id="NS_dvFilter" style="width: 100%; text-align:center;">
                <div id="NS_dvFiltetLeft">
                    <input type="radio" id="rdbByService" name="rdbReportBy" value="Service" checked="checked" onclick="NS_LoadReportByService();" />
                    <label for="rdbByService">By Service</label>&nbsp;&nbsp;
                     <input type="radio" id="rdbByProvider" name="rdbReportBy" value="Service" onclick="NS_LoadReportByPro();" />
                    <label for="rdbByProvider">By Provider</label>
                </div>
                <div id="NS_dvFiltetRight" style="padding-top:20px; clear:both; display:block; text-align:center;">
                    <table border="0" cellpadding="5" cellspacing="5" align="center">
                    <tr>
                      <td><input type="text" id="NS_txtFrom" class="form-control" style="width:100px;" /></td>
                      <td><input type="text" id="NS_txtTo" class="form-control" style="width:100px; margin-left:10px;" /></td>
                      <td><input type="button" id="NS_btnFilter" onclick="NS_LoadReport(); return false;" value="Filter" class="blue-btn-sm" style="margin-top:-10px; border:0; " /></td>
                      <td>
                      <input id="NS_btnDownload" onclick="NS_GetXLByProNSrvc(); return false;" value="Download XLS" class="blue-btn-sm" style="margin-top:-10px; border:0; " type="button" />
                      </td>
                    </tr>
                  </table>  
              </div>
            </div>
            <div id="NS_dvReports" style="clear: both;width:100%;min-height:300px; padding-top:30px;"></div>
        </div>
    </div>
</asp:Panel>
<script src="/DesktopModules/NS_PriceList/script/Module.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-jtemplates/jquery-jtemplates.js"></script>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/bootbox.min.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/NS_Common.js"></script>