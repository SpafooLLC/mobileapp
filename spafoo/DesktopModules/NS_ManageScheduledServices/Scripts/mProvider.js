var _CurrentAppointmentID = -1;
var oAppointment = "";
var NS_MSS_IsSoonest = false;
var NS_MA_IsSlotAvailable = false;
var NS_Session = 0;
var _Lati = 0; _longi = 0;
function ShowMySchedule() {
    $("#lblTopHeader").text('My Appointments');
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ListAppointmentByProvider";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'UID':'" + NS_MSS_UID + "'}";
    $("#dvMySchedule").addClass("NS_On").removeClass('NS_Off').html(NS_Waiting)
    NS_MakeRequest(_URL, _data, ShowMySchedule_SuCB);
}

function ShowMySchedule_SuCB(d) {
    $("#dvMyScheduleMain").addClass("NS_Off").removeClass('NS_On');
    if (d.length > 0) {
        $("#dvMySchedule").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpMySchedule.htm?q=' + $.now());
        $("#dvMySchedule").addClass("NS_On").removeClass('NS_Off').show();
        $("#dvMySchedule").processTemplate(d);
    }
    else {
        $("#dvMySchedule").addClass("NS_On").removeClass('NS_Off').text('No appointments scheduled at this time');
    }
}

function ShowAppointmentID(ID) {// Shows Appointment In-Depth information
    _CurrentAppointmentID = ID;
    $("#newapp_" + ID).hide();
    // Update SeenStatus
    NS_MakeRequest('/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppSeenStatus', "{'AppID':'" + ID + "'}");
    NS_MSS_IsSoonest = false;
    $("#lblTopHeader").text('Appointment Details');
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointment";
    var _data = "{'ID':'" + ID + "'}";
    $("#dvMySchedule").addClass("NS_Off").removeClass('NS_On');
    $("#dvAppointmentID").addClass("NS_On").removeClass('NS_Off').html(NS_Waiting)
    NS_MakeRequest(_URL, _data, ShowAppointment_SuCB, undefined, false);
}

