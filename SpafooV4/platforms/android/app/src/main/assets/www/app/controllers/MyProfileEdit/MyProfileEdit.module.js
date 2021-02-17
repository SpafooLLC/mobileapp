(function () {
    'use strict';
    angular
        .module('spafoo.module.MyProfileEdit', ['spafoo.ctrl.MyProfileEdit'])
        .config(configMyProfileEdit);
    configMyProfileEdit.$inject = ['$stateProvider'];
    function configMyProfileEdit($stateProvider) {
        var MyProfileEditState = {
            name: 'MyProfileEdit',
            url: '/MyProfileEdit',
            templateUrl: 'app/templates/Client-MyProfileEdit.html',
            controller: 'MyProfileEdit as mpe'
        };
        $stateProvider.state(MyProfileEditState);
    }
})();

//# sourceMappingURL=MyProfileEdit.module.js.map
