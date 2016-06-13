var _CurrentAppointmentID = -1;
var oAppointment = "";
$(document).ready(function () {
    
});

function ShowMySchedule() {
    $("#lblTopHeader").text('My Appointments');
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ListAppointmentByProvider";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + NS_MSS_UID + "'}";
    $("#dvMySchedule").show().text("Just a min...")
    NSR_MSS_MakeRequest(_URL, _data, ShowMySchedule_SuCB);
}

function ShowMySchedule_SuCB(d) {
    $("#dvMyScheduleMain").hide();
    $("#dvMySchedule").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpMySchedule.htm?q=' + $.now());
    $("#dvMySchedule").show().processTemplate(d);
}

function ShowAppointmentID(ID) {// Shows Appointment In-Depth information
    _CurrentAppointmentID = ID; 
    $("#lblTopHeader").text('Appointment Details')
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointment";
    var _data = "{'ID':'" + ID + "'}";
    $("#dvMySchedule").hide();
    $("#dvAppointmentID").show().text("Just a min...")
    NSR_MSS_MakeRequest(_URL, _data, ShowAppointment_SuCB,undefined,false);
}
function ShowAppointment_SuCB(d) {
    oAppointment = d;
    $("#dvMyScheduleMain").hide();
    $("#dvAppointmentID").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpAppointmentID.htm?q=' + $.now());
    $("#dvAppointmentID").show().processTemplate(d);
}
function MakeAppointmentCompleted() {
    $("#dvAppointmentID").hide();
    $("#dvCompleteAppoint").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpAppoCompleted.htm?q=' + $.now());
    $("#dvCompleteAppoint").show().processTemplate("");
    $(".NSR_FileControl").on('change', function () {
        var file;
        if ((file = this.files[0])) {
            NSR_sendFile(file, this);
        }
    });
}
function UpdateAppointment() {
    //int ID,string C, string I1, string I2, string I3
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppointment";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var C = $("#txtComments").val();
    var I1="";
    if ($("#imgFC1").attr('uploadedfile')!=undefined){
        I1=$("#imgFC1").attr('uploadedfile');
    }
    var I2="";
    if ($("#imgFC2").attr('uploadedfile')!=undefined){
        I2=$("#imgFC2").attr('uploadedfile');
    }
    var I3="";
    if ($("#imgFC3").attr('uploadedfile')!=undefined){
        I3=$("#imgFC3").attr('uploadedfile');
    }
    var _data = "{'ID':'" + _CurrentAppointmentID + "','C':'" + C + "','I1':'" + I1 + "','I2':'" + I2 + "','I3':'" + I3 + "'}";
    $("#dvMySchedule").hide();
    $("#dvAppointmentID").show().text("Just a min...")
    NSR_MSS_MakeRequest(_URL, _data, UpdateAppointment_SuCB);
}
function UpdateAppointment_SuCB(d) {
    bootbox.alert('Appointment Information is updated successfully');
}

function ShowProviderRating() {
    $("#lblTopHeader").text('ADD CLIENT REVIEW');
    $("#dvCompleteAppoint").hide();
    $("#dvProviderRating").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpRateClient.htm?q=' + $.now());
    $("#dvProviderRating").show().processTemplate(oAppointment.ClientInfo);
}
function LoadRatings() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ListRating";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'RatingTypeID':'1'}"; // 1 - Ratings for Client Rating , 2 - Ratings for Provider Rating
    NSR_MSS_MakeRequest(_URL, _data, LoadRatings_SuCB);
}
function LoadRatings_SuCB(d) {
    $(".greview").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpRatings.htm?q=' + $.now());
    $(".greview").show().processTemplate(d);
}
function AddClientRating() {
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
        var oReviewCSV = $("#txtURILike").val().trim() + ":" + $("#txtURIDLike").val().trim() + ":" + $("#txtURComment").val().trim() + ":1";
        if (OtherRatings == "") { bootbox.alert('Could not submit. Please give Rating and Review.'); return false; }
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/AddRating";
    //int RatingByID, int RatingToID, decimal RatingValue, int RatingTypeID (0-Star Rating ,>0 - Other Rating)
    var _data = "{'RatingByID':'" + oAppointment.ProviderInfo.UserID + "','RatingToID':'" + oAppointment.ClientInfo.UserID + "','RatingCSV':'" + OtherRatings + "','ReviewCSV':'" + oReviewCSV + "'}";
    NSR_MSS_MakeRequest(_URL, _data, ShowThanks_SuCB);
}
function ShowThanks_SuCB() {
    $('#ThankYou').modal('show');
}
// Provider map plotting
function initialize(rows) {
    var coords = [];
    var geocoder = new google.maps.Geocoder();
    var address = rows.Address + "," + rows.City + "," + rows.State + ",Uttar Pradesh, India";
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            coords.push(results[0].geometry.location);
            plotmap(coords, address);
        }
    });
}
function plotmap(coords,address) {
    var mapCanvas = document.getElementById('mapcanvas');
    var geocoder = new google.maps.Geocoder();$("#mapcanvas").show();
    var _Lati = 0; _longi = 0;
    _Lati = coords[0].lat();
    _longi = coords[0].lng()
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(_Lati, _longi)
    };
    var map = new google.maps.Map(document.getElementById('mapcanvas'),
        mapOptions);
    // Adding marker and infobox
    var LatLng = { lat: _Lati, lng: _longi };
    var infowindow = new google.maps.InfoWindow({
        content: address
    });
    var marker = new google.maps.Marker({
        position: LatLng,
        map: map
     });
     marker.addListener('click', function () {
         infowindow.open(map, marker);
     });
}

