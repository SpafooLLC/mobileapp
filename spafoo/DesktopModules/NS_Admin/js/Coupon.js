var RPP = 20;
var CP = 1;
var CN = 'Clients';
var NS_httpAlias = 'https://www.spafoo.com';
$(document).ready(function () {
    NSR_BindCoupons();
});

function NSR_BindCoupons() {
    NS_RefreshCouponInput();
    var url = '/DesktopModules/NS_ServiceDashBoard/rh.asmx/ListCoupon';
    var data = "";
    NS_MakeRequest(url, data, NSR_OnBindCoupons);
}
function NSR_OnBindCoupons(d) {
    var o = $("#NSR_ListCoupon");
    $(o).html('Please wait, while we are processing...');
    if (d.length > 0) {
        o.setTemplateURL('/DesktopModules/NS_Admin/temp/Coupons.htm?v=' + $.now());
        o.processTemplate(d);
    }
    else {
        $(o).html('No record(s) found. Please create new coupon using the above form.');
    }
    $(".NSR_Date").datepicker({
        dateFormat: "mm/dd/yy"
    });
}
function NSR_AddCoupon() {
    var CN = $("#txtCouponName").val().trim();
    var CC = $("#txtCouponCode").val().trim();
    var DA = $("#txtCouponDiscountAmt").val().trim();
 var SF = $("#txtStartsFrom2").val().trim();
    var EO = $("#txtEndsOn2").val().trim();
    var NC = $("#txtNoOfCoupon2").val().trim();
    var DT = $("#ddlDiscountType").val();
    if (CN == "") {
        bootbox.alert('Please specify Coupon Name');
        return false;
    }
    if (CC == "") {
        bootbox.alert('Please specify Coupon Code');
        return false;
    }
    if (DA == '') {
        bootbox.alert('Please specify Discount Amount');
        return false;
    }
    if (SF == "") {
        bootbox.alert('Please specify Valid from');
        return false;
    }
    if (EO == "") {
        bootbox.alert('Please specify Expiry');
        return false;
    }
    if (EO == "") {
        EO = -1;
    }
    var url = '/DesktopModules/NS_ServiceDashBoard/rh.asmx/AddCoupon';
    //string Name, string Code, int Discount, string DiscountType, DateTime StartsFrom, DateTime EndsOn, int NoOfCoupons
    var data = "{'Name':'" + CN + "','Code':'" + CC + "','Discount':'" + DA + "','DiscountType':'" + DT + "','StartsFrom':'" + SF + "','EndsOn':'" + EO + "','NoOfCoupons':'" + NC + "'}";
    if ($("#NS_btnGenerateCoupon").val() == 'Update') {
        var CID = $("#NS_btnGenerateCoupon").attr('CID');
        url = '/DesktopModules/NS_ServiceDashBoard/rh.asmx/UpdateCoupon';
        data = "{'ID':'" + CID + "','Name':'" + CN + "','Code':'" + CC + "','Discount':'" + DA + "','DiscountType':'" + DT + "','StartsFrom':'" + SF + "','EndsOn':'" + EO + "','NoOfCoupons':'" + NC + "'}";
    }
    NS_MakeRequest(url, data, NSR_BindCoupons);
}

function NS_EditCoupon(ID) {
    var url = '/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetCoupon';
    //string Name, string Code, int Discount, string DiscountType, DateTime StartsFrom, DateTime EndsOn, int NoOfCoupons
    var data = "{'ID':'" + ID + "'}";
    $("#NS_btnGenerateCoupon").attr('CID', ID);
    NS_MakeRequest(url, data, NSR_OnEditCoupon);
}
function NSR_OnEditCoupon(d) {
    $("#NS_btnGenerateCoupon").val("Update");
    $("#txtCouponName").val(d.Name);
    $("#txtCouponCode").val(d.Code);
    $("#txtCouponDiscountAmt").val(d.Discount);
    $("#txtStartsFrom2").val(NS_FormatJSONDate(d.StartsFrom, 'm/dd/yy'));
    $("#txtEndsOn2").val(NS_FormatJSONDate(d.EndsOn, 'm/dd/yy'));
    $("#txtNoOfCoupon2").val(d.NoOfCoupons);
    $("#ddlDiscountType").val(d.DiscountType);
    $("#NS_btnCancelUpdate").show();
}
function NS_RemoveCoupon(ID) {
    bootbox.confirm('Are you sure to remove this coupon ?', function (r) {
        if (r) {
            var url = '/DesktopModules/NS_ServiceDashBoard/rh.asmx/RemoveCoupon';
            var data = "{'ID':'" + ID + "'}";
            NS_MakeRequest(url, data, NSR_BindCoupons);
        }
    });
}
function NS_RefreshCouponInput() {
 $("#txtCouponName").val('');
    $("#txtCouponCode").val('');
    $("#txtCouponDiscountAmt").val('');
    $("#txtStartsFrom2").val('');
    $("#txtEndsOn2").val('');
    $("#txtNoOfCoupon2").val('');
    $("#ddlDiscountType").val('');
    $("#NS_btnGenerateCoupon").val("Generate");
    $("#NS_btnCancelUpdate").hide();
}
