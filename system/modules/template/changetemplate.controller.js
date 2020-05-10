(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChangeTemplateController', ChangeTemplate);

    ChangeTemplate.$inject = ['TemplateService','ProfileService', '$rootScope'];
    function ChangeTemplate(TemplateService, ProfileService, $rootScope) {
        var vm = this;

        var logout = function () {
            ProfileService.Logout();
        };

        askQuestion(logout);
    };
    
})();