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
            self.AddressID = $stateParams.AddressID;
            self.ClientID = $stateParams.ClientID;
            self.ProviderID = $stateParams.ProviderID;
            self.AppID = $stateParams.AppID;
            self.name = $stateParams.Name1;
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
                if (!self.staticEvents[0].events[i].hasOwnProperty('endTime') || !self.staticEvents[0].events[i].hasOwnProperty('startTime')) {
                    this.message = "Choose time on respective date";
                    $("#PDone").modal("toggle");
                    return;

                }
            }
            for (var i = 0; i < self.staticEvents[0].events.length; i++)
            {
                 data = { AddressID: self.AddressID, AppID: self.AppID, AtTime: self.staticEvents[0].events[i].startTime, ClientID: self.ClientID, Comment: "", EndTime: self.staticEvents[0].events[i].endTime, ForDate: self.staticEvents[0].events[i].dateFieldHidden, ProviderID: self.ProviderID };  
                console.log(data);
                self.CustomerHttp.post(data, "/UpdateAppBasicInfo").then(function (res: any) {
                
                    self.CustomerHttp.get("/UpdateAppStatus/" + res + "/5").then(function () {
                   
                    });
                  
                });
            }
            
            
        }
    }

        


    angular.module('spafoo.ctrl.ProSetSoonest', []).controller('ProSetSoonest',ProSetSoonestController);

}

 