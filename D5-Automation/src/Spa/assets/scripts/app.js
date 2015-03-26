(function (domready, angular, services, controllers) {
    'use strict';

    domready(function () {
        console.log("bootstrap application started");
        var app = angular.module('app', []);

        app.service('yahooService', services.yahooService);
        app.service('chartService', services.chartService);

        app.controller('mainController', controllers.mainController);
        app.controller('landingController', controllers.landingController);
        app.controller('realtimeController', controllers.realtimeController);

        console.log("bootstrap application ended");
    });
})(window.domready, window.angular, window.services, window.controllers);