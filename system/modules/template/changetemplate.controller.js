(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChangeTemplateController', ChangeTemplate);

    ChangeTemplate.$inject = ['TemplateService', 'AuthenticationService', 'FlashService', 'notification'];
    function ChangeTemplate(TemplateService, AuthenticationService, FlashService, notification) {
        var vm = this;

        var setTemplate = function (template, callback){
            TemplateService.SetTemplate(template);
            AuthenticationService.GetConfig(function(result) {
                FlashService.WriteLocal(true, result.data);
                callback(true);
            });
        }

        var whenNotSetTemplateAlert = function() {
            notification.pushWarningNotify("Şablon bir nedenden ötürü değiştirilemedi.");
        }

        askQuestion(whenNotSetTemplateAlert, setTemplate);
    };
    
})();