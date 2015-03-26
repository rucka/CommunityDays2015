window.controllers = window.controllers || {};
window.controllers.realtimeController = (function (angular, config) {
    'use strict';

    realtimeController.$inject = ['$scope', '$interval', 'yahooService', 'chartService'];
    return realtimeController;

    function realtimeController($scope, $interval, yahooService, chartService) {
        var refresh = config.priceRefresh;
        var stocks = [
            createStock('MSFT'),
            createStock('AAPL'),
            createStock('AMZN'),
            createStock('GOOG'),
            createStock('FB'),
            createStock('TWTR'),
        ];

        $interval(refreshStocks, refresh);
        refreshStocks();

        $scope.cannotAdd = function () {
            return (angular.isUndefined($scope.newsymbol) || $scope.newsymbol === null || $scope.newsymbol.trim() === '');
        };
        $scope.addStock = function () {
            if ($scope.cannotAdd()) {
                return;
            }
            var stock = createStock($scope.newsymbol);
            stocks.push(stock);
            $scope.newsymbol = undefined;
            refreshStock(stock);
        }

        function createStock(symbol) {
            var stock = {
                symbol: symbol,
            };
            stock.close = function () {
                var index = stocks.indexOf(stock);
                stocks.splice(index, 1);
            };
            return stock;
        }

        function refreshStocks() {
            angular.forEach(stocks, refreshStock);
            if (angular.isUndefined($scope.stocks)) {
                $scope.stocks = stocks;
            }
        }

        function refreshStock(stock) {
            yahooService.getPrice(stock.symbol)
                .then(function (result) {
                    var price = result.price;
                    if (angular.isUndefined(stock.quotes)) {
                        stock.quotes = [];
                    }
                    stock.quotes.push(price);
                    stock.lastQuote = price;
                    if (stock.quotes.length === 1 || stock.quotes[stock.quotes.length - 2] <= price) {
                        stock.direction = 'up';
                    } else {
                        stock.direction = 'down';
                    }
                    if (stock.quotes.length > 10) {
                        stock.quotes.splice(0, 1);
                    }
                    if (angular.isUndefined(stock.chart)) {
                        stock.chart = chartService.render(stock.symbol, stock.quotes);
                    } else {
                        chartService.refresh(stock.chart, stock.quotes);
                    }
                });
        }
    }
})(window.angular, window.config);