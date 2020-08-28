require.config({
    baseUrl: '../../system',
    urlArgs: 'v=1.0',

    waitSeconds: 100,
    paths: {
        "angular-notify" : "requires/angular-notify",
        "jquery-confirm" :"https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min",
        "jquery" : "https://code.jquery.com/jquery-3.5.1.min",
        "angular-route" : "https://code.angularjs.org/1.6.6/angular-route.min",
        "angular-cookies" : "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular-cookies.min",
        "ocLazyLoad" : "https://cdnjs.cloudflare.com/ajax/libs/oclazyload/1.1.0/ocLazyLoad.min",
        "angular": "https://code.angularjs.org/1.6.6/angular.min",
        "app" : "app",
        "flash": "services/flash.service",
        "authentication": "services/authentication.service",
        "profile" : "services/profile.service",
        "lemoras" :"services/lemoras.service",
        "message" : "services/message.service",
        "template" : "services/template.service",

        "login":"modules/login/login.controller",
        "logout":"modules/logout/logout.controller"
    },
    shim: {
        "angular-notify": { deps:["angular"], exports: "angular-notif" },
        "jquery-confirm": { deps: ["jquery"], exports: "jquery-confirm" },
        "jquery": { exports: "jquery" },
        "angular-route": { deps: ["angular"], exports: "angular-route" },
        "angular-cookies": { deps: ["angular"], exports: "angular-cookies" },
        "ocLazyLoad": { deps: ["angular"], exports: "ocLazyLoad" },
        "angular": { exports: "angular" },
        "app": { deps: ["angular", "angular-route", "angular-cookies", "ocLazyLoad", 'angular-notify'], exports: "app" },
        "flash": { deps: ["app"], exports: "flash" },
        "authentication": { deps: ["app"],exports: "authentication" },
        "profile": { deps: ["app"], exports: "profile" },
        "lemoras": { deps: ["app"], exports: "lemoras" },
        "message": { deps: ["app"], exports: "message" },
        "template": { deps: ["app"], exports: "template" },
        "logout": { deps: ["app", "jquery-confirm"], exports: "logout" },
        "login": { deps: ["authentication", "flash", "app"], exports: "login" }
    },
    deps: ["app"]
});

require(
    [
        'login', 'logout',
        "jquery-confirm",
        "jquery",
        "angular-route",
        "angular-cookies",
        "ocLazyLoad",
        "angular",
        "app",
        "flash",
        "authentication",
        "profile",
        "lemoras",
        "message",
        "template"
    ],
    function () {
        angular.bootstrap(document, ['app']);
    });

