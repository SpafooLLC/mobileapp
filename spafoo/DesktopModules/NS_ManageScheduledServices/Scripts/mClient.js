var _CurrentAppointmentID = -1;
var oAppointment = "";
$(document).ready(function () {
    ShowMySchedule();
});

function ShowMySchedule() {
    $("#lblTopHeader").text('My Schedule');
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ListAppointmentByClient";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + NS_MSS_UID + "'}";
    $("#dbClientSchedule").show().html(NS_Waiting)
    NS_MakeRequest(_URL, _data, ShowMySchedule_SuCB);
}

function ShowMySchedule_SuCB(d) {
    if (d.length > 0) {
        $("#dbClientSchedule").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpClientSchedule.htm?q=' + $.now());
        $("#dbClientSchedule").show().processTemplate(d);
    }
    else {
        $("#dbClientSchedule").text('You do not have any schedule');
    }
}

function ShowAppointmentID(ID) {// Shows Appointment In-Depth information
    _CurrentAppointmentID = ID; 
    $("#lblTopHeader").text('Schedule Detail')
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointment";
    var _data = "{'ID':'" + ID + "'}";
    $("#dbClientSchedule").hide();
    $("#dvProviderID").show().html(NS_Waiting).attr('prev','dbClientSchedule')
    NS_MakeRequest(_URL, _data, ShowAppointment_SuCB, undefined, false);
}
function ShowAppointment_SuCB(d) {
    if (d != null) {
        oAppointment = d;
        $("#dvProviderID").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpScheduleID.htm?q=' + $.now());
        $("#dvProviderID").show().processTemplate(d);
    }
    else {
        $("#dvProviderID").show().html("Sorry, cause of some issue, could not load the detail");
    }
   
}
function ShowProviderRating(AID) {
    var _DIR = $("#NS_aRateLink_" + AID).attr('rated');
    if (_DIR == 'true') return false; // if already rated , then no need to show details
    $("#lblTopHeader").text('ADD Provider REVIEW');
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointment";
    var _data = "{'ID':'" + AID + "'}";
    $("#dbClientSchedule").hide();
    NS_MakeRequest(_URL, _data, function (d) {
        oAppointment = d;
        $("#dvClientRating").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpRateProvider.htm?q=' + $.now());
        $("#dvClientRating").show().processTemplate(d.ProviderInfo).attr('prev','dbClientSchedule');
    }, undefined, false);
}
function LoadRatings() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ListRating";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'RatingTypeID':'2'}"; // 1 - Ratings for Client Rating , 2 - Ratings for Provider Rating
    NS_MakeRequest(_URL, _data, LoadRatings_SuCB);
}
function LoadRatings_SuCB(d) {
    $(".greview").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpRatings.htm?q=' + $.now());
    $(".greview").show().processTemplate(d);
}
function AddProviderRating() {
    if (!$("#chkIConfirm").is(":checked")) {
        bootbox.alert("Please tick the tickbox to give your confirmation");
        return false;
    }
    // Rating information processing
        var o = $(".stars input:checked")
        var StarRatingGiven = ""; // default Star Rating
        if (o.length > 0) {// if rating is given only then
            StarRatingGiven = "0:" + $(o).attr('id').split('-')[1] + "|";
        }
        var aryOtherRatings = $(".greview input:checked");
        var OtherRatings = StarRatingGiven;
        $.each(aryOtherRatings, function (i, o) {
            var oRatingValue=$(o).attr('id').split('_')[1];
            var oRatingID=$(o).attr('id').split('_')[2];
            OtherRatings += oRatingValue + ":" + oRatingID + "|";
        });

    // User Review informtion processing
    // ReviewCSV: ILike:IDLike:Comments:DisplayNameAs
        var URComment = '-1';
        if ($("#txtURComment").val().trim() != '') { URComment =escape($("#txtURComment").val().trim());}
    var oReviewCSV = "-1:-1:" + URComment + ":" + $("#ddlDisplayMyNameAs :selected").val();
    if ((oReviewCSV.trim() == "") || (OtherRatings.trim() == "")) { bootbox.alert('Could not submit. Please give Rating and Review.'); return false; }
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/AddRating";
    //int RatingByID, int RatingToID, decimal RatingValue, int RatingTypeID (0-Star Rating ,>0 - Other Rating)
    var _data = "{'RatingByID':'" + oAppointment.ClientID + "','RatingToID':'" + oAppointment.ProviderID + "','RatingCSV':'" + OtherRatings + "','ReviewCSV':'" + oReviewCSV + "','AppID':'" + oAppointment.AppointmentID + "'}";
    NS_MakeRequest(_URL, _data, ShowThanks_SuCB);
}
function ShowThanks_SuCB() {
    $('#ThankYou').modal('show');
}

function GoBack() {
    $(".inbody-simple>div:visible").hide()
    $("#dbClientSchedule").show();
    $("#lblTopHeader").text('My Schedule');
}
function NS_CancelAppointment() {
    bootbox.confirm('Are you sure to CANCEL this appointment ?', function (r) {
        if (r == true) {
            NS_DoCancelAppointment();
        }
    });
}
function NS_DoCancelAppointment() {
    //RefundCard(string TxnID, string CCNumber, string Expiry,decimal Amount)
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/RefundCard";
    var _data = "{'AID':'" + oAppointment.AppointmentID + "','TxnID':'" + oAppointment.AuthTxnID + "'}";
    NS_MakeRequest(_URL, _data, NS_DoCancelAppointment_SuCB);
}
function NS_DoCancelAppointment_SuCB(d) {
    if (d.transactionResponse != undefined) {
        if (d.transactionResponse.errors == null) {
            if (d.transactionResponse.responseCode == 1) {
                bootbox.alert("Your appointment is cancelled successfully.", function () {
                    window.location.reload(); // reload the page
                });
            }
        }
        else {
            bootbox.alert("Sorry, the transaction was NOT successfull cause of the following reason <br/><br/>" + d.transactionResponse.errors[0].errorText);
            return false
        }
    }
    else {
        if (d.messages.message[0].code == 'Removed') {
            bootbox.alert("Your appointment is cancelled successfully.", function () {
                window.location.reload(); // reload the page
            });
        }
        if (d.messages.message[0].code == 'Expired') {
            bootbox.alert(d.messages.message[0].text);
        }
    }
}
function NS_EditAppointment() {
    $.cookie('NS_MA_IsEditMode', true);
    $.cookie('NS_MA_EditSRVC', JSON.stringify(oAppointment.Services));
    oAppointment.ClientInfo.Profile.PreferredTimeZone = null;
    oAppointment.ClientInfo.Profile.ProfileProperties = null;

    oAppointment.ProviderInfo.Profile.PreferredTimeZone = null;
    oAppointment.ProviderInfo.Profile.ProfileProperties = null;
    $.cookie('NS_MA_EditClient', JSON.stringify(oAppointment.ClientInfo))
    $.cookie('NS_MA_EditProv', JSON.stringify(oAppointment.ProviderInfo))
    oAppointment.ClientInfo = null;
    oAppointment.ProviderInfo = null;
    oAppointment.Location = null; oAppointment.Services = null;
    $.cookie('NS_MA_oApp', JSON.stringify(oAppointment));
    window.location = NS_MSS_AppointmentTab; // goto Appointment tab for editing
}