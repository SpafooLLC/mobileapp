(function () {
    'use strict';
    angular
        .module('spafoo.module.MyProfile', ['spafoo.ctrl.MyProfile'])
        .config(configMyProfile);
    configMyProfile.$inject = ['$stateProvider'];
    function configMyProfile($stateProvider) {
        var MyProfileState = {
            name: 'MyProfile',
            url: '/MyProfile',
            templateUrl: 'app/templates/MyProfile.html',
            controller: 'MyProfile as mp'
        };
        $stateProvider.state(MyProfileState);
    }
})();

//# sourceMappingURL=MyProfile.module.js.map
