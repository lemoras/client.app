(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);
    
    AuthenticationService.$inject = ['$http', 'getjson', '$cookies', '$rootScope'];
    function AuthenticationService($http, getjson, $cookies, $rootScope) {
        var service = {};

        service.ExternalLogin = ExternalLogin;
        service.InternalLogin = InternalLogin;
        service.Login = Login;
        service.CreateAccount = CreateAccount;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.GetUserApp = GetUserApp;
        service.GetConfig = GetConfig;
        
        var authServiceUrl = baseURL.includes("localhost") ? baseURL : "http://kimlik.online";

        return service;

        function GetUserApp(callback) {
            callback($rootScope.applications); 
        }

        function Login(username, password, applicationId, callback) {
            getjson.postData(authServiceUrl + '/api' + authPath + '/login', { username: username, password: password, applicationInstanceId: applicationId })
                .then(function (res) {                    
                    if (res.data.token === undefined || res.data.token.trim() === '') {
                        $rootScope.applications = res.data.applications;
                        res.data.configData = undefined;
                        callback(res);
                    }
                    else {
                        service.SetCredentials(username, password, res.data.token);
                        service.GetConfig(function (configData) {
                            res.data.configData = configData.data;
                            callback(res);
                        });
                    }
                });
        }

        function ExternalLogin(username, password, callback) {
            getjson.postData(authServiceUrl + '/api' + authPath + '/login', { email: username, password: password })
                .then(function (res) {
                        callback(res);
                });
        }

        function CreateAccount(username, password, callback) {
            getjson.postData(authServiceUrl + '/api' + authPath + '/new', { email: username, password: password })
                .then(function (res) {
                        callback(res);
                });
        }

        function SetCredentials(username, password, token) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            var authorization = 'Bearer ' + token;
            window.localStorage.setItem("authorization", authorization);

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        }

        function ClearCredentials() {
            //$rootScope.Config = {};
            $rootScope.config = undefined;
            $rootScope.globals = {};
            $cookies.remove('globals');
            window.localStorage.removeItem("authorization"); 
            window.localStorage.removeItem("config"); 
	        window.localStorage.removeItem("app");
            window.localStorage.removeItem("template");
            $http.defaults.headers.common.Authorization = 'Bearer';
        }

        function GetConfig(callback) {           
                getjson.getData(authServiceUrl + '/system/configs/' + window.location.hostname +'.json')
                    .then(function (res) {
                        callback(res);
                    });
        
        }

        function InternalLogin(username, password, callback) {
            getjson.postData(authServiceUrl + '/api' + authPath + '/login', { email: username, password: password })
                .then(function (res) {                    
                    if (res.status) {
                        service.SetCredentials(username, password, res.account.token);
                        service.GetConfig(function (configData) {
                             res.message =  configData.data;     
                             callback(res);                       
                         });
                    }else {
                        callback(res); 
                    }
                });
                
        }
    }

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();
