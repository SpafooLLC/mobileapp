<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Netsam.Modules.NS_PriceList.View" %>
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<link href="/DesktopModules/NS_Registration/bootstrap.css" rel="stylesheet" />
<asp:Panel ID="pnlPricing" runat="server" Visible="true">
<div id="dvServicePL"></div>
</asp:Panel>
<asp:Panel ID="pnlStatisticalReport" runat="server" Visible="false" style="width: 100%; background-color: white;padding:10px;">
    <div id="NS_dvStatReport" style="width: 98%;padding:10px;">
        <div id="NS_dvSTRContent" style="width: 98%;border:solid 1px;padding:10px">
            <div id="NS_dvFilter" style="width: 100%;border-bottom:solid 1px #ccc;height:50px;">
                <div id="NS_dvFiltetLeft" style="width: auto; float: left;margin-right: 20px;line-height:30px;padding-top:10px;">
                    <input type="radio" id="rdbByService" name="rdbReportBy" value="Service" checked="checked" onclick="NS_LoadReportByService();" />
                    <label for="rdbByService">By Service</label>
                    &nbsp;
                     &nbsp;
                     <input type="radio" id="rdbByProvider" name="rdbReportBy" value="Service" onclick="NS_LoadReportByPro();" />
                    <label for="rdbByProvider">By Provider</label>
                </div>
                <div id="NS_dvFiltetRight" style="width: 60%; float: left; padding-top: 10px;">
                    <input type="text" id="NS_txtFrom" class="NSR_Date" style="font-size:16px;width:90px;"/>
                    &nbsp;
                     <input type="text" id="NS_txtTo" class="NSR_Date" style="font-size:16px;width:90px;"/>
                    &nbsp;
                     &nbsp;
                     <input type="button" id="NS_btnFilter" onclick="NS_LoadReport(); return false;" value="Filter" class="btn submit form-button btn-info" style="width:30%;margin-top:-10px;" />
                </div>
            </div>
            <div id="NS_dvReports" style="clear: both;width: 100%;min-height:300px;"></div>
        </div>
    </div>
</asp:Panel>
<script src="/DesktopModules/NS_PriceList/script/Module.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/jquery-jtemplates/jquery-jtemplates.js"></script>
<script src="/DesktopModules/NS_ServiceDashBoard/Scripts/NS_Common.js"></script>