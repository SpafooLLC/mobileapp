<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucCoupons.ascx.cs" Inherits="Netsam.Modules.NS_Admin.UC.ucCoupons" %>
<style>
  .dctab td { padding:0 5px; }
  .nwrp td { white-space:nowrap; }
</style>
<div id="NSR_ManageCoupon" class="dnnClear">
    <div style="width: 100%;">
        <table width="100%" border="0" cellpadding="2" cellspacing="2" class="dctab">
            <tr>
                <td colspan="4"><strong>Create New</strong></td>
            </tr>
            <tr>
                <td>
                    <input type="text" id="txtCouponName" class="form-control" placeholder="Name" /></td>
                <td>
                    <input type="text" id="txtCouponCode" class="form-control" placeholder="Coupon Codes" />                </td>
                <td>
                    <input type="text" id="txtCouponDiscountAmt" class="form-control" placeholder="Discount Amount" /></td>
<td>       <select id="ddlDiscountType" class="form-control">
                                <option value="$">$</option>
                                <option value="%">%</option>
                            </select>                     </td>
            </tr>
            <tr>
              <td colspan="4" style="padding-top:15px;"><table align="center" border="0" cellpadding="2" cellspacing="2" class="dctab">
                
                <tr>
                  <td><input type="text" id="txtStartsFrom2" class="NSR_Date form-control" placeholder="Valid from" /></td>
                  <td><input type="text" id="txtEndsOn2" class="NSR_Date form-control" placeholder="Expire" /></td>
                  <td><input type="text" id="txtNoOfCoupon2" class="form-control" placeholder="Number of Coupons" /></td>
                  <td><input type="button" value="Generate" class="blue-btn-sm" id="NS_btnGenerateCoupon" onclick="NSR_AddCoupon(); return false;" /></td>
                </tr>
                
              </table></td>
            </tr>
            <tr>
                <td colspan="4">&nbsp;&nbsp;
                <input style='display: none;' type="button" value="Cancel" id="NS_btnCancelUpdate" onclick="NS_RefreshCouponInput(); return false;" />                </td>
            </tr>
        </table>
  </div>
    <div id="NSR_ListCoupon" style="margin-top: 20px; width: 100%; border-top: dashed 1px">
    </div>
</div>
<link href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet">
<script src="/DesktopModules/NS_MakeAppointment\Scripts/bootstrap.js"></script>
<script src="/DesktopModules/NS_ManageScheduledServices/Scripts/bootbox.min.js" type="text/javascript"></script>
<script src="/DesktopModules/NS_Admin/js/Coupon.js"></script>
