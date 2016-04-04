/*jshint browser:true
 */
/*global alert,google
 */
(function () {

    'use strict';
    window.googleChart = {};

    // Load the Visualization API and the piechart package.
    google.load('visualization', '1', {
        'packages': ['corechart']
    });

    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(init);

    function init() {

        var chartArray = findCharts();
        initalizeCharts(chartArray);
    }

    //******************************************************************************************
    // findCharts - This method finds all the Google chart widget added in the page by the user
    //******************************************************************************************
    function findCharts() {
        var charts = [];
        var chartQuery = document.querySelectorAll('[data-uib="media/chart"]');

        for (var i = 0; i < chartQuery.length; i++) {
            var chartsData = {};
            var elem = chartQuery[i];
            chartsData.chartDOMNode = elem;
            chartsData.dataURL = elem.getAttribute('data-url');
            chartsData.dataChartType = elem.getAttribute('data-chart-type');
            chartsData.dataChartWidth = elem.getAttribute('data-chart-width');
            chartsData.dataChartHeight = elem.getAttribute('data-chart-height');
            chartsData.dataQueryString = elem.getAttribute('data-query-string');
            chartsData.dataID = elem.getAttribute('id');

            charts.push(chartsData);
        }
        if (charts) {
            return charts;
        }

    }


    //*******************************************************************************
    // initalizeCharts - This method initializes each chart widget added by the user
    //********************************************************************************

    function initalizeCharts(chartArray) {

        chartArray.forEach(function (chart) {
            createChart(chart);

        });
    }



    //********************************************************************************************
    // createChart - This method draws the chart chosen by the user by calling the corresponding visualization method
    //*********************************************************************************************

    function createChart(chartObject) {

        var chartWidth = chartObject.dataChartWidth;
        var chartHeight = chartObject.dataChartHeight;
        var url = chartObject.dataURL;
        var param = "/gviz/tq?tq=";
        var queryString = encodeURIComponent(chartObject.dataQueryString);
        var query = new google.visualization.Query(url + param + queryString);
        query.send(getQueryResponseHandler(chartObject.dataID, chartObject.dataChartType,chartWidth,chartHeight));

    }



    function getQueryResponseHandler(id, chart_type,chartWidth,chartHeight) {

        return function handleQueryResponse(response) {
            var chart;
            var domNode = document.getElementById(id);
            var chart_table = {
                "Pie": "PieChart",
                "Bar": "BarChart",
                "Line": "LineChart"
            };
            var visualization_choice = chart_table[chart_type];

            // setting chart height

            var options = {
                    width: chartWidth,
                    height: chartHeight
            };

            if (response.isError()) {
                console.log('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                return;
            }

            var data = response.getDataTable();
            if (visualization_choice) {
                chart = new google.visualization[visualization_choice](domNode);
                chart.draw(data,options);
            }

        };
    }
})();
