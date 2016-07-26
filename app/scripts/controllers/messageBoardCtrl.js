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
        $scope.changeSortType = _changeSortType;
        $scope.makeStar = _makeStar;
        $scope.search = _search;
        $scope.typeChange = _typeChange;
        $scope.totalBookDeals=[];
        $scope.bookDeals=[];
        $scope.radioModel = 'All';


        $scope.changePage=_changePage;
        $scope.maxSize = 10;
        $scope.totalSearchResults = 0;
        $scope.currentPage = 1;

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

                $scope.totalBookDeals=response.data.success.successData;
                $scope.bookDeals=response.data.success.successData.slice(0,10);
                $scope.totalSearchResults = response.data.success.successData.length;
                $scope.bookDeals[0].active=true;
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

        function _changePage(currentPage) {
            $scope.bookDeals=$scope.totalBookDeals.slice((currentPage-1)*10,(currentPage*10));
            angular.forEach($scope.bookDeals, function (deal) {
                deal.active = false;
            });
            $scope.bookDeals[0].active=true;
        }

        function _search(searchQuery){

            if(searchQuery==""){
                $scope.bookDeals=$scope.totalBookDeals.slice(0,10);
                $scope.totalSearchResults = $scope.totalBookDeals.length;
                $scope.currentPage=1;
                $scope.maxSize=10;
                angular.forEach($scope.bookDeals, function (deal) {
                    deal.active = false;
                });
                $scope.bookDeals[0].active=true;

            }else{
                $scope.bookDeals=[];

                angular.forEach($scope.totalBookDeals,function(deal){
                    if(((deal.bookTitle.toLowerCase()).indexOf(searchQuery))>=0){
                        $scope.bookDeals.push(deal);
                    }
                });
                if($scope.bookDeals.length>0){
                    angular.forEach($scope.bookDeals, function (deal) {
                        deal.active = false;
                    });
                    $scope.bookDeals[0].active=true;
                    $scope.totalSearchResults = $scope.bookDeals.length;
                    $scope.currentPage=1;
                    $scope.maxSize=$scope.bookDeals.length;
                }

            }

        }
        function _makeStar(deal){
            var data = {
                accessToken:identityService.getAccessToken(),
                bookDealId: deal.bookDealId
            };
            ($scope.getDealsPromise = bookDealService.addBookDealAsStarred(data)).then(function(response){

                if(response.data.success.successData.starred){
                    $scope.totalBookDeals[$scope.totalBookDeals.indexOf(deal)].starred = true;
                }else{
                    $scope.totalBookDeals[$scope.totalBookDeals.indexOf(deal)].starred = false;
                }
                responseService.showSuccessToast(response.data.success.successTitle, response.data.success.successDescription);

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

        function _typeChange(typeValue){
            $scope.bookDeals=[];

            if(typeValue=="All"){
                //Getting All Deals
                $scope.bookDeals=$scope.totalBookDeals.slice(0,10);
                $scope.totalSearchResults = $scope.totalBookDeals.length;
                $scope.currentPage=1;
                $scope.maxSize=10;
                angular.forEach($scope.bookDeals, function (deal) {
                    deal.active = false;
                });
                $scope.bookDeals[0].active=true;
            }else if(typeValue=="Starred"){
                //Getting Starred Deals
                angular.forEach($scope.totalBookDeals,function(deal){
                    if(deal.starred){
                        $scope.bookDeals.push(deal);
                    }
                });
                if($scope.bookDeals.length>0){
                    angular.forEach($scope.bookDeals, function (deal) {
                        deal.active = false;
                    });
                    $scope.bookDeals[0].active=true;
                    $scope.totalSearchResults = $scope.bookDeals.length;
                    $scope.currentPage=1;
                    $scope.maxSize=$scope.bookDeals.length;
                }
            }else if(typeValue=="SellingDeal"){
                //Selling Deals
                angular.forEach($scope.totalBookDeals,function(deal){
                    if(deal.dealType=="sellingDeal"){
                        $scope.bookDeals.push(deal);
                    }
                });
                if($scope.bookDeals.length>0){
                    angular.forEach($scope.bookDeals, function (deal) {
                        deal.active = false;
                    });
                    $scope.bookDeals[0].active=true;
                    $scope.totalSearchResults = $scope.bookDeals.length;
                    $scope.currentPage=1;
                    $scope.maxSize=$scope.bookDeals.length;
                }
            }else if(typeValue=="ContactedDeal"){
                //Selling Deals
                angular.forEach($scope.totalBookDeals,function(deal){
                    if(deal.dealType=="contactedDeal"){
                        $scope.bookDeals.push(deal);
                    }
                });
                if($scope.bookDeals.length>0){
                    angular.forEach($scope.bookDeals, function (deal) {
                        deal.active = false;
                    });
                    $scope.bookDeals[0].active=true;
                    $scope.totalSearchResults = $scope.bookDeals.length;
                    $scope.currentPage=1;
                    $scope.maxSize=$scope.bookDeals.length;
                }
            }else if(typeValue=="Unread"){
                //Selling Deals
                angular.forEach($scope.totalBookDeals,function(deal){
                    if(deal.newMessages>0){
                        $scope.bookDeals.push(deal);
                    }
                });
                if($scope.bookDeals.length>0){
                    angular.forEach($scope.bookDeals, function (deal) {
                        deal.active = false;
                    });
                    $scope.bookDeals[0].active=true;
                    $scope.totalSearchResults = $scope.bookDeals.length;
                    $scope.currentPage=1;
                    $scope.maxSize=$scope.bookDeals.length;
                }
            }
        }
        function _changeSortType(){

            if($scope.sortType=="bookTitle"){
                $scope.totalBookDeals.sort(compare_with_title);
            }else if($scope.sortType=="bookIsbn"){
                $scope.totalBookDeals.sort(compare_with_isbn);
            }else if($scope.sortType=="bookDirectorAuthorArtist"){
                $scope.totalBookDeals.sort(compare_with_author);
            }
            $scope.bookDeals=$scope.totalBookDeals.slice(0,10);
            $scope.currentPage = 1;
            angular.forEach($scope.bookDeals, function (deal) {
                deal.active = false;
            });
            $scope.bookDeals[0].active=true;
        }


        function compare_with_title(a, b){
            if(a.bookTitle < b.bookTitle) return -1;
            if(a.bookTitle > b.bookTitle) return 1;
            return 0;
        }

        function compare_with_isbn(a, b){
            if(a.bookIsbn < b.bookIsbn) return -1;
            if(a.bookIsbn > b.bookIsbn) return 1;
            return 0;
        }

        function compare_with_author(a, b){
            if(a.bookDirectorAuthorArtist < b.bookDirectorAuthorArtist) return -1;
            if(a.bookDirectorAuthorArtist > b.bookDirectorAuthorArtist) return 1;
            return 0;
        }

        function _sendMessage(valid,contact){
            if(valid){

                var data={
                    message: contact.message,
                    accessToken:identityService.getAccessToken(),
                    contactId:contact.contactId
                };

                ($scope.messagePromise = contactService.sendMessagesWithoutMailing(data)).then(function(response){
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
                        "sender":identityService.getAuthorizedUserData().username,
                        "senderProfilePicture":identityService.getAuthorizedUserData().profilePicture

                    }).then(function(x){

                    })
                        .catch(function(x){

                        });
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
        function _getMessages(contact,open){


            if(!open){
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
