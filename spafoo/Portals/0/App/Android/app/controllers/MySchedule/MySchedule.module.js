(function () {
    'use strict';
    angular
        .module('spafoo.module.MySchedule', ['spafoo.ctrl.MySchedule'])
        .config(configMySchedule);
    configMySchedule.$inject = ['$stateProvider'];
    function configMySchedule($stateProvider) {
        var MyScheduleState = {
            name: 'MySchedule',
            url: '/MySchedule',
            templateUrl: 'app/templates/MySchedule.html',
            controller: 'MySchedule as ms'
        };
        $stateProvider.state(MyScheduleState);
    }
})();

//# sourceMappingURL=MySchedule.module.js.map
