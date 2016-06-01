(function () {

    'use strict';

    app
        .controller('SellingBookListCtrl', SellingBookListCtrl);

    SellingBookListCtrl.$inject = ['$scope', '$stateParams','$state','identityService','contactService','responseService','bookDealService','imageModalService','SERVER_CONSTANT'];

    function SellingBookListCtrl($scope,$stateParams,$state, identityService,contactService,responseService,bookDealService,imageModalService,SERVER_CONSTANT) {

        if(!$scope.$parent.loggedIn){
            $state.go("app.login");
        }

        $scope.showPagination=false;

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "user";
        $scope.campusBookDeals=[];

        $scope.imageHostPath = SERVER_CONSTANT.IMAGE_HOST_PATH;
        $scope.getMessages= _getMessages;
        $scope.sendMessage= _sendMessage;

        $scope.showMarkAsSoldModal = _showMarkAsSoldModal;
        $scope.markUserAsBuyerOfThatDeal = _markUserAsBuyerOfThatDeal;

        $scope.showBookDealChangeStatusModal = _showBookDealChangeStatusModal;
        $scope.changeBookDealStatus = _changeBookDealStatus;

        $scope.showDeleteBookDealModal=_showDeleteBookDealModal;
        $scope.deleteBookDeal=_deleteBookDeal;

        $scope.prevPage = _prevPage;
        $scope.nextPage = _nextPage;
        $scope.setActive = _setActive;
        $scope.viewImage = _viewImage;



        //Pagination

        $scope.changePage=_changePage;
        $scope.maxSize = 10;
        $scope.totalSearchResults = 0;
        $scope.currentPage = 1;

        init($scope.currentPage);

        // Set Carousel
        function setCarousel() {

            $scope.thumbnailSize = 3;
            $scope.thumbnailPage = 1;
            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;

            angular.forEach($scope.campusBookDeals, function (book) {
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


        function init(currentPage){

            var data={
                "pageNumber": currentPage,
                "pageSize": $scope.maxSize
            };
            ($scope.sellingBookPromise = bookDealService.getBookDealsOfMine(identityService.getAccessToken(),data)).then(function(response){
                $scope.campusBookDeals = response.data.success.successData.result;
                $scope.totalSearchResults = response.data.success.successData.totalNumber;
                $scope.showPagination=true;
                setCarousel();

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        init(currentPage);
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });



        }

        function _changePage(currentPage) {

            var data={
                "pageNumber": currentPage,
                "pageSize": $scope.maxSize
            };

            ($scope.sellingBookPromise = bookDealService.getBookDealsOfMine(identityService.getAccessToken(),data)).then(function(response){
                $scope.campusBookDeals = response.data.success.successData.result;
                $scope.totalSearchResults = response.data.success.successData.totalNumber;
                setCarousel();


            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        _changePage(currentPage)
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
            };
            ($scope.messagePromise=contactService.getMessages(data)).then(function(response){
                contact.messages = response.data.success.successData;
                contact.messages.push({'messageBody':" "});
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
        function _sendMessage(valid,contact){

            if(valid){
                var data={
                    message: contact.message,
                    accessToken:identityService.getAccessToken(),
                    contactId:contact.contactId
                };
                ($scope.messagePromise=contactService.sendMessages(data)).then(function(response){
                    responseService.showSuccessToast("Message is Sent");
                    if(contact.messages!=undefined){
                        contact.messages.pop();
                        contact.messages.push(response.data.success.successData);
                        contact.messages.push({'messageBody':""});
                    }
                    contact.sendingMessages=false;
                }).catch(function (response) {

                    if (response.data.error_description == "The access token provided is invalid.") {

                    } else if (response.data.error_description == "The access token provided has expired.") {
                        identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                            identityService.setAccessToken(response.data);
                            _sendMessage(valid,deal);
                        });
                    } else if (response.data.error != undefined) {
                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                    } else {
                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                    }

                });
            }

        }

        function _showMarkAsSoldModal(event, modalTemplate,data){
            imageModalService.showPromptModal(event, modalTemplate,data,$scope);
        }

        function _markUserAsBuyerOfThatDeal(paramData){


            var data = {
                'contactId':paramData.contact.contactId
            };
            ($scope.messagePromise=bookDealService.sellBookToUser(identityService.getAccessToken(),data)).then(function(response){
                responseService.showSuccessToast(response.data.success.successTitle, response.data.success.successDescription);
                $scope.campusBookDeals.splice($scope.campusBookDeals.indexOf(paramData.deal),1);
            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        _markUserAsBuyerOfThatDeal(paramData);
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });

        }

        function _showBookDealChangeStatusModal(event, modalTemplate,data){
            imageModalService.showPromptModal(event, modalTemplate,data,$scope);
        }


        function _changeBookDealStatus(paramData){

            if(paramData.deal.bookStatus=="Activated"){
                var data = {
                    'bookDealId':paramData.deal.bookDealId,
                    'bookStatus':"Deactivated"
                };
            }else{
                var data = {
                    'bookDealId':paramData.deal.bookDealId,
                    'bookStatus':"Activated"
                };
            }

            ($scope.sellingBookPromise = bookDealService.changeBookDealStatus(identityService.getAccessToken(),data)).then(function(response){
                responseService.showSuccessToast(response.data.success.successTitle, response.data.success.successDescription);

                if(paramData.deal.bookStatus=="Activated"){
                    $scope.campusBookDeals[$scope.campusBookDeals.indexOf(paramData.deal)].bookStatus = "Deactivated";
                }else{
                    $scope.campusBookDeals[$scope.campusBookDeals.indexOf(paramData.deal)].bookStatus = "Activated";
                }

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        _changeBookDealStatus(paramData);
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });
        }


        function _showDeleteBookDealModal(event, modalTemplate,data){
            imageModalService.showPromptModal(event, modalTemplate,data,$scope);
        }


        function _deleteBookDeal(paramData){


            ($scope.sellingBookPromise = bookDealService.deleteBookDeal(identityService.getAccessToken(),{"bookDealId":paramData.deal.bookDealId})).then(function(response){
                responseService.showSuccessToast(response.data.success.successTitle, response.data.success.successDescription);

                $scope.campusBookDeals.splice($scope.campusBookDeals.indexOf(paramData.deal),1);

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        _changeBookDealStatus(paramData);
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


