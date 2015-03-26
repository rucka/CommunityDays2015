window.services = window.services || {};
window.services.yahooService = (function (angular) {
    'use strict';

    return ['$q', '$http', yahooService];

    function yahooService($q, $http) { 
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
})(window.angular);