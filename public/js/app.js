(() => {
    'use strict'

    angular
        .module('app', ['ngRoute', 'app.controllers', 'app.services'])
        .config(configApp)
        .value('app_url', '');

    function configApp($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../views/main.html',
                controller: 'ExampleCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: "/"
            });
    };
})();
