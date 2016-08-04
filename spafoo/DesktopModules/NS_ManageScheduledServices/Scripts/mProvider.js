var _CurrentAppointmentID = -1;
var oAppointment = "";
var NS_MSS_IsSoonest = false;
function ShowMySchedule() {
    $("#lblTopHeader").text('My Appointments');
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ListAppointmentByProvider";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + NS_MSS_UID + "'}";
    $("#dvMySchedule").addClass("NS_On").removeClass('NS_Off').text("Just a min...")
    NSR_MSS_MakeRequest(_URL, _data, ShowMySchedule_SuCB);
}

function ShowMySchedule_SuCB(d) {
    $("#dvMyScheduleMain").addClass("NS_Off").removeClass('NS_On');
    $("#dvMySchedule").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpMySchedule.htm?q=' + $.now());
    $("#dvMySchedule").addClass("NS_On").removeClass('NS_Off').processTemplate(d);
}

function ShowAppointmentID(ID) {// Shows Appointment In-Depth information
    _CurrentAppointmentID = ID;
    NS_MSS_IsSoonest = false;
    $("#lblTopHeader").text('Appointment Details')
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointment";
    var _data = "{'ID':'" + ID + "'}";
    $("#dvMySchedule").addClass("NS_Off").removeClass('NS_On');
    $("#dvAppointmentID").addClass("NS_On").removeClass('NS_Off').text("Just a min...")
    NSR_MSS_MakeRequest(_URL, _data, ShowAppointment_SuCB,undefined,false);
}
function ShowSoonestAppointment(ID) {
    _CurrentAppointmentID = ID;
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointment";
    var _data = "{'ID':'" + ID + "'}";
    NSR_MSS_MakeRequest(_URL, _data, ShowSoonestAppointment_SuCB, undefined, false);
}
function ShowSoonestAppointment_SuCB(d) {
    oAppointment = d;
    NS_MSS_IsSoonest = true;
    $("#lblTopHeader").text('My Availability');
    $("#dvMyScheduleMain").addClass("NS_Off").removeClass('NS_On');
    $("#dvMySchedule").addClass("NS_Off").removeClass("NS_On");
    $("#dvProAvailability").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpProMyAvailability.htm?q=' + $.now());
    $("#dvProAvailability").addClass("NS_On").removeClass('NS_Off').processTemplate("");
    $("#lblProHeader").text("Appointment with " + oAppointment.ClientInfo.DisplayName);
    DrawSoonestForm();
}
function ShowAppointment_SuCB(d) {
    oAppointment = d;
    $("#dvMyScheduleMain").addClass("NS_Off").removeClass('NS_On');
    $("#dvAppointmentID").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpAppointmentID.htm?q=' + $.now());
    $("#dvAppointmentID").addClass("NS_On").removeClass('NS_Off').processTemplate(d);
}
function GetAppointmentPhotos() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointmentPhotos";
    var _data = "{'AID':'" + oAppointment.AppointmentID + "'}";
    NSR_MSS_MakeRequest(_URL, _data, GetAppointmentPhotos_SuCB);
}
function GetAppointmentPhotos_SuCB(d) {
    $("#dvAppointmentPhotos").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpAppointmentPhotos.htm?q=' + $.now());
    $("#dvAppointmentPhotos").processTemplate(d);
    $(".NSR_FileControl").on('change', function () {
        var file;
        if ((file = this.files[0])) {
            NSR_sendFile(file, this,NS_OnFileUpload);
        }
    });
}
function NS_OnFileUpload(d) {
    // Add File info in database
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/AddAppointmentPhoto";
    var _data = "{'AID':'" + oAppointment.AppointmentID + "','UID':'" + NS_MSS_UID + "','FilePath':'" + d + "'}";
    NSR_MSS_MakeRequest(_URL, _data, function () {
        GetAppointmentPhotos();// refresh the appointment photo list
    });
}
function NS_RemoveAppoPhoto(fileID) {
    bootbox.confirm('Are you sure to remove this media ?', function (r) {
        if (r) {
            var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/RemoveAppointmentPhoto";
            var _data = "{'ID':'" + fileID + "'}";
            NSR_MSS_MakeRequest(_URL, _data, function () {
                GetAppointmentPhotos();// refresh the appointment photo list
            });
        }
    });
}
function MakeAppointmentCompleted() {
    $("#dvAppointmentID").addClass("NS_Off").removeClass('NS_On');
    $("#dvCompleteAppoint").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpAppoCompleted.htm?q=' + $.now());
    $("#dvCompleteAppoint").addClass("NS_On").removeClass('NS_Off').processTemplate("");
    NS_AddNotification(oAppointment.ProviderID, oAppointment.ClientID, 7, oAppointment.AppointmentID);
}
function UpdateAppointment() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppointment";
    var C = $("#txtComments").val();
    var _data = "{'ID':'" + _CurrentAppointmentID + "','C':'" + C + "','PaymentTxnID':'" + oAppointment.PayTxnID + "'}";
    $("#dvMySchedule").addClass('NS_Off').removeClass('NS_On');
    $("#dvAppointmentID").addClass("NS_On").removeClass('NS_Off').text("Just a min...")
    NSR_MSS_MakeRequest(_URL, _data, UpdateAppointment_SuCB);
}
function UpdateAppointment_SuCB(d) {
    bootbox.alert('Appointment Information is updated successfully', function (r) {
        window.location.reload();
    });
}
function CaptureCardOrProfile(o) {
    if ($(o).text() == 'Appointment Completed') {
        $(o).text("Please wait...");
        //  ChargePreviousAuth
        var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ChargePreviousAuth";
        var _data = "{'Txn':'" + oAppointment.AuthTxnID + "','amount':'" + oAppointment.Amount + "'}";
        NSR_MSS_MakeRequest(_URL, _data, function (d) {
            if (d.transactionResponse.errors == null) {
                if (d.transactionResponse.responseCode == 1) {
                    NS_AddNotification(oAppointment.ProviderID, oAppointment.ClientID, 8, oAppointment.AppointmentID, function () {
                        oAppointment.PayTxnID = d.transactionResponse.transId;
                        UpdateAppointment();
                    });
                }
            }
            else {
                $(o).text("Appointment Completed");
                bootbox.alert("Sorry, the transaction was NOT successfull cause of the following reason <br/><br/>" + d.transactionResponse.errors[0].errorText);
                return false
            }
        },undefined,false);
    }
}
function ShowProviderRating() {
    $("#dvMySchedule").addClass("NS_Off").removeClass('NS_On');
    $("#lblTopHeader").text('ADD CLIENT REVIEW');
    $("#dvCompleteAppoint").addClass('NS_Off').removeClass('NS_On');
    $("#dvProviderRating").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpRateClient.htm?q=' + $.now());
    $("#dvProviderRating").addClass("NS_On").removeClass('NS_Off').processTemplate(oAppointment.ClientInfo);
}
function NS_GetMyAppointmentInfo(ID) {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointment";
    var _data = "{'ID':'" + ID + "'}";
    NSR_MSS_MakeRequest(_URL, _data, function (d) {
        oAppointment = d;
        ShowProviderRating();
    }, undefined, false);
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
    var _data = "{'RatingByID':'" + oAppointment.ProviderID + "','RatingToID':'" + oAppointment.ClientID + "','RatingCSV':'" + OtherRatings + "','ReviewCSV':'" + oReviewCSV + "'}";
    NSR_MSS_MakeRequest(_URL, _data, ShowThanks_SuCB);
}
function ShowThanks_SuCB() {
    $('#ThankYou').modal('show');
}
// Provider map plotting
function initialize(rows) {
    var coords = [];
    var geocoder = new google.maps.Geocoder();
    var address = rows.Address + "," + rows.City + "," + rows.State ;
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
    var _Content = "<div style='width:100%;'><table style='width:100%;'><tr><td style='width:25%;'><img style='width:75px;height:75px;' src='" + oAppointment.ClientInfo.Profile.PhotoURL + "'/></td><td style='width: 75%; vertical-align: top; padding-left: 10px;'><div>" + oAppointment.ClientInfo.DisplayName + "</div><div>" + address + "</div></td></tr></table></div>";
    var infowindow = new google.maps.InfoWindow({
        content: _Content
    });
    var marker = new google.maps.Marker({
        position: LatLng,
        map: map
     });
     marker.addListener('click', function () {
         infowindow.open(map, marker);
     });
}

