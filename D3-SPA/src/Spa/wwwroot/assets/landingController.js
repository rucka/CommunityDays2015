window.controllers = window.controllers || {};
window.controllers.landingController = (function (slidr, config) {
    'use strict';
    
    return landingController;

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