function ShowSoonestAppointment(ID) {
    _CurrentAppointmentID = ID;
    // Update SeenStatus
    NS_MakeRequest('/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppSeenStatus', "{'AppID':'" + ID + "'}");
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointment";
    var _data = "{'ID':'" + ID + "'}";
    NS_MakeRequest(_URL, _data, ShowSoonestAppointment_SuCB, undefined, false);
}
function ShowSoonestAppointment_SuCB(d) {
    oAppointment = d;
    NS_MSS_IsSoonest = true;
    $("#lblTopHeader").text('Appointment With ' + oAppointment.ClientInfo.DisplayName);
    $("#dvMyScheduleMain").addClass("NS_Off").removeClass('NS_On');
    $("#dvMySchedule").addClass("NS_Off").removeClass("NS_On");
    $("#dvProAvailability").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpProMyAvailability.htm?q=' + $.now());
    $("#dvProAvailability").addClass("NS_On").removeClass('NS_Off').processTemplate("");
    $("#lblProHeader").text("I am available");
    $("#lblSubHeader").text('Select date/time for appointment with ' + oAppointment.ClientInfo.DisplayName);
    // DrawSoonestForm();
    NS_MSS_ShowSoonestCal();
}
function ShowAppointment_SuCB(d) {
    if (d != null) {
        oAppointment = d;
        $("#dvMyScheduleMain").addClass("NS_Off").removeClass('NS_On');
        $("#dvAppointmentID").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpAppointmentID.htm?q=' + $.now());
        $("#dvAppointmentID").addClass("NS_On").removeClass('NS_Off').processTemplate(d);
    }
    else {
        $("#dvAppointmentID").addClass("NS_On").removeClass('NS_Off').html("Sorry, cause of some issue, could not load the detail");
    }
}
function GetAppointmentPhotos() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointmentPhotos";
    var _data = "{'AID':'" + oAppointment.AppointmentID + "'}";
    NS_MakeRequest(_URL, _data, GetAppointmentPhotos_SuCB);
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
    NS_MakeRequest(_URL, _data, function () {
        GetAppointmentPhotos();// refresh the appointment photo list
    });
}
function NS_RemoveAppoPhoto(fileID) {
    bootbox.confirm('Are you sure to remove this media ?', function (r) {
        if (r) {
            var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/RemoveAppointmentPhoto";
            var _data = "{'ID':'" + fileID + "'}";
            NS_MakeRequest(_URL, _data, function () {
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
    var C = escape($("#txtComments").val().trim());
    var _data = "{'ID':'" + _CurrentAppointmentID + "','C':'" + C + "','PaymentTxnID':'" + oAppointment.PayTxnID + "'}";
    $("#dvMySchedule").addClass('NS_Off').removeClass('NS_On');
    $("#dvAppointmentID").addClass("NS_On").removeClass('NS_Off').html(NS_Waiting)
    NS_MakeRequest(_URL, _data, UpdateAppointment_SuCB);
}
function UpdateAppointment_SuCB(d) {
    $('#ThankYou').modal('hide');
    bootbox.alert('Appointment Information is updated successfully', function (r) {
        window.location.reload();
    });
}
function CaptureCardOrProfile(o) {

    if ($(o).text() == 'Appointment Completed') {
        $(o).text("Please wait...");
        //  ChargePreviousAuth
        var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ChargeProfile"; //ChargePreviousAuth
        var _data = "{'PID':'" + oAppointment.CustomerProfileID + "','PPID':'" + oAppointment.PayProfileID + "','amount':'" +  (oAppointment.Amount-oAppointment.Discount)  + "'}";
        NS_MakeRequest(_URL, _data, function (d) {
             if ((d.transactionResponse.errors == null) && (d.transactionResponse.responseCode!=null)) {
                if (d.transactionResponse.responseCode == 1) {
                    NS_AddNotification(oAppointment.ProviderID, oAppointment.ClientID, 8, oAppointment.AppointmentID, function () {
                        oAppointment.PayTxnID = d.transactionResponse.transId;
                        UpdateAppointment();
                    });
                }
            }
            else {
                $(o).text("Appointment Completed");
                if (d.transactionResponse.errors!=null)
                    bootbox.alert("Sorry, the transaction was NOT successfull cause of the following reason <br/><br/>" + d.transactionResponse.errors[0].errorText);
                else
                    bootbox.alert("Sorry, the transaction was NOT successfull cause of the following reason <br/><br/>" + d.messages.message[0].text);
                return false;
            }
        },undefined,false);
    }
}
function ShowProviderRating(IsCloseApp) {
    $("#dvMySchedule").addClass("NS_Off").removeClass('NS_On');
    $("#lblTopHeader").text('ADD CLIENT REVIEW');
    $("#dvCompleteAppoint").addClass('NS_Off').removeClass('NS_On');
    $("#dvProviderRating").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpRateClient.htm?q=' + $.now());
    $("#dvProviderRating").addClass("NS_On").removeClass('NS_Off').processTemplate(oAppointment.ClientInfo);
    if (IsCloseApp == 1) {
        $("#dvThankNClose").css('display','none');
        $("#dvThankNCloseApp").css('display','block');
    }
    else {
        $("#dvThankNClose").css('display','block');
        $("#dvThankNCloseApp").css('display','none');
    }
}
function NS_GetMyAppointmentInfo(ID) {
    var _DIR = $("#NS_aRateLink_" + ID).attr('rated');
    if (_DIR == 'true') return false; // if already rated , then no need to show details
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointment";
    var _data = "{'ID':'" + ID + "'}";
    NS_MakeRequest(_URL, _data, function (d) {
        oAppointment = d;
        ShowProviderRating();
    }, undefined, false);
}

function LoadRatings() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ListRating";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'RatingTypeID':'1'}"; // 1 - Ratings for Client Rating , 2 - Ratings for Provider Rating
    NS_MakeRequest(_URL, _data, LoadRatings_SuCB);
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
        var oReviewCSV = $("#txtURILike").val().trim() + ":" + $("#txtURIDLike").val().trim() + ":" +escape( $("#txtURComment").val().trim()) + ":1";
        if (OtherRatings == "") { bootbox.alert('Could not submit. Please give Rating and Review.'); return false; }
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/AddRating";
    //int RatingByID, int RatingToID, decimal RatingValue, int RatingTypeID (0-Star Rating ,>0 - Other Rating)
    var _data = "{'RatingByID':'" + oAppointment.ProviderID + "','RatingToID':'" + oAppointment.ClientID + "','RatingCSV':'" + OtherRatings + "','ReviewCSV':'" + oReviewCSV + "','AppID':'" + oAppointment.AppointmentID + "'}";
    NS_MakeRequest(_URL, _data, ShowThanks_SuCB);
}
function ShowThanks_SuCB() {
    $('#ThankYou').modal('show');
}
// Provider map plotting
function initialize(rows) {
    var coords = [];
    var geocoder = new google.maps.Geocoder();
    var address = rows.Address + ", " + rows.City + ", " + rows.State + ", " + rows.Zip;
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
    var _Content = "<div style='width:100%;'><table style='width:100%;'><tr><td style='width:25%;'><img style='width:75px;height:75px;' src='" + oAppointment.ClientInfo.Profile.PhotoURL + "'/></td><td style='width: 75%; vertical-align: top; padding-left: 10px;'><div>" + oAppointment.ClientInfo.FirstName + ' ' + NS_IntialLetter(oAppointment.ClientInfo.LastName) + "</div><div>" + address + "</div></td></tr></table></div>";
    var infowindow = new google.maps.InfoWindow({
        content: _Content
    });
    var marker = new google.maps.Marker({
        position: LatLng,
        icon: 'http://www.spafoo.com/images/MapSpafoo.png',
        map: map
     });
     marker.addListener('click', function () {
         infowindow.open(map, marker);
     });
     infowindow.open(map, marker);
}

var _SelectedDates = "";
function ShowMyAvailability() {
    $("#lblTopHeader").text('My Availability');
    $("#lblSubHeader").text('');
    $("#dvMyScheduleMain").addClass("NS_Off").removeClass('NS_On');
    $("#dvProAvailability").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpProMyAvailability.htm?q=' + $.now());
    $("#dvProAvailability").addClass("NS_On").removeClass('NS_Off').processTemplate("");
    NS_MSS_ShowMyAvailCal();
}

function DrawDateRow(d) {
    if (d.length == 0) return;
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
    var ary = csv.split('|')[0].split('_');
    var _SlotData = "{'ProID':'" + oAppointment.ProviderID + "','StartDateTime':'" + ary[0]+" "+ary[1] + "','EndDateTime':'" + ary[0]+" "+ary[2] + "'}";
    NS_MakeRequest("/DesktopModules/NS_MakeAppointment/rh.asmx/IsProviderSlotFree",
        _SlotData, function (d) {
            if (d == true) {
                // if given time slot is free  then update 
                var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppBasicInfo";
                //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
                var _data = "{'AppID':'" + oAppointment.AppointmentID + "','ClientID':'" + oAppointment.ClientID + "','ProviderID':'" + oAppointment.ProviderID + "','AddressID':'" + oAppointment.AddressID + "','ForDate':'" + ary[0] + "','AtTime':'" + ary[1] + "','EndTime':'" + ary[2] + "','Comment':'" + oAppointment.Comments + "'}";
                NS_MakeRequest(_URL, _data, SetSoonestAppointment_SuCB);
            }
            else {
                bootbox.alert("Sorry, the specified time slot is not free")
            }
    });
}
function SetSoonestAppointment_SuCB(d) {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/UpdateAppStatus";
    var _data = "{'AppID':'" + d + "','Status':'5'}";// provider given date & time soonest appointment request
    NS_MakeRequest(
        _URL, _data,
        function (d) {
            bootbox.alert('Appointment updated successfully', function () {
                $('#NS_dvCaldendar').fullCalendar('refetchEvents'); $("#NS_dvSliderOuter").dialog('close')
            });
        }
    );
}
function SaveMyAvail(CSV) {
    var _URL = "/DesktopModules/NS_ManageScheduledServices/rh.asmx/AddMyAvailEx";
    //int SID,int STID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax
    var _data = "{'ProID':'" + NS_MSS_UID + "','CSV':'" + CSV + "'}";
    NS_MakeRequest(_URL, _data, SaveMyAvail_SuCB);
}

function SaveMyAvail_SuCB(d) {
    bootbox.alert("Your information is updated successfully", function () {
        $('#NS_dvCaldendar').fullCalendar('refetchEvents');
        $("#NS_dvSliderOuter").dialog('close')
    });
}

function RemoveFromDB(ID, o) {
    bootbox.confirm("Are you sure to remove this information?", function (result) {
        if (result) {
            var _URL = "/DesktopModules/NS_ManageScheduledServices/rh.asmx/RemoveAvail";
            var _data = "{'ID':'" + ID + "'}";
            NS_MakeRequest(_URL, _data, function (d) {
                RemoveMe(o);
                bootbox.alert("Removed successfully");
            });
        } 
    });
}

function RemoveCancelled(ID) {
    bootbox.confirm("Are you sure to remove this information?", function (d) {
        if (d) {
            var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/RemoveApp";
            var _data = "{'ID':'" + ID + "'}";
            NS_MakeRequest(_URL, _data, function (d) {
                ShowMySchedule();
            });
        }
    })
}

function NS_GotoAppointmentDetail() {
    if ($("#dvCompleteAppoint").html().trim().length > 0) {
        $("#dvCompleteAppoint").addClass("NS_On").removeClass('NS_Off');
        $("#lblTopHeader").text('Appointment Details');
    }
    else {
        $("#dvMySchedule").addClass("NS_On").removeClass('NS_Off');
        $("#lblTopHeader").text('My Schedule');
    }
    $("#dvProviderRating").addClass("NS_Off").removeClass("NS_On");
   $('#ThankYou').modal('hide');
}
function NS_ShowCompletedAppDetail(ID) {
    $("#dvMySchedule").addClass("NS_Off").removeClass("NS_On");
    $("#dvProViewClient").addClass("NS_On").removeClass("NS_Off").html(NS_Waiting);
    $("#lblTopHeader").text("Appointment Details");
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointment";
    var _data = "{'ID':'" + ID + "'}";
    NS_MakeRequest(_URL, _data, NS_ShowCompletedAppDetail_SuCB);
}
function NS_ShowCompletedAppDetail_SuCB(d) {
    oAppointment = d;
    $("#dvMyScheduleMain").addClass("NS_Off").removeClass('NS_On');
    $("#dvProViewClient").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpCompletedAppView.htm?q=' + $.now());
    $("#dvProViewClient").processTemplate(d);
}
function ListAppPhotos() {
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetAppointmentPhotos";
    var _data = "{'AID':'" + oAppointment.AppointmentID + "'}";
    NS_MakeRequest(_URL, _data, ListAppPhotos_SuCB);
}
function ListAppPhotos_SuCB(d) {
    $("#dvAppPhotos").setTemplateURL('/DesktopModules/NS_ManageScheduledServices/temp/tmpAppPhotos.htm?q=' + $.now());
    $("#dvAppPhotos").processTemplate(d);
    if ($("#dvAppPhotos >ul>li").length == 0) {
        $("#dvAppPhotos").text("No appointment related photograph found");
    }
}
function ListMyReviews() {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetMyReview";
    var _data = "{'UserID':'" + oAppointment.ClientID + "'}";
    NS_MakeRequest(_URL, _data, ListMyReviews_SuCB)
}
function ListMyReviews_SuCB(d) {
    $("#dvAppClientReview").setTemplateURL('/DesktopModules/NS_ServiceDashBoard/templates/tmpUserReview.htm?q=' + $.now());
    $("#dvAppClientReview").processTemplate(d);
    if ($(".prolist").html().trim().length == 0) {
        $(".prolist").text("No review(s) found");
    }
}
function GetMyRaReOnApp() {
    var _URL = "/DesktopModules/NS_ServiceDashBoard/rh.asmx/GetMyRaReOnApp";
    var _data = "{'UserID':'" + oAppointment.ProviderID + "','AppID':'"+oAppointment.AppointmentID+"'}";
    NS_MakeRequest(_URL, _data, GetMyRaReOnApp_SuCB)
}
function GetMyRaReOnApp_SuCB(d) {
    if (d != null) {
        if (d.Comments != null) {
            $("#dvProRatingOnApp").text(NS_ParseString(d.Comments))
        }
        if (d.RatingValue != null) {
            $("#star-" + d.RatingValue+"-2").attr('checked', 'checked');
        }
    }
}
function NS_GoBack() {
    if ($("#dvMySchedule").is(":visible")) {
        $("#lblTopHeader").text('My Schedule')
        $("#lblTopHeader").text('My Schedule');
        $("#dvMySchedule").addClass('NS_Off').removeClass('NS_On');
        $("#dvMyScheduleMain").addClass("NS_On").removeClass('NS_Off'); return false;
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
    if ($("#dvProViewClient").is(":visible")) {
        $("#dvMySchedule").addClass("NS_On").removeClass("NS_Off");
        $("#dvProViewClient").addClass("NS_Off").removeClass("NS_On");
        $("#lblTopHeader").text("My Schedule");
    }
}


function NS_MSS_ShowMyAvailCal() {
    $('#NS_dvCaldendar').fullCalendar({
        header: { left: 'prev,next today', center: 'title', right: '' },
        defaultView: 'month', selectable: true,
        defaultDate: (new Date()),
        events: function (start, end, timezone, callback) {
             NS_GetProOccupiedSlots(start, end, timezone, callback);
        },
        timezone: 'false',
        selectHelper: true,
        select: function (start, end, a, b, c) {
            var today = new Date();
            var strToday = moment().format('MM/DD/YYYY');
            today = new Date(strToday);
            var strCheckDate = (start._d.getMonth() + 1) + "/" + "/" + start._d.getDate() + "/" + start._d.getFullYear();
            var check = new Date(strCheckDate);
            
            if (check < today) {
                bootbox.alert('Sorry, you cannot select date before today');
                return false;
            }
            var _m = moment();
            var _IsToday = (_m.format("DD-MM-YYYY") == start._d.format('dd-MM-yyyy'));
            var SliderStartHours = 00;
            var SliderStartMinutes = 00;
            var SliderEndHours = 23;
            var SliderEndMinutes = 45;
            if (_IsToday) {
                var _afterDate = _m.add(NS_Session, 'minutes');
                var _MaxDate = new Date(_m._d.getFullYear(), _m._d.getMonth(), _m._d.getDate(), SliderEndHours, SliderEndMinutes);
                if (_afterDate > _MaxDate) {
                   // SliderEndHours = _afterDate.hours() + 1;
                   // SliderEndMinutes = _afterDate.minutes();
                }
                var _t = new Date();
                SliderStartHours = (_t.getHours() + 1);
                SliderStartMinutes = (_t.getMinutes());
                if (SliderStartMinutes < 15) {
                    SliderStartMinutes = 15;
                }
                if (SliderStartMinutes > 15 && SliderStartMinutes < 30) {
                    SliderStartMinutes = 30;
                }
                if (SliderStartMinutes > 30 && SliderStartMinutes < 45) {
                    SliderStartMinutes = 45;
                }
                if (SliderStartMinutes > 45) {
                    SliderStartMinutes = 00;
                    SliderStartHours++;
                }
            }
            // start = NS_FormatDate(Date.parse(start), 'mm/dd/yy HH:MM');
            //  end = NS_FormatDate(Date.parse(end), 'mm/dd/yy HH:MM');
            startTimeRange = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate(), SliderStartHours, SliderStartMinutes);
            endTimeRange = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate(), SliderEndHours, SliderEndMinutes);
            TimePostFix = "";
            var tempH = "";
            var finalH = "";
            var NS_Session = 0;
            var tempM = NS_Session;
            var tempVal = (NS_Session / 60);
            
            if (NS_Session < 60) {
                tempH = 00;
                tempM = NS_Session;
                finalH = tempH;
            }
            else {
                var tempH = parseInt(tempVal);
                var tempM = tempVal - tempH;
                finalH = 0 + tempH;
            }
            var _Title = NS_FormatDate(Date.parse(check), 'mm/dd/yy');
            $("#lblSlotDate").text(_Title);
           // $("#lblServiceSession").text(NS_Session + ' minute(s)');
            var defaultEnd = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate(), finalH, tempM);
            NS_MA_IsSlotAvailable = false;
            $("#imgAvail").hide();
            $("#lblAvail").hide();
            var dialog = $("#NS_dvSliderOuter").dialog({
                autoOpen: true, height: 450, width: 900, modal: true,
                title: 'Choose your time slot',
                buttons: {
                    "Ok": SaveTimeSlot,
                    Cancel: function () {
                        dialog.dialog("close");
                        $("#NS_dvTimeSlider").dateRangeSlider("destroy");
                    }
                },
                close: function () {
                    dialog.dialog("close");
                    $("#NS_dvTimeSlider").dateRangeSlider("destroy");
                }
            })
            $("#NS_dvTimeSlider").dateRangeSlider({
                arrows: false, symmetricPositionning: true,
                bounds: { min: startTimeRange, max: endTimeRange },
                defaultValues: { min: startTimeRange, max: defaultEnd },
               // range: { min: { minutes: NS_Session }, max: { minutes: NS_Session } },
                step: { minutes: 15 },
                formatter: function (value) {
                    return GetInAmPm(value);
                },
            }).bind("valuesChanged", function (e, data) {
                finalMin = GetInAmPm(data.values.min);
                finalMax = GetInAmPm(data.values.max);
                $("#NS_lblStartHour").text(finalMin);
                $("#NS_lblEndHour").text(finalMax);
                var _S = $("#lblSlotDate").text() + ' ' + finalMin;
                var _E = $("#lblSlotDate").text() + ' ' + finalMax;
                CanSetAvailability(_S, _E);
            });
            $('#NS_dvCaldendar').fullCalendar('unselect');
        },
        eventClick: function (calEvent, jsEvent, view) {
            var i = calEvent.id;
            if (i != undefined) {
                bootbox.confirm('Do you want to remove this time slot : ' + calEvent.start._i.split(' ')[1] + ' - ' + calEvent.end._i.split(' ')[1], function (r) {
                    if (r) {
                        NS_MakeRequest('/DesktopModules/NS_ManageScheduledServices/rh.asmx/RemoveAvail', "{'ID':" + i + "}", function (d) {
                            $('#NS_dvCaldendar').fullCalendar('removeEvents', i)
                        });
                    }
                });
            }
        },
        dayClick: function (calEvent, jsEvent, view, a, b, c) { },
        editable: true,
        slotEventOverlap: false,
        eventLimit: true, // allow "more" link when too many events
        views: {
            agenda: {
                eventLimit: 3 // adjust to 6 only for agendaWeek/agendaDay
            }
        }
    })
}
function NS_GetProOccupiedSlots(start, end, timezone, callback) {
    var fStart = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate());
    fStart = NS_FormatDate(start, 'mm/dd/yy');
    var fEnd = new Date(end._d.getFullYear(), end._d.getMonth(), end._d.getDate());
    fEnd = NS_FormatDate(end, 'mm/dd/yy');
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/GetProOccupiedSlots";
    var _data = "{'a':'" + NS_MSS_UID + "','b':'" + fStart + "','c':'" + fEnd + "'}";
    var events = [];
    NS_MakeRequest(_URL, _data, function (d) {
        var _Today = new Date();
        var strToday = ((_Today.getMonth() + 1) < 10 ? '0' : '') + (_Today.getMonth() + 1) + "/" + ((_Today.getDate() < 10) ? '0' : '') + _Today.getDate() + "/" + _Today.getFullYear();
        $.each(d, function (i, o) {
            if (o.ForDate >= strToday) {
                events.push({ title: o.AtTime + ' - ' + o.EndTime, start: o.ForDate + ' ' + o.AtTime, end: o.ForDate + ' ' + o.EndTime, color: '#ff0000', textColor: 'white' });
            }
        });
        var _URL2 = "/DesktopModules/NS_ManageScheduledServices/rh.asmx/ListMyAvail";
        var _data2 = "{'ProID':'" + NS_MSS_UID + "'}";
        // get List of time-slot available
        NS_MakeRequest(_URL2, _data2, function (d) {
            var TodaysEvent = [];
            var now = new Date();
            var lstDays = [];
            // first create the array of dates from today's to end date on calendar
            for (var i = _Today ; i <= end; i.setDate(i.getDate() + 1)) {
                lstDays.push(new Date(i));
            }
            // now iterate through each date and see the data for each date
            $.each(lstDays, function (i, oDay) {// Loop all the days from start to end
                var lstCurrDay = [];
                // Make another array of all the start-end time to loop through it
                for (var j = 0; j < d.length; j++) {
                    if (NS_FormatJSONDate(d[j].Date, 'mm/dd/yy') == getLocaleShortDateString(oDay)) {
                        lstCurrDay.push(d[j]);
                    }
                }
                // Now iterate through all the times the Provider is not available
                for (var x = 0; x < lstCurrDay.length; x++) {
                    var _tempDate = NS_FormatJSONDate(lstCurrDay[x].Date, 'mm/dd/yy');
                    var _tempStart = NS_ParseDateStr(lstCurrDay[x].StartTime.Hours, lstCurrDay[x].StartTime.Minutes);
                    var _tempEnd = NS_ParseDateStr(lstCurrDay[x].EndTime.Hours, lstCurrDay[x].StartTime.Minutes);
                    events.push({id:lstCurrDay[x].AvailID, title: _tempStart + ' - ' + _tempEnd, start: _tempDate + ' ' + _tempStart, end: _tempDate + ' ' + _tempEnd, color: '#1e319b', textColor: 'white' });
                }
            });
            callback(events);
        });
    });
}

function SaveTimeSlot() {
    if (NS_MSS_IsSoonest) { // ASAP Soonest appointment case
        if (NS_MA_IsSlotAvailable) {
            var _str = 'You have selected ' + $("#NS_lblStartHour").text() + ' to ' + $("#NS_lblEndHour").text() + ' on ' + $("#lblSlotDate").text() + "<br>Continue with this ?";
            bootbox.confirm(_str, function (r) {
                if (r == true) {
                    var oTimeSlot = '{"TimeSlot":[{"dated":"' + $("#lblSlotDate").text() + '","start":"' + $("#NS_lblStartHour").text() + '","end":"' + $("#NS_lblEndHour").text() + '"}]}';
                    var _CSV = $("#lblSlotDate").text() + "_" + $("#NS_lblStartHour").text() + "_" + $("#NS_lblEndHour").text();
                    SetSoonestAppointment(_CSV);
                }
            });
        }
        else {
            bootbox.alert('Sorry the chosen slot is not available. Please try other time slot');
            return false;
        }
    }
    else {// My Availability configuration
        if (NS_MA_IsSlotAvailable) {
            var _str = 'You have selected ' + $("#NS_lblStartHour").text() + ' to ' + $("#NS_lblEndHour").text() + ' on ' + $("#lblSlotDate").text() + "<br>Continue with this ?";
            bootbox.confirm(_str, function (r) {
                if (r == true) {
                    var oTimeSlot = '{"TimeSlot":[{"dated":"' + $("#lblSlotDate").text() + '","start":"' + $("#NS_lblStartHour").text() + '","end":"' + $("#NS_lblEndHour").text() + '"}]}';
                    var _CSV = $("#lblSlotDate").text() + "_" + $("#NS_lblStartHour").text() + "_" + $("#NS_lblEndHour").text();
                      SaveMyAvail(_CSV);
                }
            })
        }
        else {
            bootbox.alert('Sorry, you already have a appointment on ' + $("#lblSlotDate").text());
            return false;
        }
    }

}

function NS_MSS_ShowSoonestCal() {
    $('#NS_dvCaldendar').fullCalendar({
        header: { left: 'prev,next today', center: 'title', right: '' },
        defaultView: 'month', selectable: true,
        defaultDate: (new Date()),
        events: function (start, end, timezone, callback) {
            //  start = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate());
            // start = NS_FormatDate(start, 'mm/dd/yy');
            //  end = new Date(end._d.getFullYear(), end._d.getMonth(), end._d.getDate());
            // end = NS_FormatDate(end, 'mm/dd/yy');
            NS_GetProOccupiedSlots(start, end, timezone, callback);
        },
        selectHelper: true,
        select: function (start, end, a, b, c) {
            var today = new Date();
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            var check = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate() + 1);
            if (check < today) {
                bootbox.alert('Sorry, you cannot select date before today');
                return false;
            }
            var _m = moment();
            var _IsToday = (_m.format("DD-MM-YYYY") == start._d.format('dd-MM-yyyy'));
            var SliderStartHours = 00;
            var SliderStartMinutes = 00;
            var SliderEndHours = 23;
            var SliderEndMinutes = 45;
            if (_IsToday) {
                var _afterDate = _m.add(NS_Session, 'minutes');
                var _MaxDate = new Date(_m._d.getFullYear(), _m._d.getMonth(), _m._d.getDate(), SliderEndHours, SliderEndMinutes);
                if (_afterDate > _MaxDate) {
                    //SliderEndHours = _afterDate.hours() + 1;
                    //SliderEndMinutes = _afterDate.minutes();
                }
                var _t = new Date();
                SliderStartHours = (_t.getHours() + 1);
                SliderStartMinutes = (_t.getMinutes());
                 if (SliderStartMinutes < 15) {
                    SliderStartMinutes = 15;
                }
                if (SliderStartMinutes > 15 && SliderStartMinutes < 30) {
                    SliderStartMinutes = 30;
                }
                if (SliderStartMinutes > 30 && SliderStartMinutes < 45) {
                    SliderStartMinutes = 45;
                }
                if (SliderStartMinutes > 45) {
                    SliderStartMinutes = 00;
                    SliderStartHours++;
                }
            }
            // start = NS_FormatDate(Date.parse(start), 'mm/dd/yy HH:MM');
            //  end = NS_FormatDate(Date.parse(end), 'mm/dd/yy HH:MM');
            startTimeRange = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate()+1, SliderStartHours, SliderStartMinutes);
            endTimeRange = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate()+1, SliderEndHours, SliderEndMinutes);
            TimePostFix = "";
            var tempH = "";
            var finalH = "";
            NS_Session = 0;
            $.each(oAppointment.Services, function (v, i) {
                NS_Session += (parseInt(i.Duration) * parseInt(i.Qty));
            });
            var tempM = NS_Session;
            var tempVal = (NS_Session / 60);
            if (NS_Session < 60) {
                tempH = 00;
                tempM = NS_Session;
                finalH = tempH;
            }
            else {
                var tempH = parseInt(tempVal);
                var tempM = tempVal - tempH;
                finalH = 0 + tempH;
            }
            var _Title = NS_FormatDate(Date.parse(check), 'mm/dd/yy');
            $("#lblSlotDate").text(_Title);
            // $("#lblServiceSession").text(NS_Session + ' minute(s)');
            var defaultEnd = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate(), finalH, tempM);
            NS_MA_IsSlotAvailable = false;
            $("#imgAvail").hide();
            $("#lblAvail").hide();
            var dialog = $("#NS_dvSliderOuter").dialog({
                autoOpen: true, height: 450, width: 900, modal: true,
                title: 'Choose Date & Time slot',
                buttons: {
                    "Ok": SaveTimeSlot,
                    Cancel: function () {
                        dialog.dialog("close");
                        $("#NS_dvTimeSlider").dateRangeSlider("destroy");
                    }
                },
                close: function () {
                    dialog.dialog("close");
                    $("#NS_dvTimeSlider").dateRangeSlider("destroy");
                }
            })
            $("#NS_dvTimeSlider").dateRangeSlider({
                arrows: false, symmetricPositionning: true,
                bounds: { min: startTimeRange, max: endTimeRange },
                defaultValues: { min: startTimeRange, max: defaultEnd },
                 range: { min: { minutes: NS_Session }, max: { minutes: NS_Session } },
                step: { minutes: 15 },
                formatter: function (value) {
                    var hour = value.getHours(),
                        minute = value.getMinutes();
                    return "" + (hour) + ":" + (minute < 10 ? "0" + minute : minute);// +ampm;
                },
            }).bind("valuesChanged", function (e, data) {
                var minHour = data.values.min.getHours(),
                    minMinutes = data.values.min.getMinutes(),
                    maxHour = data.values.max.getHours(),
                    maxMinutes = data.values.max.getMinutes()
                finalMin = "" + (minHour) + ":" + (minMinutes < 10 ? "0" + minMinutes : minMinutes),
                finalMax = "" + (maxHour) + ":" + (maxMinutes < 10 ? "0" + maxMinutes : maxMinutes);
                $("#NS_lblStartHour").text(finalMin);
                $("#NS_lblEndHour").text(finalMax);
                var _S = $("#lblSlotDate").text() + ' ' + finalMin;
                var _E = $("#lblSlotDate").text() + ' ' + finalMax;
                  NS_IsProviderSlotFree(_S, _E);
            });
            $('#NS_dvCaldendar').fullCalendar('unselect');
        },
        eventClick: function (calEvent, jsEvent, view) {},
        dayClick: function (calEvent, jsEvent, view, a, b, c) { },
        editable: true,
        slotEventOverlap: false,
        eventLimit: true, // allow "more" link when too many events
        views: {
            agenda: {
                eventLimit: 3 // adjust to 6 only for agendaWeek/agendaDay
            }
        }
    })
}

