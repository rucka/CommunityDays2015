window.services = window.services || {};
window.services.yahooService = (function (angular) {
    'use strict';

   return ['$q', '$http', yahooService];

    function yahooService($q, $http) { 
        var lastQuotes = {};

        return {
            getPrice: function (symbol) {
                var price = get(symbol);
                var deferred = $q.defer();
                deferred.resolve({ price: price });
                return deferred.promise;
            }
        }

        function get(symbol) {
            var maxvalue = 700;
            var maxperc = 0.5;

            var value;
            if (angular.isUndefined(lastQuotes[symbol])) {
                value = (Math.floor(Math.random() * maxvalue * 100) + 1) / 100;
            } else {
                var last = lastQuotes[symbol];
                var random = Math.floor(Math.random() * 2);
                var sign = random === 0 ? -1 : 1;
                var offset = sign * Math.floor(Math.random() * (last * maxperc) * 100) / 100 /100;
                value = last + offset;
            }
            value = round(value);
            lastQuotes[symbol] = value;
            return value;
        }

        function round(value) {
            return Math.round(value * 100) / 100;
        }
    }
})(window.angular);