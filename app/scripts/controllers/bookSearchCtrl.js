(function () {

    'use strict';

    app
        .controller('BookSearchCtrl', BookSearchCtrl);

    BookSearchCtrl.$inject = ['$scope', 'bookService', 'identityService', 'imageModalService', '$filter'];

    function BookSearchCtrl($scope, bookService, identityService, imageModalService, $filter) {

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "buyBook";

        $scope.searchBook = _searchBook;
        $scope.changePage = _changePage;
        $scope.prevPage = _prevPage;
        $scope.nextPage = _nextPage;
        $scope.setActive = _setActive;
        $scope.bookSearchResult = null;
        $scope.viewImage = _viewImage;

        $scope.maxSize = 10;
        $scope.totalSearchResults = 0;
        $scope.currentPage = 1;
        $scope.viewType = 'List';
        $scope.changeSortType = _changeSortType;
        $scope.showResult = false;
        $scope.sortType = "bookTitle";


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
            console.log(book.showThumbnails);
        }

        function _nextPage(book) {

            if ($scope.thumbnailPage <= Math.floor(book.bookImages.length / $scope.thumbnailSize)) {
                $scope.thumbnailPage++;
                console.log("Next Page");
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

        function _changeSortType(sortType) {
            console.log(sortType);
        }


        function _viewImage(event, size) {
            imageModalService.showModal(event, size);
        }

        function _changePage(currentPage) {
            var data = {
                'keyword': $scope.searchText,
                'page': currentPage
            }
            bookService.searchBooks(data).then(function (response) {
                $scope.bookSearchResult = response.data.success.successData.books;
//                $scope.totalSearchResults= parseInt(response.data.result.totalSearchResults, 10);
            });
        }

        function _searchBook(valid) {

            if (valid) {

                $scope.showResult = true;

                var data = {
                    'keyword': $scope.searchText,
                    'page': 1
                }
                bookService.searchBooks(data).then(function (response) {
                    $scope.bookSearchResult = response.data.success.successData.books;
                    $scope.totalSearchResults = parseInt(response.data.success.successData.totalSearchResults, 10);

                    setCarousel();
                });
            }

        }


    }


})();