function NS_IsProviderSlotFree(s, e) {
    $("#imgAvail").attr('src', '/images/dnnanim.gif').show()
    $("#lblAvail").text("Evaluating...");
    //int AppID,int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string Comment
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/IsProviderSlotFree";
    //int ProID, string StartDateTime, string EndDateTime
    //time format : "09/07/2016 9:35
    var _data = "{'ProID':'" + NS_MSS_UID + "','StartDateTime':'" + s + "','EndDateTime':'" + e + "'}";
    NS_MakeRequest(_URL, _data, NS_IsProviderSlotFree_SuCB);
}
function NS_IsProviderSlotFree_SuCB(d) {
    NS_MA_IsSlotAvailable = d;
    if (d == true) {
        $("#imgAvail").attr('src', '/DesktopModules/NS_MakeAppointment/Images/Site/tsgrant.png').show();
        $("#lblAvail").html("<span class='ava'>This slot is available</div>").show();
    }
    else {
        $("#imgAvail").attr('src', '/DesktopModules/NS_MakeAppointment/Images/Site/tserror.png').show()
        $("#lblAvail").html("<span class='err'>Sorry,This slot is not free</div>").show();
    }
}
function CanSetAvailability(s, e) {
    $("#imgAvail").attr('src', '/images/dnnanim.gif').show()
    $("#lblAvail").text("Evaluating...");
    var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/CanSetAvailability";
    //time format : "09/07/2016 9:35
    var _data = "{'ProID':'" + NS_MSS_UID + "','StartDateTime':'" + s + "','EndDateTime':'" + e + "'}";
    NS_MakeRequest(_URL, _data, CanSetAvailability_SuCB);
}
function CanSetAvailability_SuCB(d) {
    NS_MA_IsSlotAvailable = d;
    if (d == true) {
        $("#imgAvail").attr('src', '/DesktopModules/NS_MakeAppointment/Images/Site/tsgrant.png').show();
        $("#lblAvail").html("<span class='ava'>You can go ahead & save this time frame</div>").show();
    }
    else {
        $("#imgAvail").attr('src', '/DesktopModules/NS_MakeAppointment/Images/Site/tserror.png').show()
        $("#lblAvail").html("<span class='err'>Sorry, you already have a appointment on other time frame for this date</div>").show();
    }
}