var _SelectedDates = "";
function ShowMyAvailability() {
    $("#lblTopHeader").text('My Availability');
    $("#dvMyScheduleMain").addClass("NS_Off").removeClass('NS_On');
    $("#dvProAvailability").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpProMyAvailability.htm?q=' + $.now());
    $("#dvProAvailability").addClass("NS_On").removeClass('NS_Off').processTemplate("");
   ListMyAvail();
}

function DrawDateRow(d) {
    //if (d.length > _SelectedDates.length){
        ApplyDate(d[d.length - 1]);
  //  }
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
    var o = NS_FormatDate(o, 'mm/dd/yy');
    if (NS_MSS_IsSoonest) {
        var table = document.getElementById('tblDates');
        var rowCount = table.rows.length;
        if (rowCount > 1) {
            table.deleteRow(rowCount - 1);
        }
    }
    $("#tblDates tr").last().after('<tr class="TblTR" id="TblTR_' + ($("#tblDates tr").length + 1) + '"><td><label>' + d + '<label></td><td><input type="text" dated="' + o + '" class="form-control timeinput txtStartTime" readonly="readonly" value=""></td><td><input type="text" class="form-control timeinput txtEndTime"></td><td><a href="#" onclick="RemoveMe(this);return false;"><i class="fa red fa-trash fa-lg"></i></a></td></tr>');
    $('.timeinput').datebox({ mode: "timeflipbox", useFocus: true});
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
    if ($("#lnkBtnUpdate").text() != "Submit") {
        SaveMyAvail(CSV);
    }
    else {
        SetSoonestAppointment(CSV);
    }
}
//UpdateAppBasicInfo(int AppID,int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string Comment)
function SetSoonestAppointment(csv) {
    var ary=csv.split('|')[0].split('_');
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppBasicInfo";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'AppID':'" + oAppointment.AppointmentID + "','ClientID':'" + oAppointment.ClientID + "','ProviderID':'" + oAppointment.ProviderID + "','AddressID':'" + oAppointment.AddressID + "','ForDate':'" + ary[0] + "','AtTime':'" + ary[1] + "','EndTime':'" + ary[2] + "','Comment':'" + oAppointment.Comments + "'}";
    NSR_MSS_MakeRequest(_URL, _data, SetSoonestAppointment_SuCB);
}
function SetSoonestAppointment_SuCB(d) {
    debugger;
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppStatus";
    var _data = "{'AppID':'" + d + "','Status':'5'}";// provider gien dat t soonest appointment request
    NSR_MSS_MakeRequest(
        _URL, _data,
        function (d) {
            bootbox.alert('Appointment updated successfully', function () {
                window.location.reload();
            });
        }
    );
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
    });
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
    if (d.length > 0) {
        $("#dvActions").show();
    }
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
        flat: true,mode:'multiple', format: 'm/d/Y',
        change: function (d) {
            $("#dvActions").show();
            _SelectedDates = d;  DrawDateRow(d);
        }
    });
    // unselect the today's date from the calender
   // $('.pmu-today').click();
}
function DrawSoonestForm() {
    
    $("#lnkBtnUpdate").text('Submit');
    // initialize the start and end time input box
    $('.timeinput').datebox({
        mode: "timeflipbox", useFocus: true
    });
   // data-options='{"mode":"flipbox","overrideDateFormat": "%m/%d/%Y"}'
    // Initialize the Calender box with highlighting the pre-selected dates from database
    $('.multiple').pickmeup({
        flat: true, mode: 'single', format: 'm/d/Y',
        change: function (d) {
            _SelectedDates = d; 
            $("#dvActions").show(); $("#lnkBtnUpdate").show(); ApplyDate(d);
        }
    });
    // unselect the today's date from the calender
   // $('.pmu-today').click();
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

function NS_GoBack() {
    if ($("#dvMySchedule").is(":visible")) {
        $("#lblTopHeader").text('My Schedule')
        $("#lblTopHeader").text('My Schedule');
        $("#dvMySchedule").addClass('NS_Off').removeClass('NS_On');
        $("#dvMyScheduleMain").addClass("NS_On").removeClass('NS_Off');return false;
    }
    if ($("#dvProviderRating").is(":visible")) {
        $("#lblTopHeader").text('My Appointments');
        $("#dvProviderRating").addClass('NS_Off').removeClass('NS_On');
        $("#dvCompleteAppoint").addClass("NS_On").removeClass('NS_Off'); return false;
    }
    if ($("#dvAppointmentID").is(":visible")) {
        $("#lblTopHeader").text('My Schedule')
        $("#dvAppointmentID").addClass('NS_Off').removeClass('NS_On');
        $("#dvMySchedule").addClass("NS_On").removeClass('NS_Off'); return false;
    }
    if ($("#dvCompleteAppoint").is(":visible")) {
        $("#lblTopHeader").text('Appointment Details')
        $("#dvCompleteAppoint").addClass('NS_Off').removeClass('NS_On');
        $("#dvAppointmentID").addClass("NS_On").removeClass('NS_Off'); return false;
    }
    if ($("#dvProAvailability").is(":visible")) {
        $("#lblTopHeader").text('My Schedule');
        $("#dvProAvailability").addClass('NS_Off').removeClass('NS_On');
        $("#dvMyScheduleMain").addClass("NS_On").removeClass('NS_Off'); return false;
    }
}
function RemoveCancelled(ID) {
    bootbox.confirm("Are you sure to remove this information?", function (d) {
        if (d) {
            var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/RemoveApp";
            var _data = "{'ID':'" + ID + "'}";
            NSR_MSS_MakeRequest(_URL, _data, function (d) {
                ShowMySchedule();
            });
        }
    })
}
