(function () {

    'use strict';

    app
        .controller('BookCompareCtrl', BookCompareCtrl);

    BookCompareCtrl.$inject = ['$state','$stateParams','$scope','bookService','identityService','responseService','storageService','wishlistService','SERVER_CONSTANT','imageModalService'];

    function BookCompareCtrl($state,$stateParams,$scope,bookService,identityService,responseService,storageService, wishlistService,SERVER_CONSTANT,imageModalService) {

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "buyBook";

        $scope.bookSearchResult=null;

        $scope.asin = $stateParams.asin;
        $scope.isbn = $stateParams.isbn;

        $scope.contact = _contact;
        $scope.saveToWishList = _saveToWishList;

        $scope.bookConditions = null;
        $scope.bookOfferId = null;
        $scope.newBooks = [];
        $scope.usedBooks = [];

        $scope.noBuyerToSeller = false;
        $scope.noSellerToBuyer = false;
        $scope.lowestPrice=null;
        $scope.campusId = storageService.getValue("universityCampusValue");
        $scope.noUniversitySelected=false;

        $scope.host = SERVER_CONSTANT.DOMAIN_HOST;

        $scope.prevPage = _prevPage;
        $scope.nextPage = _nextPage;
        $scope.setActive = _setActive;
        $scope.viewImage = _viewImage;

        if($scope.campusId==undefined){
            $scope.noUniversitySelected=true;
        }
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
            $scope.amazonPromise = bookService.getSingleBookByAsinAmazon(amazonData).then(function(response){
                $scope.bookSearchResult=response.data.success.successData.books;
                $scope.amazonBook = response.data.success.successData.books[0];
                $scope.bookOfferId = response.data.success.successData.books[0].bookOfferId;

                checkAndSetLowestPrice(parseFloat($scope.amazonBook.bookPriceAmazon.substring(1)));

                setCarousel();

            }).catch(function(response){
                responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
            });
        }

        function getCampusBooks(){
            var campusBooksData = {
                isbn: $scope.isbn
            };
            $scope.onlinePromise = bookService.getSingleBookByIsbnCampusBooks(campusBooksData).then(function (response){
                if(response.data.success.successData.response.page.offers.condition!=undefined){
                    $scope.bookConditions =response.data.success.successData.response.page.offers.condition;
                    $scope.newBooks =response.data.success.successData.response.page.offers.condition[0].offer;
                    $scope.usedBooks =response.data.success.successData.response.page.offers.condition[1].offer;
                    //GET CHEAPEST ONLINE BOOK
                    getCheapestOnlineBook($scope.bookConditions);
                }
            }).catch(function(response){
                responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
            });

        }
        function getBookDeals(){

            var onCampusDealsData={
                isbn: $scope.isbn,
                access_token: identityService.getAccessToken(),
                campusId: $scope.campusId
            };
            $scope.campusPromise = bookService.getCampusDealsByIsbn(onCampusDealsData).then(function (response){
                $scope.campusBookDeals = response.data.success.successData;
                if($scope.campusBookDeals.buyerToSeller.length==0)$scope.noBuyerToSeller=true;
                if($scope.campusBookDeals.sellerToBuyer.length==0)$scope.noSellerToBuyer=true;
                //GET CHEAPEST CAMPUS DEAL
                getCheapestBookDeal($scope.campusBookDeals);
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

            if(deal==undefined){
                responseService.showErrorToast("No Books were found on campus");
            }else{
                $state.go("app.contact",{deal:deal});
            }

        }

        function _saveToWishList(){
            if($scope.$parent.loggedIn){
                wishlistService.addBookToWishList(identityService.getAccessToken(),{bookId:$scope.amazonBook.bookId}).then(function(response){
                    responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successDescription);
                }).catch(function (response) {

                    if (response.data.error_description == "The access token provided has expired.") {
                        identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                            identityService.setAccessToken(response.data);
                            _saveToWishList();
                        });
                    } else if (response.data.error != undefined) {
                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                    } else {
                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                    }

                });
            }else{
                $state.go("app.login",{bookId:$scope.amazonBook.bookId});
            }

        }

        function getCheapestBookDeal(data){
            var deals=[];
            var dealPrices=[];
            angular.forEach(data.buyerToSeller,function(deal){
                deals.push(deal);
                dealPrices.push(parseFloat(deal.bookPriceSell));
            });
            angular.forEach(data.sellerToBuyer,function(deal){
                deals.push(deal);
                dealPrices.push(parseFloat(deal.bookPriceSell));
            });
            dealPrices.sort(function(a, b) { return a - b });

            angular.forEach(deals,function(deal){

                if(parseFloat(deal.bookPriceSell)==dealPrices[0]){

                    $scope.cheapestCampusDeal=deal;
                }
            });

            checkAndSetLowestPrice(dealPrices[0]);

        }

        function getCheapestOnlineBook(bookConditions){
            var books = [];
            var prices = [];
            angular.forEach(bookConditions[0].offer,function(book){
                books.push(book);
                prices.push(parseFloat(book.total_price));
            });
            angular.forEach(bookConditions[1].offer,function(book){
                books.push(book);
                prices.push(parseFloat(book.total_price));
            });
            prices.sort(function(a, b) { return a - b });

            angular.forEach(books,function(book){

                if(parseFloat(book.total_price)==prices[0]){

                    $scope.cheapestOnlineBook=book;
                }
            });
            checkAndSetLowestPrice(prices[0]);

        }

        function checkAndSetLowestPrice(price){
            if($scope.lowestPrice==null ||price<$scope.lowestPrice)$scope.lowestPrice = price;
        }


        //SET CAROUSEL FUNCTIONS
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
        function _viewImage(event, size) {
            imageModalService.showModal(event, size);
        }
    }


})();
