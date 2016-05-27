(function () {

    'use strict';

    app
        .controller('NewsCtrl', NewsCtrl);

    NewsCtrl.$inject = ['$state','identityService', 'newsService', '$scope', '$filter', '$q', 'ngTableParams','responseService','SERVER_CONSTANT','imageModalService'];

    function NewsCtrl($state,identityService, newsService, $scope, $filter, $q, ngTableParams,responseService,SERVER_CONSTANT,imageModalService) {



        $scope.imageHostPath = SERVER_CONSTANT.IMAGE_HOST_PATH;

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "news";



        $scope.totalNews=[];


        init();

        function init(){
            getNewsData();

        }

        function getNewsData($defer, params) {

            var queryData =
            {
                "searchQuery": "",
                "pageNumber": 1,
                "pageSize": 10,
                "sort":{
                    newsDateTime: 'desc'
                }
            };
            newsService.getActivatedNews(identityService.getAccessToken(), queryData).then(function (response) {
                $scope.totalNews = response.data.success.successData.news.totalNews;
                $defer.resolve($scope.totalNews);
                params.total(response.data.success.successData.news.totalNumber);

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        getNewsData($defer, params);
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);

                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });
        }


    }


})();


