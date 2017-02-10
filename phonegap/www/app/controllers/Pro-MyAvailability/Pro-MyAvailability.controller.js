var ProMyAvailabilityController;
(function (ProMyAvailabilityController_1) {
    var ProMyAvailabilityController = (function () {
        function ProMyAvailabilityController($q, $state, $scope, $location, CustomerHttp, $window, SharedHttp, moment, uiCalendarConfig, $stateParams) {
            this.$q = $q;
            this.$state = $state;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.SharedHttp = SharedHttp;
            this.moment = moment;
            this.uiCalendarConfig = uiCalendarConfig;
            this.$stateParams = $stateParams;
            var self = this;
            self.AddressID = $stateParams.AddressID;
            self.ClientID = $stateParams.ClientID;
            self.ProviderID = $stateParams.ProviderID;
            self.AppID = $stateParams.AppID;
            self.name = $stateParams.Name1;
            self.totalTime = $stateParams.totalTime;
<<<<<<< HEAD
=======
            if (self.AppID != "null") {
                self.SharedHttp.UnSeenStatus(self.AppID);
            }
>>>>>>> refs/remotes/origin/PawanBranch
            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
            self.userId = window.localStorage.getItem('CustomerID');
            self.staticEvents1 =
                [
                    // your event source
                    {
                        events: [],
                    }];
            var count = 0;
            self.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    eventLimit: 1,
                    selectHelper: true,
                    header: {
                        right: 'today prev,next'
                    },
                    dayClick: function (date, jsEvent, view) {
<<<<<<< HEAD
                        if (date <= new Date().setHours(0)) {
=======
                        //   alert(JSON.stringify(date) + "---->  " + JSON.stringify(new Date().setHours(0)));
                        if (!self.isToday(date, jsEvent)) {
>>>>>>> refs/remotes/origin/PawanBranch
                            self.message = "Selected date should not be before current date";
                            $("#PDoneError").modal();
                            return;
                        }
<<<<<<< HEAD
=======
                        //if (date <= new Date().setHours(0)) {
                        //    self.message = "Selected date should not be before current date";
                        //    $("#PDoneError").modal();
                        //    return;
                        //}
>>>>>>> refs/remotes/origin/PawanBranch
                        var selectedDate = moment(date).format('YYYY-MM-DD'); // set dateFrom based on user click on calendar
                        if (self.ClientID == 'null') {
                            $("#start" + (self.staticEvents1[0].events.length - 1)).focus();
                            self.staticEvents1[0].events.push({
                                start: selectedDate, allday: true,
                                dateField: moment(date).format('MMM DD'),
                                dateFieldHidden: moment(date).format('MM/DD/YYYY'),
                                proId: 0,
                                color: '#1e319b',
                                textColor: '#ffffff'
                            });
                        }
                        else {
                            $("#start" + (self.staticEvents1[0].events.length - 1)).focus();
                            if (count > 0) {
                                self.staticEvents1[0].events.splice(self.staticEvents1[0].events.length - 1, 1);
                            }
                            count++;
                            self.staticEvents1[0].events.push({
                                start: selectedDate, allday: true,
                                dateField: moment(date).format('MMM DD'),
                                dateFieldHidden: moment(date).format('MM/DD/YYYY'),
                                proId: -1,
                                color: '#1e319b',
                                textColor: '#ffffff'
                            });
                        }
                    },
                }
            };
            setTimeout(function () {
<<<<<<< HEAD
                $('.fc-toolbar > .fc-center').html('<div class="pctip"><i class="fa red2 fa-square"></i> Provider Not Available &nbsp;&nbsp;&nbsp;<i class="fa blue fa-square"></i> Already Reserved</div>');
=======
                $('.fc-toolbar > .fc-center').html('<div class="pctip"><i class="fa blue2 fa-square"></i> I am available &nbsp;&nbsp;&nbsp;<i class="fa red2 fa-square"></i> Reserved Appointment</div>');
>>>>>>> refs/remotes/origin/PawanBranch
            }, 0);
            // any other event sources...
            self.availList();
        }
<<<<<<< HEAD
=======
        ProMyAvailabilityController.prototype.isToday = function (start, todayAnd) {
            var today = new Date();
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            var check = new Date(start._d.getFullYear(), start._d.getMonth(), start._d.getDate() + 1);
            return todayAnd ? check >= today : moment(check).format('X') == moment(today).format('X');
        };
>>>>>>> refs/remotes/origin/PawanBranch
        ProMyAvailabilityController.prototype.bookedSlot = function () {
            var self = this;
            var date = new Date();
            var end = date.setDate(date.getDate() + 30);
            var data = { ProID: window.localStorage.getItem("CustomerID"), StartDateTime: moment().format('MM/DD/YYYY'), EndDateTime: moment(end).format('MM/DD/YYYY') };
            self.CustomerHttp.post(data, '/GetProOccupiedSlots').then(function (res) {
                for (var i = 0; i < res.length; i++) {
                    self.staticEvents1[0].events.push({
                        title: res[i].atTimeField + " - " + res[i].endTimeField,
                        start: moment(res[i].forDateField).format('YYYY-MM-DD'),
                        color: '#ff0000',
                        textColor: '#ffffff',
                        startTime: 0
                    });
                }
            }, function (e) {
                alert("error" + JSON.stringify(e));
            });
        };
        ProMyAvailabilityController.prototype.availList = function () {
            var self = this;
            //    self.staticEvents[0].events.push(val)
            self.eventSource = [self.staticEvents, self.staticEvents1];
            self.CustomerHttp.get('/ListMyAvail/' + self.userId).then(function (res) {
                self.serviceData = JSON.parse(res.ListMyAvailResult);
                for (var i = 0; i < self.serviceData.length; i++) {
                    var starthours = self.serviceData[i].StartTime.Hours;
                    var start = '';
                    var getmin1start = '';
                    var mintusStart = self.serviceData[i].StartTime.Minutes;
                    if (mintusStart < 10) {
                        getmin1start = "0" + mintusStart;
                    }
                    else {
                        getmin1start = mintusStart;
                    }
                    if (starthours >= 12) {
                        starthours = starthours - 12;
                        if (starthours == 0) {
                            starthours = 12;
                        }
                        start = starthours + ":" + getmin1start + " PM";
                    }
                    else {
                        start = starthours + ":" + getmin1start + " AM";
                    }
                    var endhours = self.serviceData[i].EndTime.Hours;
                    var end = '';
                    var getmin1end = '';
                    var mintusEnd = self.serviceData[i].EndTime.Minutes;
                    if (mintusEnd < 10) {
                        getmin1end = "0" + mintusEnd;
                    }
                    else {
                        getmin1end = mintusEnd;
                    }
                    if (endhours >= 12) {
                        endhours = endhours - 12;
                        if (endhours == 0) {
                            endhours = 12;
                        }
                        end = endhours + ":" + getmin1end + " PM";
                    }
                    else {
                        end = endhours + ":" + getmin1end + " AM";
                    }
                    var dateMonth = self.serviceData[i].Date;
                    var dateMonth1 = self.SharedHttp.getFormatedDate(dateMonth, "MM DD");
                    var abcDate = (dateMonth).replace("/Date(", "").replace(")/", "");
                    //var minStrt = "";
                    //if (self.serviceData[i].StartTime.Minutes == 0) {
                    //    minStrt = "00"
                    //}
                    //else {
                    //    minStrt = self.serviceData[i].StartTime.Minutes;
                    //}
                    //var minEnd = "";
                    //if (self.serviceData[i].EndTime.Minutes == 0) {
                    //    minEnd = "00"
                    //}
                    //else {
                    //    minEnd = self.serviceData[i].EndTime.Minutes;
                    //}
                    self.staticEvents1[0].events.push({
                        start: moment(parseInt(abcDate)).format('YYYY-MM-DD'),
                        title: start + " - " + end,
<<<<<<< HEAD
                        startTime: new Date(1970, 0, 1, starthours, parseInt(getmin1start)),
                        endTime: new Date(1970, 0, 1, endhours, parseInt(getmin1end)),
=======
                        startTime: new Date(1970, 0, 1, self.serviceData[i].StartTime.Hours, parseInt(getmin1start)),
                        endTime: new Date(1970, 0, 1, self.serviceData[i].EndTime.Hours, parseInt(getmin1end)),
>>>>>>> refs/remotes/origin/PawanBranch
                        id: self.serviceData[i].AvailID,
                        proId: self.serviceData[i].ProviderID,
                        dateField: moment(dateMonth).format('MMM DD'),
                        dateFieldHidden: moment(parseInt(abcDate)).format('MM/DD/YYYY'),
                        color: '#1e319b',
                        textColor: '#ffffff'
                    });
                }
                self.bookedSlot();
            }, function (e) {
            });
        };
        ProMyAvailabilityController.prototype.deleteEvent = function (avaiId, proId, $index) {
            var con = confirm("Are you sure want to remove?");
            if (con) {
                if (avaiId == null || avaiId == "" || avaiId == undefined || avaiId == "undefined" || avaiId == 0) {
                    this.staticEvents1[0].events.splice($index, 1);
                }
                else {
                    this.staticEvents1[0].events.splice($index, 1);
                    this.CustomerHttp.get("/RemoveAvail/" + avaiId).then(function (res) { }, function (e) { });
                }
            }
        };
        ProMyAvailabilityController.prototype.convertFormat = function (date) {
            var datestart = new Date(date);
            var startResult = 0;
            var endResult = 0;
            var start = '';
            var end = '';
            var getendmin = '';
            var getmin1 = '';
            if (datestart.getMinutes() < 10) {
                getmin1 = "0" + datestart.getMinutes();
            }
            else {
                getmin1 = datestart.getMinutes().toString();
            }
            if (datestart.getHours() >= 12) {
                startResult = datestart.getHours() - 12;
                if (startResult == 0) {
                    startResult = 12;
                }
                start = startResult + ":" + getmin1 + " PM";
            }
            else {
                start = datestart.getHours() + ":" + getmin1 + " AM";
            }
        };
        ProMyAvailabilityController.prototype.doUpdate = function (data) {
            // alert(JSON.stringify(data));
            var csv = "";
            if (data == 0) {
                this.message = "Add a event to proceed";
                $("#PDone").modal("toggle");
                return;
            }
            for (var i = 0; i < data.length; i++) {
                if (!data[i].hasOwnProperty('endTime') && data[i].startTime != 0) {
                    this.message = "Choose time on respective date";
                    $("#PDoneError").modal("toggle");
                    return;
                }
                if (!data[i].hasOwnProperty('startTime')) {
                    this.message = "Choose time on respective date";
                    $("#PDoneError").modal("toggle");
                    return;
                }
                var date1 = new Date(data[i].startTime);
                var date2 = new Date(data[i].endTime);
                //  alert("date1" + date1 + "date2" + date2);
                if (date2 <= date1) {
                    this.message = "Start date is greater than end date";
                    $("#PDoneError").modal("toggle");
                    return;
                }
            }
            for (var i = 0; i < data.length; i++) {
                var datestart = new Date(data[i].startTime);
                var dateend = new Date(data[i].endTime);
                var startResult = 0;
                var endResult = 0;
                var start = '';
                var end = '';
                var getendmin = '';
                if (dateend.getMinutes() < 10) {
                    getendmin = "0" + dateend.getMinutes();
                }
                else {
                    getendmin = dateend.getMinutes().toString();
                }
                if (dateend.getHours() >= 12) {
                    endResult = dateend.getHours() - 12;
                    if (endResult == 0) {
                        endResult = 12;
                    }
                    end = endResult + ":" + getendmin + " PM";
                }
                else {
                    //alert(endResult);
                    end = dateend.getHours() + ":" + getendmin + " AM";
                }
                var getmin1 = '';
                if (datestart.getMinutes() < 10) {
                    getmin1 = "0" + datestart.getMinutes();
                }
                else {
                    getmin1 = datestart.getMinutes().toString();
                }
                if (datestart.getHours() >= 12) {
                    startResult = datestart.getHours() - 12;
                    if (startResult == 0) {
                        startResult = 12;
                    }
                    start = startResult + ":" + getmin1 + " PM";
                }
                else {
                    start = datestart.getHours() + ":" + getmin1 + " AM";
                }
                //alert("start" + start + "end" + end);
                if (data[i].hasOwnProperty('dateFieldHidden')) {
                    csv += data[i].dateFieldHidden + "_" + start + "_" + end + "|";
                }
            }
            console.log();
            var jsonData = { CSV: csv, ProID: this.userId };
            console.log(jsonData);
            var self = this;
            this.CustomerHttp.post(jsonData, "/AddMyAvail").then(function (res) {
                self.message = "Updated Successfully";
                $("#PDone").modal("toggle");
            });
        };
        ProMyAvailabilityController.prototype.getFreeSlot = function (proId, date, start, end, dateField, $index) {
            var self = this;
            var datestart1 = new Date(start);
            var dateend = new Date(end);
            var startResult = 0;
            var endResult = 0;
            var start1 = '';
            var end1 = '';
            var endmin = '';
            var startmin = '';
            if (start == null || start == undefined || start == "undefined" || start == 0) {
                self.message = "Please select start date";
                $("#PDoneError").modal();
            }
            if (dateend.getMinutes() < 10) {
                endmin = "0" + dateend.getMinutes();
            }
            else {
                endmin = dateend.getMinutes().toString();
            }
            if (dateend.getHours() >= 12) {
                endResult = dateend.getHours() - 12;
                if (endResult == 0) {
                    endResult = 12;
                }
                end1 = endResult + ":" + endmin + " PM";
            }
            else {
                //alert(endResult);
                end1 = dateend.getHours() + ":" + endmin + " AM";
            }
            if (datestart1.getMinutes() < 10) {
                startmin = "0" + datestart1.getMinutes();
            }
            else {
                startmin = datestart1.getMinutes().toString();
            }
            if (datestart1.getHours() >= 12) {
                startResult = datestart1.getHours() - 12;
                if (startResult == 0) {
                    startResult = 12;
                }
                start1 = startResult + ":" + startmin + " PM";
            }
            else {
                start1 = datestart1.getHours() + ":" + startmin + " AM";
            }
            var data = { ProID: localStorage.getItem('CustomerID'), StartDateTime: date + " " + start1, EndDateTime: date + " " + end1 };
            self.CustomerHttp.post(data, "/CanSetAvailability").then(function (res) {
                if (res == false) {
                    self.indexBtn = $index;
                    //self.message = "Slot from " + start1 + " to " + end1 +" on " + dateField + " is not available";
                    self.message = "Sorry, you already have a appointment on other time frame for this date";
                    $("#PDoneError").modal();
                    return;
                }
            }, function (e) {
            });
        };
        ProMyAvailabilityController.prototype.emptyTimeBox = function (index) {
            var self = this;
            if (typeof (index) == "number") {
                delete self.staticEvents1[0].events[index].startTime;
                delete self.staticEvents1[0].events[index].endTime;
            }
        };
        ProMyAvailabilityController.prototype.calculateEndTime = function (proId, dateFieldHidden, startTime, dateField, index) {
            var self = this;
            var date = new Date(startTime);
            var min = parseInt(self.totalTime);
            var endhours = date.setMinutes(min + date.getMinutes());
            console.log(endhours);
            self.staticEvents1[0].events[index].endTime = new Date(endhours);
            self.getFreeSlot(proId, dateFieldHidden, startTime, self.staticEvents1[0].events[index].endTime, dateField, index);
        };
        ProMyAvailabilityController.prototype.setDetails = function () {
            var self = this;
            var data = {};
            if (data == 0) {
                this.message = "Add a event to proceed";
                $("#PDoneError").modal("toggle");
                return;
            }
            for (var i = 0; i < self.staticEvents1[0].events.length; i++) {
                if (self.staticEvents1[0].events[i].proId == -1) {
                    if (!self.staticEvents1[0].events[i].hasOwnProperty('endTime')) {
                        self.message = "Choose time on respective date";
                        $("#PDoneError").modal("toggle");
                        return;
                    }
                    if (!self.staticEvents1[0].events[i].hasOwnProperty('startTime')) {
                        self.message = "Choose time on respective date";
                        $("#PDoneError").modal("toggle");
                        return;
                    }
                    var date1 = new Date(self.staticEvents1[0].events[i].startTime);
                    var date2 = new Date(self.staticEvents1[0].events[i].endTime);
                    //  alert("date1" + date1 + "date2" + date2);
                    if (date2 <= date1) {
                        this.message = "Start date is greater than end date";
                        $("#PDoneError").modal("toggle");
                        return;
                    }
                }
            }
            for (var i = 0; i < self.staticEvents1[0].events.length; i++) {
                if (self.staticEvents1[0].events[i].proId == -1) {
                    var datestart = new Date(self.staticEvents1[0].events[i].startTime);
                    var dateend = new Date(self.staticEvents1[0].events[i].endTime);
                    var startResult = 0;
                    var endResult = 0;
                    var start = '';
                    var end = '';
                    if (datestart.getHours() >= 12) {
                        startResult = datestart.getHours() - 12;
                        if (startResult == 0) {
                            startResult = 12;
                        }
                        start = startResult + ":" + datestart.getMinutes() + " PM";
                    }
                    else {
                        start = datestart.getHours() + ":" + datestart.getMinutes() + " AM";
                    }
                    if (dateend.getHours() >= 12) {
                        endResult = dateend.getHours() - 12;
                        if (endResult == 0) {
                            endResult = 12;
                        }
                        end = endResult + ":" + dateend.getMinutes() + " PM";
                    }
                    else {
                        end = dateend.getHours() + ":" + dateend.getMinutes() + " AM";
                    }
                    data = { AddressID: self.AddressID, AppID: self.AppID, AtTime: start, ClientID: self.ClientID, Comment: "", EndTime: end, ForDate: self.staticEvents1[0].events[i].dateFieldHidden, ProviderID: self.ProviderID };
                    self.CustomerHttp.post(data, "/UpdateAppBasicInfo").then(function (res) {
                        self.CustomerHttp.get("/UpdateAppStatus/" + res + "/5").then(function () {
                            self.$state.go("ProAppointments");
                        });
                    });
                }
            }
        };
        ProMyAvailabilityController.$inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp', 'moment', 'uiCalendarConfig', "$stateParams"];
        return ProMyAvailabilityController;
    }());
    angular.module('spafoo.ctrl.ProMyAvailability', []).controller('ProMyAvailability', ProMyAvailabilityController);
})(ProMyAvailabilityController || (ProMyAvailabilityController = {}));

//# sourceMappingURL=Pro-MyAvailability.controller.js.map
