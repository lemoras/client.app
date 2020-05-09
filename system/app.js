
var str = window.location.host;

var baseURL =  "http://" + str; // + str.replace("lemoras.site:8080", "api.lemoras.com");
var adminPath = "/admin";
var authPath = "/user";

(function () {
    'use strict';

    var $routeProviderReference;

    var app = angular
        .module('app', ['ngRoute', 'ngCookies', 'oc.lazyLoad', 'cgNotify'])
        .factory('util', function () {

            var arrayRemove = function (arr, value) {

                return arr.filter(function (ele) {
                    return ele.id !== value;
                });
            };

            return { arrayRemove: arrayRemove };
        })
        .factory('notification', function (notify) {

            var pushWarningNotify = function (message, isLogin = false) {
                if (isLogin)
                    pushNotify("Dikkat!", message, 'alert-warning');
                else
                    pushNotify("Dikkat!", message, 'alert alert-warning');
            };

            var pushDangerNotify = function (message, isLogin = false) {
                if (isLogin)
                    pushNotify("Hata!", message, 'alert-danger');
                else
                    pushNotify("Hata!", message, 'alert alert-danger');
            };

            var pushSuccessNotify = function (message, isLogin = false) {
                pushNotify("Sonuç!", message, 'alert alert-success');
            };

            var pushInfoNotify = function (message, isLogin = false) {
                if (isLogin)
                    pushNotify("Bilgi!", message, 'alert-info');
                else
                    pushNotify("Bilgi!", message, 'alert alert-info');
            };

            function pushNotify(title, message, classes) {
                var messageTemplate = '<div style="background-image:url(data:image/png;base64,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); background-repeat: no-repeat; padding-left:30px;"><strong>' + title + ' > </strong>' + message + '</div> ';

                notify({ messageTemplate: messageTemplate, classes: classes });

                //notify({ messageTemplate: messageTemplate, classes: 'alert-warning', position: 'right' }); 
            };

            return { pushWarningNotify: pushWarningNotify, pushDangerNotify: pushDangerNotify, pushSuccessNotify: pushSuccessNotify, pushInfoNotify: pushInfoNotify };
        })
        .factory('getjson', function ($http, notification) {

            var getData = function (url) {
                var isLogin = window.localStorage.getItem("config") !== "";
                $http.defaults.headers.common['Authorization'] = window.localStorage.getItem("authorization");
                return $http.get(url).
                    then(function (response) {
                        return httpResponse(response);
                    }, function (response) {
                        return httpError(response);
                    }).catch(function (error) { angular.noop; });
            };

            var postData = function (url, data) {
                var isLogin = window.localStorage.getItem("authorization") !== "";
                isLogin = window.localStorage.getItem("config") !== "";

                $http.defaults.headers.common['Authorization'] = window.localStorage.getItem("authorization");
                return $http.post(url, data).
                    then(function (response) {
                        return httpResponse(response, isLogin);
                    }, function (response) {
                        return httpError(response, isLogin);
                    }).catch(function (error) { angular.noop; });
            };

            var putData = function (url, data) {
                $http.defaults.headers.common['Authorization'] = window.localStorage.getItem("authorization");
                return $http.put(url, data).
                    then(function (response) {
                        return httpResponse(response);
                    }, function (response) {
                        return httpError(response);
                    }).catch(function (error) { angular.noop; });
            };

            var deleteData = function (url) {
                $http.defaults.headers.common['Authorization'] = window.localStorage.getItem("authorization");
                return $http.delete(url).
                    then(function (response) {
                        return httpResponse(response);
                    }, function (response) {
                        return httpError(response);
                    }).catch(function (error) { angular.noop; });
            };

            var httpResponse = function(response, isLogin = false) {
                if (response.status == 200) {
                    if (response.data.hasOwnProperty("status")
                        && response.data.hasOwnProperty("message")) {
                        if (!response.data.status) {
                            notification.pushWarningNotify(response.data.message, isLogin);
                        }
                    }
                    return response.data;                                        
                }
                else {
                    notification.pushWarningNotify(response.data, isLogin);
                    return response.data;
                }
            };

            var httpError = function(response, isLogin = false) {                      
                notification.pushDangerNotify(response.statusText, isLogin);
                return {
                    status: false, message: "hata"
                };
            };

            return { getData: getData, postData: postData, putData: putData, deleteData: deleteData };
        })
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$ocLazyLoadProvider', '$qProvider'];
    function config($routeProvider, $locationProvider, $ocLazyLoadProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        $routeProvider.when('/login', {
            templateUrl: '../../system/modules/login/login.view.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
            .when('/logout', {
                templateUrl: '../../system/modules/logout/logout.view.html',
                controller: 'LogoutController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '../../system/modules/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            });  // .when('/load', ( window.location.href = './index.html' ) );

        $routeProviderReference = $routeProvider;

        $ocLazyLoadProvider.config({
            'debug': false, // For debugging 'true/false'
            'events': true, // For Event 'true/false'  
            'modules': []
        });
    }


    run.$inject = ['$rootScope', '$location', '$cookies', '$http', '$route', 'getjson', '$q'];
    function run($rootScope, $location, $cookies, $http, $route, getjson, $q) {

        $rootScope.config = undefined;

        $rootScope.navSelected = 0;

        $rootScope.contentTitle = '';

        $rootScope.navSelect = function (index, itemValue, xValue) {
            $rootScope.navSelected = index;

            if (xValue === undefined) {
                $rootScope.contentTitle = itemValue;
            }
            else {
                $rootScope.contentTitle = itemValue + '  >  ' + xValue;
            };

        };

        $rootScope.setNav = function () {
            $rootScope.navSelected = 0;
            $rootScope.contentTitle = '';
        };

        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            document.getElementById("configDisplay").style.display = "";
            document.getElementById("configTitle").innerHTML = "{{ config.root.titleName }}";
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.authdata;
            var result = window.localStorage.getItem("config");
            if (result === null) {
                window.location.replace("#!/login");
            }
            else {
                var config = JSON.parse(result);
                $rootScope.config = config;
                setRoute(config.root.route);  

                var path = window.location.pathname.split('/')[1];
                
                if ("templates" !== path) {
                    var template = window.localStorage.getItem("template");

                    if ( template === null) {
                        window.location.replace("./index.html#!/login");        
                    }
                    else {
                        window.location.replace("./templates/" + template + ".html");
                    }                  
                }		
            }      
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });


        function setRoute(data) {

            var j = 0, currentRoute;

            var def = data.default;

            var controllers = [];

            for (; j < data.pages.length; j++) {

                currentRoute = data.pages[j];

                controllers.push('../../' + currentRoute.controllerUrl);

                $routeProviderReference.when(currentRoute.routeName, {

                    templateUrl: '../../' + currentRoute.templateUrl,
                    controller: currentRoute.controllerName,
                    controllerAs: currentRoute.controllerAsName,
                    resolve: {
                        loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(controllers); // Resolve promise and load before view 
                        }]
                    }
                });
            };

            $routeProviderReference.otherwise({ redirectTo: def });

            $route.reload();
        };
    }

})();
