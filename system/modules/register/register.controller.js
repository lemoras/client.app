(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['AuthenticationService', '$location', 'FlashService'];
    function RegisterController(AuthenticationService, $location, FlashService) {
        var vm = this;

        vm.register = register;
        vm.typeParam = null;

        (function initController() {

            var urlParams = $location.search();
            vm.typeParam = urlParams.type;
            
        })();

        function register() {
            vm.dataLoading = true;

            if (vm.typeParam == null) { 
                AuthenticationService.CreateAccount(vm.user.username, vm.user.password, function (response) {
                    if (response.success) {
                        FlashService.Success('Kayıt başarılı', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                    vm.dataLoading = false;
                });
            }
            else if (vm.typeParam == "fake") {	

                AuthenticationService.FakeCreateAccount(vm.user.username, vm.user.password, function (response) {
                    if (response.success) {
                        FlashService.Success('Kayıt başarılı', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                    vm.dataLoading = false;
                });
            } else {
                FlashService.Error('Type not detected', true);
                $location.path('/login');
            }
        }
    }

})();
