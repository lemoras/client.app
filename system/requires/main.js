require.config({
    baseUrl: './system',
    urlArgs: 'v=1.0',

    waitSeconds: 100,
    paths: {
        "angular-notify" : "requires/angular-notify",
        "jquery" : "https://code.jquery.com/jquery-3.5.1.min",
        "angular-route" : "https://code.angularjs.org/1.6.6/angular-route.min",
        "angular-cookies" : "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular-cookies.min",
        "ocLazyLoad" : "https://cdnjs.cloudflare.com/ajax/libs/oclazyload/1.1.0/ocLazyLoad.min",
        "angular": "https://code.angularjs.org/1.6.6/angular.min",
        "app" : "app",
        "authentication": "services/authentication.service",
        "flash":"services/flash.service",

        "login":"modules/login/login.controller",
        "logout":"modules/logout/logout.controller",
        "register":"modules/register/register.controller"
    },
    shim: {
        "angular-notify": { deps:["angular"], exports: "angular-notif" },
        "jquery": { exports: "jquery" },
        "angular-route": { deps: ["angular"], exports: "angular-route" },
        "angular-cookies": { deps: ["angular"], exports: "angular-cookies" },
        "ocLazyLoad": { deps: ["angular"], exports: "ocLazyLoad" },
        "angular": { deps: ["jquery"], exports: "angular" },
        "app": { deps: ["angular", "angular-route", "angular-cookies", "ocLazyLoad", 'angular-notify'], exports: "app" },
        "authentication": { deps: ["app"], exports: "authentication" },
        "flash": { deps:["app"], exports: "flash" },
        "logout": { deps: ["app"], exports: "logout" },
        "login": { deps: ["authentication", "app"], exports: "login" },
        "register": { deps: ["authentication", "app"], exports: "register" }
    },
    deps: ["app"]
});

require(
    [
        'login', 'logout', 'register',
        "jquery",
        "angular-route",
        "angular-cookies",
        "ocLazyLoad",
        "angular",
        "app",
        "authentication",
        "flash"
    ],
    function () {
        angular.bootstrap(document.body, ['app']);
    });

