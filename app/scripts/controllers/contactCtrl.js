(function () {

    'use strict';

    app
        .controller('BookBuyCtrl', BookBuyCtrl);

    BookBuyCtrl.$inject = ['$scope', 'identityService','$stateParams','$state'];

    function BookBuyCtrl($scope, identityService,$stateParams,$state) {



        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "buyBook";

        $scope.searchingError = false;
        $scope.searchingProgress=true;
        $scope.searchBook = _searchBook;
        $scope.changePage = _changePage;

        $scope.bookSearchResult = null;

        $scope.maxSize = 10;
        $scope.totalSearchResults = 0;

        $scope.currentPage = 1;

        $scope.viewType = 'List';
        $scope.showResult = false;
        $scope.sortType = "bookTitle";



        function _changePage(currentPage) {
            $scope.searchingError=false;

            $state.go('app.bookBuy.bookSearch',{searchQuery: $scope.searchText,pageNumber:currentPage});

        }

        function _searchBook(valid) {

            if (valid) {

                $scope.showResult = true;
                $scope.searchingError=false;


                $state.go('app.bookBuy.bookSearch',{searchQuery: $scope.searchText,pageNumber:1});

            }

        }



    }


})();


