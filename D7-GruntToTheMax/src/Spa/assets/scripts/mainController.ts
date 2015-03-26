window.controllers = window.controllers || {};
window.controllers.mainController = (function () {
    'use strict';
    return ['$scope', mainController];

    function mainController($scope) {
        $scope.templates = [
                { name: 'landing', url: 'partial-landing.html' },
                { name: 'realtime', url: 'partial-realtime.html' }
        ];

        $scope.landing = function () {
            $scope.template = $scope.templates[0];
        };

        $scope.realtime = function () {
            $scope.template = $scope.templates[1];
        };

        $scope.landing();
        //$scope.realtime();

        $scope.$on('navigate', function (event, data) {
            var viewMethodName = data;
            $scope[viewMethodName]();
        });
    }
})();