//
var _SelectedDates = "";
function ShowMyAvailability() {
    $("#lblTopHeader").text('My Appointments');
    $("#dvMyScheduleMain").hide();
    $("#dvProAvailability").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpProMyAvailability.htm?q=' + $.now());
    $("#dvProAvailability").show().processTemplate("");
   ListMyAvail();
}

function DrawDateRow(d) {
    if (d.length > _SelectedDates.length){
        ApplyDate(d[d.length - 1]);
    }
}
function IsAlready(d) {
    var found = false;
    for (var i = 0; i < _SelectedDates.length; i++) {
        var oDate = _SelectedDates[i];
        if (oDate == d) { found = true; break;}
    }
    return found;
}
function ApplyDate(o) {
    var d = NS_FormatDate(o, 'MM dd');
    var o = NS_FormatDate(o, 'dd/mm/yy');
    $("#tblDates tr").last().after('<tr class="TblTR" id="TblTR_' + ($("#tblDates tr").length + 1) + '"><td><label>' + d + '<label></td><td><input type="text" dated="' + o + '" class="form-control timeinput txtStartTime" readonly="readonly" value="12:35 PM"></td><td><input type="text" class="form-control timeinput txtEndTime" value="6:00 PM"></td><td><a href="#" onclick="RemoveMe(this);return false;"><i class="fa red fa-trash fa-lg"></i></a></td></tr>');
    $('.timeinput').datebox({
        mode: "timeflipbox", useFocus: true
    });
}

function RemoveMe(o) {
    $(o).parent().parent().remove();
}

function CheckMyAvail() {
    var lstRows = $(".TblTR");
    var CSV = "";
    $.each(lstRows, function (i, o) {
        var ctrl = $('#' + o.id + ' [type="text"]');
        CSV += $(ctrl[0]).attr('dated') + "_" + ctrl[0].value +'_'+ ctrl[1].value + "|";
    });
    if (CSV == '') { return false; }
    SaveMyAvail(CSV);
}
function SaveMyAvail(CSV) {
    var _URL = "/DesktopModules/NS_ManageScheduledServices/rh.asmx/AddMyAvail";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'ProID':'" + NS_MSS_UID + "','CSV':'" + CSV + "'}";
    NSR_MSS_MakeRequest(_URL, _data, SaveMyAvail_SuCB);
}

function SaveMyAvail_SuCB(d) {
    bootbox.alert("Your information is updated successfully", function () {
        window.location = NS_MSS_HomeTab;
    })
}

function ListMyAvail() {
    var _URL = "/DesktopModules/NS_ManageScheduledServices/rh.asmx/ListMyAvail";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'ProID':'" + NS_MSS_UID + "'}";
    NSR_MSS_MakeRequest(_URL, _data, ListMyAvail_SuCB);
}
function ListMyAvail_SuCB(d) {
    var DatesFromDB = [];
    // Bind the Existing Dates
        for (var i = 0; i < d.length; i++) {
            var Dated = d[i].Date; 
            // create Date array to makes these dates selected in PickMeUp date plugin
                var FDate = NS_FormatJSONDate(d[i].Date, 'mm/dd/yy');
                DatesFromDB.push(FDate);
            // Format the Start time and end time
                var ET = NS_FormatTime(d[i].EndTime); var ST = NS_FormatTime(d[i].StartTime);
            // add the records in the HTML Table as Table Row        
                $("#tblDates tr").last().after('<tr class="TblTR" id="TblTR_' + ($("#tblDates tr").length + 1) + '"><td><label>' + NS_FormatJSONDate(Dated, 'M dd') + '<label></td><td><input type="text" dated="' + NS_FormatJSONDate(Dated, 'dd/mm/yy') + '" class="form-control timeinput txtStartTime" readonly="readonly" value="' + ST + '"></td><td><input type="text" class="form-control timeinput txtEndTime" value="' + ET + '"></td><td><a href="#" onclick="RemoveFromDB(' + d[i].AvailID + ',this);return false;"><i class="fa red fa-trash fa-lg"></i></a></td></tr>');
        }
    // make visible the ' Update Button'
        if (d.length > 0) { $("#dvActions").show(); }
    // initialize the start and end time input box
        $('.timeinput').datebox({
            mode: "timeflipbox", useFocus: true
        });

    // Initialize the Calender box with highlighting the pre-selected dates from database
        $('.multiple').pickmeup({
        render: function (date) {
            if ($.inArray(NS_FormatDate(date, 'mm/dd/yy'), DatesFromDB) > -1) {
                return {
                    class_name: 'highlight'
                }}},
        flat: true,mode: 'multiple', format: 'm/d/Y',
        change: function (d) {
            $("#dvActions").show();
            DrawDateRow(d);
            _SelectedDates = d;
        }
    });
    // unselect the today's date from the calender
        $('.pmu-today').click();
}

function RemoveFromDB(ID, o) {
    bootbox.confirm("Are you sure to remove this information?", function (result) {
        if (result) {
            var _URL = "/DesktopModules/NS_ManageScheduledServices/rh.asmx/RemoveAvail";
            var _data = "{'ID':'" + ID + "'}";
            NSR_MSS_MakeRequest(_URL, _data, function (d) {
                RemoveMe(o);
                bootbox.alert("Removed successfully");
            });
        } 
    });
}