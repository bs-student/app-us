(function () {

    'use strict';

    app
        .controller('BookBuyFromAmazonCtrl', BookBuyFromAmazonCtrl);

    BookBuyFromAmazonCtrl.$inject = ['$stateParams','$scope','bookService','identityService'];

    function BookBuyFromAmazonCtrl($stateParams,$scope,bookService,identityService) {

//        alert($stateParams.bookOfferId);
        var data={
            'accessToken': identityService.getAccessToken(),
            'bookOfferId':$stateParams.bookOfferId
        }
        bookService.getAmazonCartCreateUrl(data).then(function(response){
            window.location.replace(response.data.cartUrl);
//            console.log(response.data.cartUrl);
        });

//        $scope.bookSearchResult=null;
//        $scope.asin = $stateParams.asin;
//        $scope.isbn = $stateParams.isbn;
//        $scope.eisbn = $stateParams.eisbn;
//        $scope.ean = $stateParams.ean;
//
//        $scope.bookConditions = null;
//        $scope.bookOfferId = null;
//        $scope.buyFromAmazon = _buyFromAmazon;
////        $scope.usedCo
//
//        var amazonData = {
//            'accessToken': identityService.getAccessToken(),
//            'asin':$scope.asin
//        }
//
//        bookService.getSingleBookByAsinAmazon(amazonData).then(function(response){
////           console.log(response.data.books);
//            $scope.bookSearchResult=response.data.result.books;
//            $scope.bookOfferId = response.data.result.books[0].bookOfferId;
////            console.log($scope.bookSearchResult);
//        });
//
//        var campusBooksData = {
//            'accessToken': identityService.getAccessToken(),
//            'isbn': $scope.isbn
//        }
//        bookService.getSingleBookByIsbnCampusBooks(campusBooksData).then(function (response){
//            if(response.data.response!=undefined){
////                console.log(response.data.response.page.offers.condition[0]["@attributes"].name);
//                if(response.data.response.page.offers.condition!=undefined){
//                    $scope.bookConditions =response.data.response.page.offers.condition;
//                }
//            }
////           console.log(response);
//        });
//
//
//        function _buyFromAmazon(){
//            var data={
//                'accessToken': identityService.getAccessToken(),
//                'bookOfferId':$scope.bookOfferId
//            }
//            bookService.getAmazonCartCreateUrl(data).then(function(response){
//
//               console.log(response.data.cartUrl);
//            });
//        }



    }


})();
