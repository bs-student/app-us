(function () {

    'use strict';

    app
        .controller('NewsDetailsCtrl', NewsDetailsCtrl);

    NewsDetailsCtrl.$inject = ['$stateParams','$state','identityService', 'newsService', '$scope', '$filter', '$q', 'ngTableParams','responseService','SERVER_CONSTANT','imageModalService'];

    function NewsDetailsCtrl($stateParams,$state,identityService, newsService, $scope, $filter, $q, ngTableParams,responseService,SERVER_CONSTANT,imageModalService) {



        $scope.imageHostPath = SERVER_CONSTANT.IMAGE_HOST_PATH;

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "news";


        if($stateParams.newsId==undefined){
            $state.go('app.news');
        }else{

            $scope.firstNews=[];
            $scope.latestNews=[];
            $scope.alsoLikedNews=[];
            getSingleNews($stateParams.newsId);
            getLatest10News();
        }



        function getSingleNews(newsId){
            ($scope.newsPromise=newsService.getSingleNews({"newsId":newsId})).then(function (response) {

                $scope.firstNews.push(response.data.success.successData.news);

            }).catch(function (response) {

                if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });
        }

        function getLatest10News(){
            var queryData =
            {
                "searchQuery": "",
                "pageNumber": 1,
                "pageSize": 10,
                "sort":{
                    newsDateTime: 'desc'
                }
            };
            newsService.getActivatedNews(queryData).then(function (response) {

                var allNews= response.data.success.successData.news.totalNews;
//                console.log(allNews);
                $scope.alsoLikedNews = allNews.slice(0,2);
//                console.log(allNews);
                $scope.latestNews = allNews.slice(2,5);
//                console.log(allNews);

            }).catch(function (response) {

                if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);

                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });
        }




    }


})();


