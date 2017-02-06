(() => {
    'use strict';
    angular
        .module('app.controllers', [])
        .controller('ExampleCtrl', mainController);

    function mainController(ExampleServices, $filter, $q) {
        var vm = this;
        vm.working = false;
        vm.totals = 0;
        vm.data = [];

        var getExampleData = () => {
            let defer = $q.defer();
            ExampleServices.getExampleData((err, response) => {
                if (err) {
                    return defer.reject(err);
                }
                return defer.resolve(response.data.data);
            });
            return defer.promise;
        };

        vm.generateResults = () => {
            vm.working = true;
            getExampleData()
                .then(response => {
                    let data = _.chain(response)
                        .sortBy(item => {
                            return item.date
                        })
                        .groupBy(item => {
                            return $filter('date')(new Date(item.date), 'MMMM')
                        });

                    let totals = data.reduce((currentValue, items, index) => {
                        currentValue[index] = items.reduce((old, item) => {
                            return old + item.y
                        }, 0);
                        return currentValue;
                    }, {});

                    vm.data = data.value();
                    vm.totals = totals.value();
                    vm.working = false;

                    vm.series = Object.keys(vm.totals)
                        .reduce((previous, current) => {
                            previous.push({
                                name: current,
                                y: vm.totals[current],
                                color: '#7CAC24',
                                borderColor: '#5A7C1B'
                            });
                            return previous;
                        }, []);

                    console.log(vm.data)
                    generateChart({ categories: Object.keys(vm.totals), series: vm.series });
                }, reason => {
                    console.log(reason);
                    vm.working = false;
                });
        };

        var generateChart = ({ categories, series }) => {
            Highcharts.chart('graphContainer', {
                chart: {
                    type: 'bar',
                    backgroundColor: '#2f2f2f',
                    polar: true,
                    style: {
                        color: "#FFFFFF"
                    }
                },
                title: {
                    text: 'Results'
                },
                xAxis: {
                    categories: categories,
                    lineColor: '#666666',
                    tickColor: '#666666',
                    labels: {
                        style: {
                            color: '#FFFFFF'
                        }
                    }
                },
                yAxis: {
                    gridLineWidth: 1,
                    gridLineColor: '#666666',
                    title: {
                        text: 'Quantity'
                    }
                },
                series: [{
                    pointWidth: 20,
                    showInLegend: false,
                    data: series
                }]
            });
        };

        vm.generateResults();
    };

})();