function GetRouteFrom() {
    var f = oAppointment.ProviderInfo.Profile.Street + ", " + oAppointment.ProviderInfo.Profile.City + ", " + oAppointment.ProviderInfo.Profile.Region +', United States America';
    var t = oAppointment.ClientInfo.Profile.Street + ", " + oAppointment.ClientInfo.Profile.City + ", " + oAppointment.ClientInfo.Profile.Region + ', United States America';
    if (f == '') return;
    // Center initialized to Naples, Italy
    var myOptions = {
        zoom: 10,
        center: new google.maps.LatLng(_Lati, _longi),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var dirdialog = $("#dvdirmap").dialog({
        autoOpen: true, height: 450, width: 900, modal: true,
        title: 'Driving direction to client',
        buttons: {
            "Close": function () {
                dirdialog.dialog("close");
            }
        },
        close: function () {
            $("#dvdirmap").dialog("close");
        }
    });
    // Draw the map
    var mapObject = new google.maps.Map(document.getElementById("dvdirmap"), myOptions);

    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
        origin: f,
        destination: t,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    };
    directionsService.route(
      directionsRequest,
      function (response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
              new google.maps.DirectionsRenderer({
                  map: mapObject,
                  directions: response
              });
          }
          else
              $("#error").append("Unable to retrieve the route<br />");
      }
    );
}

function NS_ProviderDenyASAP(AID) {
bootbox.confirm('Are you sure to accept ??', function (r) {
    if (r) {
        var _URL = "/DesktopModules/NS_MakeAppointment/rh.asmx/ProviderDenyASAP";
        var _data = "{'AppID':'" + AID + "'}";
        NS_MakeRequest(
            _URL, _data,
            function (d) {
                bootbox.alert('Appointment updated successfully', function () {
                    window.location.reload();
                });
            }
        )
    }
});
}