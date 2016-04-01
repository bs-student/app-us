(function () {

    'use strict';

    app
        .controller('BookSearchCtrl', BookSearchCtrl);

    BookSearchCtrl.$inject = ['$scope','bookService','identityService'];

    function BookSearchCtrl($scope,bookService,identityService) {

        $scope.search = _search;
        $scope.changePage =_changePage;
        $scope.bookSearchResult = null;

        $scope.maxSize = 10;
        $scope.totalSearchResults = 0;
        $scope.currentPage = 1;



        function _changePage(currentPage){
            console.log(currentPage);
            var data = {
                'keyword':$scope.searchText,
                'page':currentPage,
                'accessToken': identityService.getAccessToken()
            }
            bookService.searchBooks(data).then(function(response){
                $scope.bookSearchResult = response.data.result.books;
//                $scope.totalSearchResults= parseInt(response.data.result.totalSearchResults, 10);
            });
        }
        function _search(){

            var data = {
                'keyword':$scope.searchText,
                'page':1,
                'accessToken': identityService.getAccessToken()
            }
            bookService.searchBooks(data).then(function(response){
                $scope.bookSearchResult = response.data.success.successData.books;
                $scope.totalSearchResults= parseInt(response.data.success.successData.totalSearchResults, 10);
            });
        }


    }


})();
