(function () {

    'use strict';

    app
        .factory('apiService', apiService);

    apiService.$inject = ['$http'];

    function apiService($http) {

        return {
            get: _get,
            post: _post,
            put: _put,
            patch: _patch,
            remove: _remove
        };

        function _get(url, config) {
            return $http.get(url, config);
        }

        function _post(url, data, config) {
            return $http.post(url, data, config);
        }

        function _put(url, data, config) {
            return  $http.put(url, data, config);
        }

        function _patch(url, data, config) {
            return $http.patch(url, data, config);
        }

        function _remove(url, config) {
            return  $http.delete(url, config);
        }

    }


})();