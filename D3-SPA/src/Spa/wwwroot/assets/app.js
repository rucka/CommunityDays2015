(function (domready, angular, services, controllers) {
    'use strict';

    domready(function () {
        var app = angular.module('app', []);

        app.service('yahooService', services.yahooService);
        app.service('chartService', services.chartService);

        app.controller('mainController', controllers.mainController);
        app.controller('landingController', controllers.landingController);
        app.controller('realtimeController', controllers.realtimeController);
    });
})(window.domready, window.angular, window.services, window.controllers);