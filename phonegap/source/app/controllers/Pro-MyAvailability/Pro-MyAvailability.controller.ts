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
            private uiCalendarConfig: any
        ) {

            var self = this;

            var status = self.$window.localStorage.getItem('LoginStatus');
            if (status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === '') {
                self.$state.go('login');
            }
            self.userId = window.localStorage.getItem('CustomerID');
            self.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    eventLimit: 1,
                    selectHelper: true,
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
                            color: '#1e319b',
                             textColor: '#ffffff'

                        });
                    },

                }
            };




            // any other event sources...

            self.availList();
            self.bookedSlot();


        }
        bookedSlot() {
            var self = this;
            var date = new Date()
            var end = date.setDate(date.getDate() + 30);
            var data = { ProID: window.localStorage.getItem("CustomerID"), StartDateTime: moment().format('MM/DD/YYYY'), EndDateTime: moment(end).format('MM/DD/YYYY') };
           
            self.CustomerHttp.post(data, '/GetProOccupiedSlots').then(function (res) {

                for (var i = 0; i < res.length; i++) {
                   
                    self.staticEvents1[0].events.push({
                        title: res[i].atTimeField + " - " + res[i].endTimeField,
                        start: moment(res[i].forDateField).format('YYYY-MM-DD'),

                        color: '#ff0000',
                        textColor: '#ffffff',
                        startTime:0

                    });
                }
            }, function (e) {
                alert("error" + JSON.stringify(e))

                })
        }
    
      
        availList()
        {

            var self = this;
           
            self.staticEvents1 =
                [
                    // your event source
                    {
                    events: [],
                       // an option!
                    }];
             
                //    self.staticEvents[0].events.push(val)
                self.eventSource = [self.staticEvents, self.staticEvents1];
                self.CustomerHttp.get('/ListMyAvail/' + self.userId).then(function (res: any) {
                   
                self.serviceData = JSON.parse(res.ListMyAvailResult);

                for (var i = 0; i < self.serviceData.length; i++) {
                    var starthours = self.serviceData[i].StartTime.Hours;
                    var endhours = self.serviceData[i].EndTime.Hours;
                   
                    var dateMonth = self.serviceData[i].Date;
               




                 var   dateMonth1 = self.SharedHttp.getFormatedDate(dateMonth, "MM DD");
                    var abcDate = (dateMonth).replace("/Date(", "").replace(")/", "");
                    var getmonth = '';
                    var minStrt = "";
                    if (self.serviceData[i].StartTime.Minutes == 0) {
                        minStrt = "00"
                    }
                    else {
                        minStrt = self.serviceData[i].StartTime.Minutes;
                    }
                    var minEnd="";
                    if (self.serviceData[i].EndTime.Minutes == 0) {
                        minEnd = "00"
                    }
                    else {
                        minEnd = self.serviceData[i].EndTime.Minutes;
                    }
                   
                    self.staticEvents1[0].events.push({
                     
                    
                        start: moment(parseInt(abcDate)).format('YYYY-MM-DD'),
                        title: starthours + ":" + minStrt + " - " + endhours + ":" + minEnd,
                        startTime: new Date(1970, 0, 1, starthours, self.serviceData[i].StartTime.Minutes ),
                        endTime: new Date(1970, 0, 1, endhours, self.serviceData[i].EndTime.Minutes),
                       id: self.serviceData[i].AvailID,
                      proId: self.serviceData[i].ProviderID,
                      dateField: dateMonth1,
                      dateFieldHidden: moment(parseInt(abcDate)).format('MM/DD/YYYY'),
                      color: '#1e319b',
                      textColor: '#ffffff'

                       

                    });



                }
               
               
               

            }, function (e) {
            });
           

        }
        deleteEvent(avaiId: any, proId: any, $index: any)
        {
          
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

        }
      
        doUpdate(data: any) {

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
                if (!data[i].hasOwnProperty('startTime'))
                {
                    
                    this.message = "Choose time on respective date";
                    $("#PDoneError").modal("toggle");
                    return;
                }
                var date1 = new Date(data[i].startTime);
                var date2 = new Date(data[i].endTime);
              //  alert("date1" + date1 + "date2" + date2);
                if (date2 <= date1)
                {
                    this.message = "Start date is greater than end date";
                    $("#PDoneError").modal("toggle");
                    return;
                }
            }
           
         

            for (var i = 0; i < data.length; i++) {
                var datestart = new Date(data[i].startTime);
                var dateend = new Date(data[i].endTime);
                var startResult=0;
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
                    //alert("end" + end);
                }
                if (datestart.getHours() >= 12) {
                    startResult = datestart.getHours() - 12;
                    start = startResult + ":" + datestart.getMinutes() + " PM";
                    }
                    else {
                    start = datestart.getHours() + ":" + datestart.getMinutes()+ " AM";
                    }
               
                //alert("start" + start + "end" + end);

                if (data[i].hasOwnProperty('dateFieldHidden')) {
                    alert("called");
                    csv += data[i].dateFieldHidden + "_" + start + "_" + end + "|"
                }

            }
            console.log()
       
            var jsonData = { CSV: csv, ProID: this.userId };
            var self = this;
            this.CustomerHttp.post(jsonData, "/AddMyAvail").then(function (res: any) {
           
               
                self.message = "Updated Successfully";
                $("#PDone").modal("toggle");
                

            });
        }
    }


    angular.module('spafoo.ctrl.ProMyAvailability', []).controller('ProMyAvailability', ProMyAvailabilityController);

}