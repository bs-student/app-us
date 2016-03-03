(function () {

    'use strict';

    app
        .controller('BookCompareCtrl', BookCompareCtrl);

    BookCompareCtrl.$inject = ['$stateParams','$scope','bookService','identityService'];

    function BookCompareCtrl($stateParams,$scope,bookService,identityService) {
        $scope.bookSearchResult=null;
        $scope.asin = $stateParams.asin;
        $scope.isbn = $stateParams.isbn;
        $scope.eisbn = $stateParams.eisbn;
        $scope.ean = $stateParams.ean;

        $scope.bookConditions = null;
        $scope.bookOfferId = null;
//        $scope.buyFromAmazon = _buyFromAmazon;
//        $scope.usedCo

        var amazonData = {
            'accessToken': identityService.getAccessToken(),
            'asin':$scope.asin
        }

        bookService.getSingleBookByAsinAmazon(amazonData).then(function(response){
//           console.log(response.data.books);
            $scope.bookSearchResult=response.data.result.books;
            $scope.bookOfferId = response.data.result.books[0].bookOfferId;
//            console.log($scope.bookSearchResult);
        });

        var campusBooksData = {
            'accessToken': identityService.getAccessToken(),
            'isbn': $scope.isbn
        }
        bookService.getSingleBookByIsbnCampusBooks(campusBooksData).then(function (response){
            if(response.data.response!=undefined){
//                console.log(response.data.response.page.offers.condition[0]["@attributes"].name);
                if(response.data.response.page.offers.condition!=undefined){
                    $scope.bookConditions =response.data.response.page.offers.condition;
                }
            }
//           console.log(response);
        });





//        console.log("Compare Books");
//
//        $scope.search = _search;
//        $scope.changePage =_changePage;
//        $scope.bookSearchResult = null;
//
//        $scope.maxSize = 10;
//        $scope.totalSearchResults = 0;
//        $scope.currentPage = 1;
//
//
//
//        function _changePage(currentPage){
//            console.log(currentPage);
//            var data = {
//                'keyword':$scope.searchText,
//                'page':currentPage,
//                'accessToken': identityService.getAccessToken()
//            }
//            bookService.searchBooks(data).then(function(response){
//                $scope.bookSearchResult = response.data.result.books;
////                $scope.totalSearchResults= parseInt(response.data.result.totalSearchResults, 10);
//            });
//        }
//        function _search(){
//
//            var data = {
//                'keyword':$scope.searchText,
//                'page':1,
//                'accessToken': identityService.getAccessToken()
//            }
//            bookService.searchBooks(data).then(function(response){
//                $scope.bookSearchResult = response.data.result.books;
//                $scope.totalSearchResults= parseInt(response.data.result.totalSearchResults, 10);
//            });
//        }


    }


})();
