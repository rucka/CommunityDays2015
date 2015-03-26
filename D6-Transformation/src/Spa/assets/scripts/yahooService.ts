window.services = window.services || {};
window.services.yahooService = (function (angular) {
    'use strict';

    var yahooService = yahooServiceFake;

    return ['$q', '$http', yahooService];

    function yahooServiceReal($q, $http) { //real
        return {
            getPrice: function (symbol) {
                var baseurl = "http://query.yahooapis.com/v1/public/yql";
                var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol = '" + symbol + "'");
                var url = baseurl + "?" + 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env";

                var deferred = $q.defer();
                $http.get(url).success(function (data) {
                    var price = parseFloat(data.query.results.quote.LastTradePriceOnly);
                    deferred.resolve({ price: price });
                }).error(deferred.reject);
                return deferred.promise;
            },
        }
    }

    function yahooServiceFake($q, $http) { //random
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