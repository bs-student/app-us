(function () {

    'use strict';

    app
        .factory('newsService', newsService);

    newsService.$inject=['apiService','SERVER_CONSTANT','NEWS_CONSTANT'];

    function newsService(apiService,SERVER_CONSTANT,NEWS_CONSTANT) {

        return {
            getActivatedNews:_getActivatedNews
        };


        function _getActivatedNews(accessToken,data){
            return apiService.post(SERVER_CONSTANT.HOST+NEWS_CONSTANT.GET_ACTIVATED_NEWS+"?access_token="+accessToken,data);
        }

    }

})();
