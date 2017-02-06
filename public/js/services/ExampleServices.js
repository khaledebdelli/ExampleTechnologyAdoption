(() => {
    angular.module('app.services', [])
        .service('ExampleServices', services);

    function services($http, app_url) {

        this.getExampleData = (cb, data) => {
            exec('get', '/api/example/', data, cb);
        };

        // Callback functions
        function exec(type, endpoint, data, cb) {
            $http[type](app_url + endpoint, data)
                .then(function(response, status, headers, config) {
                    cb(null, response);
                }, function(response) {
                    cbErr(response, cb);
                });
        };

        function cbErr(response, cb) {
            if (response.error) {
                return cb({ msg: response.error });
            }

            if (!status && !response) {
                response = {
                    msg: "No hay conexión a internet. Compruebe su conexión"
                };
            }

            return cb(response);
        };
    }
})();
