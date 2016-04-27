(function () {

    'use strict';

    app
        .controller('BookCompareCtrl', BookCompareCtrl);

    BookCompareCtrl.$inject = ['$state','$stateParams','$scope','bookService','identityService','responseService','storageService'];

    function BookCompareCtrl($state,$stateParams,$scope,bookService,identityService,responseService,storageService) {

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "buyBook";

        $scope.bookSearchResult=null;

        $scope.asin = $stateParams.asin;
        $scope.isbn = $stateParams.isbn;
        $scope.contact = _contact;

        $scope.bookConditions = null;
        $scope.bookOfferId = null;


        init();


        function init(){

            //Get Book Data from Amazon
            getAmazonBooks();
            //Get Book Data from CampusBooks
            getCampusBooks();
            //Get Book Deals
            getBookDeals();


        }

        function getAmazonBooks(){
            var amazonData = {
                asin:$scope.asin
            };
            bookService.getSingleBookByAsinAmazon(amazonData).then(function(response){
                $scope.bookSearchResult=response.data.success.successData.books;
                $scope.bookOfferId = response.data.success.successData.books[0].bookOfferId;
            }).catch(function(response){
                responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
            });
        }

        function getCampusBooks(){
            var campusBooksData = {
                isbn: $scope.isbn
            };
            bookService.getSingleBookByIsbnCampusBooks(campusBooksData).then(function (response){
                if(response.data.success.successData.response.page.offers.condition!=undefined){
                    $scope.bookConditions =response.data.success.successData.response.page.offers.condition;
                }
            }).catch(function(response){
                responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
            });

        }
        function getBookDeals(){

            var onCampusDealsData={
                isbn: $scope.isbn,
                access_token: identityService.getAccessToken(),
                campusId: storageService.getValue("universityCampusValue")
            };
            bookService.getCampusDealsByIsbn(onCampusDealsData).then(function (response){
                $scope.campusBookDeals = response.data.success.successData;
            }).catch(function (response) {

                if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        getBookDeals();
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });
        }
        function _contact(deal){
            $state.go("app.contact",{deal:deal});
        }


    }


})();
