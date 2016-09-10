module ProMyAvailabilityController {

    class ProMyAvailabilityController {
        eventSource: any[];
        uiConfig: any;
        staticEvents: any;
        staticEvents1: any;
        userId: any;
        serviceData: any[];
        message: string;
        static $inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp', 'moment', 'uiCalendarConfig'];
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp,
            private moment: any,
            private uiCalendarConfig: any,
          

        ) {
            var self = this;

            console.log(self.serviceData);
            self.userId = window.localStorage.getItem('CustomerID');
            self.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    header: {


                        right: 'today prev,next'
                    },
                    dayClick: function (date: any, jsEvent: any, view: any) {
                   
                        var selectedDate = moment(date).format('YYYY-MM-DD');				    // set dateFrom based on user click on calendar
                        self.staticEvents1[0].events.push({
                            start: selectedDate, allday: true,
                            dateField: moment(date).format('MMM DD'),
                            dateFieldHidden: moment(date).format('MM/DD/YYYY'),
                            proId: 0,
                            color: '#008000'

                        });				    // update Calendar event dateFrom
                        //self.selectedDate = $filter('date')(selectedDate, 'yyyy-MM-dd');;		// update $scope.dateFrom
                        //console.log('$scope.uiConfig', $scope.uiConfig);
                        //console.log('uiCalendarConfig', uiCalendarConfig);
                    },
                    //eventDrop: this.alertOnDrop,
                    //eventResize: this.alertOnResize,
                    //eventRender: this.eventRender
                }
            };
           

           
        
                // any other event sources...

   
            self.availList()
          
            
            //    [
            //    { title: 'All Day Event', start: new Date(y, m, 1) },
            //    { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
            //    { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
            //    { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
            //    { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
            //    { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
            //];
        }
        alertOnEventClick(date: any, jsEvent: any, view: any) {
            alert(date + jsEvent + view);
        }
        availList()
        {

            var self = this;
            var val = new Array();
            self.staticEvents1 =
                [
                    // your event source
                    {
                    events: [],
                        color: 'green',     // an option!
                        textColor: 'black' // an option!
                    }];
             
                //    self.staticEvents[0].events.push(val)
                self.eventSource = [self.staticEvents, self.staticEvents1];
                self.CustomerHttp.get('/ListMyAvail/' + self.userId).then(function (res: any) {
                   
                self.serviceData = JSON.parse(res.ListMyAvailResult);

                for (var i = 0; i < self.serviceData.length; i++) {
                    var starthours = self.serviceData[i].StartTime.Hours;
                    var endhours = self.serviceData[i].EndTime.Hours;
                    if (parseInt(starthours) >= 12) {
                        starthours = starthours - 12;
                        starthours = starthours + ":" + self.serviceData[i].StartTime.Minutes + " PM";
                    }
                    else {
                        starthours = starthours + ":" + self.serviceData[i].StartTime.Minutes + " AM";
                    }
                    if (parseInt(endhours) >= 12) {
                        endhours = endhours - 12;
                        endhours = endhours + ":" + self.serviceData[i].EndTime.Minutes + " PM";
                    }
                    else {
                        endhours = endhours + ":" + self.serviceData[i].EndTime.Minutes + " AM";
                    }
                    var dateMonth = self.serviceData[i].Date;
                    //dateMonth = dateMonth.replace("/Date(", "").replace(")/", "");




                 var   dateMonth1 = self.SharedHttp.getFormatedDate(dateMonth, "MM DD");
                    var abcDate = (dateMonth).replace("/Date(", "").replace(")/", "");
                    var getmonth = '';
                    //if ((dateMonth.date.getMonth() + 1) < 10) {
                    //    getmonth = "0" + parseInt(dateMonth.date.getMonth() + 1);
                    //}
                    //else {
                    //    getmonth = dateMonth.date.getMonth() + 1;
                    //}

                    console.log(starthours + "  " + endhours);
                    val.push({

                        //start: dateMonth.date.getFullYear() + "-" + getmonth + "-" + dateMonth.date.getDate(),
                        //end: dateMonth.date.getFullYear() + "-" + getmonth + "-" + dateMonth.date.getDate(),
                        startTime: starthours,
                        endTime: endhours,
                        id: self.serviceData[i].AvailID,
                        proId: self.serviceData[i].ProviderID,
                        dateField: dateMonth

                        //start: '2016-09-01',
                        //end: '2016-09-01'

                    });
                    self.staticEvents1[0].events.push({
                     
                    //start: dateMonth.date.getFullYear() + "-" + getmonth + "-" + dateMonth.date.getDate(),
                    //    end: dateMonth.date.getFullYear() + "-" + getmonth + "-" + dateMonth.date.getDate(),
                        start: moment(parseInt(abcDate)).format('YYYY-MM-DD'),
                        //end: dateMonth.date.getFullYear() + "-" + getmonth+ "-" + dateMonth.date.getDate(),
                        startTime: starthours,
                        endTime: endhours,
                       id: self.serviceData[i].AvailID,
                      proId: self.serviceData[i].ProviderID,
                      dateField: dateMonth1,
                      dateFieldHidden: moment(parseInt(abcDate)).format('MM/DD/YYYY'),
                      color: '#008000'

                        //start: '2016-09-01',
                        //end: '2016-09-01'

                    });



                }
               
               
                //self.eventSource = self.staticEvents;
                console.log(self.staticEvents);

            }, function (e) {
            });
           

        }
        deleteEvent(avaiId: any, proId: any, $index: any)
        {
            alert("proid" + proId);
            alert(proId);
            var con = confirm("Are you sure want to remove?");
            if (con) {
                
                this.staticEvents1[0].events.splice($index, 1);
                this.CustomerHttp.get("/RemoveAvail/" + avaiId).then(function (res) { }, function (e) { });
            }

        }
        //doUpdate(data: any)
        //{
        //    var csv = "";
        //    for (var i = 0; i < data.length; i++)
        //    {
                
        //           csv += data[i].dateFieldHidden + "_" + data[i].startTime + "_" + data[i].endTime+"|"
                

        //    }
        //    var jsonData = { CSV: csv, ProID: this.userId };
        //    this.CustomerHttp.post(jsonData, "/AddMyAvail").then(function (res: any) { });
        //}
        doUpdate(data: any) {


            var csv = "";

            if (data == 0) {
              
                this.message = "Add a event to proceed";
                $("#PDone").modal("toggle");
                return;
            }
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (!data[i].hasOwnProperty('endTime') || !data[i].hasOwnProperty('startTime')) {
                    alert("called has own property" + !data[i].hasOwnProperty('endTime') + "clled" + !data[i].hasOwnProperty('startTime'))
                    this.message = "Choose time on respective date";
                    $("#PDone").modal("toggle");
                    return;

                }
            }

            console.log(data);

            for (var i = 0; i < data.length; i++) {

                csv += data[i].dateFieldHidden + "_" + data[i].startTime + "_" + data[i].endTime + "|"


            }
            var jsonData = { CSV: csv, ProID: this.userId };
            this.CustomerHttp.post(jsonData, "/AddMyAvail").then(function (res: any) { });
        }
    }


    angular.module('spafoo.ctrl.ProMyAvailability', []).controller('ProMyAvailability', ProMyAvailabilityController);

}