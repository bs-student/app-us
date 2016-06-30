(function () {

    'use strict';

    app
        .controller('MessageBoardCtrl', MessageBoardCtrl);

    MessageBoardCtrl.$inject = ['$state','$scope','bookDealService','identityService','responseService','contactService','$firebaseArray','SERVER_CONSTANT','eventService'];

    function MessageBoardCtrl($state,$scope,bookDealService,identityService,responseService,contactService,$firebaseArray,SERVER_CONSTANT,eventService) {

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "messageBoard";
        $scope.imageHostPath = SERVER_CONSTANT.IMAGE_HOST_PATH;
        $scope.active = _active;
        $scope.getMessages=_getMessages;
        $scope.sendMessage=_sendMessage;
        $scope.bookDeals=[];

        init();

        //Listen for getting messages
        eventService.on("addNewMessage",function(data,messageData){

            angular.forEach($scope.bookDeals,function(bookDeal){
                angular.forEach(bookDeal.contacts,function(contact){

                    if(parseInt(messageData.contactId,10)==parseInt(contact.contactId,10)){
                            if(contact.messages!=undefined){
                                contact.messages.push(messageData);

                            }
                        bookDeal.newMessages+=1;
                        contact.newMessages+=1;
                    }
                });
            });

        });


        function init(){
            ($scope.getDealsPromise = bookDealService.getAllActivatedSellingAndContactedBookOfUser(identityService.getAccessToken())).then(function(response){

                $scope.bookDeals=response.data.success.successData;
                checkForNewMessage();

            }).catch(function(response){
                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    ($scope.getDealsPromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
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


        function _active(activeDeal) {
            angular.forEach($scope.bookDeals, function (deal) {
                deal.active = false;
            });
            activeDeal.active = true;
        }

        function _sendMessage(valid,contact){
            if(valid){

                var data={
                    message: contact.message,
                    accessToken:identityService.getAccessToken(),
                    contactId:contact.contactId
                };

                contactService.sendMessagesWithoutMailing(data).then(function(response){
                    contact.messages.push(response.data.success.successData);

                    //Adding Realtime Database
                    var username = contact.contactName;
                    var ref = firebase.database().ref("/users/" + username + "/messages");
                    var list = $firebaseArray(ref);

                    list.$add({
                        "bookDealId": contact.bookDealId,
                        "contactId": contact.contactId,
                        "messageBody":contact.message,
                        "messageDateTime": new Date().toUTCString().substr(0,new Date().toUTCString().length-7),
                        "messageId":response.data.success.successData.messageId,
                        "sender":identityService.getAuthorizedUserData().username

                    }).then(function(x){console.log(x)})
                        .catch(function(x){console.log(x)});
                    contact.message="";

                }).catch(function(response){
                    if (response.data.error_description == "The access token provided is invalid.") {

                    } else if (response.data.error_description == "The access token provided has expired.") {
                        identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                            identityService.setAccessToken(response.data);
                            _sendMessage(valid,contact);
                        });
                    } else if (response.data.error != undefined) {
                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                    } else {
                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                    }
                });


            }
        }
        function _getMessages(contact){

            var data={
                accessToken:identityService.getAccessToken(),
                contactId:contact.contactId
            };
            ($scope.messagePromise=contactService.getMessages(data)).then(function(response){
                contact.messages = response.data.success.successData;

                decreaseNewMessage(contact);
                angular.forEach(contact.messages,function(message){
                    eventService.trigger("removeMessageNotification",{message:message,username:identityService.getAuthorizedUserData().username});
                });

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        _getMessages(contact);
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });
        }

        function checkForNewMessage(){
            angular.forEach($scope.bookDeals,function(bookDeal){
                bookDeal.newMessages = 0;

                angular.forEach($scope.$parent.messageNotifications,function(notification){
                    if(parseInt(bookDeal.bookDealId,10)==parseInt(notification.bookDealId,10)){
                        bookDeal.newMessages+=1;
                    }

                });


            });

            angular.forEach($scope.bookDeals,function(bookDeal){
                angular.forEach(bookDeal.contacts,function(contact){
                    contact.newMessages=0;
                })

            });

            angular.forEach($scope.$parent.messageNotifications,function(notification){
                angular.forEach($scope.bookDeals,function(bookDeal){
                    angular.forEach(bookDeal.contacts,function(contact){

                        if(parseInt(contact.contactId,10)==parseInt(notification.contactId,10)){
                            contact.newMessages+=1;
                        }
                    })

                });
            });

        }

        function decreaseNewMessage(contact){

            var number=0;
            angular.forEach($scope.$parent.messageNotifications,function(notification){
               if(parseInt(notification.contactId,10)==parseInt(contact.contactId,10)){
                   number++;
               }
            });

                angular.forEach($scope.bookDeals,function(bookDeal){

                    angular.forEach(bookDeal.contacts,function(dealContact){

                        if(parseInt(contact.contactId,10)==parseInt(dealContact.contactId,10)){
                            bookDeal.newMessages-=number;
                            contact.newMessages-=number;
                        }
                    })

                });

        }



    }


})();
