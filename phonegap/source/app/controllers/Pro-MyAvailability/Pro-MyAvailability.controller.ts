module ProMyAvailabilityController {

    class ProMyAvailabilityController {
        eventSource: any;
        uiConfig: any;
        staticEvents: any;
        static $inject = ['$q', '$state', '$scope', '$location', 'CustomerHttp', '$window', 'SharedHttp'];
        constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private SharedHttp: spafoo.httpsharedservice.ISharedHttp
           
        ) {
          
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            this.uiConfig = {
                calendar: {
                    height: 450,
                   
                    header: {
                   
                      
                        right: 'today prev,next'
                    },
                    eventClick: $scope.alertEventOnClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize
                }
            };
            this.staticEvents = [

                // your event source
                {
                    events: [ // put the array in the `events` property
                       
                        {
                            title: 'event2',
                            start: '2016-09-01',
                            end: '2016-09-01'
                        }, {
                            title: 'event2',
                            start: '2016-09-03',
                            end: '2016-09-03'
                        }, {
                            title: 'event2',
                            start: '2016-09-05',
                            end: '2016-09-05'
                        }, {
                            title: 'event2',
                            start: '2016-09-07',
                            end: '2016-09-07'
                        }, {
                            title: 'event2',
                            start: '2016-09-09',
                            end: '2016-09-09'
                        },
                        
                    ],
                    color: 'green',     // an option!
                    textColor: 'black' // an option!
                }

                // any other event sources...

            ];
            this.eventSource = this.staticEvents;
            //    [
            //    { title: 'All Day Event', start: new Date(y, m, 1) },
            //    { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
            //    { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
            //    { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
            //    { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
            //    { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
            //];
        }
    }


    angular.module('spafoo.ctrl.ProMyAvailability', []).controller('ProMyAvailability', ProMyAvailabilityController);

}