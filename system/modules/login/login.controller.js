(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location','AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;
        vm.returnParam = null;
        vm.typeParam = null;

        vm.selectedApplication = null;

        vm.allApplication = [];

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();

            // var urlParams = new URLSearchParams(window.location.search);
            // vm.returnParam = urlParams.get('return');
            // vm.typeParam = urlParams.get('type');

            var urlParams = $location.search();
            vm.returnParam = urlParams.return;
            vm.typeParam = urlParams.type;
            
        })();
        
        function login() {
            vm.dataLoading = true;

            if (vm.returnParam != null) {	
                			
                AuthenticationService.ExternalLogin(vm.username, vm.password, function (response) {
                    if (response.status) {
                        if (response.hasOwnProperty("account"))
                        {
                            window.location.href = vm.returnParam + response.account.token;
                        }
                    } else {
                        // hata ?? 
                        FlashService.Error(response.message, $location);
                    }
                });  
                vm.dataLoading = false; 
            } 
            else {
                if (vm.typeParam == null) {
                AuthenticationService.InternalLogin(vm.username, vm.password, function (response) {
                    if (response.status) {
                        FlashService.WriteLocal(true, response.message);
                        var template = window.localStorage.getItem("template");
                        window.location.href = '../../templates/' + template + '.html';  //$location.path('/load');
                    } else {
                        FlashService.Error(response.message, '/');
                        vm.dataLoading = false;
                    }
                    vm.dataLoading = false;
                });
            }
            else {
                if (vm.typeParam == "fake") {
                    AuthenticationService.FakeLogin(vm.username, vm.password, function (response) {
                        if (response.status) {
                            FlashService.WriteLocal(true, response.message);
                            var template = window.localStorage.getItem("template");
                            window.location.href = '../../templates/' + template + '.html';  //$location.path('/load');
                        } else {
                            FlashService.Error(response.message, '/');
                            vm.dataLoading = false;
                        }
                        vm.dataLoading = false;
                    });

                }else {
                    AuthenticationService.Login(vm.username, vm.password, applicationId, function (response) {
                        if (response.success) {
                            if (response.data.configData === undefined) {
                                document.getElementById("preLoginForm").style.display = "none";
                                document.getElementById("loginForm").style.display = "";
                                loadAllApplication();
                            }
                            else {
                                FlashService.WriteLocal(false, response.data.configData);
                                var template = window.localStorage.getItem("template");
                                window.location.href = '../../templates/' + template + '.html';  //$location.path('/load');
                            }
                        } else {
                            FlashService.Error(response.data.message, $location);
                            vm.dataLoading = false;
                        }
                    });
                }
            }
            vm.dataLoading = false;
        }            
        };

        function loadAllApplication() {
            AuthenticationService.GetUserApp(function (response) {
                vm.allApplication = response;
            });
        }
    }

})();
