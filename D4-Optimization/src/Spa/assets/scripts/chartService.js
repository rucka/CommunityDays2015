window.services = window.services || {};
window.services.chartService = (function (angular, Chart) {
    'use strict';
    return function (){
        return {
            render: function (symbol, quotes) {
                var element = document.getElementById("chart-" + symbol);
                if (angular.isUndefined(element) || element === null) {
                    return;
                }
                var ctx = element.getContext("2d");
                var data = createChartData(symbol, quotes);
                var chart = new Chart(ctx).Line(data, {
                    responsive: true,
                    //scaleBeginAtZero: true,
                    //scaleOverride: true,
                    //scaleSteps: 10,
                    //scaleStepWidth: 80,
                });
                return chart;
            },
            refresh: function (chart, quotes) {
                chart.addData([quotes[quotes.length - 1]], '');
                if (chart.datasets[0].points.length > 10) {
                    chart.removeData();
                }
            }
        };
    };

    function fillChart(stock) {
        var symbol = stock.symbol;
        var element = document.getElementById("chart-" + symbol);
        if (angular.isUndefined(element) || element === null) {
            return;
        }
        var ctx = element.getContext("2d");
        var data = createChartData(stock);
        var chart = new Chart(ctx).Line(data, {
            responsive: true,
            //scaleBeginAtZero: true,
            //scaleOverride: true,
            //scaleSteps: 10,
            //scaleStepWidth: 80,
        });
        return chart;
    }

    function createChartData(symbol, quotes) {
        var labels = [];
        angular.forEach(quotes, function (q) { labels.push('') });
        var data = {
            labels: labels,
            datasets: [
                {
                    label: symbol,
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: quotes
                }
            ]
        };
        return data;
    }


})(window.angular, window.Chart);