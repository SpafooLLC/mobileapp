var ProMyAvailabilityController;
(function (ProMyAvailabilityController_1) {
    var ProMyAvailabilityController = (function () {
        function ProMyAvailabilityController($q, $state, $scope, $location, CustomerHttp, $window, SharedHttp, moment, uiCalendarConfig) {
            this.$q = $q;
            this.$state = $state;
            this.$scope = $scope;
            this.$location = $location;
            this.CustomerHttp = CustomerHttp;
            this.$window = $window;
            this.SharedHttp = SharedHttp;
            this.moment = moment;
            this.uiCalendarConfig = uiCalendarConfig;
            var self = this;
            self.userId = window.localStorage.getItem('CustomerID');
            self.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    header: {
                        right: 'today prev,next'
                    },
                    dayClick: function (date, jsEvent, view) {
                        var selectedDate = moment(date).format('YYYY-MM-DD'); // set dateFrom based on user click on calendar
                        self.staticEvents1[0].events.push({
                            start: selectedDate, allday: true,
                            dateField: moment(date).format('MMM DD'),
                            dateFieldHidden: moment(date).format('MM/DD/YYYY'),
                            proId: 0,
                            color: '#008000'
                        });
                    },
                }
            };
            // any other event sources...
            self.availList();
        }
        ProMyAvailabilityController.prototype.availList = function () {
            var self = this;
            self.staticEvents1 =
                [
                    // your event source
                    {
                        events: [],
                        color: 'green',
                        textColor: 'black' // an option!
                    }];
            //    self.staticEvents[0].events.push(val)
            self.eventSource = [self.staticEvents, self.staticEvents1];
            self.CustomerHttp.get('/ListMyAvail/' + self.userId).then(function (res) {
                self.serviceData = JSON.parse(res.ListMyAvailResult);
                for (var i = 0; i < self.serviceData.length; i++) {
                    var starthours = self.serviceData[i].StartTime.Hours;
                    var endhours = self.serviceData[i].EndTime.Hours;
                    var dateMonth = self.serviceData[i].Date;
                    var dateMonth1 = self.SharedHttp.getFormatedDate(dateMonth, "MM DD");
                    var abcDate = (dateMonth).replace("/Date(", "").replace(")/", "");
                    var getmonth = '';
                    self.staticEvents1[0].events.push({
                        start: moment(parseInt(abcDate)).format('YYYY-MM-DD'),
                        startTime: new Date(1970, 0, 1, starthours, self.serviceData[i].StartTime.Minutes),
                        endTime: new Date(1970, 0, 1, endhours, self.serviceData[i].EndTime.Minutes),
                        id: self.serviceData[i].AvailID,
                        proId: self.serviceData[i].ProviderID,
                        dateField: dateMonth1,
                        dateFieldHidden: moment(parseInt(abcDate)).format('MM/DD/YYYY'),
                        color: '#008000'
                    });
                }
            }, function (e) {
            });
        };
        ProMyAvailabilityController.prototype.deleteEvent = function (avaiId, proId, $index) {
            var con = confirm("Are you sure want to remove?");
            if (con) {
                this.staticEvents1[0].events.splice($index, 1);
                this.CustomerHttp.get("/RemoveAvail/" + avaiId).then(function (res) { }, function (e) { });
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
                if (!data[i].hasOwnProperty('endTime')) {
                    this.message = "Choose time on respective date";
                    $("#PDone").modal("toggle");
                    return;
                }
                if (!data[i].hasOwnProperty('startTime')) {
                    this.message = "Choose time on respective date";
                    $("#PDone").modal("toggle");
                    return;
                }
                var date1 = new Date(data[i].startTime);
                var date2 = new Date(data[i].endTime);
                //  alert("date1" + date1 + "date2" + date2);
                if (date2 <= date1) {
                    this.message = "Start date is greater than end date";
                    $("#PDone").modal("toggle");
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
                if (dateend.getHours() >= 12) {
                    endResult = dateend.getHours() - 12;
                    end = endResult + ":" + dateend.getMinutes() + " PM";
                }
                else {
                    //alert(endResult);
                    end = dateend.getHours() + ":" + dateend.getMinutes() + " AM";
                }
                if (datestart.getHours() >= 12) {
                    startResult = datestart.getHours() - 12;
                    start = startResult + ":" + datestart.getMinutes() + " PM";
                }
                else {
                    start = datestart.getHours() + ":" + datestart.getMinutes() + " AM";
                }
                //alert("start" + start + "end" + end);
                csv += data[i].dateFieldHidden + "_" + start + "_" + end + "|";
            }
            var jsonData = { CSV: csv, ProID: this.userId };
            var self = this;
            this.CustomerHttp.post(jsonData, "/AddMyAvail").then(function (res) {
                self.message = "Updated Successfully";
                $("#PDone").modal("toggle");
            });
        };
        ProMyAvailabilityController.$inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp', 'moment', 'uiCalendarConfig'];
        return ProMyAvailabilityController;
    }());
    angular.module('spafoo.ctrl.ProMyAvailability', []).controller('ProMyAvailability', ProMyAvailabilityController);
})(ProMyAvailabilityController || (ProMyAvailabilityController = {}));

//# sourceMappingURL=Pro-MyAvailability.controller.js.map
