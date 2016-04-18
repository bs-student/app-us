(function () {

    'use strict';

    app
        .controller('BookSearchCtrl', BookSearchCtrl);

    BookSearchCtrl.$inject = ['$scope', 'bookService', 'identityService', 'imageModalService','responseService','$stateParams','$state'];

    function BookSearchCtrl($scope, bookService, identityService, imageModalService,responseService,$stateParams,$state) {



        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "buyBook";
        $scope.$parent.showResult = true;

        $scope.$parent.searchingProgress=true;

        $scope.prevPage = _prevPage;
        $scope.nextPage = _nextPage;
        $scope.setActive = _setActive;

        $scope.viewImage = _viewImage;

        var pageNumber=0;
        init();



        function init(){

            if($stateParams.searchQuery!=undefined && $stateParams.pageNumber!=undefined){
                console.log($scope.$parent);
                pageNumber= parseInt($stateParams.pageNumber,10);
                if(typeof $stateParams.searchQuery == "string" && (pageNumber<100 || 0>pageNumber)){

                    var data={
                        'keyword': $stateParams.searchQuery,
                        'page': pageNumber,
                        'access_token':identityService.getAccessToken()
                    }
                    $scope.$parent.showResult = true;
//                    $scope.$parent.currentPage = pageNumber;
                    $scope.$parent.searchText = $stateParams.searchQuery;
                    $scope.$parent.searchingError=false;
                    doSearch(data);


                }

            }
        }



        // Set Carousel
        function setCarousel() {

            $scope.thumbnailSize = 3;
            $scope.thumbnailPage = 1;
            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;

            angular.forEach($scope.bookSearchResult, function (book) {
                if (book.bookImages.length == 1) {
                    book.showThumb = false;
                } else {
                    book.showThumb = true;
                }

                book.showThumbnails = book.bookImages.slice(($scope.thumbnailPage - 1) * $scope.thumbnailSize, $scope.thumbnailPage * $scope.thumbnailSize);

            });

        }

        function _prevPage(book) {
            if ($scope.thumbnailPage > 1) {
                $scope.thumbnailPage--;
            }
            book.showThumbnails = book.bookImages.slice(($scope.thumbnailPage - 1) * $scope.thumbnailSize, $scope.thumbnailPage * $scope.thumbnailSize);

        }

        function _nextPage(book) {

            if ($scope.thumbnailPage <= Math.floor(book.bookImages.length / $scope.thumbnailSize)) {
                $scope.thumbnailPage++;

            }
            book.showThumbnails = book.bookImages.slice(($scope.thumbnailPage - 1) * $scope.thumbnailSize, $scope.thumbnailPage * $scope.thumbnailSize);

        }

        function _setActive(book, idx) {

            angular.forEach(book.showThumbnails, function (slide) {


                if (slide.imageId == idx) {
                    slide.active = true;
                }
                else {
                    slide.active = false;
                }

            });
        }


        // Set View Image
        function _viewImage(event, size) {
            imageModalService.showModal(event, size);
        }


        function doSearch(data){

            data.access_token = identityService.getAccessToken();

            $scope.$parent.searchPromise = bookService.searchBooks(data).then(function (response) {
                $scope.$parent.currentPage = pageNumber;
                $scope.bookSearchResult = response.data.success.successData.books;

                angular.forEach($scope.bookSearchResult,function(book){
                    book.lowestOnlinePricePromise = bookService.getLowestOnlinePrice(book.bookIsbn).then(function(response){
                        book.lowestOnlinePrice = response.data.success.successData.lowestOnlinePrice;
                    }).catch(function(response){
                        book.lowestOnlinePrice = "Not Found";
                    });
                });

                if(parseInt(response.data.success.successData.totalSearchResults, 10)>100){
                    $scope.$parent.totalSearchResults = 101;
                    $scope.$parent.totalSearchResultsText = "More than 100";
                }else{
                    $scope.$parent.totalSearchResults = $scope.totalSearchResultsText= parseInt(response.data.success.successData.totalSearchResults, 10);

                }
                $scope.$parent.searchingProgress = false;
                $scope.$parent.searchingError=false;
                setCarousel();
            }).catch(function(response){
                $scope.$parent.bookSearchResult=0;
                $scope.$parent.searchingProgress = false;
                $scope.$parent.searchingError=true;
                responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
            });
        }


    }


})();


