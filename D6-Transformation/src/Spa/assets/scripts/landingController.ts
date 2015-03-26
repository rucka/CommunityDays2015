﻿///<reference path="common.ts"/>
///<reference path="config.ts"/>

window.controllers = window.controllers || {};
window.controllers.landingController = (function (slidr: any, config: Config): any {
    "use strict";

    //landingController.$inject = ['$scope'];
    return ['$scope', landingController];

    function landingController($scope) {
        var slider = slidr.create('main-slider');
        slider.add('h', ['one', 'two', 'one', 'two']);
        slider.start();
        slider.auto(config.sliderRefresh);

        $scope.realtime = function () {
            $scope.$emit('navigate', 'realtime');
        };
    }
})(window.slidr, window.config);