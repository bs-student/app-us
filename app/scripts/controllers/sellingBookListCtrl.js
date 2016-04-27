(function () {

    'use strict';

    app
        .controller('ContactedBookListCtrl', ContactedBookListCtrl);

    ContactedBookListCtrl.$inject = ['$scope', '$stateParams','$state','identityService','contactService','responseService','bookDealService'];

    function ContactedBookListCtrl($scope,$stateParams,$state, identityService,contactService,responseService,bookDealService) {


        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "contactedBook";
        $scope.campusBookDeals=[];
//        $scope.campusBookDeals.sellerToBuyer=[];
//        $scope.campusBookDeals.buyerToSeller.messages=[];
//        $scope.campusBookDeals.buyerToSeller.messages=[];

        $scope.getMessages= _getMessages;
        $scope.sendMessage= _sendMessage;
        init();

        function init(){
            bookDealService.getBookDealsIhaveContactedFor(identityService.getAccessToken()).then(function(response){
                $scope.campusBookDeals = response.data.success.successData;

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

//            $scope.contact={};
//            $scope.contact.messages=[];
//            if($scope.$parent.loggedIn){
//                $scope.contact.buyerEmail = identityService.getAuthorizedUserData().email;
//            }

        }

        function _getMessages(deal){

            var data={
                accessToken:identityService.getAccessToken(),
                contactId:deal.contactId
            }
            contactService.getMessages(data).then(function(response){
                deal.messages = response.data.success.successData;
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
        function _sendMessage(valid,deal){

            if(valid){
                var data={
                    message: deal.message,
                    accessToken:identityService.getAccessToken(),
                    contactId:deal.contactId
                }
                contactService.sendMessages(data).then(function(response){
                    if(deal.messages!=undefined){
                        deal.messages.push(response.data.success.successData);
                    }
                    deal.sendMessageForm=false;
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

//        function _contactSeller(valid){
//            if(valid){
//                $scope.contact.bookDeal =$scope.deal.bookDealId;
//                var data={
//                    contact: $scope.contact,
//                    access_token : identityService.getAccessToken()
//                }
//
//
//                contactService.addContact(data).then(function (response){
//                    responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successDescription);
//                }).catch(function (response){
//                    responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
//                });
//
//            }
//        }


    }


})();


