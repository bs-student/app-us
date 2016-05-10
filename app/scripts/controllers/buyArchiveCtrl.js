(function () {

    'use strict';

    app
        .controller('BuyArchiveCtrl', BuyArchiveCtrl);

    BuyArchiveCtrl.$inject = ['$scope', '$stateParams','$state','identityService','contactService','responseService','bookDealService','imageModalService','SERVER_CONSTANT'];

    function BuyArchiveCtrl($scope,$stateParams,$state, identityService,contactService,responseService,bookDealService,imageModalService,SERVER_CONSTANT) {

        if(!$scope.$parent.loggedIn){
            $state.go("app.login");
        }

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "sellingBook";
        $scope.campusBookDeals=[];

        $scope.imageHostPath = SERVER_CONSTANT.IMAGE_HOST_PATH;
        $scope.getMessages= _getMessages;


        $scope.prevPage = _prevPage;
        $scope.nextPage = _nextPage;
        $scope.setActive = _setActive;
        $scope.viewImage = _viewImage;
        init();


        // Set Carousel
        function setCarousel() {

            $scope.thumbnailSize = 3;
            $scope.thumbnailPage = 1;
            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;

            angular.forEach($scope.campusBookDeals.buyerToSeller, function (book) {
                if (book.bookImages.length == 1) {
                    book.showThumb = false;
                } else {
                    book.showThumb = true;
                }

                book.showThumbnails = book.bookImages.slice(($scope.thumbnailPage - 1) * $scope.thumbnailSize, $scope.thumbnailPage * $scope.thumbnailSize);


            });
            angular.forEach($scope.campusBookDeals.sellerToBuyer, function (book) {
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
        function _viewImage(event, title) {
            imageModalService.showModal(event, title);
        }


        function init(){
            bookDealService.getBookDealsOfMineWhichAreBought(identityService.getAccessToken()).then(function(response){
                $scope.campusBookDeals = response.data.success.successData;
                setCarousel();

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        init();
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });



        }

        function _getMessages(contact){

            var data={
                accessToken:identityService.getAccessToken(),
                contactId:contact.contactId
            }
            contactService.getMessages(data).then(function(response){
                contact.messages = response.data.success.successData;
                contact.showingMessages = true;
            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        _getMessages(deal);
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


