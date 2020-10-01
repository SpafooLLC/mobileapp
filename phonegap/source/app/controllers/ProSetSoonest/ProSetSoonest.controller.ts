module ProSetSoonestController {

    class ProSetSoonestController {
        uiConfig: any;
        static $inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp', "$stateParams"];
        AddressID: number;
        ClientID: number;
        ProviderID: number;
        AppID: number;
        name: string;
        staticEvents: any;
        message: string;
        totalTime: number;
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp,
            private $stateParams: angular.ui.IStateParamsService
        ) {
            var self = this;
            var status= self.$window.localStorage.getItem('LoginStatus');
            if(status === null || status === 'false' || status === false || status === undefined || status === 'undefined' || status === ''){
                self.$state.go('login');
            }
            self.AddressID = $stateParams.AddressID;
            self.ClientID = $stateParams.ClientID;
            self.ProviderID = $stateParams.ProviderID;
            self.AppID = $stateParams.AppID;
            self.name = $stateParams.Name1;
            self.totalTime = $stateParams.totalTime;
            self.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    header: {


                        right: 'today prev,next'
                    },
                    dayClick: function (date: any, jsEvent: any, view: any) {
                     
                        var selectedDate = moment(date).format('YYYY-MM-DD');				    // set dateFrom based on user click on calendar
                        self.staticEvents[0].events.push({
                            start: selectedDate, allday: true,
                            dateField: moment(date).format('MMM DD'),
                            dateFieldHidden: moment(date).format('MM/DD/YYYY'),
                            proId: 0,
                            color: '#1e319b'

                        });				 
                    },
                   
                }

            };
            self.staticEvents =
                [
                    // your event source
                    {
                    events: [],
                        color: 'green',     // an option!
                        textColor: 'black' // an option!
                    }];
           

        }
        deleteEvent($index: any)
        {
         
            var self = this;
            self.staticEvents[0].events.splice($index, 1);
        }
        setDetails()
        {
           
            var self = this;
            var data = {};
            if (data == 0) {
             
                this.message = "Add a event to proceed";
                $("#PDone").modal("toggle");
                return;
            }
            for (var i = 0; i < self.staticEvents[0].events.length; i++) {
                if (!self.staticEvents[0].events[i].hasOwnProperty('endTime') ) {
                    self.message = "Choose time on respective date";
                    $("#PDone").modal("toggle");
                    return;

                }
                if (!self.staticEvents[0].events[i].hasOwnProperty('startTime'))
                {
                    self.message = "Choose time on respective date";
                    $("#PDone").modal("toggle");
                    return;
                }
                var date1 = new Date(self.staticEvents[0].events[i].startTime);
                var date2 = new Date(self.staticEvents[0].events[i].endTime);
                //  alert("date1" + date1 + "date2" + date2);
                if (date2 <= date1) {
                    this.message = "Start date is greater than end date";
                    $("#PDone").modal("toggle");
                    return;
                }
            }
            for (var i = 0; i < self.staticEvents[0].events.length; i++)
            {
                var datestart = new Date(self.staticEvents[0].events[i].startTime);
                var dateend = new Date(self.staticEvents[0].events[i].endTime);
                var startResult = 0;
                var endResult = 0;
                var start = '';
                var end = '';
                if (datestart.getHours() >= 12) {
                    startResult = datestart.getHours() - 12;
                    start = startResult + ":" + datestart.getMinutes() + " PM";
                }
                else {
                    start = startResult + ":" + datestart.getMinutes() + " AM";
                }
                if (dateend.getHours() >= 12) {
                    endResult = dateend.getHours() - 12;
                    end = endResult + ":" + dateend.getMinutes() + " PM";
                }
                else {
                    end = endResult + ":" + dateend.getMinutes() + " AM";
                }

                data = { AddressID: self.AddressID, AppID: self.AppID, AtTime: start, ClientID: self.ClientID, Comment: "", EndTime: end, ForDate: self.staticEvents[0].events[i].dateFieldHidden, ProviderID: self.ProviderID };  
      
                self.CustomerHttp.post(data, "/UpdateAppBasicInfo").then(function (res: any) {
                  
                
                    self.CustomerHttp.get("/UpdateAppStatus/" + res + "/5").then(function () {
                        self.$state.go("ProAppointments");
                    });
                  
                });
            }
            
            
        }
    }

        


    angular.module('spafoo.ctrl.ProSetSoonest', []).controller('ProSetSoonest',ProSetSoonestController);

}

 